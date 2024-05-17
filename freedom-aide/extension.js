const vscode = require('vscode');
const wxml_format = require("./wxml_plus/FormatWxml");
const light_activeText = require("./wxml_plus/ActiveText");
const saveFormat_1 = require("./wxml_plus/saveFormat");
const config_1 = require("./wxml_plus/config");
const PeekFileDefinitionProvider_1 = require("./vue_plus/PeekFileDefinitionProvider");
const wxmlCompletionItemProvider = require('./util/wxmlCompletionItemProvider')
const wxmlDefinitionProvider = require('./util/wxmlDefinitionProvider')
const jsonDefinitionProvider = require('./util/jsonDefinitionProvider')
const documentSelector = [
	{ scheme: 'file', language: 'wxml', pattern: '**/*.wxml' },
]
const documentSelectorJson = [
	{ scheme: 'file', language: 'json', pattern: '**/*.json' },
]
const createdPloyfill = require('./template/tools/ployfill')
const createdUtils = require('./template/tools/utils')
const createdVue2 = require('./template/vue2-component')
const createdVue3 = require('./template/vue3-component')
const createdPinia = require('./template/pinia-module')
const createdVuex = require('./template/vuex-module')
const createdHtml = require('./template/html-container')
const createdService = require('./template/service-module')
/**
 * @param {vscode.ExtensionContext} context
 */
const languageConfiguration = {
	wordPattern: /(\w+((-\w+)+)?)/
};

