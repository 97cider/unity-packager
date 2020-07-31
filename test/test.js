'use strict';

// use babel generated code for testing
const { UnityPackager } = require('../lib/index.js');

const buildPath = 'C:/Users/Meme Machine/UnityPackagerTest/';
const buildOptions = {
    unityPath: 'C:/Program Files/Unity/Hub/Editor/2019.4.1f1/Editor/Unity.exe',
    apiUpdate: true, 
    buildClass : { 
        className: 'WebGLBuilder', 
        buildMethod: 'build'
    },
    timeout: 3000,
    consoleOutput: true,
};

// There will be some nice testing in here eventually (via mocha)

//UnityPackager.BuildProjectSync( buildPath, "./build" );

//UnityPackager.BuildProjectSync( buildPath, "./build", buildOptions );

const pack = UnityPackager.BuildProject(buildPath, "./build", buildOptions);

pack.then(build => {
    console.log("Hey the build finished!");
    console.log(build);
});