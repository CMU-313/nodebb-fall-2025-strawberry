(function (sandbox) {
      function MyAnalysis() {
          this.invokeFunPre = function (iid, f, base, args, isConstructor, isMethod, functionIid, 
  functionSid) {
              console.log('Function called at location ' + iid);
          };
      }
      sandbox.analysis = new MyAnalysis();
  })(J$);

