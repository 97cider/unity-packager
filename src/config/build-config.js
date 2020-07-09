const buildConfig = {
    buildType: String,
    filePath: String,
    outputPath: String,
    BuildArgs: {
        apiUpdate: Boolean,
        batchMode: Boolean,
        deepProfiling: Boolean,
        disableAssemblyUpdater: Boolean,
        debugShaderCompiler: Boolean,
        codeCoverage: Boolean,
        forceD3D11: Boolean,
        forceD3D12: Boolean,
        forceDeviceIndex: Boolean,
        forceMetal: Boolean,
        enableProfiler: Boolean,
        setDefaultPlatformTextureFormat: Boolean,
        silentCrashes: Boolean
    }
}

module.exports = buildConfig;