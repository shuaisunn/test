// 1. 严格在最顶层加载，不放在任何逻辑判断里
const kyber = require('../kyber512.js');

/**
 * Executes the given testcase.
 * @param {Buffer} testcaseBuffer
 */
function processTestcase(testcaseBuffer) {
    // 定义常量
    const CIPHERTEXT_BYTES = 768;
    const SECRETKEY_BYTES = 1632;
    const EXPECTED_LENGTH = CIPHERTEXT_BYTES + SECRETKEY_BYTES;

    // 检查输入
    if (!testcaseBuffer || testcaseBuffer.length < EXPECTED_LENGTH) {
        return;
    }

    // 切分数据
    const c = new Uint8Array(testcaseBuffer.slice(0, CIPHERTEXT_BYTES));
    const sk = new Uint8Array(testcaseBuffer.slice(CIPHERTEXT_BYTES, EXPECTED_LENGTH));

    try {
        // 2. 这里的调用直接使用顶层的 kyber 变量
        // 确保你的 kyber512.js 结尾有 module.exports = { Decrypt512 }
        if (kyber && typeof kyber.Decrypt512 === 'function') {
            kyber.Decrypt512(c, sk);
        }
    } catch (e) {
        // 忽略解密过程中的错误
    }
}

// 3. 必须导出 processTestcase 函数供 Microwalk 调用
module.exports = { processTestcase };