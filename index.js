var watch = require('node-watch');
var fs = require('fs');

const folderToWatch = process.env['folderToWatch'] || process.argv[2];
const deleteNewFileAfterSec = process.env['deleteNewFileAfterSec'] || process.argv[3];
const logPath = process.env['logPath'] || process.argv[4] || './log.txt';

const log = msg => {
    console.log(msg);
    fs.appendFileSync(logPath, `${new Date()} - ${msg}\n`);
};

log(`Starting ${folderToWatch} ${deleteNewFileAfterSec} ...`);

try {
    watch(folderToWatch, { recursive: true }, function(evt, name) {
        try {
            log(`${name} changed.`);
            setTimeout(() => {
                if (fs.existsSync(name)) {
                    fs.unlinkSync(name);
                    log(`${name} deleted.`);
                }
            }, parseInt(deleteNewFileAfterSec) * 1000);
        } catch (e) {
            log('Error2');
            log(e);
            log(e.stack);
            process.exit(-2);
        }    
    });
} catch(e) {
    log('Error1');
    log(e);
    log(e.stack);
    process.exit(-1);
}