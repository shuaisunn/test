// 1. 引入上一级目录的核心库
const kyber = require('../kyber512.js');

// Executes the given testcase.
// Parameters:
// - testcaseBuffer: Buffer object containing the bytes read from the testcase file.
function processTestcase(testcaseBuffer)
{
    // Kyber-512 的标准参数长度 (单位：字节)
    const CIPHERTEXT_BYTES = 768;
    const SECRETKEY_BYTES = 1632;
    const EXPECTED_LENGTH = CIPHERTEXT_BYTES + SECRETKEY_BYTES; // 总共 2400 字节

    // 检查 Microwalk 传入的测试用例长度是否足够
    if (!testcaseBuffer || testcaseBuffer.length < EXPECTED_LENGTH) {
        return;
    }

    // 2. 将传入的随机字节流切分为 密文(c) 和 私钥(privateKey)
    // 转换为 Uint8Array 以适配通常的密码学库 JavaScript 实现
    const c = new Uint8Array(testcaseBuffer.slice(0, CIPHERTEXT_BYTES));
    const privateKey = new Uint8Array(testcaseBuffer.slice(CIPHERTEXT_BYTES, EXPECTED_LENGTH));

    // 3. 调用目标解密函数
    try {
        // 确保 kyber512.js 正确导出了 Decrypt512
        if (kyber && typeof kyber.Decrypt512 === 'function') {
            kyber.Decrypt512(c, privateKey);
        } else if (typeof Decrypt512 === 'function') {
            // 兼容有些库可能是全局挂载的情况
            Decrypt512(c, privateKey);
        } else {
            console.error("未能找到 Decrypt512 函数，请检查 kyber512.js 的 module.exports 配置");
        }
    } catch (e) {
        // 【非常重要】捕获异常！
        // Microwalk 喂入的是随机字节，解密校验必定失败并抛出错误（例如 FO 变换校验失败）。
        // 捕获异常可以防止整个节点崩溃，让 Microwalk 继续分析后续的 Trace。
    }
}

module.exports = { processTestcase };