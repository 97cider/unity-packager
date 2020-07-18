// @flow

const fs = require('fs');
const path = require('path');

// $FlowFixMe
const { exec, execSync } = require('child_process');
const os = require('os');
const rimraf = require('rimraf');

// flow **imports**
import type Config from './config';
import conf from './config';

let buildTimeout;
let buildProcess = {};

function buildConfig (options: Config) {
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
        return `"${ unityPath }"`;
    }

    if (platform === 'win32') {
        uPath = '"C:/Program Files/Unity/Editor/Unity.exe"';
    }

    //TODO: Add default paths for other distributions
    return uPath ?? '';
}

function createBuildString (src: string, opts: any) {
    let buildString = getUnityPath(opts.unityPath);

    buildString += opts.forceQuit ? ' -quit' : '';
    buildString += opts.apiUpdate ? ' -accept-apiupdate' : '';
    buildString += opts.batchMode ? ' -batchmode' : '';
    buildString += opts.logPath ? ` -logFile ${ opts.logPath }` : '';
    buildString += ` -projectPath "${ src }"`;
    buildString += (opts.buildClass.className && opts.buildClass.buildMethod) ? 
        ` -executeMethod ${ opts.buildClass.className }.${ opts.buildClass.buildMethod }` : '';

    return buildString;
}

async function executeBuildScript (src: string, opts: any) {
    try {
        const buildString = createBuildString(src, opts);
        const startingTime = Date.now();

        let buildPromise;
        let buildResults = {};

        buildPromise = executeBuildCommand(buildString, opts.timeout);
        buildResults = finalizeBuild( startingTime );

        await buildPromise;

        if ( opts.timeout ) {
            clearTimeout(buildTimeout);
        }

        if ( buildProcess.killed ) {
            console.log("Build process has been terminated");
        }
        
        console.log("Finished executing build command");
        return Promise.resolve(buildResults);
    } catch ( err ) {
        throw new Error('unity-packager: There was an error executing the build command. Error: ' + err);
    }
}

function executeBuildCommand (command, timeout) {
    return new Promise((resolve, reject) => {

        let timedOut = false;

        if ( timeout ) {
            buildTimeout = setTimeout(() => {

                // This feels gross but it works >:)
                let startingTime = Date.now() - timeout;
                let buildResults = finalizeBuild(startingTime);

                console.log(buildProcess.pid);
                process.kill(buildProcess.pid);
                console.log("Process killed successfully");
                console.log("Build Results" + buildResults);
                timedOut = true;
                resolve();
            }, timeout);
        }

        buildProcess = exec(command, (error, stdout, stderr) => {
            if (timedOut) {
                console.log("Timed out, and rejecting the process");
                reject();
            }
            resolve(stdout? stdout : stderr);
        });
    });
}

function finalizeBuild ( startingTime, timeout ) {
    const completeTime = Date.now();
    const buildTime = completeTime - startingTime;
    let buildData = {
        completeTime: completeTime ? completeTime : 0.00,
        timeout: timeout ? true : false
    };

    return buildData;
}

function executeBuildScriptSync (src: string, opts: any) {
    try {
        const buildString = createBuildString(src, opts);
        const startingTime = Date.now();

        let buildProcess = {};
        let buildResults = {};

        buildProcess = execSync(buildString, { windowsHide: true }, (error, stdout, stderr) => {
            if (error) {
                throw new Error('unity-packager: There was an error executing the build process. Error: ' + err); 
            }

            if (opts.logBuild && stdout) {
                console.log(stdout);
            }
            finalizeBuild( buildProcess, startingTime );
        });
    } catch ( err ) {
        throw new Error('unity-packager: There was an error executing the build command. Error: ' + err);
    }
}

const UnityPackager = {
    async BuildProject (src: string, dst: string, options: Config) {

        if (typeof(src) !== 'string' && typeof(dst) !== 'string') {
            throw new Error('unity-packager: Source and Destination file paths must be strings!');
        }

        if (!fs.existsSync(src)) {
            throw new Error('unity-packager: Source directory does not exists!');
        }

        const buildOptions = buildConfig(options);
        const commandArgs = buildOptions || {};

        if (options.flushBuildFolder) {
            try {
                await rimraf(dst + '/*');
            } catch ( err ) {
                console.error("unity-packager: Failed to clean build directory. Error: " + err);
            } 
        }

        await executeBuildScript(src, commandArgs);

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
                rimraf.sync(dst + '/*');
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