function activate(context) {
	registerCommand(context, 'extension.createMiniappModule', async (resource) => {
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
	registerCommand(context, 'extension.createMiniappPage', async (resource) => {
		const pageName = await vscode.window.showInputBox({
			prompt: '请输入页面名称',
			placeHolder: '请输入页面名称',
		});

		if (!pageName) {
			vscode.window.showErrorMessage('页面名称不能为空！');
			return;
		}

		// 创建组件文件夹
		const folderUri = vscode.Uri.file(resource.fsPath);
		const pageFolderUri = vscode.Uri.joinPath(folderUri, pageName);
		await vscode.workspace.fs.createDirectory(pageFolderUri);

		// 创建组件文件
		const filesToCreate = ['index.wxml', 'index.scss', 'index.json', 'index.js'];
		for (const fileName of filesToCreate) {
			if (fileName === 'index.json') {
				// 创建 index.json 文件并写入初始内容
				const initialContent = {
					navigationBarTitleText: "",
					usingComponents: {},
					// 在这里添加你想要的其他初始内容
				};
				const jsonContent = JSON.stringify(initialContent, null, 4);
				await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(pageFolderUri, fileName), Buffer.from(jsonContent, 'utf8'));
			} else if (fileName === 'index.js') {
				// 创建 index.js 文件并写入初始内容
				const initialJsContent = `
				const options = {
					data: {

					},
					onLoad(options) {
				
					},
					onReady() {
				
					},
					onShow() {
				
					},
					onHide() {
				
					},
					onUnload() {
				
					},
					onShareAppMessage() {
						return {
							title: '',
						};
					},
				}
				
				Page(options)				
				`.replace(/^\s+/gm, '');
				await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(pageFolderUri, fileName), Buffer.from(initialJsContent, 'utf8'));
			} else if (fileName === 'index.wxml') {
				// 创建 index.js 文件并写入初始内容
				const initialJsContent = `
				<view>
						<!-- ${pageName}页面 -->
				</view>
				`.replace(/^\s+/gm, '');
				await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(pageFolderUri, fileName), Buffer.from(initialJsContent, 'utf8'));
			} else {
				// 对于其他文件，创建空文件
				await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(pageFolderUri, fileName), new Uint8Array());
			}
		}
		vscode.window.showInformationMessage('小程序页面模板创建成功！');

		// 添加页面到 app.json

		// 获取当前工作区文件夹
		const workspaceFolders = vscode.workspace.workspaceFolders;
		let relativePath = vscode.workspace.asRelativePath(pageFolderUri);
		// 找到 pages 文件夹在相对路径中的位置
		const pagesIndex = relativePath.indexOf('pages');
		if (pagesIndex !== -1) {
			// 截取 pages 文件夹后面的部分作为相对路径
			relativePath = relativePath.slice(pagesIndex);
		}
		// 假设您只有一个工作区文件夹，您可以根据自己的需求进行适当的更改
		const workspaceFolderUri = workspaceFolders[0].uri;

		// 创建页面文件夹的 URI
		const pagePath = `${relativePath}/index`;

		// 读取 app.json 文件内容
		const appJsonUri = vscode.Uri.joinPath(workspaceFolderUri, 'app.json');
		const appJsonContent = await vscode.workspace.fs.readFile(appJsonUri);

		// 解析 app.json 文件内容
		const appJson = JSON.parse(appJsonContent.toString());

		// 如果 app.json 中已存在相同路径，则不重复添加
		if (!appJson.pages.includes(pagePath)) {
			// 将页面路径添加到 app.json 中的 pages 字段
			appJson.pages.push(pagePath);

			// 将更新后的 app.json 内容写入文件
			await vscode.workspace.fs.writeFile(appJsonUri, Buffer.from(JSON.stringify(appJson, null, 2)));
			vscode.window.showInformationMessage(`路径"${pagePath}" 已添加到 app.json 中`);
		} else {
			vscode.window.showInformationMessage(`app.json 中已存在页面路径"${pagePath}"`);
		}

	})

	registerCommand(context, 'extension.formatwxml', () => {
		const wxml = new wxml_format.default();
		wxml.init();
	})
	registerCommand(context, 'extension.getSetting', () => {
		const wxml = new wxml_format.default();
		config_1.getConfig();
		const activeText = new light_activeText.default(config_1.config);
		config_1.configActivate(activeText, () => {
			saveFormat_1.default(wxml);
		});
	})
	registerCommand(context, 'extension.vuePeek', () => {
		const configParams = vscode.workspace.getConfiguration('freedomAide');
		const supportedLanguages = configParams.get('supportedLanguages');
		const targetFileExtensions = configParams.get('targetFileExtensions');
		context.subscriptions.push(vscode.languages.registerDefinitionProvider(supportedLanguages, new PeekFileDefinitionProvider_1.default(targetFileExtensions)));
		/* Provides way to get selected text even if there is dash
		 * ( must have fot retrieving component name )
		 */
		context.subscriptions.push(vscode.languages.setLanguageConfiguration('vue', languageConfiguration));
	})
	registerCommand(context, 'extension.jumpDefinitionWxml', () => {
		// 注册跳转到定义
		context.subscriptions.push(
			vscode.languages.registerDefinitionProvider(
				documentSelector,
				wxmlDefinitionProvider,
			))
	})
	registerCommand(context, 'extension.jumpDefinitionJson', () => {
		// 注册json跳转到定义
		context.subscriptions.push(
			vscode.languages.registerDefinitionProvider(
				documentSelectorJson,
				jsonDefinitionProvider,
			))
	})
	registerCommand(context, 'extension.jumpDefinitionWxmlItem', () => {
		// 注册自动补全提示，只有当按下空格时才触发
		context.subscriptions.push(
			vscode.languages.registerCompletionItemProvider(
				documentSelector,
				wxmlCompletionItemProvider,
				...[' '],
			))
	})
	registerCommand(context, 'extension.createdTools', async (resource) => {
		let toolsName = await vscode.window.showInputBox({
			prompt: '请输入工具文件夹名称',
			placeHolder: '请输入工具文件夹名称',
		});

		if (!toolsName) {
			vscode.window.showErrorMessage('工具文件夹名称不能为空,已设置为默认值tools!');
			toolsName = 'tools';
		}

		// 创建工具文件夹
		const folderUri = vscode.Uri.file(resource.fsPath);
		const componentFolderUri = vscode.Uri.joinPath(folderUri, toolsName);
		await vscode.workspace.fs.createDirectory(componentFolderUri);

		// 创建工具文件
		const filesToCreate = ['ployfill.js', 'utils.js'];
		for (const fileName of filesToCreate) {
			if (fileName === 'ployfill.js') {
				// 创建 ployfill.js 文件并写入初始内容
				const initialContent = createdPloyfill.contentFile;
				await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), Buffer.from(initialContent, 'utf8'));
			} else if (fileName === 'utils.js') {
				// 创建 utils.js 文件并写入初始内容
				const initialContent = createdUtils.contentFile;
				await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), Buffer.from(initialContent, 'utf8'));
			} else {
				// 对于其他文件，创建空文件
				await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), new Uint8Array());
			}
		}
		vscode.window.showInformationMessage('工具文件模板创建成功！');
	})
	registerCommand(context, 'extension.createdVue2', async (resource) => {
		let vue2ModuleName = await vscode.window.showInputBox({
			prompt: '请输入vue2文件模板名称',
			placeHolder: '请输入vue2文件模板名称',
		});

		if (!vue2ModuleName) {
			vscode.window.showErrorMessage('vue2文件模板名称不能为空,已设置为默认值vue2_module.vue!');
			vue2ModuleName = 'vue2_module.vue';
		}
		// 创建vue2文件模板并写入初始内容
		const folderUri = vscode.Uri.file(resource.fsPath);
		const fileFolderUri = vscode.Uri.joinPath(folderUri, vue2ModuleName);
		const initialContent = createdVue2.componentFile;
		await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
		vscode.window.showInformationMessage('vue2文件模板创建成功！');
	})
	registerCommand(context, 'extension.createdVue3', async (resource) => {
		let vue3ModuleName = await vscode.window.showInputBox({
			prompt: '请输入vue3文件模板名称',
			placeHolder: '请输入vue3文件模板名称',
		});

		if (!vue3ModuleName) {
			vscode.window.showErrorMessage('vue3文件模板名称不能为空,已设置为默认值vue3_module.vue!');
			vue3ModuleName = 'vue3_module.vue';
		}
		// 创建vue3文件模板并写入初始内容
		const folderUri = vscode.Uri.file(resource.fsPath);
		const fileFolderUri = vscode.Uri.joinPath(folderUri, vue3ModuleName);
		const initialContent = createdVue3.componentFile;
		await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
		vscode.window.showInformationMessage('vue3文件模板创建成功！');
	})
	registerCommand(context, 'extension.createdHtml', async (resource) => {
		let htmlModuleName = await vscode.window.showInputBox({
			prompt: '请输入html文件模板名称',
			placeHolder: '请输入html文件模板名称',
		});

		if (!htmlModuleName) {
			vscode.window.showErrorMessage('html文件模板名称不能为空,已设置为默认值page.html!');
			htmlModuleName = 'page.html';
		}
		// 创建html文件模板并写入初始内容
		const folderUri = vscode.Uri.file(resource.fsPath);
		const fileFolderUri = vscode.Uri.joinPath(folderUri, htmlModuleName);
		const initialContent = createdHtml.containerFile;
		await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
		vscode.window.showInformationMessage('html文件模板创建成功！');
	})
	registerCommand(context, 'extension.createdPinia', async (resource) => {
		let piniaModuleName = await vscode.window.showInputBox({
			prompt: '请输入pinia文件模板名称',
			placeHolder: '请输入pinia文件模板名称',
		});

		if (!piniaModuleName) {
			vscode.window.showErrorMessage('pinia文件模板名称不能为空,已设置为默认值pinia_module.js!');
			piniaModuleName = 'pinia_module.js';
		}
		// 创建pinia文件模板并写入初始内容
		const folderUri = vscode.Uri.file(resource.fsPath);
		const fileFolderUri = vscode.Uri.joinPath(folderUri, piniaModuleName);
		const initialContent = createdPinia.moduleFile;
		await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
		vscode.window.showInformationMessage('pinia文件模板创建成功！');
	})
	registerCommand(context, 'extension.createdVuex', async (resource) => {
		let vuexModuleName = await vscode.window.showInputBox({
			prompt: '请输入vuex文件模板名称',
			placeHolder: '请输入vuex文件模板名称',
		});

		if (!vuexModuleName) {
			vscode.window.showErrorMessage('vuex文件模板名称不能为空,已设置为默认值vuex_module.js!');
			vuexModuleName = 'vuex_module.js';
		}
		// 创建vuex文件模板并写入初始内容
		const folderUri = vscode.Uri.file(resource.fsPath);
		const fileFolderUri = vscode.Uri.joinPath(folderUri, vuexModuleName);
		const initialContent = createdVuex.moduleFile;
		await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
		vscode.window.showInformationMessage('vuex文件模板创建成功！');
	})
	registerCommand(context, 'extension.createdService', async (resource) => {
		let serviceModuleName = await vscode.window.showInputBox({
			prompt: '请输入service文件模板名称',
			placeHolder: '请输入service文件模板名称',
		});

		if (!serviceModuleName) {
			vscode.window.showErrorMessage('service文件模板名称不能为空,已设置为默认值service_module.js!');
			serviceModuleName = 'service_module.js';
		}
		// 创建service文件模板并写入初始内容
		const folderUri = vscode.Uri.file(resource.fsPath);
		const fileFolderUri = vscode.Uri.joinPath(folderUri, serviceModuleName);
		const initialContent = createdService.serviceFile;
		await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
		vscode.window.showInformationMessage('service文件模板创建成功！');
	})

	// 在 activate 函数中调用注册的命令函数，以使其在扩展被激活时立即生效
	vscode.commands.executeCommand('extension.getSetting');
	vscode.commands.executeCommand('extension.vuePeek');
	vscode.commands.executeCommand('extension.jumpDefinitionWxml');
	vscode.commands.executeCommand('extension.jumpDefinitionJson');
	vscode.commands.executeCommand('extension.jumpDefinitionWxmlItem');
}

function deactivate() {
	config_1.configDeactivate();
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
