const kyber = require('./kyber768');

// 1. 生成密钥对
let [pk, sk] = kyber.KeyGen768();

// 2. 用公钥生成共享密钥 + 密文
let [c, ss1] = kyber.Encrypt768(pk);

// 3. 用私钥恢复共享密钥
let ss2 = kyber.Decrypt768(c, sk);

// 4. 输出结果
console.log("ss1:", ss1);
console.log("ss2:", ss2);

// 5. 判断是否一致
console.log("是否相同:", ss1.toString('hex') === ss2.toString('hex'));