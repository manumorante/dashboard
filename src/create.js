import { paths } from '../config.js'
import { readThisFile, getFolders, getImportsFrom, getUseCases, saveJSON } from './lib.js'

function getTheImports(linesArray) {
  const localImports = getImportsFrom(linesArray, "'../")
  const dsImports = getImportsFrom(linesArray, '@web/ds')
  const uiImports = getImportsFrom(linesArray, '@web/ui')
  const useCases = getUseCases(linesArray)

  return {
    ...(localImports && { localImports }),
    ...(dsImports && { dsImports }),
    ...(uiImports && { uiImports }),
    ...(useCases && { useCases }),
  }
}

function getImportsInFolder(path) {
  let output = {}
  const folder = getFolders(path)

  folder.every((component) => {
    const file = readThisFile(`${path}/${component}/index.js`)
    const linesArray = file.split('\n')
    const importsObj = getTheImports(linesArray)

    let itemObj = new Object()
    itemObj[component] = importsObj

    output = { ...output, ...itemObj }

    return true
  })

  return output
}

const data = {
  ds: getImportsInFolder(paths.ds),
  ui: getImportsInFolder(paths.ui),
  spa: getImportsInFolder(paths.spa),
}

saveJSON('output.json', data)
