/**
 * Jalangi2 Variable Tracking Analysis
 * This analysis tracks variable reads and writes to understand data flow
 */

(function (sandbox) {
    function VariableTrackingAnalysis() {
        var variableReads = {};
        var variableWrites = {};
        var totalReads = 0;
        var totalWrites = 0;

        /**
         * This callback is called after a variable is read
         */
        this.read = function (iid, name, val, isGlobal, isScriptLocal) {
            if (name && typeof name === 'string') {
                totalReads++;
                if (!variableReads[name]) {
                    variableReads[name] = 0;
                }
                variableReads[name]++;
            }
            return { result: val };
        };

        /**
         * This callback is called before a variable is written
         */
        this.write = function (iid, name, val, lhs, isGlobal, isScriptLocal) {
            if (name && typeof name === 'string') {
                totalWrites++;
                if (!variableWrites[name]) {
                    variableWrites[name] = 0;
                }
                variableWrites[name]++;
            }
            return { result: val };
        };

        /**
         * This callback is called at the end of execution
         */
        this.endExecution = function () {
            console.log('\n========== Variable Tracking Analysis ==========');
            console.log('Total variable reads:', totalReads);
            console.log('Total variable writes:', totalWrites);
            
            console.log('\nMost frequently read variables:');
            var sortedReads = Object.keys(variableReads).sort(function (a, b) {
                return variableReads[b] - variableReads[a];
            });
            for (var i = 0; i < Math.min(10, sortedReads.length); i++) {
                var varName = sortedReads[i];
                console.log('  ' + (i + 1) + '. ' + varName + ': ' + variableReads[varName] + ' reads');
            }

            console.log('\nMost frequently written variables:');
            var sortedWrites = Object.keys(variableWrites).sort(function (a, b) {
                return variableWrites[b] - variableWrites[a];
            });
            for (var j = 0; j < Math.min(10, sortedWrites.length); j++) {
                var varName2 = sortedWrites[j];
                console.log('  ' + (j + 1) + '. ' + varName2 + ': ' + variableWrites[varName2] + ' writes');
            }
            console.log('\n================================================\n');
        };
    }

    sandbox.analysis = new VariableTrackingAnalysis();
})(J$);

