//  注入title
const titleInjectFn = (outputName, string) => {
    switch (outputName) {
        //  首页
        case 'index.html':

        case 'about.html':
            //  todo    这里需要百度地图
            string += `<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=W0xBY4G53d6qSbWYajZKeXVUEkbkM1Mo"></script>`;
            break;
        default:
            break;
    }
    console.log('输出🍉🍉', string);
    return string;
};
module.exports = titleInjectFn;