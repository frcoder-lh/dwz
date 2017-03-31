var API_URL = url("api.littletools.ml")("/dwz");

$(document).ready(function () {

    $("#result").hide();

    $("#submit").click(function () {
        if (verify($("#in").val(), $("#out").val())) {
            $.ajax({
                url: API_URL,
                type: "GET",
                dataType: "json",
                async: true,
                data: {
                    "in": $("#in").val(),
                    "out": $("#out").val()
                },
                success: function (data) {
                    if (data.statu) {
                        $("#submit").unbind("click");
                        showResultDiv("http://dwz.littletools.ml/" + data.key);
                        tempBindCopy("#submit", "#url", reload);
                        $("#submit").text("复制");
                    }
                    else alert("短网址已被占用，请重新输入！");
                }
            });
        }
    });

    $("body").keydown(function () {
        if (event.keyCode == "13") {// 13是回车键
            $("#submit").click();
        }
    });

    console.log("Welcome to contact %o for any further question.", "frcoder.lh@hotmail.com");
});


function verify(url, out) {
    if (!url || !out) {
        alert("请输入要缩短的网址！");
        return false;
    }
    var REGEX_URL = /^((http|ftp|https):\/\/)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?(\/[a-zA-Z0-9\&%_\./-~-]*)?/;
    if (!REGEX_URL.test(url)) {
        alert("输入的网址格式不正确！");
        return false;
    }
    return true;
}

function showResultDiv(url) {
    $("#url").text(url).attr("href", url);
    $("#result").show();
}

function tempBindCopy(actor, target, success) {
    var clipboard = new Clipboard(actor, {
        text: function () {
            return $(target).text();
        }
    }).on("success", function () {
        alert($(target).text() + "已复制成功！");
        clipboard.destroy();
        success();
    });
}

function reload() {
    $("#submit").unbind("click");
    $("#submit").click(function () {
        window.location.reload();
    }).text("刷新");
}
