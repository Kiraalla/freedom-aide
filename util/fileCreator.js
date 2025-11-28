// @ts-nocheck
const vscode = require('vscode');

/**
 * 通用文件创建工具
 */
class FileCreator {
  /**
   * 创建模板文件
   * @param {vscode.Uri} resource - 资源路径
   * @param {string} promptMessage - 提示信息
   * @param {string} defaultName - 默认文件名
   * @param {string} extension - 文件扩展名
   * @param {string} content - 文件内容
   * @param {string} successMessage - 成功提示信息
   * @param {Function} logger - 日志记录器
   * @returns {Promise<vscode.Uri|null>} 创建的文件 URI 或 null
   */
  static async createTemplateFile(resource, promptMessage, defaultName, extension, content, successMessage, logger) {
    let fileName = await vscode.window.showInputBox({
      prompt: promptMessage,
      placeHolder: promptMessage,
    });

    if (!fileName) {
      vscode.window.showErrorMessage(`文件名称不能为空，已设置为默认值 ${defaultName}${extension}！`);
      fileName = defaultName;
    }

    const folderUri = vscode.Uri.file(resource.fsPath);
    const fileUri = vscode.Uri.joinPath(folderUri, fileName + extension);

    try {
      await vscode.workspace.fs.stat(fileUri);
      const overwrite = '覆盖';
      const cancel = '取消';
      const result = await vscode.window.showWarningMessage(
        `文件"${fileName}${extension}" 已存在，是否覆盖？`,
        overwrite,
        cancel
      );

      if (result !== overwrite) {
        vscode.window.showInformationMessage('取消创建操作');
        return null;
      }
    } catch (error) {
      // 文件不存在，继续创建
    }

    try {
      await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, 'utf8'));
      vscode.window.showInformationMessage(successMessage);
      if (logger) {
        logger.info(`${successMessage}: ${fileName}${extension}`);
      }
      return fileUri;
    } catch (error) {
      vscode.window.showErrorMessage(`创建文件失败: ${error.message}`);
      if (logger) {
        logger.error('创建文件失败', error);
      }
      return null;
    }
  }

  /**
   * 创建文件夹及多个文件
   * @param {vscode.Uri} resource - 资源路径
   * @param {string} promptMessage - 提示信息
   * @param {string} folderName - 文件夹名称
   * @param {Array<{name: string, content: string|object}>} files - 文件列表
   * @param {string} successMessage - 成功提示信息
   * @param {Function} logger - 日志记录器
   * @returns {Promise<vscode.Uri|null>} 创建的文件夹 URI 或 null
   */
  static async createFolderWithFiles(resource, promptMessage, folderName, files, successMessage, logger) {
    const folderUri = vscode.Uri.file(resource.fsPath);
    const targetFolderUri = vscode.Uri.joinPath(folderUri, folderName);

    try {
      await vscode.workspace.fs.stat(targetFolderUri);
      vscode.window.showWarningMessage(`文件夹"${folderName}" 已存在，无法创建！`);
      return null;
    } catch (error) {
      if (error.code !== 'FileNotFound') {
        vscode.window.showErrorMessage(`检查文件夹是否存在时出错: ${error.message}`);
        if (logger) {
          logger.error('检查文件夹失败', error);
        }
        return null;
      }

      try {
        await vscode.workspace.fs.createDirectory(targetFolderUri);

        for (const file of files) {
          const fileUri = vscode.Uri.joinPath(targetFolderUri, file.name);
          let fileContent;

          if (typeof file.content === 'object') {
            fileContent = JSON.stringify(file.content, null, 4);
          } else if (file.content) {
            fileContent = file.content;
          } else {
            fileContent = '';
          }

          await vscode.workspace.fs.writeFile(fileUri, Buffer.from(fileContent, 'utf8'));
        }

        vscode.window.showInformationMessage(successMessage);
        if (logger) {
          logger.info(`${successMessage}: ${folderName}`);
        }
        return targetFolderUri;
      } catch (error) {
        vscode.window.showErrorMessage(`创建文件夹失败: ${error.message}`);
        if (logger) {
          logger.error('创建文件夹失败', error);
        }
        return null;
      }
    }
  }
}

module.exports = FileCreator;
