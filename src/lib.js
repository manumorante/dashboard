// https://kinsta.com/knowledgebase/nodejs-fs/
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs'

// return array with folders from a path
export function getFolders(path) {
  const files = readdirSync(path)

  let folders = []
  files.forEach(function (file) {
    if (statSync(path + '/' + file).isDirectory()) {
      folders.push(file)
    }
  })

  return folders
}

// return the file readed or ""
export function readThisFile(filePath) {
  try {
    const data = readFileSync(filePath)
    return data.toString()
  } catch (error) {
    console.error(`Error reading file: ${filePath}`)
    return ''
  }
}

// TODO:
// leer los lazy: [ "const Overlay = lazy(() => import('../Overlay'))" ]

// get import lines from
export function getImportsFrom(arr, from) {
  const filtered = arr.filter((item) => item.includes(from))
  let out = filtered.map(getNamesFromImport)
  return out?.length > 0 && out[0].split(',')
}

export function getUseCases(arr) {
  const filtered = arr.filter((item) => item.includes('UseCase.execute'))
  if (filtered?.length <= 0) return false

  let out = filtered.map(getUseCaseFromLine)
  let uniqueOut = [...new Set(out)]
  return uniqueOut.sort()
}

function getBetween(str, strStart, srtEnd) {
  let out = str.slice(str.indexOf(strStart) + strStart.length, str.indexOf(srtEnd))
  out = out.replaceAll(' as ', ' as')
  out = out.replaceAll(',', ' ')
  out = out.split(' ').filter((item) => item && !item.startsWith('as'))
  return out.toString()
}

function getUseCaseFromLine(str) {
  let arr = str.split('.')
  const executeIndex = arr.findIndex((el) => el.includes('execute('))
  const useCase = arr[executeIndex - 1]

  return useCase.toString()
}

// Sacamos el nombre: ['Typography']
function getNamesFromImport(str) {
  if (str.includes('lazy(')) return str.split(' ')[1]
  if (str.includes('{')) return getBetween(str, '{', '}')
  return getBetween(str, 'import ', ' from ')
}

export function saveJSON(jsonPath, data) {
  writeFileSync(jsonPath, JSON.stringify(data, null, 2))
}

export function timeLog() {
  console.clear()
  console.log()
  console.log(`################################`)
  console.log(`########### ${new Date().toLocaleTimeString()} ###########`)
  console.log(`################################`)
  console.log()
}
