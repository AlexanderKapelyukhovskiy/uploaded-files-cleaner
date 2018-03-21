var watch = require('node-watch');
var fs = require('fs');

const dirToWatch = process.env['folder'] || './';//  process.argv[2];
const deleteAfterSec = process.env['intervalInSec'] || 5; //process.argv[3];

watch(dirToWatch, { recursive: true }, function(evt, name) {
    console.log('%s changed.', name);
    setTimeout(() => {
        if (fs.existsSync(name)) {
            fs.unlinkSync(name);
            console.log('%s deleted.', name);
        }
    }, parseInt(deleteAfterSec) * 1000);
});
