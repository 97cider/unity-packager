'use strict';

const { UnityPackager } = require('../dist/index.js');
const buildPath = 'C:/Users/Meme Machine/UnityPackagerTest/Assets/WebGLBuilder.cs';
// There will be some nice testing in here eventually

UnityPackager.BuildProjectSync( buildPath, "./build" );

UnityPackager.BuildProjectSync( buildPath, "./build", { logPath: './build/logs/buildLog.txt', apiUpdate: true, buildClass : { className: 'WebGLBuilder', buildMethod: 'build'} } );