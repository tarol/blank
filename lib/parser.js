var ncp = require("copy-paste");
var { rep } = require("./const");

module.exports = function(str, isCopy) {
  str = str.replace(/[^\x00-\xff]/g, function(a) {
    // 转码 Latin-1 编码以外的字符。
    return escape(a).replace("%", "\\");
  });

  str = str.replace(/[\s\S]/g, function(a) {
    // 处理二进制数据并且进行数据替换
    a = a.charCodeAt().toString(2);
    a = a.length < 8 ? Array(9 - a.length).join("0") + a : a;
    return a.replace(/./g, function(a) {
      return rep[a];
    });
  });
  if (isCopy) {
    ncp.copy(`execBlank("${str}")`, function() {
      console.log("已复制到剪贴板");
    });
  }
  return str;
};
