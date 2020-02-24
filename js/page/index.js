// 轮播图 start
// 获取元素
var oCarou = document.getElementById("carousel");
var bigImg = oCarou.getElementsByClassName("img")[0].getElementsByTagName("img")[0]
var option = oCarou.getElementsByClassName("option")[0]
var smallImg = option.getElementsByTagName("img")
var dire = oCarou.getElementsByClassName("dire")
var carIndex = 0;
var autoTimer = null;
var moveTimer = null;

// 获取轮播数据
ajax({
    "url": './static/banner.json',
    "type": 'get',
    "success": res => {
        let data = res.data;

        // 初始化展示图片
        bigImg.src = data[0].big_img;

        data.forEach((element, index) => {
            // 创建选项
            let obj = addElement(option, "li", `<img src="${element.small_img}" alt="">`);
            // 添加遮罩
            obj.className = "shade";
            // 添加索引
            obj.index = index;

            // 鼠标移入选项
            obj.onmouseover = function () {
                cutImg(index)
            }

        });

        // 初始化选项
        smallImg[0].parentNode.className = "";
        smallImg[0].parentNode.style.border = "1px solid white"


        // 开启定时器
        autoTimer = setInterval(auto, 2000);

        function auto() {
            let calcIndex = carIndex + 1;
            cutImg(calcIndex)
        }

        // 移入轮播图关闭
        oCarou.onmouseover = function () {
            clearInterval(autoTimer);
        }
        // 移出轮播图开启
        oCarou.onmouseout = function () {
            autoTimer = setInterval(auto, 2000);
        }

        // 单击左右开始
        dire[0].onclick = function () {
            let calcIndex = carIndex - 1;
            cutImg(calcIndex);
        }
        dire[1].onclick = function () {
            let calcIndex = carIndex + 1;
            cutImg(calcIndex);
        }

        // 轮播图切换操作
        function cutImg(index) {
            // 判断当前与切换索引是否相等
            if (index === carIndex) {
                return false
            }

            // 判断索引导向
            index == smallImg.length ? index = 0 : index < 0 ? index = smallImg.length - 1 : null

            // 先清除定时器
            clearInterval(moveTimer);

            // 修改展示图片
            bigImg.style.opacity = .5;
            bigImg.src = data[index].big_img;
            moveTimer = bufferMove(bigImg, {
                "opacity": 100
            }, 40)

            // 清空当前选项样式
            if (carIndex >= 0 && carIndex < smallImg.length) {
                smallImg[carIndex].parentNode.className = "shade";
                smallImg[carIndex].parentNode.style.border = "1px solid transparent"
            }

            // 设置切换选项样式
            smallImg[index].parentNode.className = "";
            smallImg[index].parentNode.style.border = "1px solid white"

            // 更新索引
            carIndex = index;
        }

    }
})


// VIP模块
var vipDire = document.getElementsByClassName("vip-dire");
var vipUl = document.getElementsByClassName("vip-car")[0].children[0];
var vipLi = vipUl.getElementsByTagName("li");

for (let i = 0; i < vipLi.length; i++) {
    vipLi[i].style.backgroundPosition = i * -200 + "px " + "0"
}

vipDire[0].onclick = function () {
    bufferMove(vipUl, {
        "margin-left": 0
    }, 10)
}

vipDire[1].onclick = function () {
    bufferMove(vipUl, {
        "margin-left": -1100
    }, 10)
}


// 插入视频数据
var modList = document.getElementsByClassName("mod-list");

ajax({
    "url": "./static/hot.json",
    "type": "get",
    "success": res => {
        // 插入推荐数据
        addMovieList(modList[0], res.recommend)
        // 插入热映数据
        addMovieList(modList[1], res.hot_showing)
    }
})

