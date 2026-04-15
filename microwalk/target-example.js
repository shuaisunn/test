/**
 * Executes the given testcase.
 * @param {Buffer} testcaseBuffer
 */
function processTestcase(testcaseBuffer) {
    // 1. 将 require 移入函数内部，避免顶层初始化顺序问题
    const kyber = require('../kyber512.js');

    const CIPHERTEXT_BYTES = 768;
    const SECRETKEY_BYTES = 1632;
    const EXPECTED_LENGTH = CIPHERTEXT_BYTES + SECRETKEY_BYTES;

    if (!testcaseBuffer || testcaseBuffer.length < EXPECTED_LENGTH) {
        return;
    }

    const c = new Uint8Array(testcaseBuffer.slice(0, CIPHERTEXT_BYTES));
    const sk = new Uint8Array(testcaseBuffer.slice(CIPHERTEXT_BYTES, EXPECTED_LENGTH));

    try {
        // 2. 这里的 Decrypt512 必须和 kyber512.js 最后的 module.exports 里的名字完全对应
        if (kyber && typeof kyber.Decrypt512 === 'function') {
            kyber.Decrypt512(c, sk);
        } else {
            // 如果你在 kyber512.js 里直接导出了函数，尝试这个：
            // Decrypt512(c, sk);
        }
    } catch (e) {
        // 捕获解密异常
    }
}

module.exports = { processTestcase };