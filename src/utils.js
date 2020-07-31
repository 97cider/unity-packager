//@flow

/**
 * utils consist of code I want to use elsewhere for unity-packager,
 * but dont want to clog up index with. 
 */

function logMessage(permission:boolean, msg:string) {
    if (permission) {
        console.log(`unity-packager: ${ msg }`);
    }
}

function logError(permission:boolean, err:string) {
    if (permission) {
        console.error(`unity-packager-ERROR: ${ err }`)
    }
}

module.exports = {
    logMessage,
    logError
}