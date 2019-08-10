/**
 * 被监听文件
 */

(function () {

    // 查找根节点 app 元素
    var root = document.querySelector('#app');

    var wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'container');
    wrapper.innerHTML = `
            <div style="color: red;font-size: 38px;">
                我是好孩子，我来自东北！！！
            </div>
        `;

    root.appendChild(wrapper);
})();