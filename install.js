const Service = require('node-windows').Service
const EventLogger = require('node-windows').EventLogger

const serviceName = 'Uploaded Files Cleaner'

const logger = new EventLogger(serviceName)

const runInstall = process.argv.length === 7
const folderToWatch = runInstall ? process.argv[3] : ''
const deleteNewFileAfterSec = runInstall ? process.argv[4] : 0
const logPath = process.argv[5] || ''
const clearFolderOnInit = process.argv[6] || false
const action = process.argv[2]

const log = msg => {
  console.log(msg) //eslint-disable-line no-console
  logger.info(msg)
}

if (runInstall) {
  log(
    `Run install with ${action} for ${folderToWatch} and ${deleteNewFileAfterSec} sec interval.`)
}

const svc = new Service({
  name: serviceName,
  description: 'Remove files from selected folder after selected time.',
  script: './index.js',
  env: [{
    name: 'folderToWatch',
    value: folderToWatch
  }, {
    name: 'deleteNewFileAfterSec',
    value: deleteNewFileAfterSec
  }, {
    name: 'logPath',
    value: logPath
  }, {
    name: 'clearFolderOnInit',
    value: clearFolderOnInit
  }]
})

svc.on('install', () => {
  log('Service Installed.')
  svc.start()
  log('Service is starting...')
})

svc.on('uninstall', () => {
  log('Service Uninstalled.')
})

svc.on('start', () => {
  log('Service started...')
})

svc.on('stop', () => {
  log('Service stopped...')
})

if (action === 'install') {
  log('Run Install...')
  svc.install()
} else {
  log('Run Uninstall...')
  svc.uninstall()
}
