J$.iids = {"9":[2,12,2,13],"10":[2,12,2,17],"17":[2,16,2,17],"18":[6,12,6,17],"25":[2,12,2,17],"33":[2,5,2,18],"41":[1,1,3,2],"49":[1,1,3,2],"57":[1,1,3,2],"65":[1,1,3,2],"73":[6,12,6,13],"81":[6,16,6,17],"89":[6,12,6,17],"97":[6,5,6,18],"105":[5,1,7,2],"113":[5,1,7,2],"121":[5,1,7,2],"129":[5,1,7,2],"137":[9,1,9,8],"145":[9,13,9,22],"153":[9,24,9,27],"161":[9,28,9,29],"169":[9,31,9,32],"177":[9,24,9,33],"185":[9,1,9,34],"187":[9,1,9,12],"193":[9,1,9,35],"201":[10,1,10,8],"209":[10,13,10,22],"217":[10,24,10,32],"225":[10,33,10,34],"233":[10,36,10,37],"241":[10,24,10,38],"249":[10,1,10,39],"251":[10,1,10,12],"257":[10,1,10,40],"265":[1,1,10,40],"273":[1,1,3,2],"281":[1,1,10,40],"289":[5,1,7,2],"297":[1,1,10,40],"305":[1,1,3,2],"313":[1,1,3,2],"321":[5,1,7,2],"329":[5,1,7,2],"337":[1,1,10,40],"345":[1,1,10,40],"nBranches":0,"originalCodeFileName":"/workspaces/nodebb-fall-2025-strawberry/test_jalangi.js","instrumentedCodeFileName":"/workspaces/nodebb-fall-2025-strawberry/test_jalangi_jalangi_.js","code":"function add(a, b) {\n    return a + b;\n}\n\nfunction multiply(a, b) {\n    return a * b;\n}\n\nconsole.log('Result:', add(5, 3));\nconsole.log('Result:', multiply(4, 2));"};
jalangiLabel2:
    while (true) {
        try {
            J$.Se(265, '/workspaces/nodebb-fall-2025-strawberry/test_jalangi_jalangi_.js', '/workspaces/nodebb-fall-2025-strawberry/test_jalangi.js');
            function add(a, b) {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(41, arguments.callee, this, arguments);
                            arguments = J$.N(49, 'arguments', arguments, 4);
                            a = J$.N(57, 'a', a, 4);
                            b = J$.N(65, 'b', b, 4);
                            return J$.X1(33, J$.Rt(25, J$.B(10, '+', J$.R(9, 'a', a, 0), J$.R(17, 'b', b, 0), 0)));
                        } catch (J$e) {
                            J$.Ex(305, J$e);
                        } finally {
                            if (J$.Fr(313))
                                continue jalangiLabel0;
                            else
                                return J$.Ra();
                        }
                    }
            }
            function multiply(a, b) {
                jalangiLabel1:
                    while (true) {
                        try {
                            J$.Fe(105, arguments.callee, this, arguments);
                            arguments = J$.N(113, 'arguments', arguments, 4);
                            a = J$.N(121, 'a', a, 4);
                            b = J$.N(129, 'b', b, 4);
                            return J$.X1(97, J$.Rt(89, J$.B(18, '*', J$.R(73, 'a', a, 0), J$.R(81, 'b', b, 0), 0)));
                        } catch (J$e) {
                            J$.Ex(321, J$e);
                        } finally {
                            if (J$.Fr(329))
                                continue jalangiLabel1;
                            else
                                return J$.Ra();
                        }
                    }
            }
            add = J$.N(281, 'add', J$.T(273, add, 12, false, 41), 0);
            multiply = J$.N(297, 'multiply', J$.T(289, multiply, 12, false, 105), 0);
            J$.X1(193, J$.M(185, J$.R(137, 'console', console, 2), 'log', 0)(J$.T(145, 'Result:', 21, false), J$.F(177, J$.R(153, 'add', add, 1), 0)(J$.T(161, 5, 22, false), J$.T(169, 3, 22, false))));
            J$.X1(257, J$.M(249, J$.R(201, 'console', console, 2), 'log', 0)(J$.T(209, 'Result:', 21, false), J$.F(241, J$.R(217, 'multiply', multiply, 1), 0)(J$.T(225, 4, 22, false), J$.T(233, 2, 22, false))));
        } catch (J$e) {
            J$.Ex(337, J$e);
        } finally {
            if (J$.Sr(345)) {
                J$.L();
                continue jalangiLabel2;
            } else {
                J$.L();
                break jalangiLabel2;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
