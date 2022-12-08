// https://kinsta.com/knowledgebase/nodejs-fs/
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs'

export function timeLog() {
  console.clear()
  console.log()
  console.log(`################################`)
  console.log(`########### ${new Date().toLocaleTimeString()} ###########`)
  console.log(`################################`)
  console.log()
}

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
  return filtered.map(getNamesFromImport)
}

function getBetween(str, strStart, srtEnd) {
  let out = str.slice(str.indexOf(strStart) + strStart.length, str.indexOf(srtEnd))
  out = out.replaceAll(' as ', ' as')
  out = out.replaceAll(',', ' ')
  out = out.split(' ').filter((item) => item && !item.startsWith('as'))
  return out.toString()
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
