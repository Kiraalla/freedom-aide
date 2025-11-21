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
const format_core = require('./wxml_plus/format_core')

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

const languageConfiguration = {
  wordPattern: /(\w+((-\w+)+)?)/
};
// 多语言属性自动补全提供器
function setupAutoQuote(context) {
    let isProcessing = false;
    
    vscode.workspace.onDidChangeTextDocument((event) => {
        if (isProcessing) return;
        
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        
        // 只处理支持的文档类型
        const supportedLanguages = ['wxml', 'html', 'vue'];
        if (!supportedLanguages.includes(event.document.languageId)) return;
        
        // 检查是否输入了等号
        for (const change of event.contentChanges) {
            if (change.text === '=' && change.rangeLength === 0) {
                isProcessing = true;
                
                setTimeout(() => {
                    const document = editor.document;
                    const position = editor.selection.active;
                    const line = document.lineAt(position.line);
                    const lineText = line.text;
                    
                    // 找到等号的位置
                    const equalIndex = position.character - 1;
                    
                    // 替换等号为 =""
                    const newLineText = 
                        lineText.substring(0, equalIndex) + 
                        '=""' + 
                        lineText.substring(equalIndex + 1);
                    
                    editor.edit(edit => {
                        // 替换整行文本
                        const lineRange = new vscode.Range(
                            line.lineNumber, 0,
                            line.lineNumber, line.text.length
                        );
                        edit.replace(lineRange, newLineText);
                    }).then(success => {
                        if (success) {
                            // 移动光标到引号中间
                            const newPos = new vscode.Position(
                                position.line, 
                                equalIndex + 2 // ="|"
                            );
                            editor.selection = new vscode.Selection(newPos, newPos);
                        }
                        isProcessing = false;
                    }).catch(err => {
                        console.error('自动补全失败:', err);
                        isProcessing = false;
                    });
                }, 10);
                
                break;
            }
        }
    });
}
// 创建文档格式化器
class FreedomDocumentFormattingEditProvider {
  provideDocumentFormattingEdits(document, options, token) {
    const languageId = document.languageId;

    // 只处理 WXML 和 Vue 文件
    if (languageId !== 'wxml' && languageId !== 'vue') {
      return;
    }

    try {
      const text = document.getText();
      let formattedText;

      if (languageId === 'vue') {
        formattedText = format_core.unifiedFormat(text, 'vue');
      } else if (languageId === 'wxml') {
        formattedText = format_core.unifiedFormat(text, 'wxml');
      }

      // 返回格式化后的文本编辑
      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );

      return [vscode.TextEdit.replace(fullRange, formattedText)];
    } catch (error) {
      vscode.window.showErrorMessage(`${languageId} 格式化失败: ${error.message}`);
      return [];
    }
  }
}

