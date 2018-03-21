# uploaded-files-cleaner
Tool for monitoring and removing newly added files

## restore packages before first run
* yarn

## install service Uploaded Files Cleaner with default parameters
* yarn run install

## unstall service Uploaded Files Cleaner
* yarn run uninstall

## for change default service configuration 
* edit `install` script in package.json or run it directly in console
```
...
"install": "node install.js install ./upload 5 ./service-log.txt",
```

```
"install": "node install.js install {folderToWatch} {deleteNewFileAfterSec} {logPath}",
```

* `./upload` - name of folder to watch is `upload`
* `5` - delete new file after `5` sec 
* `./service-log.txt` - log path is `./service-log.txt`

## monitoring logs 
* after default installation logs can be found in `./service-log.txt`
* Event logs with Souurce `Uploaded Files Cleaner`
* some additional service logs could be found in folder `./daemon`