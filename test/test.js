'use strict';

// use babel generated code for testing
const { UnityPackager } = require('../lib/index.js');

const buildPath = 'C:/Users/Meme Machine/UnityPackagerTest/Assets/';
const buildOptions = { 
    logPath: './build/logs/buildLog.txt', 
    apiUpdate: true, 
    buildClass : { 
        className: 'WebGLBuilder', 
        buildMethod: 'build'
    } 
};

// There will be some nice testing in here eventually (via mocha)

//UnityPackager.BuildProjectSync( buildPath, "./build" );

UnityPackager.BuildProjectSync( buildPath, "./build", buildOptions );