/**
 * 激活扩展
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('=== 自由助手扩展已激活 ===');

  // 创建输出通道用于调试
  const outputChannel = vscode.window.createOutputChannel('自由助手');
  context.subscriptions.push(outputChannel);
  outputChannel.appendLine('扩展已激活');
  // 注册多语言属性自动补全
  setupAutoQuote(context);

  // 注册文档格式化器 - 这是解决格式化问题的关键
  const formattingProvider = new FreedomDocumentFormattingEditProvider();

  // 为 WXML 注册格式化器
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(
      { language: 'wxml' },
      formattingProvider
    )
  );

  // 为 Vue 注册格式化器
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(
      { language: 'vue' },
      formattingProvider
    )
  );

  // 注册范围格式化器（可选）
  context.subscriptions.push(
    vscode.languages.registerDocumentRangeFormattingEditProvider(
      { language: 'wxml' },
      formattingProvider
    )
  );

  context.subscriptions.push(
    vscode.languages.registerDocumentRangeFormattingEditProvider(
      { language: 'vue' },
      formattingProvider
    )
  );

  // 注册命令：切换格式化开关
  registerCommand(context, 'extension.compileOff', () => {
    let config = vscode.workspace.getConfiguration("freedomHelper");
    config.update("vue-format-save-code", true);
    config.update("wxml-format-save-code", true);
    outputChannel.appendLine('格式化开关已开启');
  });

  registerCommand(context, 'extension.compileOn', () => {
    let config = vscode.workspace.getConfiguration("freedomHelper");
    config.update("vue-format-save-code", false);
    config.update("wxml-format-save-code", false);
    outputChannel.appendLine('格式化开关已关闭');
  });

  // 格式化统一命令 - 使用内置格式化命令
  registerCommand(context, 'extension.formatUnified', async () => {
    outputChannel.appendLine('=== 统一格式化命令被触发 ===');

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('没有活动的编辑器');
      return;
    }

    const languageId = editor.document.languageId;
    outputChannel.appendLine(`格式化语言: ${languageId}`);

    try {
      if (languageId === 'vue' || languageId === 'wxml') {
        // 使用 VS Code 内置的格式化命令，这会触发我们注册的文档格式化器
        await vscode.commands.executeCommand('editor.action.formatDocument');
        vscode.window.showInformationMessage(`${languageId} 文件格式化完成`);
      } else {
        vscode.window.showWarningMessage(`不支持 ${languageId} 文件的格式化`);
      }
    } catch (error) {
      vscode.window.showErrorMessage(`格式化失败: ${error.message}`);
      outputChannel.appendLine(`格式化错误: ${error.message}`);
    }
  });

  // Vue 格式化命令 - 返回 Promise
  registerCommand(context, 'extension.formatvue', () => {
    outputChannel.appendLine('=== Vue 格式化命令被触发 ===');
    return new Promise((resolve, reject) => {
      const editor = vscode.window.activeTextEditor;

      if (!editor || !editor.document.fileName.endsWith('.vue')) {
        vscode.window.showErrorMessage('没有活动的 Vue 编辑器');
        reject(new Error('没有活动的 Vue 编辑器'));
        return;
      }

      const doc = editor.document;
      const text = doc.getText();
      const range = new vscode.Range(
        new vscode.Position(0, 0),
        new vscode.Position(doc.lineCount, 0)
      );

      try {
        const formattedText = format_core.unifiedFormat(text, 'vue');

        editor.edit(editBuilder => {
          editBuilder.replace(range, formattedText);
        }).then(success => {
          if (success) {
            vscode.window.showInformationMessage('Vue 文件格式化完成');
            resolve();
          } else {
            vscode.window.showErrorMessage('Vue 文件格式化失败');
            reject(new Error('Vue 文件格式化失败'));
          }
        }).catch(error => {
          reject(error);
        });

      } catch (error) {
        vscode.window.showErrorMessage(`Vue 格式化失败: ${error.message}`);
        reject(error);
      }
    });
  });

  // WXML 格式化命令 - 返回 Promise  
  registerCommand(context, 'extension.formatwxml', () => {
    outputChannel.appendLine('=== WXML 格式化命令被触发 ===');
    return new Promise((resolve, reject) => {
      try {
        const wxml = new wxml_format.default();
        wxml.init();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });

  // 保存时自动格式化（根据配置）
  context.subscriptions.push(vscode.workspace.onWillSaveTextDocument(event => {
    try {
      const cfg = vscode.workspace.getConfiguration('freedomHelper');
      const doc = event.document;

      outputChannel.appendLine(`保存时格式化检查: ${doc.languageId}`);

      if ((doc.languageId === 'vue' && cfg.get('vue-format-save-code')) ||
        (doc.languageId === 'wxml' && cfg.get('wxml-format-save-code'))) {
        outputChannel.appendLine(`触发保存时格式化: ${doc.languageId}`);
        event.waitUntil(vscode.commands.executeCommand('editor.action.formatDocument'));
      }
    }
    catch (e) {
      // 忽略保存时格式化的错误，避免阻塞保存流程
      console.warn('保存时格式化错误:', e);
      outputChannel.appendLine(`保存时格式化错误: ${e.message}`);
    }
  }));

  // 获取设置命令
  registerCommand(context, 'extension.getSetting', () => {
    const wxml = new wxml_format.default();
    config_1.getConfig();
    const activeText = new light_activeText.default(config_1.config);
    config_1.configActivate(activeText, () => {
      saveFormat_1.default(wxml);
    });
    outputChannel.appendLine('设置已获取');
  });

  registerCommand(context, 'extension.vuePeek', () => {
    const configParams = vscode.workspace.getConfiguration('freedomHelper');
    const supportedLanguages = configParams.get('vue-supportedLanguages');
    const targetFileExtensions = configParams.get('vue-targetFileExtensions');
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(supportedLanguages, new PeekFileDefinitionProvider_1.default(targetFileExtensions)));
    context.subscriptions.push(vscode.languages.setLanguageConfiguration('vue', languageConfiguration));
  });

  // WXML 定义跳转
  registerCommand(context, 'extension.jumpDefinitionWxml', () => {
    context.subscriptions.push(
      vscode.languages.registerDefinitionProvider(
        documentSelector,
        wxmlDefinitionProvider,
      ));
  });

  // JSON 定义跳转
  registerCommand(context, 'extension.jumpDefinitionJson', () => {
    context.subscriptions.push(
      vscode.languages.registerDefinitionProvider(
        documentSelectorJson,
        jsonDefinitionProvider,
      ));
  });

  // WXML 自动补全
  registerCommand(context, 'extension.jumpDefinitionWxmlItem', () => {
    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        documentSelector,
        wxmlCompletionItemProvider,
        ...[' '],
      ));
  });

  // 创建小程序组件
  registerCommand(context, 'extension.createMiniappModule', async (resource) => {
    const componentName = await vscode.window.showInputBox({
      prompt: '请输入组件名称',
      placeHolder: '请输入组件名称',
    });

    if (!componentName) {
      vscode.window.showErrorMessage('组件名称不能为空！');
      return;
    }

    const folderUri = vscode.Uri.file(resource.fsPath);
    const componentFolderUri = vscode.Uri.joinPath(folderUri, componentName);

    try {
      await vscode.workspace.fs.stat(componentFolderUri);
      const result = await vscode.window.showWarningMessage(`文件夹"${componentName}" 已存在，无法创建！`);
      return;
    } catch (error) {
      if (error.code !== 'FileNotFound') {
        vscode.window.showErrorMessage(`检查文件夹是否存在时出错: ${error.message}`);
        return;
      }

      await vscode.workspace.fs.createDirectory(componentFolderUri);
      const filesToCreate = ['index.wxml', 'index.scss', 'index.json', 'index.js'];

      for (const fileName of filesToCreate) {
        if (fileName === 'index.json') {
          const initialContent = {
            component: true,
            styleIsolation: 'apply-shared',
            usingComponents: {},
          };
          const jsonContent = JSON.stringify(initialContent, null, 4);
          await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), Buffer.from(jsonContent, 'utf8'));
        } else if (fileName === 'index.js') {
          const initialJsContent = createdWxModuleJs.moduleFile;
          await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), Buffer.from(initialJsContent, 'utf8'));
        } else if (fileName === 'index.wxml') {
          const initialJsContent = `
            <view class="wy-${componentName} {{customClass}}" style="{{customStyle}}">
              <!-- wy-${componentName}组件 -->
            </view>
          `.replace(/^\s+/gm, '');
          await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), Buffer.from(initialJsContent, 'utf8'));
        } else {
          await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), new Uint8Array());
        }
      }
      vscode.window.showInformationMessage('小程序组件模板创建成功！');
      outputChannel.appendLine(`创建小程序组件: ${componentName}`);
    }
  });

  // 创建小程序页面
  registerCommand(context, 'extension.createMiniappPage', async (resource) => {
    const pageName = await vscode.window.showInputBox({
      prompt: '请输入页面名称',
      placeHolder: '请输入页面名称',
    });

    if (!pageName) {
      vscode.window.showErrorMessage('页面名称不能为空！');
      return;
    }

    const folderUri = vscode.Uri.file(resource.fsPath);
    const pageFolderUri = vscode.Uri.joinPath(folderUri, pageName);

    try {
      await vscode.workspace.fs.stat(pageFolderUri);
      const result = await vscode.window.showWarningMessage(`文件夹"${pageName}" 已存在，无法创建！`);
      return;
    } catch (error) {
      if (error.code !== 'FileNotFound') {
        vscode.window.showErrorMessage(`检查文件夹是否存在时出错: ${error.message}`);
        return;
      }

      await vscode.workspace.fs.createDirectory(pageFolderUri);
      const filesToCreate = ['index.wxml', 'index.scss', 'index.json', 'index.js'];

      for (const fileName of filesToCreate) {
        if (fileName === 'index.json') {
          const initialContent = {
            navigationBarTitleText: "",
            usingComponents: {},
          };
          const jsonContent = JSON.stringify(initialContent, null, 4);
          await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(pageFolderUri, fileName), Buffer.from(jsonContent, 'utf8'));
        } else if (fileName === 'index.js') {
          const initialJsContent = createdWxPageJs.containerFile;
          await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(pageFolderUri, fileName), Buffer.from(initialJsContent, 'utf8'));
        } else if (fileName === 'index.wxml') {
          const initialJsContent = `
            <view>
              <!-- ${pageName}页面 -->
            </view>
          `.replace(/^\s+/gm, '');
          await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(pageFolderUri, fileName), Buffer.from(initialJsContent, 'utf8'));
        } else {
          await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(pageFolderUri, fileName), new Uint8Array());
        }
      }
      vscode.window.showInformationMessage('小程序页面模板创建成功！');
      outputChannel.appendLine(`创建小程序页面: ${pageName}`);

      // 添加页面到 app.json
      const workspaceFolders = vscode.workspace.workspaceFolders;
      let relativePath = vscode.workspace.asRelativePath(pageFolderUri);
      let path_parts = relativePath.split("pages/")
      let before_pages = ''
      if (path_parts.length > 1) {
        before_pages = path_parts[0].replace(/\/$/, "")
      }
      let after_pages = "pages/" + path_parts[1] + "/index"

      const workspaceFolderUri = workspaceFolders[0].uri;
      const appJsonUri = vscode.Uri.joinPath(workspaceFolderUri, 'app.json');
      const appJsonContent = await vscode.workspace.fs.readFile(appJsonUri);
      const appJson = JSON.parse(appJsonContent.toString());

      if (before_pages === '') {
        if (!appJson.pages.includes(after_pages)) {
          appJson.pages.push(after_pages);
        }
      }

      if (appJson.subPackages) {
        appJson.subPackages.forEach(subPackage => {
          if (subPackage.root === before_pages && !subPackage.pages.includes(after_pages)) {
            subPackage.pages.push(after_pages);
          } else {
            vscode.window.showInformationMessage(`app.json 中分包${before_pages}已存在页面路径"${after_pages}"`);
          }
        });
      }

      await vscode.workspace.fs.writeFile(appJsonUri, Buffer.from(JSON.stringify(appJson, null, 2)));
      vscode.window.showInformationMessage(`路径"${after_pages}" 已添加到 app.json 中`);
    }
  });

  // 创建工具文件
  registerCommand(context, 'extension.createdTools', async (resource) => {
    let toolsName = await vscode.window.showInputBox({
      prompt: '请输入工具文件夹名称',
      placeHolder: '请输入工具文件夹名称',
    });

    if (!toolsName) {
      vscode.window.showErrorMessage('工具文件夹名称不能为空,已设置为默认值tools!');
      toolsName = 'tools';
    }

    const folderUri = vscode.Uri.file(resource.fsPath);
    const componentFolderUri = vscode.Uri.joinPath(folderUri, toolsName);

    try {
      await vscode.workspace.fs.stat(componentFolderUri);
      const result = await vscode.window.showWarningMessage(`文件夹"${toolsName}" 已存在，无法创建！`);
      return;
    } catch (error) {
      if (error.code !== 'FileNotFound') {
        vscode.window.showErrorMessage(`检查文件夹是否存在时出错: ${error.message}`);
        return;
      }

      await vscode.workspace.fs.createDirectory(componentFolderUri);
      const filesToCreate = ['ployfill.js', 'utils.js'];

      for (const fileName of filesToCreate) {
        if (fileName === 'ployfill.js') {
          const initialContent = createdPloyfill.contentFile;
          await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), Buffer.from(initialContent, 'utf8'));
        } else if (fileName === 'utils.js') {
          const initialContent = createdUtils.contentFile;
          await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), Buffer.from(initialContent, 'utf8'));
        } else {
          await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(componentFolderUri, fileName), new Uint8Array());
        }
      }
      vscode.window.showInformationMessage('工具文件模板创建成功！');
      outputChannel.appendLine(`创建工具文件: ${toolsName}`);
    }
  });

  // 创建 Vue2 文件
  registerCommand(context, 'extension.createdVue2', async (resource) => {
    let vue2ModuleName = await vscode.window.showInputBox({
      prompt: '请输入vue2文件模板名称',
      placeHolder: '请输入vue2文件模板名称',
    });

    if (!vue2ModuleName) {
      vscode.window.showErrorMessage('vue2文件模板名称不能为空,已设置为默认值vue2_module.vue!');
      vue2ModuleName = 'vue2_module';
    }

    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileFolderUri = vscode.Uri.joinPath(folderUri, vue2ModuleName + '.vue');
    const initialContent = createdVue2.componentFile;

    try {
      await vscode.workspace.fs.stat(fileFolderUri);
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(`文件"${vue2ModuleName}.vue" 已存在，是否覆盖？`, overwrite, cancel);

      if (result === overwrite) {
        await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
        vscode.window.showInformationMessage('vue2文件模板创建成功！');
      } else {
        vscode.window.showInformationMessage('取消创建操作.');
        return;
      }
    } catch (error) {
      await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
      vscode.window.showInformationMessage('vue2文件模板创建成功！');
    }

    const document = await vscode.workspace.openTextDocument(fileFolderUri);
    await vscode.window.showTextDocument(document);
    outputChannel.appendLine(`创建 Vue2 文件: ${vue2ModuleName}`);
  });

  // 创建 Vue3 文件
  registerCommand(context, 'extension.createdVue3', async (resource) => {
    let vue3ModuleName = await vscode.window.showInputBox({
      prompt: '请输入vue3文件模板名称',
      placeHolder: '请输入vue3文件模板名称',
    });

    if (!vue3ModuleName) {
      vscode.window.showErrorMessage('vue3文件模板名称不能为空,已设置为默认值vue3_module.vue!');
      vue3ModuleName = 'vue3_module';
    }

    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileFolderUri = vscode.Uri.joinPath(folderUri, vue3ModuleName + '.vue');
    const initialContent = createdVue3.componentFile;

    try {
      await vscode.workspace.fs.stat(fileFolderUri);
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(`文件"${vue3ModuleName}.vue" 已存在，是否覆盖？`, overwrite, cancel);

      if (result === overwrite) {
        await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
        vscode.window.showInformationMessage('vue3文件模板创建成功！');
      } else {
        vscode.window.showInformationMessage('取消创建操作.');
        return;
      }
    } catch (error) {
      await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
      vscode.window.showInformationMessage('vue3文件模板创建成功！');
    }

    const document = await vscode.workspace.openTextDocument(fileFolderUri);
    await vscode.window.showTextDocument(document);
    outputChannel.appendLine(`创建 Vue3 文件: ${vue3ModuleName}`);
  });

  // 创建 HTML 文件
  registerCommand(context, 'extension.createdHtml', async (resource) => {
    let htmlModuleName = await vscode.window.showInputBox({
      prompt: '请输入html文件模板名称',
      placeHolder: '请输入html文件模板名称',
    });

    if (!htmlModuleName) {
      vscode.window.showErrorMessage('html文件模板名称不能为空,已设置为默认值page.html!');
      htmlModuleName = 'page';
    }

    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileFolderUri = vscode.Uri.joinPath(folderUri, htmlModuleName + '.html');
    const initialContent = createdHtml.containerFile;

    try {
      await vscode.workspace.fs.stat(fileFolderUri);
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(`文件"${htmlModuleName}.html" 已存在，是否覆盖？`, overwrite, cancel);

      if (result === overwrite) {
        await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
        vscode.window.showInformationMessage('html文件模板创建成功！');
      } else {
        vscode.window.showInformationMessage('取消创建操作.');
        return;
      }
    } catch (error) {
      await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
      vscode.window.showInformationMessage('html文件模板创建成功！');
    }

    const document = await vscode.workspace.openTextDocument(fileFolderUri);
    await vscode.window.showTextDocument(document);
    outputChannel.appendLine(`创建 HTML 文件: ${htmlModuleName}`);
  });

  // 创建 Pinia 文件
  registerCommand(context, 'extension.createdPinia', async (resource) => {
    let piniaModuleName = await vscode.window.showInputBox({
      prompt: '请输入pinia文件模板名称',
      placeHolder: '请输入pinia文件模板名称',
    });

    if (!piniaModuleName) {
      vscode.window.showErrorMessage('pinia文件模板名称不能为空,已设置为默认值pinia_module.js!');
      piniaModuleName = 'pinia_module';
    }

    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileFolderUri = vscode.Uri.joinPath(folderUri, piniaModuleName + '.js');
    const initialContent = createdPinia.moduleFile;

    try {
      await vscode.workspace.fs.stat(fileFolderUri);
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(`文件"${piniaModuleName}.js" 已存在，是否覆盖？`, overwrite, cancel);

      if (result === overwrite) {
        await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
        vscode.window.showInformationMessage('pinia文件模板创建成功！');
      } else {
        vscode.window.showInformationMessage('取消创建操作.');
        return;
      }
    } catch (error) {
      await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
      vscode.window.showInformationMessage('pinia文件模板创建成功！');
    }

    const document = await vscode.workspace.openTextDocument(fileFolderUri);
    await vscode.window.showTextDocument(document);
    outputChannel.appendLine(`创建 Pinia 文件: ${piniaModuleName}`);
  });

  // 创建 Vuex 文件
  registerCommand(context, 'extension.createdVuex', async (resource) => {
    let vuexModuleName = await vscode.window.showInputBox({
      prompt: '请输入vuex文件模板名称',
      placeHolder: '请输入vuex文件模板名称',
    });

    if (!vuexModuleName) {
      vscode.window.showErrorMessage('vuex文件模板名称不能为空,已设置为默认值vuex_module.js!');
      vuexModuleName = 'vuex_module';
    }

    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileFolderUri = vscode.Uri.joinPath(folderUri, vuexModuleName + '.js');
    const initialContent = createdVuex.moduleFile;

    try {
      await vscode.workspace.fs.stat(fileFolderUri);
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(`文件"${vuexModuleName}.js" 已存在，是否覆盖？`, overwrite, cancel);

      if (result === overwrite) {
        await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
        vscode.window.showInformationMessage('vuex文件模板创建成功！');
      } else {
        vscode.window.showInformationMessage('取消创建操作.');
        return;
      }
    } catch (error) {
      await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
      vscode.window.showInformationMessage('vuex文件模板创建成功！');
    }

    const document = await vscode.workspace.openTextDocument(fileFolderUri);
    await vscode.window.showTextDocument(document);
    outputChannel.appendLine(`创建 Vuex 文件: ${vuexModuleName}`);
  });

  // 创建 Service 文件
  registerCommand(context, 'extension.createdService', async (resource) => {
    let serviceModuleName = await vscode.window.showInputBox({
      prompt: '请输入service文件模板名称',
      placeHolder: '请输入service文件模板名称',
    });

    if (!serviceModuleName) {
      vscode.window.showErrorMessage('service文件模板名称不能为空,已设置为默认值service_module.js!');
      serviceModuleName = 'service_module';
    }

    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileFolderUri = vscode.Uri.joinPath(folderUri, serviceModuleName + '.js');
    const initialContent = createdService.serviceFile;

    try {
      await vscode.workspace.fs.stat(fileFolderUri);
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(`文件"${serviceModuleName}.js" 已存在，是否覆盖？`, overwrite, cancel);

      if (result === overwrite) {
        await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
        vscode.window.showInformationMessage('service文件模板创建成功！');
      } else {
        vscode.window.showInformationMessage('取消创建操作.');
        return;
      }
    } catch (error) {
      await vscode.workspace.fs.writeFile(fileFolderUri, Buffer.from(initialContent, 'utf8'));
      vscode.window.showInformationMessage('service文件模板创建成功！');
    }

    const document = await vscode.workspace.openTextDocument(fileFolderUri);
    await vscode.window.showTextDocument(document);
    outputChannel.appendLine(`创建 Service 文件: ${serviceModuleName}`);
  });

  // 在 activate 函数中调用注册的命令函数，以使其在扩展被激活时立即生效
  vscode.commands.executeCommand('extension.getSetting');
  vscode.commands.executeCommand('extension.vuePeek');
  vscode.commands.executeCommand('extension.jumpDefinitionWxml');
  vscode.commands.executeCommand('extension.jumpDefinitionJson');
  vscode.commands.executeCommand('extension.jumpDefinitionWxmlItem');

  outputChannel.appendLine('所有功能已初始化完成');
  outputChannel.show(); // 显示输出面板便于调试

  console.log('自由助手扩展激活完成');
}

/**
 * 停用扩展
 */
function deactivate() {
  config_1.configDeactivate();
  console.log('扩展 Freedom cide 已被禁用！');
}

/**
 * 注册命令
 * @param {vscode.ExtensionContext} context 
 * @param {string} command 
 * @param {Function} func 
 */
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