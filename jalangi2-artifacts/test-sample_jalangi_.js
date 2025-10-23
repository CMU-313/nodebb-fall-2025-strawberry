J$.iids = {"nBranches":2,"originalCodeFileName":"/Users/michelleguo/Desktop/17313/nodebb-fall-2025-strawberry/jalangi2-artifacts/test-sample.js","instrumentedCodeFileName":"/Users/michelleguo/Desktop/17313/nodebb-fall-2025-strawberry/jalangi2-artifacts/test-sample_jalangi_.js"};
jalangiLabel3:
    while (true) {
        try {
            J$.Se(665, '/Users/michelleguo/Desktop/17313/nodebb-fall-2025-strawberry/jalangi2-artifacts/test-sample_jalangi_.js', '/Users/michelleguo/Desktop/17313/nodebb-fall-2025-strawberry/jalangi2-artifacts/test-sample.js');
            function fibonacci(n) {
                jalangiLabel0:
                    while (true) {
                        try {
                            J$.Fe(129, arguments.callee, this, arguments);
                            arguments = J$.N(137, 'arguments', arguments, 4);
                            n = J$.N(145, 'n', n, 4);
                            if (J$.X1(745, J$.C(8, J$.B(10, '<=', J$.R(9, 'n', n, 0), J$.T(17, 1, 22, false), 0)))) {
                                return J$.X1(41, J$.Rt(33, J$.R(25, 'n', n, 0)));
                            }
                            return J$.X1(121, J$.Rt(113, J$.B(34, '+', J$.F(73, J$.R(49, 'fibonacci', fibonacci, 1), 0)(J$.B(18, '-', J$.R(57, 'n', n, 0), J$.T(65, 1, 22, false), 0)), J$.F(105, J$.R(81, 'fibonacci', fibonacci, 1), 0)(J$.B(26, '-', J$.R(89, 'n', n, 0), J$.T(97, 2, 22, false), 0)), 0)));
                        } catch (J$e) {
                            J$.Ex(753, J$e);
                        } finally {
                            if (J$.Fr(761))
                                continue jalangiLabel0;
                            else
                                return J$.Ra();
                        }
                    }
            }
            function greet(name) {
                jalangiLabel1:
                    while (true) {
                        try {
                            J$.Fe(249, arguments.callee, this, arguments);
                            arguments = J$.N(257, 'arguments', arguments, 4);
                            name = J$.N(265, 'name', name, 4);
                            J$.N(273, 'message', message, 0);
                            var message = J$.X1(185, J$.W(177, 'message', J$.B(50, '+', J$.B(42, '+', J$.T(153, "Hello, ", 21, false), J$.R(161, 'name', name, 0), 0), J$.T(169, "!", 21, false), 0), message, 1));
                            J$.X1(217, J$.M(209, J$.R(193, 'console', console, 2), 'log', 0)(J$.R(201, 'message', message, 0)));
                            return J$.X1(241, J$.Rt(233, J$.R(225, 'message', message, 0)));
                        } catch (J$e) {
                            J$.Ex(769, J$e);
                        } finally {
                            if (J$.Fr(777))
                                continue jalangiLabel1;
                            else
                                return J$.Ra();
                        }
                    }
            }
            function calculateSum(a, b, c) {
                jalangiLabel2:
                    while (true) {
                        try {
                            J$.Fe(393, arguments.callee, this, arguments);
                            arguments = J$.N(401, 'arguments', arguments, 4);
                            a = J$.N(409, 'a', a, 4);
                            b = J$.N(417, 'b', b, 4);
                            c = J$.N(425, 'c', c, 4);
                            J$.N(433, 'sum', sum, 0);
                            J$.N(441, 'average', average, 0);
                            var sum = J$.X1(313, J$.W(305, 'sum', J$.B(66, '+', J$.B(58, '+', J$.R(281, 'a', a, 0), J$.R(289, 'b', b, 0), 0), J$.R(297, 'c', c, 0), 0), sum, 1));
                            var average = J$.X1(345, J$.W(337, 'average', J$.B(74, '/', J$.R(321, 'sum', sum, 0), J$.T(329, 3, 22, false), 0), average, 1));
                            return J$.X1(385, J$.Rt(377, J$.T(369, {
                                sum: J$.R(353, 'sum', sum, 0),
                                average: J$.R(361, 'average', average, 0)
                            }, 11, false)));
                        } catch (J$e) {
                            J$.Ex(785, J$e);
                        } finally {
                            if (J$.Fr(793))
                                continue jalangiLabel2;
                            else
                                return J$.Ra();
                        }
                    }
            }
            fibonacci = J$.N(681, 'fibonacci', J$.T(673, fibonacci, 12, false, 129), 0);
            greet = J$.N(697, 'greet', J$.T(689, greet, 12, false, 249), 0);
            calculateSum = J$.N(713, 'calculateSum', J$.T(705, calculateSum, 12, false, 393), 0);
            J$.N(721, 'result1', result1, 0);
            J$.N(729, 'result2', result2, 0);
            J$.N(737, 'result3', result3, 0);
            var result1 = J$.X1(481, J$.W(473, 'result1', J$.F(465, J$.R(449, 'fibonacci', fibonacci, 1), 0)(J$.T(457, 5, 22, false)), result1, 3));
            var result2 = J$.X1(521, J$.W(513, 'result2', J$.F(505, J$.R(489, 'greet', greet, 1), 0)(J$.T(497, "NodeBB", 21, false)), result2, 3));
            var result3 = J$.X1(577, J$.W(569, 'result3', J$.F(561, J$.R(529, 'calculateSum', calculateSum, 1), 0)(J$.T(537, 10, 22, false), J$.T(545, 20, 22, false), J$.T(553, 30, 22, false)), result3, 3));
            J$.X1(617, J$.M(609, J$.R(585, 'console', console, 2), 'log', 0)(J$.B(82, '+', J$.T(593, "Fibonacci(5) = ", 21, false), J$.R(601, 'result1', result1, 1), 0)));
            J$.X1(657, J$.M(649, J$.R(625, 'console', console, 2), 'log', 0)(J$.T(633, "Sum calculation:", 21, false), J$.R(641, 'result3', result3, 1)));
        } catch (J$e) {
            J$.Ex(801, J$e);
        } finally {
            if (J$.Sr(809)) {
                J$.L();
                continue jalangiLabel3;
            } else {
                J$.L();
                break jalangiLabel3;
            }
        }
    }
// JALANGI DO NOT INSTRUMENT
