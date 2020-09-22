//  注入title
const titleInjectFn = (outputName, html) => {
    let titlePlaceholder = '';
    let keywordsPlaceholder = '';
    let descriptionPlaceholder = '';
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
            titlePlaceholder = '地平线｜边缘人工智能芯片全球领导者';
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            break;

        case 'intelligent-cockpit.html':
            //  解决方案-智能驾驶-智能座舱
            titlePlaceholder = '解决方案-智能驾驶-智能座舱';
            break;

        case 'journey2.html':
            //  征程
            titlePlaceholder = '征程';
            break;

        case 'journey3.html':
            //  征程3
            titlePlaceholder = '征程3';
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
            keywordsPlaceholder = '地平线官网,边缘人工智能芯片全球领导者';
            descriptionPlaceholder = '地平线是边缘人工智能芯片的全球领导者。得益于前瞻性的软硬结合理念，地平线自主研发兼具极致效能与开放易用性的边缘人工智能芯片及解决方案，可面向智能驾驶以及更广泛的通用 AI 应用领域，提供包括高效能边缘 AI 芯片、丰富算法IP、开放工具链等在内的全面赋能服务。目前，地平线是国内唯一一家实现车规级人工智能芯片量产前装的企业。';
            break;

        case '404.html':
            //  not found
            titlePlaceholder = 'Not Found';
            break;
        default:
            break;
    }

    //  替换html meta
    html = html.replace('[[[custom-title]]]', titlePlaceholder);
    html = html.replace('[[[custom-keywords]]]', keywordsPlaceholder);
    html = html.replace('[[[custom-description]]]', descriptionPlaceholder);
    //  console.log('输出🍉🍉', html);
    return html;
};
module.exports = titleInjectFn;