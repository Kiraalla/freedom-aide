// @ts-nocheck
const vscode = require('vscode');
const wxml_format = require("./wxml_plus/FormatWxml");
const light_activeText = require("./wxml_plus/ActiveText");
const saveFormat_1 = require("./wxml_plus/saveFormat");
const config_1 = require("./wxml_plus/config");
const PeekFileDefinitionProvider_1 = require("./vue_plus/PeekFileDefinitionProvider");
const wxmlCompletionItemProvider = require('./util/wxmlCompletionItemProvider')
const wxmlDefinitionProvider = require('./util/wxmlDefinitionProvider')
const jsonDefinitionProvider = require('./util/jsonDefinitionProvider')
const format_core = require('./wxml_plus/format_core')
const Logger = require('./util/logger')
const FileCreator = require('./util/fileCreator')

const documentSelector = [
  { scheme: 'file', language: 'wxml', pattern: '**/*.wxml' },
]
const documentSelectorJson = [
  { scheme: 'file', language: 'json', pattern: '**/*.json' },
]
const createdPolyfill = require('./template/tools/polyfill')
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
                        // 静默处理错误，避免干扰用户
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

    // 只处理 WXML、Vue 和 WXSS 文件
    if (languageId !== 'wxml' && languageId !== 'vue' && languageId !== 'wxss') {
      return;
    }

    try {
      const text = document.getText();
      let formattedText;

      if (languageId === 'vue') {
        formattedText = format_core.unifiedFormat(text, 'vue');
      } else if (languageId === 'wxml') {
        formattedText = format_core.unifiedFormat(text, 'wxml');
      } else if (languageId === 'wxss') {
        formattedText = format_core.unifiedFormat(text, 'wxss');
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
  // 创建输出通道
  const outputChannel = vscode.window.createOutputChannel('自由助手');
  context.subscriptions.push(outputChannel);
  
  // 获取调试模式配置
  const config = vscode.workspace.getConfiguration('freedomHelper');
  const debugMode = config.get('debugMode', false);
  
  // 创建日志记录器
  const logger = new Logger(outputChannel, debugMode);
  logger.info('扩展已激活');
  
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

  // 为 WXSS 注册格式化器
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(
      { language: 'wxss' },
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

  context.subscriptions.push(
    vscode.languages.registerDocumentRangeFormattingEditProvider(
      { language: 'wxss' },
      formattingProvider
    )
  );

  // 监听配置变化，更新调试模式
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('freedomHelper.debugMode')) {
        const config = vscode.workspace.getConfiguration('freedomHelper');
        const debugMode = config.get('debugMode', false);
        logger.setDebugMode(debugMode);
        logger.info(`调试模式已${debugMode ? '启用' : '禁用'}`);
      }
    })
  );

  // 注册命令：切换格式化开关
  registerCommand(context, 'extension.compileOff', () => {
    let config = vscode.workspace.getConfiguration("freedomHelper");
    config.update("vue-format-save-code", true);
    config.update("wxml-format-save-code", true);
    logger.info('格式化开关已开启');
  });

  registerCommand(context, 'extension.compileOn', () => {
    let config = vscode.workspace.getConfiguration("freedomHelper");
    config.update("vue-format-save-code", false);
    config.update("wxml-format-save-code", false);
    logger.info('格式化开关已关闭');
  });

  // 格式化统一命令 - 使用内置格式化命令
  registerCommand(context, 'extension.formatUnified', async () => {
    logger.debug('统一格式化命令被触发');

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('没有活动的编辑器');
      return;
    }

    const languageId = editor.document.languageId;
    logger.debug(`格式化语言: ${languageId}`);

    try {
      if (languageId === 'vue' || languageId === 'wxml' || languageId === 'wxss') {
        await vscode.commands.executeCommand('editor.action.formatDocument');
        vscode.window.showInformationMessage(`${languageId} 文件格式化完成`);
        logger.debug(`${languageId} 文件格式化完成`);
      } else {
        vscode.window.showWarningMessage(`不支持 ${languageId} 文件的格式化`);
      }
    } catch (error) {
      vscode.window.showErrorMessage(`格式化失败: ${error.message}`);
      logger.error('格式化失败', error);
    }
  });

  // Vue 格式化命令 - 返回 Promise
  registerCommand(context, 'extension.formatvue', () => {
    logger.debug('Vue 格式化命令被触发');
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
            logger.debug('Vue 文件格式化完成');
            resolve();
          } else {
            vscode.window.showErrorMessage('Vue 文件格式化失败');
            reject(new Error('Vue 文件格式化失败'));
          }
        }).catch(error => {
          logger.error('Vue 格式化失败', error);
          reject(error);
        });

      } catch (error) {
        vscode.window.showErrorMessage(`Vue 格式化失败: ${error.message}`);
        logger.error('Vue 格式化失败', error);
        reject(error);
      }
    });
  });

  // WXML 格式化命令 - 返回 Promise  
  registerCommand(context, 'extension.formatwxml', () => {
    logger.debug('WXML 格式化命令被触发');
    return new Promise((resolve, reject) => {
      try {
        const wxml = new wxml_format.default();
        wxml.init();
        logger.debug('WXML 文件格式化完成');
        resolve();
      } catch (error) {
        logger.error('WXML 格式化失败', error);
        reject(error);
      }
    });
  });

  // WXSS 格式化命令 - 返回 Promise
  registerCommand(context, 'extension.formatwxss', () => {
    logger.debug('WXSS 格式化命令被触发');
    return new Promise((resolve, reject) => {
      const editor = vscode.window.activeTextEditor;

      if (!editor || !editor.document.fileName.endsWith('.wxss')) {
        vscode.window.showErrorMessage('没有活动的 WXSS 编辑器');
        reject(new Error('没有活动的 WXSS 编辑器'));
        return;
      }

      const doc = editor.document;
      const text = doc.getText();
      const range = new vscode.Range(
        new vscode.Position(0, 0),
        new vscode.Position(doc.lineCount, 0)
      );

      try {
        const formattedText = format_core.unifiedFormat(text, 'wxss');

        editor.edit(editBuilder => {
          editBuilder.replace(range, formattedText);
        }).then(success => {
          if (success) {
            vscode.window.showInformationMessage('WXSS 文件格式化完成');
            logger.debug('WXSS 文件格式化完成');
            resolve();
          } else {
            vscode.window.showErrorMessage('WXSS 文件格式化失败');
            reject(new Error('WXSS 文件格式化失败'));
          }
        }).catch(error => {
          logger.error('WXSS 格式化失败', error);
          reject(error);
        });

      } catch (error) {
        vscode.window.showErrorMessage(`WXSS 格式化失败: ${error.message}`);
        logger.error('WXSS 格式化失败', error);
        reject(error);
      }
    });
  });

  // 保存时自动格式化（根据配置）
  context.subscriptions.push(vscode.workspace.onWillSaveTextDocument(event => {
    try {
      const cfg = vscode.workspace.getConfiguration('freedomHelper');
      const doc = event.document;

      if ((doc.languageId === 'vue' && cfg.get('vue-format-save-code')) ||
        (doc.languageId === 'wxml' && cfg.get('wxml-format-save-code')) ||
        (doc.languageId === 'wxss' && cfg.get('wxss-format-save-code'))) {
        logger.debug(`触发保存时格式化: ${doc.languageId}`);
        event.waitUntil(vscode.commands.executeCommand('editor.action.formatDocument'));
      }
    }
    catch (e) {
      // 静默处理错误，避免阻塞保存流程
      logger.error('保存时格式化错误', e);
    }
  }));

  // 初始化 WXML 设置
  const wxml = new wxml_format.default();
  config_1.getConfig();
  const activeText = new light_activeText.default(config_1.config);
  config_1.configActivate(activeText, () => {
    saveFormat_1.default(wxml);
  });
  logger.debug('WXML 设置已初始化');

  // 注册 Vue 定义跳转提供器
  const configParams = vscode.workspace.getConfiguration('freedomHelper');
  const supportedLanguages = configParams.get('vue-supportedLanguages');
  const targetFileExtensions = configParams.get('vue-targetFileExtensions');
  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      supportedLanguages, 
      new PeekFileDefinitionProvider_1.default(targetFileExtensions)
    )
  );
  context.subscriptions.push(
    vscode.languages.setLanguageConfiguration('vue', languageConfiguration)
  );
  logger.debug('Vue 定义跳转已注册');

  // 注册 WXML 定义跳转提供器
  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      documentSelector,
      wxmlDefinitionProvider
    )
  );
  logger.debug('WXML 定义跳转已注册');

  // 注册 JSON 定义跳转提供器
  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      documentSelectorJson,
      jsonDefinitionProvider
    )
  );
  logger.debug('JSON 定义跳转已注册');

  // 注册 WXML 自动补全提供器
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      documentSelector,
      wxmlCompletionItemProvider,
      ' '
    )
  );
  logger.debug('WXML 自动补全已注册');

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

    const wxmlContent = `<view class="wy-${componentName} {{customClass}}" style="{{customStyle}}">
  <!-- wy-${componentName}组件 -->
</view>`;

    const files = [
      { name: 'index.wxml', content: wxmlContent },
      { name: 'index.scss', content: '' },
      { 
        name: 'index.json', 
        content: {
          component: true,
          styleIsolation: 'apply-shared',
          usingComponents: {},
        }
      },
      { name: 'index.js', content: createdWxModuleJs.moduleFile }
    ];

    await FileCreator.createFolderWithFiles(
      resource,
      '请输入组件名称',
      componentName,
      files,
      '小程序组件模板创建成功！',
      logger
    );
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

    const wxmlContent = `<view>
  <!-- ${pageName}页面 -->
</view>`;

    const files = [
      { name: 'index.wxml', content: wxmlContent },
      { name: 'index.scss', content: '' },
      { 
        name: 'index.json', 
        content: {
          navigationBarTitleText: "",
          usingComponents: {},
        }
      },
      { name: 'index.js', content: createdWxPageJs.containerFile }
    ];

    const folderUri = vscode.Uri.file(resource.fsPath);
    const pageFolderUri = vscode.Uri.joinPath(folderUri, pageName);

    const result = await FileCreator.createFolderWithFiles(
      resource,
      '请输入页面名称',
      pageName,
      files,
      '小程序页面模板创建成功！',
      logger
    );

    if (!result) {
      return;
    }

    // 添加页面到 app.json
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        logger.warn('未找到工作区文件夹');
        return;
      }

      const relativePath = vscode.workspace.asRelativePath(pageFolderUri);
      const path_parts = relativePath.split("pages/");
      let before_pages = '';
      if (path_parts.length > 1) {
        before_pages = path_parts[0].replace(/\/$/, "");
      }
      const after_pages = "pages/" + path_parts[1] + "/index";

      const workspaceFolderUri = workspaceFolders[0].uri;
      const appJsonUri = vscode.Uri.joinPath(workspaceFolderUri, 'app.json');
      
      const appJsonContent = await vscode.workspace.fs.readFile(appJsonUri);
      const appJson = JSON.parse(appJsonContent.toString());

      // 主包页面
      if (before_pages === '') {
        if (!appJson.pages) {
          appJson.pages = [];
        }
        if (!appJson.pages.includes(after_pages)) {
          appJson.pages.push(after_pages);
          logger.info(`页面路径"${after_pages}"已添加到主包`);
        } else {
          vscode.window.showInformationMessage(`页面路径"${after_pages}"已存在于主包中`);
        }
      } else {
        // 分包页面
        if (appJson.subPackages) {
          const targetSubPackage = appJson.subPackages.find(sp => sp.root === before_pages);
          if (targetSubPackage) {
            if (!targetSubPackage.pages) {
              targetSubPackage.pages = [];
            }
            if (!targetSubPackage.pages.includes(after_pages)) {
              targetSubPackage.pages.push(after_pages);
              logger.info(`页面路径"${after_pages}"已添加到分包"${before_pages}"`);
            } else {
              vscode.window.showInformationMessage(`分包"${before_pages}"中已存在页面路径"${after_pages}"`);
            }
          } else {
            logger.warn(`未找到分包"${before_pages}"`);
          }
        }
      }

      await vscode.workspace.fs.writeFile(appJsonUri, Buffer.from(JSON.stringify(appJson, null, 2), 'utf8'));
      vscode.window.showInformationMessage(`路径"${after_pages}"已添加到 app.json 中`);
    } catch (error) {
      vscode.window.showErrorMessage(`更新 app.json 失败: ${error.message}`);
      logger.error('更新 app.json 失败', error);
    }
  });

  // 创建工具文件
  registerCommand(context, 'extension.createdTools', async (resource) => {
    let toolsName = await vscode.window.showInputBox({
      prompt: '请输入工具文件夹名称',
      placeHolder: '请输入工具文件夹名称',
    });

    if (!toolsName) {
      vscode.window.showErrorMessage('工具文件夹名称不能为空，已设置为默认值 tools！');
      toolsName = 'tools';
    }

    const files = [
      { name: 'polyfill.js', content: createdPolyfill.contentFile },
      { name: 'utils.js', content: createdUtils.contentFile }
    ];

    await FileCreator.createFolderWithFiles(
      resource,
      '请输入工具文件夹名称',
      toolsName,
      files,
      '工具文件模板创建成功！',
      logger
    );
  });

  // 创建 Vue2 文件
  registerCommand(context, 'extension.createdVue2', async (resource) => {
    const fileUri = await FileCreator.createTemplateFile(
      resource,
      '请输入 Vue2 文件模板名称',
      'vue2_module',
      '.vue',
      createdVue2.componentFile,
      'Vue2 文件模板创建成功！',
      logger
    );

    if (fileUri) {
      const document = await vscode.workspace.openTextDocument(fileUri);
      await vscode.window.showTextDocument(document);
    }
  });

  // 创建 Vue3 文件
  registerCommand(context, 'extension.createdVue3', async (resource) => {
    const fileUri = await FileCreator.createTemplateFile(
      resource,
      '请输入 Vue3 文件模板名称',
      'vue3_module',
      '.vue',
      createdVue3.componentFile,
      'Vue3 文件模板创建成功！',
      logger
    );

    if (fileUri) {
      const document = await vscode.workspace.openTextDocument(fileUri);
      await vscode.window.showTextDocument(document);
    }
  });

  // 创建 HTML 文件
  registerCommand(context, 'extension.createdHtml', async (resource) => {
    const fileUri = await FileCreator.createTemplateFile(
      resource,
      '请输入 HTML 文件模板名称',
      'page',
      '.html',
      createdHtml.containerFile,
      'HTML 文件模板创建成功！',
      logger
    );

    if (fileUri) {
      const document = await vscode.workspace.openTextDocument(fileUri);
      await vscode.window.showTextDocument(document);
    }
  });

  // 创建 Pinia 文件
  registerCommand(context, 'extension.createdPinia', async (resource) => {
    const fileUri = await FileCreator.createTemplateFile(
      resource,
      '请输入 Pinia 文件模板名称',
      'pinia_module',
      '.js',
      createdPinia.moduleFile,
      'Pinia 文件模板创建成功！',
      logger
    );

    if (fileUri) {
      const document = await vscode.workspace.openTextDocument(fileUri);
      await vscode.window.showTextDocument(document);
    }
  });

  // 创建 Vuex 文件
  registerCommand(context, 'extension.createdVuex', async (resource) => {
    const fileUri = await FileCreator.createTemplateFile(
      resource,
      '请输入 Vuex 文件模板名称',
      'vuex_module',
      '.js',
      createdVuex.moduleFile,
      'Vuex 文件模板创建成功！',
      logger
    );

    if (fileUri) {
      const document = await vscode.workspace.openTextDocument(fileUri);
      await vscode.window.showTextDocument(document);
    }
  });

  // 创建 Service 文件
  registerCommand(context, 'extension.createdService', async (resource) => {
    const fileUri = await FileCreator.createTemplateFile(
      resource,
      '请输入 Service 文件模板名称',
      'service_module',
      '.js',
      createdService.serviceFile,
      'Service 文件模板创建成功！',
      logger
    );

    if (fileUri) {
      const document = await vscode.workspace.openTextDocument(fileUri);
      await vscode.window.showTextDocument(document);
    }
  });

  logger.info('所有功能已初始化完成');
}

/**
 * 停用扩展
 */
function deactivate() {
  config_1.configDeactivate();
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