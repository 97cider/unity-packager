const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const conf = require('./config');
const rimraf = require('rimraf');

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

const UnityPackager = {
    async BuildProject (src, dst, options) {

        if (typeof(src) !== 'string' && typeof(dst) !== 'string') {
            throw new Error('unity-packager: Source and Destination file paths must be strings!');
        }

        if (!fs.existsSync(src)) {
            throw new Error('unity-packager: Source directory does not exists!');
        }

        if (flushBuildFolder) {
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

        if (flushBuildFolder) {
            try {
                await rimraf.sync(dst);
            } catch ( err ) {
                console.error("unity-packager: Failed to clean build directory. Error: " + err);
            } 
        }

        const buildOptions = buildConfig(options);
        const commandArgs = buildOptions || {};
    }
};

module.exports = {
    UnityPackager
};