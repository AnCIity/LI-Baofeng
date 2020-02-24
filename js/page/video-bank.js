var modList = document.getElementsByClassName("mod-list")[0];
var oFilter = document.getElementsByClassName("bank-filter")[0];
var oUl = oFilter.getElementsByTagName("ul");
var data = [];

// 向选项插入当前索引
for (let i = 0; i < oUl.length; i++) {
    const element = oUl[i];
    element.index = 0
}

// 发送请求
ajax({
    "url": "./static/playMove.json",
    "type": "get",
    "success": res => {
        data = res
        reLoadVideo()
    }
})


oFilter.onclick = function (ev) {
    var ev = window.event || ev;
    var target = ev.target;

    selectElement(false)

    switch (target.innerHTML) {
        case "全部":
            target.parentNode.index = 0;
            break;
        case "VIP会员免费":
            target.parentNode.index = 1;
            break;
        case "VIP独享":
            target.parentNode.index = 2;
            break;
        case "VIP折扣点播":
            target.parentNode.index = 3;
            break;
        case "最近更新":
            target.parentNode.index = 0;
            break;
        case "最受欢迎":
            target.parentNode.index = 1;
            break;
        default:
            break;
    }

    reLoadVideo()
}

// 重载视频数据
function reLoadVideo() {
    // 选中当前选项
    selectElement(true)

    // 刷新数据
    modList.innerHTML = "";
    addMovieList(modList, filterSortVideo(data));
}

// 操作选项类名
function selectElement(select) {
    let result = select ? "select" : "";
    oUl[0].children[oUl[0].index].className = result;
    oUl[1].children[oUl[1].index].className = result;
}

// 数据筛选排序
function filterSortVideo(arr) {

    arr = arr.filter(value => {
        if (oUl[0].index == 0) {
            return true
        }

        return value.vip == oUl[0].index
    })

    arr = arr.sort((a, b) => {
        switch (oUl[1].index) {
            case 0:
                return new Date(b.date) - new Date(a.date)
                break;
            case 1:
                return parseFloat(b.score) - parseFloat(a.score)
                break;
            default:
                break;
        }
    })

    return arr

}