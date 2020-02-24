var oForm = document.forms[0];
var oTip = oForm.children[0];
var verify = ""; // 验证码
var ok = [false, false, false, false];

if (window.location.hash == "#in") {
    document.getElementsByClassName("body-title")[0].innerHTML = "账号登录";
    document.getElementsByClassName("form-verify")[0].style.display = "none";
    document.getElementsByClassName("form-msg")[0].style.display = "none";
    let tip = document.getElementsByClassName("form-tip")[0];
    tip.getElementsByTagName("span")[0].innerHTML = " 记住我";
    tip.getElementsByTagName("span")[1].innerHTML = `<a href="./sign.html#up" onclick="window.location='./sign.html#up';window.location.reload()">立即注册</a> | <a href="#">找回密码</a></span>`;
    oForm.submit.value = "登录";

    document.getElementsByClassName("yzmdl")[0].style.display = "block";

    oForm.onsubmit = function () {
        if (oForm.tel.value == "admin" && oForm.password.value == "123456") {
            alert("登录成功")
        }

        return false
    }

} else {

    reVerify()

    // 验证手机号
    oForm.tel.onblur = function () {
        let reg = /^1\d{10}$/;
        if (reg.exec(oForm.tel.value)) {
            if (oTip.innerHTML == "请输入正确手机号") {
                oTip.innerHTML = ""
            }
            ok[0] = true;
        } else {
            oTip.innerHTML = "请输入正确手机号"
            ok[0] = false;
        }
    }


    let reg = [/\d/, /[a-z]/, /[A-Z]/, /[~!@#$%^&*]/]

    // 验证密码
    oForm.password.oninput = function () {
        let count = 0;
        reg.forEach(element => {
            if (element.test(oForm.password.value)) {
                count++
            }
        });

        if (count == 0) {
            oTip.innerHTML = "非法字符";
            ok[1] = false;
            return false;
        }

        if (oTip.innerHTML == "非法字符") {
            oTip.innerHTML = "";
        }

        if (/.{5,32}/.test(oForm.password.value) == false) {
            oTip.innerHTML = "密码过于简单";
            ok[1] = false;
            return false;
        }

        if (oTip.innerHTML == "密码过于简单") {
            oTip.innerHTML = "";
        }

        ok[1] = true;

        let passText = oForm.password.nextElementSibling;

        switch (count) {
            case 1:
                setPassText("弱")
                passText.style.backgroundColor = "red";
                break;
            case 2:
                setPassText("中")
                passText.style.backgroundColor = "orange";
                break;
            case 3:
                setPassText("强")
                passText.style.backgroundColor = "#44e86c";
                break;
            case 4:
                setPassText("赞")
                passText.style.backgroundColor = "#42a4eb";
                break;
            default:
                passText.style.display = "none";
                break;
        }

        function setPassText(state) {
            passText.style.display = "block";
            passText.innerHTML = state;
        }

    }

    // 单击更换验证码
    document.getElementById("reVerify").onclick = function () {
        reVerify()
    }

    // 验证验证码
    oForm.verify.onblur = function () {
        if (oForm.verify.value == verify) {
            if (oTip.innerHTML == "请输入正确验证码") {
                oTip.innerHTML = "";
            }
            ok[2] = true;
        } else {
            oTip.innerHTML = "请输入正确验证码";
            reVerify();
            ok[2] = false;
        }
    }

    // 验证短信
    oForm.msg.onblur = function () {
        let reg = /^\d{4}$/;

        if (reg.exec(oForm.msg.value)) {
            if (oTip.innerHTML == "请输入正确短信验证码") {
                oTip.innerHTML = ""
            }
            ok[3] = true;
        } else {
            oTip.innerHTML = "请输入正确短信验证码"
            ok[3] = false;
        }
    }

    // 表单提交
    oForm.onsubmit = function () {
        if (ok.every(value => {
            return value
        })) {
            alert("注册成功")
        }

        return false
    }

}


function reVerify() {
    let str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    let result = "";
    for (let i = 0; i < 4; i++) {
        result += str[parseInt(Math.random() * 62)];
    }
    document.getElementById("verify").innerHTML = result;
    verify = result;
}