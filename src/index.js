const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');
const rimraf = require('rimraf');
const conf = require('./config');


function buildConfig (options) {
    try {
        const opts = options || {};
        const configuration = Object.assign(conf, opts);
        return configuration;
    } catch ( err ) {
        console.error('unity-packager: There was an error using the options specified. Error: ' + err);
        return conf;
    }
}

function createBuildString (src, opts) {
    const platform = os.platform();
    if (platform === 'win32') {
        console.log("This is a windows architecture, using standard C:/ notation to get the unity exe");
    }
}

async function executeBuildScript (src, opts) {
    try {
        const buildString = createBuildString(src, opts);
        //exec()
    } catch ( err ) {
        throw new Error('unity-packager: There was an error executing the build command. Error: ' + err);
    }
}

function executeBuildScriptSync (src, opts) {
    try {
        const buildString = createBuildString(src, opts);
        //exec()
    } catch ( err ) {
        throw new Error('unity-packager: There was an error executing the build command. Error: ' + err);
    }
}

const UnityPackager = {
    async BuildProject (src, dst, options) {

        if (typeof(src) !== 'string' && typeof(dst) !== 'string') {
            throw new Error('unity-packager: Source and Destination file paths must be strings!');
        }

        if (!fs.existsSync(src)) {
            throw new Error('unity-packager: Source directory does not exists!');
        }

        if (options.flushBuildFolder) {
            try {
                await rimraf(dst);
            } catch ( err ) {
                console.error("unity-packager: Failed to clean build directory. Error: " + err);
            } 
        }

        const buildOptions = buildConfig(options);
        const commandArgs = buildOptions || {};

    },
    BuildProjectSync (src, dst, options) {
        if (typeof(src) !== 'string' && typeof(dst) !== 'string') {
            throw new Error('unity-packager: Source and Destination file paths must be strings!');
        }

        if (!fs.existsSync(src)) {
            throw new Error('unity-packager: Source directory does not exists!');
        }

        const buildOptions = buildConfig(options);
        const commandArgs = buildOptions || {};

        if (commandArgs.flushBuildFolder) {
            try {
                rimraf.sync(dst);
            } catch ( err ) {
                console.error("unity-packager: Failed to clean build directory. Error: " + err);
            } 
        }

        executeBuildScriptSync(src, commandArgs);
    }
};

module.exports = {
    UnityPackager
};