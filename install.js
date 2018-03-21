var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Uploaded Files Cleaner',
  description: 'Remove files from selected folder after selected time.',
  script: './index.js',
  env: [{
    folder: './',
    intervalInSec: 5 
  }]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

const action = process.argv[2];
if (action == 'install') {
    svc.install();
} else {
    svc.uninstall();
}
