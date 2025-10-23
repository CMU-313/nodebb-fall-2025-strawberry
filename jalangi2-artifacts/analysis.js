/**
 * Jalangi2 Analysis Script
 * This script performs dynamic analysis on JavaScript code
 * tracking function calls, variable declarations, and operations
 */

(function (sandbox) {
    function MyAnalysis() {
        var functionCallCount = 0;
        var variableCount = 0;
        var binaryOperationCount = 0;
        var literalCount = 0;

        this.invokeFunPre = function (iid, f, base, args, isConstructor, isMethod, functionIid, functionSid) {
            functionCallCount++;
            console.log("Function called: " + (f.name || "anonymous"));
        };

        this.declare = function (iid, name, val, isArgument, argumentIndex, isCatchParam) {
            variableCount++;
            console.log("Variable declared: " + name);
        };

        this.binary = function (iid, op, left, right, result, isOpAssign, isSwitchCaseComparison, isComputed) {
            binaryOperationCount++;
            console.log("Binary operation: " + op);
            return { result: result };
        };

        this.literal = function (iid, val, hasGetterSetter) {
            literalCount++;
            return { result: val };
        };

        this.endExecution = function () {
            console.log("\n=== Jalangi2 Analysis Summary ===");
            console.log("Function calls: " + functionCallCount);
            console.log("Variable declarations: " + variableCount);
            console.log("Binary operations: " + binaryOperationCount);
            console.log("Literals: " + literalCount);
            console.log("================================\n");
        };
    }

    sandbox.analysis = new MyAnalysis();
})(J$);
