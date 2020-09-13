//  注入title
const titleInjectFn = (outputName, html) => {
    let titlePlaceholder = '';
    switch (outputName) {
        case 'about.html':
            //  关于我们
            titlePlaceholder = '关于我们';
            break;

        case 'adas.html':
            //  解决方案-智能驾驶-高级别辅助驾驶
            titlePlaceholder = '解决方案-智能驾驶-高级别辅助驾驶';
            break;

        case 'aiot.html':
            //  智能物联网
            titlePlaceholder = '智能物联网';
            break;

        case 'autonomous-driving.html':
            //  解决方案-智能驾驶-自动驾驶
            titlePlaceholder = '解决方案-智能驾驶-自动驾驶';
            break;

        case 'index.html':
            //  首页
            titlePlaceholder = '地平线';
            break;

        case 'intelligent-cockpit.html':
            //  解决方案-智能驾驶-智能座舱
            titlePlaceholder = '解决方案-智能驾驶-智能座舱';
            break;

        case 'journey2.html':
            //  征程
            titlePlaceholder = '征程';
            break;

        case 'matrix.html':
            //  产品中心-MATRIX
            titlePlaceholder = '产品中心-MATRIX';
            break;
        case 'navinet.html':
            //  解决方案-智能驾驶-高精地图
            titlePlaceholder = '解决方案-智能驾驶-高精地图';
            break;

        case 'news.html':
            //  新闻中心
            titlePlaceholder = '新闻中心';
            break;

        case 'news-detail.html':
            //  新闻详情
            titlePlaceholder = '新闻详情';
            break;

        case 'open-explorer.html':
            //  产品中心-天工开物
            titlePlaceholder = '产品中心-天工开物';
            break;

        case 'sunrise2.html':
            //  产品中心-旭日 Sunrise-旭日2
            titlePlaceholder = '产品中心-旭日 Sunrise-旭日2';
            break;

        case 'sunrise3.html':
            //  产品中心-旭日 Sunrise-旭日3
            titlePlaceholder = '产品中心-旭日 Sunrise-旭日3';
            break;

        case 'technology.html':
            //  核心技术
            titlePlaceholder = '核心技术';
            break;

        //  fixme   好像没有
        case 'visual.html':
            //  视觉
            titlePlaceholder = '视觉';
            break;

        case 'voice.html':
            //  语音
            titlePlaceholder = '语音';
            break;

        default:
            break;
    }

    //  替换html
    html = html.replace('[[[custom-title]]]', titlePlaceholder);
    console.log('输出🍉🍉', html);
    return html;
};
module.exports = titleInjectFn;