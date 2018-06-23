var { toBlank, execBlank } = require("../lib");

var blanks = ["200b", "200d"];

describe("toBlank test", () => {
  test("blank content", () => {
    var blank = toBlank("var a = 1;");
    for (var i = 0; i < blank.length; i++) {
      expect(blanks).toContain(blank.charCodeAt(i).toString(16));
    }
  });

  test("blank content", () => {
    var resolve,
      promise = new Promise(_resolve => (resolve = _resolve));
    console.log = jest.fn(input => resolve(input));
    toBlank("var a = 1;", true);
    promise.then(data => expect(data).toBe("已复制到剪贴板"));
    return promise;
  });
});

describe("execBlank test", () => {
  var blank = toBlank("3 + 3");
  test("exec blank function", () => {
    expect(execBlank(blank)).toEqual(void 0);
  });

  test("exec blank eval", () => {
    expect(execBlank(blank, "eval")).toEqual(3 + 3);
  });

  test("exec blank error", () => {
    var msg,
      blank = toBlank("a()");
    console.warn = jest.fn(input => (msg = input));
    execBlank(blank);
    expect(msg).toBe("blank执行错误");
  });
});
