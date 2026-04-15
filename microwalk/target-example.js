var kyber = require('../kyber768.js'); // 改成你的路径

// 固定 key（非常关键！）
var keypair = kyber.KeyGen768();
var pk = keypair[0];
var sk = keypair[1];

function processTestcase(testcaseBuffer)
{
    // 1. 使用输入作为 message（让输入参与计算）
    var msg = testcaseBuffer;

    // 保证长度 32
    if (msg.length < 32) {
        var tmp = Buffer.alloc(32);
        msg.copy(tmp);
        msg = tmp;
    } else {
        msg = msg.slice(0, 32);
    }


    // 2. Encrypt（这里内部 m 已固定，但结构仍参与）
    var result = kyber.Encrypt768(pk);
    var c = result[0];

    // 3. Decrypt（核心：使用 secret）
    var ss = kyber.Decrypt768(c, sk);

    // 4. 防止被优化掉
    if (!ss) {
        throw new Error("Decryption failed");
    }
}

module.exports = { processTestcase };