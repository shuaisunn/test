// index.js
const kyber = require('./kyber512.js');
global.kyber = kyber; // 注入全局

// 后面原本的代码保持不变...




function __MICROWALK_testcaseBegin(){}
function __MICROWALK_testcaseEnd(){}

var fs = require('fs');
var target = require(`./microwalk/${process.env.TARGET_NAME}`);

// Get list of testcase files
var testcaseDirectoryPath = process.env.JS_TESTCASE_DIRECTORY;
var testcases = fs.readdirSync(testcaseDirectoryPath);

// Execute first testcase early as trace prefix
console.log(`Running testcase 0 as trace prefix`);
console.log("  begin");
target.processTestcase(fs.readFileSync(`${testcaseDirectoryPath}/${testcases[0]}`));
console.log("  end");

// Execute all testcases
for(var i = 0; i < testcases.length; i++)
{
    console.log(`Running testcase ${i}`);

    // Read testcase file
    var testcaseBuffer = fs.readFileSync(`${testcaseDirectoryPath}/${testcases[i]}`);

    // Process testcase
    console.log("  begin");
    __MICROWALK_testcaseBegin();
    target.processTestcase(testcaseBuffer);
    __MICROWALK_testcaseEnd();
    console.log("  end");
}
