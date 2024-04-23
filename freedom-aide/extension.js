const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('creat-miniapp-template.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from  创建小程序模板!');
	});
	context.subscriptions.push(disposable);

	let creatMiniTemplate = vscode.commands.registerCommand('extension.createMiniappTemplate', async (resource) => {
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
	});
	context.subscriptions.push(creatMiniTemplate);

}


function deactivate() { }

module.exports = {
	activate,
	deactivate
}
