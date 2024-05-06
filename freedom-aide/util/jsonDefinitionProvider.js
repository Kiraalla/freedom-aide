const vscode = require('vscode')
const path = require('path')
const fs = require('fs')
const findRootPath = require('./findRootPath')

const provideDefinition = function(document, position) {
  const textLine = document.lineAt(position)
  const filePath = document.fileName
  const rootPath = findRootPath(filePath)
  let baseDir = path.dirname(filePath)

  let componentPath
  const textPath = `${textLine.text.split(':')[1].replace(/,|\s|\'|\"/gi, '')}.js`
  if (textPath.startsWith('/')) {
    // 为绝对路径时
    componentPath = path.join(rootPath, textPath)
  } else {
    // 为相对路径时
    componentPath = path.resolve(baseDir, textPath)
  }

  if (!componentPath || !fs.existsSync(componentPath)) {
    return null
  }

  return new vscode.Location(
    vscode.Uri.file(componentPath),
    new vscode.Position(0, 0),
  )
}

module.exports = {
  provideDefinition,
}
