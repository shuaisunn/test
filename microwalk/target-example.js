/**
 * Executes the given testcase.
 * @param {Buffer} testcaseBuffer
 */
function processTestcase(testcaseBuffer) {
    // 不再使用 require，直接尝试从全局变量访问
    // 如果你在 index.js 里挂载了 global.kyber，这里就用 global.kyber
    const target = global.kyber;

    const CIPHERTEXT_BYTES = 768;
    const SECRETKEY_BYTES = 1632;
    const EXPECTED_LENGTH = CIPHERTEXT_BYTES + SECRETKEY_BYTES;

    if (!testcaseBuffer || testcaseBuffer.length < EXPECTED_LENGTH) {
        return;
    }

    const c = new Uint8Array(testcaseBuffer.slice(0, CIPHERTEXT_BYTES));
    const sk = new Uint8Array(testcaseBuffer.slice(CIPHERTEXT_BYTES, EXPECTED_LENGTH));

    try {
        if (target && typeof target.Decrypt512 === 'function') {
            target.Decrypt512(c, sk);
        }
    } catch (e) {
        // 忽略解密异常
    }
}

module.exports = { processTestcase };