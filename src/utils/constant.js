/***
 *
 * 常量
 *
 * ****/
//  相对宽度，浏览器resize用
export const BASIC_COMPARE_WIDTH = 768;

//  页面地址，相对路径
export const pathConfig = {
    //  智能驾驶
    intelligentDriving: '/intelligentDriving.html',
    //  视觉
    visual: '/visual.html',
    //  语音
    voice: '/voice.html',
};

//  导航的index，⚠️注意️，服务端配置路由的话，前端需要做好map映射，以下的index仅用于前端激活状态的index比较
export const headerNavIndex = {
    //  首页
    home: { index: 0 },
    //  核心技术
    technology: { index: 1 },
    //  产品中心
    production: {
        index: 2,
        //  征程 Journey
        journey2: {}
    },
    //  解决方案

};