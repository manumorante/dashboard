import { readThisFile } from './lib.js'

const file = readThisFile('output.json')
let data = JSON.parse(file)
const keysDS = Object.keys(data.DS)
const keysUI = Object.keys(data.UI)

function isDSinUI({ ds, ui }) {
  const dsImports = data.UI[ui].dsImports
  return dsImports?.includes(ds)
}

function info(title, pack) {
  const packArr = Object.keys(pack)
  console.log()
  console.log(title)
  console.log('Total', packArr.length)
}

console.clear()
console.log('##')

// console.log('is', isDSinUI({ ds: 'Flex', ui: 'CookiesAlert' }))

function countInUI({ ds }) {
  let count = 0
  const componentDS = ds
  keysUI.map((componentUI) => {
    if (isDSinUI({ ds: componentDS, ui: componentUI })) count++
  })
  console.log(componentDS, count)
}

countInUI({ ds: 'Flex' })

function countAllInUI() {
  keysDS.map((componentDS) => {
    const count = countInUI({ ds: componentDS })
    if (count > 0) {
      console.log(componentDS, count)
    }
  })
}

countAllInUI()

// info('DS', data.DS)
// info('UI', data.UI)
// info('SPA', data.SPA)
