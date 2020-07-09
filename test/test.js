'use strict';

const { UnityPackager } = require('../dist/index.js');
// There will be some nice testing in here eventually

UnityPackager.BuildProjectSync('C:/Users/Meme Machine/UnityPackagerTest/Assets/WebGLBuilder.cs', "./build");