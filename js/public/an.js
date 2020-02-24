/**
 * @author City
 * @method ajax - 发送AJAX请求
 * @param {Object} res - 请求对象
 * {
 *     "url": "请求地址",
 *     "type": "请求类型",
 *     "data": "请求参数",
 *     "success": function (res) {
 *        console.log(res);
 *      }
 * }
 */

function ajax(res) {
    let ajax = new XMLHttpRequest();

    if (res.type == "get") { res.url = res.data ? `${res.url}?${res.data}` : res.url };

    ajax.open(res.type, res.url);

    if (res.type == "get") {
        ajax.send();
    } else {
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        ajax.send(res.data);
    };

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            if (ajax.responseText != "") {
                res.success(JSON.parse(ajax.responseText));
            }
        }
    }

}



/**
 * @author City
 * @method addElement - 追加元素
 * @param {HTMLElement} obj - 父级对象
 * @param {String} element - 标签
 * @param {String} content - 添加内容
 * @returns {HTMLElement} - 创建元素对象
 */

function addElement(obj, element, content) {
    // 创建元素
    let createElement = document.createElement(element);
    // 添加元素innerHTML
    createElement.innerHTML = content;
    // 向父级追加新建元素
    obj.appendChild(createElement);
    // 返回当前新建元素对象
    return createElement
}



/**
 * @author City
 * @method bufferMove - 属性动画
 * @param {HTMLElement} elem - 运动对象
 * @param {Object} attrs - 运动属性
 * @param {Number} time - 运动时长
 * @returns {Number} - 时钟指针
 */

function bufferMove(elem, attrs, time) {
    clearInterval(parseInt(elem.timer));
    elem.timer = setInterval(function () {
        var flag = true;

        for (const key in attrs) {
            // 获取当前值
            if (key === "opacity") {
                var cur = parseInt(getStyle(elem, key) * 100);
            } else {
                var cur = parseInt(getStyle(elem, key));
            }

            // 计算步长
            var speed = (attrs[key] - cur) / time;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // 清除定时器
            if (cur != attrs[key]) {
                flag = false;
            }

            // 让div移动
            if (key === "opacity") {
                elem.style[key] = (cur + speed) / 100;
                elem.style.filter = 'alpha(opacity=' + (cur + speed) + ')';
            } else {
                elem.style[key] = cur + speed + "px";
            }
        }

        if (flag) {
            clearInterval(parseInt(elem.timer));
        }

    }, 30);

    return elem.timer
}



/**
 * @author City
 * @method getStyle - 获取元素属性
 * @param {object} obj 元素对象
 * @param {String} attr 属性
 * @returns {String} - 获取到的属性值
 */

function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]
}