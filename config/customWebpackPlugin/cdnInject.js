//  注入title
/**
 * @param {string} pathName
 * @param {string} html
 * @param {string} preString
 * */
const cdnInject = (pathName, html, preString) => {
    switch (pathName) {
        //  首页
        case 'index.html':
            break;
        case 'about.html':
            //  百度地图🌍
            preString += `<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=W0xBY4G53d6qSbWYajZKeXVUEkbkM1Mo"></script>`;
            break;
        default:
            break;
    }
    //  console.log('输出🍉🍉', preString);
    //  preString += `<div>${pathName}</div>`;
    //  替换html
    html = html.replace('[[[custom-js-cdn-placeholder]]]', preString);
    return html;
};
module.exports = cdnInject;