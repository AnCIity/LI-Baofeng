// 输入框
var oComData = document.getElementsByClassName("content-input-title")[0].getElementsByTagName("em");
var oInput = document.getElementsByClassName("content-input-oper")[0];

// 排序选项
var oSort = document.getElementsByClassName("content-com")[0].children[0];
oSort.index = 0;

// 评论列表
var oList = document.getElementsByClassName("content-list")[0];

// 分页控制
var colChild = document.getElementsByClassName("content-page")[0];

// 数据
var itemNum = 5; // 每页显示数目
var pageNum = 0; // 总页数
var curPage = 1; // 当前页面
var data = []; // 评论数据


oInput.oninput = () => {
    if (oInput.innerHTML.length >= 140) {
        oInput.innerHTML = oInput.innerHTML.substring(0, 140)
        oInput.blur()
    }
    oComData[1].innerHTML = 140 - oInput.innerHTML.length;
}

ajax({
    "url": './static/recommend.json',
    "type": 'get',
    "success": res => {
        data = res.comment;

        // 计算数据
        pageNum = Math.ceil(data.length / itemNum)
        colChild.children[1].innerHTML = pageNum
        oComData[0].innerHTML = data.length

        // 初始按热度排序
        cutSort(0)
        // 载入第一页
        cutPage(1);

    }
})

// 排序切换单击事件
oSort.onclick = function (ev) {
    var ev = window.event || ev;
    var target = ev.target || ev.srcElement

    if (target.innerHTML == "按热度" && oSort.index != 0) {
        setState(0);
        cutSort(0);
        cutPage(1);
    }

    if (target.innerHTML == "按最新" && oSort.index != 1) {
        setState(1);
        cutSort(1);
        cutPage(1);
    }

}

colChild.onclick = function (ev) {
    var ev = window.event || ev;
    var target = ev.target || ev.srcElement

    if (target.innerHTML == "确定") {
        cutPage(parseInt(colChild.children[0].value))
    }
    if (target.innerHTML == "上一页") {
        cutPage(curPage - 1)
    }
    if (target.innerHTML == "下一页") {
        cutPage(curPage + 1)
    }

}

// 切换排序
function cutSort(index) {
    if (index == 0) {
        data = data.sort((a, b) => {
            return b.count - a.count
        })
    }
    if (index == 1) {
        data = data.sort((a, b) => {
            return new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time)
        })
    }
}

// 切换状态
function setState(state) {
    oSort.children[oSort.index].className = ""
    oSort.children[state].className = "select"
    oSort.index = state;
}

// 切换分页
function cutPage(page) {

    if (page > pageNum || page < 1) {
        return false
    }

    curPage = page;
    colChild.children[0].value = curPage;
    oList.innerHTML = ""

    let length = page == pageNum ? data.length : itemNum * page;

    for (let i = itemNum * page - itemNum; i < length; i++) {

        const element = data[i];
        addElement(oList, "li", `<div>
            <img src="${element.imgIco}" alt="">
            <div>
                <p>${element.userId}</p>
                <time>${element.date} ${element.time}</time>
            </div>
        </div>
        <p>${element.content}</p>
        <div class="clearfix">
            <span>赞 <i>${element.count}</i></span>
        </div>`)
    }
}



// 电影榜

var rankList = document.getElementsByClassName("rank-list")[0];
rankList.index = 0;

for (let i = 0; i < rankList.children.length; i++) {
    const element = rankList.children[i]
    element.index = i

    element.onmouseover = function () {

        if (element.index == rankList.index) {
            return false
        }

        rankList.children[rankList.index].className = "";
        element.className = "select";
        rankList.index = element.index;
    }

}



