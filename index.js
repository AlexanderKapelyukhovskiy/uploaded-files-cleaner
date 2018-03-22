const watch = require('node-watch')
const fs = require('fs')
const path = require('path')

const folderToWatch = process.env['folderToWatch'] || process.argv[2]
const deleteNewFileAfterSec = process.env['deleteNewFileAfterSec'] || process.argv[3]
const logPath = process.env['logPath'] || process.argv[4] || './log.txt'
const clearFolderOnInit = process.env['clearFolderOnInit'] || process.argv[5] || false

const log = msg => {
  console.log(msg)
  fs.appendFileSync(logPath, `${new Date()} - ${msg}\n`)
}


const clearFolder = directory => {
  log('clearFolder...')

  fs.readdir(directory, (err, files) => {
    log('readdir...')

    if (err) {
      console.log('Error3: ' + err)
      throw err
    }

    for (const file of files) {
      const f = path.join(directory, file)
      log(`${f} is removing`)
      fs.unlink(f, err => {
        log(`${f} was removed`)
        if (err) {
          console.log('Error4: ' + err)
          throw err
        }
      })
    }
  })
}

log(`Starting ${folderToWatch} ${deleteNewFileAfterSec} ${clearFolderOnInit}...`)

try {
  if (clearFolderOnInit === 'true') {
    log('Clearing Folder OnInit...')
    clearFolder(folderToWatch)
  }

  watch(folderToWatch, {recursive: true}, (evt, name) => {
    try {
      log(`${name} changed.`)
      setTimeout(() => {
        if (fs.existsSync(name)) {
          fs.unlinkSync(name)
          log(`${name} deleted.`)
        }
      }, parseInt(deleteNewFileAfterSec, 10) * 1000)
    } catch (e) {
      log('Error2')
      log(e)
      log(e.stack)
      process.exit(-2)
    }
  })
} catch (e) {
  log('Error1')
  log(e)
  log(e.stack)
  process.exit(-1)
}
