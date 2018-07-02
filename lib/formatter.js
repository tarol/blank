var { tpl } = require("./const");

module.exports = function(str) {
  str = tpl.replace("@code", str); // 生成模版
  try {
    return eval(str);
  } catch (e) {
    console.warn("blank解析错误");
  }
};