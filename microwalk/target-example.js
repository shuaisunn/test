/**
 * Executes the given testcase.
 * @param {Buffer} testcaseBuffer
 */
function processTestcase(testcaseBuffer) {
    // 1. 严格遵守 ES5 语法，全篇使用 var
    // 2. 继续使用 global 注入法绕过 Jalangi2 的模块加载限制
    var target = global.kyber;

    // Kyber-768 的标准参数长度 (单位：字节)
    var CIPHERTEXT_BYTES = 1088;
    var SECRETKEY_BYTES = 2400;
    var EXPECTED_LENGTH = CIPHERTEXT_BYTES + SECRETKEY_BYTES; // 总长 3488 字节

    if (!testcaseBuffer || testcaseBuffer.length < EXPECTED_LENGTH) {
        return;
    }

    // 切分数据
    var c = new Uint8Array(testcaseBuffer.slice(0, CIPHERTEXT_BYTES));
    var sk = new Uint8Array(testcaseBuffer.slice(CIPHERTEXT_BYTES, EXPECTED_LENGTH));

    target.Decrypt768(c, sk);

}

// 严格使用 ES5 的键值对导出方式
module.exports = { processTestcase: processTestcase };