// @ts-nocheck
const vscode = require('vscode');
const prettier = require("prettier");
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
const createdWxPageJs = require('./template/wxjs-container')
const createdWxModuleJs = require('./template/wxjs-module')
/**
 * @param {vscode.ExtensionContext} context
 */
const languageConfiguration = {
  wordPattern: /(\w+((-\w+)+)?)/
};

function activate(context) {
  registerCommand(context, 'extension.compileOff', () => {
    let config = vscode.workspace.getConfiguration("freedomAide");
    config.update("vue-format-save-code", true);
    config.update("wxml-format-save-code", true);
  });
  registerCommand(context, 'extension.compileOn', () => {
    let config = vscode.workspace.getConfiguration("freedomAide");
    config.update("vue-format-save-code", false);
    config.update("wxml-format-save-code", false);
  });
  registerCommand(context, 'extension.formatvue', () => {
    let config = vscode.workspace.getConfiguration("freedomAide");
    let options = {
      arrowParens: config.get("vue-arrowParens"),
      bracketSpacing: config.get("vue-bracketSpacing"),
      endOfLine: config.get("vue-endOfLine"),
      htmlWhitespaceSensitivity: config.get("vue-htmlWhitespaceSensitivity"),
      insertPragma: config.get("vue-insertPragma"),
      jsxBracketSameLine: config.get("jsx-jsxBracketSameLine"),
      jsxSingleQuote: config.get("jsx-jsxSingleQuote"),
      printWidth: config.get("vue-printWidth"),
      proseWrap: config.get("markdown-proseWrap"),
      quoteProps: config.get("vue-quoteProps"),
      requirePragma: config.get("vue-requirePragma"),
      semi: config.get("vue-semi"),
      singleQuote: config.get("vue-singleQuote"),
      tabWidth: config.get("vue-tabWidth"),
      trailingComma: config.get("vue-trailingComma"),
      useTabs: config.get("vue-useTabs"),
      vueIndentScriptAndStyle: config.get("vue-vueIndentScriptAndStyle"),
    }

    const editor = vscode.window.activeTextEditor;
    const filepath = editor.document.uri.fsPath;
    if (!editor) throw new Error('no active editor');
    const doc = editor.document;
    const lineCount = doc.lineCount;
    const text = doc.getText();
    const start = new vscode.Position(0, 0);
    const end = new vscode.Position(lineCount + 1, 0);
    const range = new vscode.Range(start, end);
    let prettierText = prettier.format(text, { ...options, filepath });

    // 追加规则：‘calc'与第一个';'之间所有的+、-、*、/、%符号两边都加上空格
    prettierText = prettierText.replace(/calc\(([^;]+)\)/g, (match, p1) => {
      return `calc(${p1.replace(/([+\-*/])/g, ' $1 ').replace(/\s+/g, ' ')})`;
    });

    editor.edit((editBuilder, error) => {
      error && window.showErrorMessage(error);
      editBuilder.replace(range, prettierText);
    });
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
    const supportedLanguages = configParams.get('vue-supportedLanguages');
    const targetFileExtensions = configParams.get('vue-targetFileExtensions');
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
    try {
      // 检查文件夹是否存在
      await vscode.workspace.fs.stat(componentFolderUri);
      // 如果没有抛出错误，表示文件存在，显示警告消息
      const result = await vscode.window.showWarningMessage(`文件夹"${componentName}" 已存在，无法创建！`);
      return;
    } catch (error) {
      if (error.code !== 'FileNotFound') {
        // 如果错误不是文件未找到，抛出错误
        vscode.window.showErrorMessage(`检查文件夹是否存在时出错: ${error.message}`);
        return;
      }
      // 创建文件夹
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
          const initialJsContent = createdWxModuleJs.moduleFile;
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
    }
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

    // 创建页面文件夹
    const folderUri = vscode.Uri.file(resource.fsPath);
    const pageFolderUri = vscode.Uri.joinPath(folderUri, pageName);
    try {
      // 检查文件夹是否存在
      await vscode.workspace.fs.stat(pageFolderUri);
      // 如果没有抛出错误，表示文件存在，显示警告消息
      const result = await vscode.window.showWarningMessage(`文件夹"${pageName}" 已存在，无法创建！`);
      return;
    } catch (error) {
      if (error.code !== 'FileNotFound') {
        // 如果错误不是文件未找到，抛出错误
        vscode.window.showErrorMessage(`检查文件夹是否存在时出错: ${error.message}`);
        return;
      }
      // 创建文件夹
      await vscode.workspace.fs.createDirectory(pageFolderUri);
      // 创建页面文件
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
          const initialJsContent = createdWxPageJs.containerFile;
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
      let path_parts = relativePath.split("pages/")
      let before_pages = ''
      if (path_parts.length > 1) {
        before_pages = path_parts[0].replace(/\/$/, "")
      }
      let after_pages = "pages/" + path_parts[1] + "/index"

      // 假设您只有一个工作区文件夹，您可以根据自己的需求进行适当的更改
      const workspaceFolderUri = workspaceFolders[0].uri;
      // 读取 app.json 文件内容
      const appJsonUri = vscode.Uri.joinPath(workspaceFolderUri, 'app.json');
      const appJsonContent = await vscode.workspace.fs.readFile(appJsonUri);
      console.log(appJsonContent.toString());
      // 解析 app.json 文件内容
      const appJson = JSON.parse(appJsonContent.toString());

      // 添加到 pages 数组中
      if (before_pages === '') {
        if (!appJson.pages.includes(after_pages)) {
          appJson.pages.push(after_pages);
        }
      }

      // 遍历 subPackages
      if (appJson.subPackages) {
        appJson.subPackages.forEach(subPackage => {
          if (subPackage.root === before_pages && !subPackage.pages.includes(after_pages)) {
            subPackage.pages.push(after_pages);
          } else {
            vscode.window.showInformationMessage(`app.json 中分包${before_pages}已存在页面路径"${after_pages}"`);
          }

        });
      }
      // 将更新后的 app.json 内容写入文件
      await vscode.workspace.fs.writeFile(appJsonUri, Buffer.from(JSON.stringify(appJson, null, 2)));
      vscode.window.showInformationMessage(`路径"${after_pages}" 已添加到 app.json 中`);
    }
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

    try {
      // 检查文件是否存在
      await vscode.workspace.fs.stat(componentFolderUri);
      // 如果没有抛出错误，表示文件存在，显示警告消息
      const result = await vscode.window.showWarningMessage(`文件夹"${toolsName}" 已存在，无法创建！`);
      return;
    } catch (error) {
      if (error.code !== 'FileNotFound') {
        // 如果错误不是文件未找到，抛出错误
        vscode.window.showErrorMessage(`检查文件夹是否存在时出错: ${error.message}`);
        return;
      }
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
    }
  })
  registerCommand(context, 'extension.createdVue2', async (resource) => {
    let vue2ModuleName = await vscode.window.showInputBox({
      prompt: '请输入vue2文件模板名称',
      placeHolder: '请输入vue2文件模板名称',
    });

    if (!vue2ModuleName) {
      vscode.window.showErrorMessage('vue2文件模板名称不能为空,已设置为默认值vue2_module.vue!');
      vue2ModuleName = 'vue2_module';
    }
    // 创建vue2文件模板并写入初始内容
    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileFolderUri = vscode.Uri.joinPath(folderUri, vue2ModuleName + '.vue');
    const initialContent = createdVue2.componentFile;
    try {
      // 检查文件是否存在
      await vscode.workspace.fs.stat(fileFolderUri);
      // 如果没有抛出错误，表示文件存在，显示警告消息
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(`文件"${vue2ModuleName}.vue" 已存在，是否覆盖？`, overwrite, cancel);

      if (result === overwrite) {
        // 如果用户选择覆盖，继续创建文件
        await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
        vscode.window.showInformationMessage('vue2文件模板创建成功！');
      } else {
        // 用户取消操作
        vscode.window.showInformationMessage('取消创建操作.');
      }
    } catch (error) {
      await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
      vscode.window.showInformationMessage('vue2文件模板创建成功！');
    }
    // 打开文件
    const document = await vscode.workspace.openTextDocument(fileFolderUri);
    await vscode.window.showTextDocument(document);
  })
  registerCommand(context, 'extension.createdVue3', async (resource) => {
    let vue3ModuleName = await vscode.window.showInputBox({
      prompt: '请输入vue3文件模板名称',
      placeHolder: '请输入vue3文件模板名称',
    });

    if (!vue3ModuleName) {
      vscode.window.showErrorMessage('vue3文件模板名称不能为空,已设置为默认值vue3_module.vue!');
      vue3ModuleName = 'vue3_module';
    }
    // 创建vue3文件模板并写入初始内容
    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileFolderUri = vscode.Uri.joinPath(folderUri, vue3ModuleName + '.vue');
    const initialContent = createdVue3.componentFile;
    try {
      // 检查文件是否存在
      await vscode.workspace.fs.stat(fileFolderUri);
      // 如果没有抛出错误，表示文件存在，显示警告消息
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(`文件"${vue3ModuleName}.vue" 已存在，是否覆盖？`, overwrite, cancel);

      if (result === overwrite) {
        // 如果用户选择覆盖，继续创建文件
        await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
        vscode.window.showInformationMessage('vue3文件模板创建成功！');
      } else {
        // 用户取消操作
        vscode.window.showInformationMessage('取消创建操作.');
      }
    } catch (error) {
      await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
      vscode.window.showInformationMessage('vue3文件模板创建成功！');
    }
    // 打开文件
    const document = await vscode.workspace.openTextDocument(fileFolderUri);
    await vscode.window.showTextDocument(document);
  })
  registerCommand(context, 'extension.createdHtml', async (resource) => {
    let htmlModuleName = await vscode.window.showInputBox({
      prompt: '请输入html文件模板名称',
      placeHolder: '请输入html文件模板名称',
    });

    if (!htmlModuleName) {
      vscode.window.showErrorMessage('html文件模板名称不能为空,已设置为默认值page.html!');
      htmlModuleName = 'page';
    }
    // 创建html文件模板并写入初始内容
    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileFolderUri = vscode.Uri.joinPath(folderUri, htmlModuleName + '.html');
    const initialContent = createdHtml.containerFile;
    try {
      // 检查文件是否存在
      await vscode.workspace.fs.stat(fileFolderUri);
      // 如果没有抛出错误，表示文件存在，显示警告消息
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(`文件"${htmlModuleName}.vue" 已存在，是否覆盖？`, overwrite, cancel);

      if (result === overwrite) {
        // 如果用户选择覆盖，继续创建文件
        await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
        vscode.window.showInformationMessage('html文件模板创建成功！');
      } else {
        // 用户取消操作
        vscode.window.showInformationMessage('取消创建操作.');
      }
    } catch (error) {
      await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
      vscode.window.showInformationMessage('html文件模板创建成功！');
    }
    // 打开文件
    const document = await vscode.workspace.openTextDocument(fileFolderUri);
    await vscode.window.showTextDocument(document);
  })
  registerCommand(context, 'extension.createdPinia', async (resource) => {
    let piniaModuleName = await vscode.window.showInputBox({
      prompt: '请输入pinia文件模板名称',
      placeHolder: '请输入pinia文件模板名称',
    });

    if (!piniaModuleName) {
      vscode.window.showErrorMessage('pinia文件模板名称不能为空,已设置为默认值pinia_module.js!');
      piniaModuleName = 'pinia_module';
    }
    // 创建pinia文件模板并写入初始内容
    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileFolderUri = vscode.Uri.joinPath(folderUri, piniaModuleName + '.js');
    const initialContent = createdPinia.moduleFile;
    try {
      // 检查文件是否存在
      await vscode.workspace.fs.stat(fileFolderUri);
      // 如果没有抛出错误，表示文件存在，显示警告消息
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(`文件"${piniaModuleName}.vue" 已存在，是否覆盖？`, overwrite, cancel);

      if (result === overwrite) {
        // 如果用户选择覆盖，继续创建文件
        await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
        vscode.window.showInformationMessage('pinia文件模板创建成功！');
      } else {
        // 用户取消操作
        vscode.window.showInformationMessage('取消创建操作.');
      }
    } catch (error) {
      await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
      vscode.window.showInformationMessage('pinia文件模板创建成功！');
    }
    // 打开文件
    const document = await vscode.workspace.openTextDocument(fileFolderUri);
    await vscode.window.showTextDocument(document);
  })
  registerCommand(context, 'extension.createdVuex', async (resource) => {
    let vuexModuleName = await vscode.window.showInputBox({
      prompt: '请输入vuex文件模板名称',
      placeHolder: '请输入vuex文件模板名称',
    });

    if (!vuexModuleName) {
      vscode.window.showErrorMessage('vuex文件模板名称不能为空,已设置为默认值vuex_module.js!');
      vuexModuleName = 'vuex_module';
    }
    // 创建vuex文件模板并写入初始内容
    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileFolderUri = vscode.Uri.joinPath(folderUri, vuexModuleName + '.js');
    const initialContent = createdVuex.moduleFile;
    try {
      // 检查文件是否存在
      await vscode.workspace.fs.stat(fileFolderUri);
      // 如果没有抛出错误，表示文件存在，显示警告消息
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(`文件"${vuexModuleName}.vue" 已存在，是否覆盖？`, overwrite, cancel);

      if (result === overwrite) {
        // 如果用户选择覆盖，继续创建文件
        await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
        vscode.window.showInformationMessage('vuex文件模板创建成功！');
      } else {
        // 用户取消操作
        vscode.window.showInformationMessage('取消创建操作.');
      }
    } catch (error) {
      await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
      vscode.window.showInformationMessage('vuex文件模板创建成功！');
    }
    // 打开文件
    const document = await vscode.workspace.openTextDocument(fileFolderUri);
    await vscode.window.showTextDocument(document);
  })
  registerCommand(context, 'extension.createdService', async (resource) => {
    let serviceModuleName = await vscode.window.showInputBox({
      prompt: '请输入service文件模板名称',
      placeHolder: '请输入service文件模板名称',
    });

    if (!serviceModuleName) {
      vscode.window.showErrorMessage('service文件模板名称不能为空,已设置为默认值service_module.js!');
      serviceModuleName = 'service_module';
    }
    // 创建service文件模板并写入初始内容
    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileFolderUri = vscode.Uri.joinPath(folderUri, serviceModuleName + '.js');
    const initialContent = createdService.serviceFile;
    try {
      // 检查文件是否存在
      await vscode.workspace.fs.stat(fileFolderUri);
      // 如果没有抛出错误，表示文件存在，显示警告消息
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(`文件"${serviceModuleName}.vue" 已存在，是否覆盖？`, overwrite, cancel);

      if (result === overwrite) {
        // 如果用户选择覆盖，继续创建文件
        await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
        vscode.window.showInformationMessage('service文件模板创建成功！');
      } else {
        // 用户取消操作
        vscode.window.showInformationMessage('取消创建操作.');
      }
    } catch (error) {
      await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
      vscode.window.showInformationMessage('service文件模板创建成功！');
    }
    // 打开文件
    const document = await vscode.workspace.openTextDocument(fileFolderUri);
    await vscode.window.showTextDocument(document);
  })

  // 在 activate 函数中调用注册的命令函数，以使其在扩展被激活时立即生效
  vscode.commands.executeCommand('extension.getSetting');
  vscode.commands.executeCommand('extension.vuePeek');
  vscode.commands.executeCommand('extension.jumpDefinitionWxml');
  vscode.commands.executeCommand('extension.jumpDefinitionJson');
  vscode.commands.executeCommand('extension.jumpDefinitionWxmlItem');

  // 监听文件保存事件
  vscode.workspace.onWillSaveTextDocument((document) => {
    let config = vscode.workspace.getConfiguration("freedomAide");
    let isEnableOnDidSaveVue = config.get("vue-format-save-code");
    if (!isEnableOnDidSaveVue) { return };
    let isEnableOnDidSaveWxml = config.get("wxml-format-save-code");
    if (!isEnableOnDidSaveWxml) { return };
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor && activeTextEditor.document.languageId === 'vue') {
      vscode.commands.executeCommand("extension.formatvue");
    }
    if (activeTextEditor && activeTextEditor.document.languageId === 'wxml') {
      vscode.commands.executeCommand("extension.formatwxml");
    }
  });
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