var ncp = require("copy-paste");

var rep = {
  "0": "\u200b",
  "1": "\u200d"
};
var tpl = `
(
  (function() {
    var code = "@code".replace(/.{8}/g, function(a) {
      var rep = {
        "${rep["0"]}":"0",
        "${rep["1"]}":"1"
      };
      return String.fromCharCode(
        parseInt(a.replace(/./g, 
          function(a) {
            return rep[a]
          }
        ), 2)
      )});
    return code;
  })()
)`;

exports.toBlank = function(str, isCopy) {
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

exports.execBlank = function(str, type) {
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
