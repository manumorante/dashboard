import { paths } from '../config.js'
import { readThisFile, getFolders, getImportsFrom, saveJSON } from './lib.js'

function getImportsInFolder(path) {
  const output = []
  const folder = getFolders(path)

  folder.every((component) => {
    const file = readThisFile(`${path}/${component}/index.js`)
    const linesArray = file.split('\n')
    const localImports = getImportsFrom(linesArray, "'../")
    const dsImports = getImportsFrom(linesArray, '@web/ds')
    const uiImports = getImportsFrom(linesArray, '@web/ui')

    output.push({
      component,
      localImports,
      dsImports,
      uiImports,
    })

    return true
  })

  return output
}

const data = {
  ds: getImportsInFolder(paths.ds),
  ui: getImportsInFolder(paths.ui),
}

// const jsonPath = '/Users/manu/projects/personal/nube/src/frontend/output.json'
const jsonPath = 'output.json'
saveJSON(jsonPath, data)
