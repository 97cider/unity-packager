// @flow

export type Config = {
     buildClass: {
        className: string;
        buildMethod: string;
    };
    forceQuit: boolean;
    unityPath: string;
    logBuild: boolean;
    logPath: string;
    flushBuildFolder: boolean;
    apiUpdate: boolean;
    batchMode: boolean;
    deepProfiling: boolean;
    disableAssemblyUpdater: boolean;
    debugShaderCompiler: boolean;
    codeCoverage: boolean;
    forceD3D11: boolean;
    forceD3D12: boolean;
    forceDeviceIndex: boolean;
    forceMetal: boolean;
    enableProfiler: boolean;
    setDefaultPlatformTextureFormat: boolean;
    silentCrashes: boolean;
    timeout: number;
}

export default ({
    buildClass: {
        className: undefined,
        buildMethod: undefined
    },
    forceQuit: true,
    unityPath: undefined,
    logBuild: false,
    logPath: undefined,
    flushBuildFolder: true,
    apiUpdate: false,
    batchMode: true,
    deepProfiling: false,
    disableAssemblyUpdater: false,
    debugShaderCompiler: false,
    codeCoverage: false,
    forceD3D11: false,
    forceD3D12: false,
    forceDeviceIndex: false,
    forceMetal: false,
    enableProfiler: false,
    setDefaultPlatformTextureFormat: false,
    silentCrashes: false,
    timeout: undefined
} : Config);