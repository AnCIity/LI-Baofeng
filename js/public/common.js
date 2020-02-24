/**
 * @author City
 * @method addMovieList - 添加视频列表数据
 * @param {HTMLElement} obj - 添加列表对象ul
 * @param {Array} arr - 数据数组
 */

function addMovieList(obj, arr) {
    arr.forEach(value => {

        let liData = `<div class="mod-list-top">
        <a href="#"><img src="${value.img}" alt=""></a>
        <em ${value.vip == 1 ? 'style="background-color: #ff8406;"><i>5元</i> VIP免费' : value.vip == 2 ? '>vip独享' : 'style="background-color: #ff8406;"><i>5元</i> VIP折扣点播'}</em>
        <span>${value.definition == 1 ? '标清' : value.definition == 2 ? '高清' : '超清'}</span>
        </div>
        <div class="mod-list-bottom">
            <h5>${value.title}</h5>
            <p>${value.detail}</p>
            <span>${value.score}</span>
        </div>`

        addElement(obj, "li", liData)
    });
}