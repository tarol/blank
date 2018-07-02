var { rep, tpl } = require("./const");

module.exports = function(str, type) {
  str = tpl.replace("@code", str); // 生成模版
  if (type === "eval") {
    str = "eval" + str;
  } else {
    str = "Function" + str + "()";
  }
  try {
    return eval(str);
  } catch (e) {
    console.warn("blank执行错误");
  }
};
