// @ts-nocheck
/**
 * 日志管理工具类
 */
class Logger {
  constructor(outputChannel, debugMode = false) {
    this.outputChannel = outputChannel;
    this.debugMode = debugMode;
  }

  /**
   * 更新调试模式
   */
  setDebugMode(debugMode) {
    this.debugMode = debugMode;
  }

  /**
   * 调试日志（仅在调试模式下输出）
   */
  debug(message) {
    if (this.debugMode) {
      this.outputChannel.appendLine(`[DEBUG] ${new Date().toLocaleTimeString()} - ${message}`);
    }
  }

  /**
   * 信息日志
   */
  info(message) {
    this.outputChannel.appendLine(`[INFO] ${new Date().toLocaleTimeString()} - ${message}`);
  }

  /**
   * 错误日志
   */
  error(message, error) {
    const errorMsg = error ? `${message}: ${error.message}` : message;
    this.outputChannel.appendLine(`[ERROR] ${new Date().toLocaleTimeString()} - ${errorMsg}`);
    if (error && error.stack && this.debugMode) {
      this.outputChannel.appendLine(error.stack);
    }
  }

  /**
   * 警告日志
   */
  warn(message) {
    this.outputChannel.appendLine(`[WARN] ${new Date().toLocaleTimeString()} - ${message}`);
  }
}

module.exports = Logger;
