const vscode = require('vscode');
const wxml_format = require("./FormatWxml");
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	registerCommand(context, 'extension.createMiniappTemplate', async (resource) => {
	  const componentName = await vscode.window.showInputBox({
			prompt: '请输入组件名称',
			placeHolder: '请输入组件名称',
		});

		if (!componentName) {
			vscode.window.showErrorMessage('组件名称不能为空！');
			return;
		}

		// 创建组件文件夹
		const folderUri = vscode.Uri.file(resource.fsPath);
		const componentFolderUri = vscode.Uri.joinPath(folderUri, componentName);
		await vscode.workspace.fs.createDirectory(componentFolderUri);

		// 创建组件文件
		const filesToCreate = ['index.wxml', 'index.scss', 'index.json', 'index.js'];
		for (const fileName of filesToCreate) {
			if (fileName === 'index.json') {
				// 创建 index.json 文件并写入初始内容
				const initialContent = {
					component: true,
					styleIsolation: 'apply-shared',
					usingComponents: {},
					// 在这里添加你想要的其他初始内容
				};
				const jsonContent = JSON.stringify(initialContent, null, 4);
				await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), Buffer.from(jsonContent, 'utf8'));
			} else if (fileName === 'index.js') {
				// 创建 index.js 文件并写入初始内容
				const initialJsContent = `
				const options = {
					// 组件选项
					options: {
						multipleSlots: true,
					},
					behaviors: [],
					properties: {
						customClass: { type: String, value: '' }, // 自定义样式类名，用于覆盖默认样式
						customStyle: { type: String, value: '' }, // 自定义样式，用于覆盖默认样式
					},
					// 组件数据
					data: {
				
					},
					// 数据监听器
					observers: {},
					// 组件方法
					methods: {
						init() { },
					},
					// 组件生命周期
					lifetimes: {
						created() { },
						attached() {
							this.init()
						},
						ready() {
						},
						moved() { },
						detached() { },
					},
					definitionFilter() { },
					// 页面生命周期
					pageLifetimes: {
						// 页面被展示
						show() { },
						// 页面被隐藏
						hide() { },
						// 页面尺寸变化时
						resize() { },
					},
				}
				
				Component(options)				
				`.replace(/^\s+/gm, '');
				await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), Buffer.from(initialJsContent, 'utf8'));
			} else if (fileName === 'index.wxml') {
				// 创建 index.js 文件并写入初始内容
				const initialJsContent = `
						<view class="wy-${componentName} {{customClass}}" style="{{customStyle}}">
							<!-- wy-${componentName}组件 -->
						</view>
				`.replace(/^\s+/gm, '');
				await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), Buffer.from(initialJsContent, 'utf8'));
			} else {
				// 对于其他文件，创建空文件
				await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), new Uint8Array());
			}
		}
		vscode.window.showInformationMessage('小程序组件模板创建成功！');
	})

	registerCommand(context, 'extension.formatwxml', () => {
	  const wxml = new wxml_format.default();
		wxml.init();
	})
}

function deactivate() {
	console.log('扩展 Freedom cide 已被禁用！');
}
//  注册函数
function registerCommand(context, command, func) {
	let com = vscode.commands.registerCommand(command, (param) => {
			func(param)
	})
	context.subscriptions.push(com);
}
module.exports = {
	activate,
	deactivate
}
