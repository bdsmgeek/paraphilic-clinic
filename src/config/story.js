/*Required by Twine*/
Config.saves.version = 10104;
State.initPRNG("seedForPRNG");
setup.versionString = function() {
    var versionNumber = Config.saves.version;
    var minorPatch = parseFloat(versionNumber / 100).toFixed(2);
    if (minorPatch >= 100) {
        var missingMajor = minorPatch.toString().substring(1);
        return "1." + missingMajor;
    } else {
        return "0." + minorPatch;
    }
};
/*End Required by Twine*/