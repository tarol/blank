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

exports.rep = rep;
exports.tpl = tpl;