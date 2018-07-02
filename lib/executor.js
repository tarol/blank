var { tpl } = require("./const");

module.exports = function(str, type, isDeb) {
  str = tpl.replace("@code", str); // 生成模版
  if (type === "eval") {
    str = "eval" + str;
  } else {
    str = "Function" + str + "()";
  }
  try {
    return eval(str);
  } catch (e) {
    if (isDeb) {
      console.log(e);
    } else {
      console.warn("blank执行错误");
    }
  }
};
