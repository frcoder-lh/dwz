/**
 * 一些公共组件
 * Created by admin on 2016/10/28.
 */


/**
 * 获取url对象
 *
 * 当有3个参数时，@param a：protocol（http或https），@param b：host，@param c：prot
 * 当有2个参数时，@param a：host，@param b：prot （protocol：http）
 * 当有1个参数时，@param a：prot （protocol：http，host：localhost）
 * 当有0个参数时，（protocol：http，host：localhost，prot：80）
 * @returns {函数：
 *                  @param pathname
 *                  @returns {字符串：完整的网址}
 *                  属性：protocol，host，prot
 *          }
 */
function url(a, b, c) {
    if (a === "http" || a === "https") {
        var protocol = a;
        var host = b;
        var port = c || "80";
    } else if (a != undefined && /[^\d]/.test(a)) {
        var protocol = "http";
        var host = a;
        var port = b || "80";
    } else {
        var protocol = "http";
        var host = "localhost";
        var port = a || "80";
    }
    var create = function (pathname) {
        return protocol + "://" + host + ":" + port + pathname;
    }
    create.protocol = protocol;
    create.host = host;
    create.port = port;
    return create;
}

/**
 * 获取request中的Data
 *
 * @param url 带search部分的url或只有search部分
 * eg: http://www.test.com?name=lh&password=123
 * eg: name=lh&password=123
 *
 * @returns {Data对象}
 * eg: {name:lh,password:123}
 */
function getReqData(url) {
    var theRequest = new Object();
    var from = (url.indexOf("?"));
    var str = url.substr(from == -1 ? 0 : ++from);
    var strs = decodeURI(str).split("&");
    for (var i = 0; i < strs.length; i++) {
        var strss = strs[i].split("=");
        theRequest[strss[0]] = (strss[1]);
    }
    return theRequest;
}