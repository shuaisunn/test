const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 配置参数 (Kyber-512)
const NUM_TESTCASES = 16; // 生成 16 个测试用例 (t0 到 t15)
const CIPHERTEXT_BYTES = 768;
const SECRETKEY_BYTES = 1632;
const TOTAL_BYTES = CIPHERTEXT_BYTES + SECRETKEY_BYTES; // 2400

// 目标文件夹路径
const outputDir = path.join(__dirname, 'microwalk', 'testcases', 'target-example');

// 确保目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`准备生成 ${NUM_TESTCASES} 个测试用例，每个大小 ${TOTAL_BYTES} 字节...`);

// 循环生成文件
for (let i = 0; i < NUM_TESTCASES; i++) {
    const filename = `t${i}.testcase`;
    const filepath = path.join(outputDir, filename);

    // 针对侧信道 TVLA (Test Vector Leakage Assessment) 测试的经典策略：
    // 一半用例使用固定的私钥（模拟攻击者目标），一半使用随机私钥
    // 这里为了让你先跑通，我们全部生成安全的高质量随机字节
    const buffer = crypto.randomBytes(TOTAL_BYTES);

    fs.writeFileSync(filepath, buffer);
    console.log(`已生成: ${filename}`);
}

console.log('✅ 所有测试用例生成完毕！');