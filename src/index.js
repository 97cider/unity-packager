// @flow

const fs = require('fs');
const path = require('path');

//$FlowFixMe
const { exec, execSync } = require('child_process');

const os = require('os');
const rimraf = require('rimraf');
const conf = require('./config');


function buildConfig (options: any) {
    try {
        const opts = options || {};
        const configuration = Object.assign(conf, opts);
        return configuration;
    } catch ( err ) {
        console.error('unity-packager: There was an error using the options specified. Error: ' + err);
        return conf;
    }
}

function getUnityPath (unityPath: string) {
    const platform = os.platform();
    let uPath;

    if (unityPath) {
        return unityPath;
    }

    if (platform === 'win32') {
        uPath = '"C:/Program Files/Unity/Editor/Unity.exe"';
    }

    //TODO: Add default paths for other distributions
    return uPath ?? '';
}

function createBuildString (src: string, opts: any) {
    let buildString = getUnityPath(opts.unityPath);

    buildString += opts.apiUpdate ? ' -accept-apiupdate' : '';
    buildString += opts.batchMode ? ' -batchmode' : '';
    buildString += opts.logPath ? ` -logFile ${ opts.logPath }` : '';
    buildString += ` -projectPath ${ src }`;
    buildString += (opts.buildClass.className && opts.buildClass.buildMethod) ? 
        ` -executeMethod ${ opts.buildClass.className }.${ opts.buildClass.buildMethod }` : '';

    return buildString;
}

async function executeBuildScript (src: string, opts: any) {
    try {
        const buildString = createBuildString(src, opts);
        //exec()
    } catch ( err ) {
        throw new Error('unity-packager: There was an error executing the build command. Error: ' + err);
    }
}

function executeBuildScriptSync (src: string, opts: any) {
    try {
        const buildString = createBuildString(src, opts);
        console.log(buildString);
        //exec()
    } catch ( err ) {
        throw new Error('unity-packager: There was an error executing the build command. Error: ' + err);
    }
}

const UnityPackager = {
    async BuildProject (src: string, dst: string, options: any) {

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
    BuildProjectSync (src: string, dst: string, options: any) {
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