/**
 * Jalangi2 Analysis Script
 * This script demonstrates Jalangi2 functionality by tracking function invocations
 */

(function (sandbox) {
    function MyAnalysis() {
        var functionCallCount = 0;
        var functionCalls = {};

        /**
         * This callback is called before a function, method, or constructor invocation.
         */
        this.invokeFunPre = function (iid, f, base, args, isConstructor, isMethod, functionIid, functionSid) {
            functionCallCount++;
            var functionName = f.name || 'anonymous';
            
            if (!functionCalls[functionName]) {
                functionCalls[functionName] = 0;
            }
            functionCalls[functionName]++;
        };

        /**
         * This callback is called at the end of execution
         */
        this.endExecution = function () {
            console.log('\n========== Jalangi2 Analysis Results ==========');
            console.log('Total function calls:', functionCallCount);
            console.log('\nFunction call breakdown:');
            
            // Sort functions by call count
            var sortedFunctions = Object.keys(functionCalls).sort(function (a, b) {
                return functionCalls[b] - functionCalls[a];
            });
            
            // Display top 10 most called functions
            console.log('Top 10 most called functions:');
            for (var i = 0; i < Math.min(10, sortedFunctions.length); i++) {
                var funcName = sortedFunctions[i];
                console.log('  ' + (i + 1) + '. ' + funcName + ': ' + functionCalls[funcName] + ' calls');
            }
            console.log('\n===============================================\n');
        };
    }

    sandbox.analysis = new MyAnalysis();
})(J$);

