import { request } from '@utils/request';

//  获取header导航
export function requestHeaderNav(){
    return request({
        url: '/api/getnav',
        method: 'get',
        //  get:params: { clientKey: CLIENT_IP, }
        //  post:data: data,
    });
}

//  获取footer数据
export function requestFooterNav(){
    return request({
        url: '/api/getfooter',
        method: 'get',
    });
}

//  获取首页数据
export function requestIndex(){
    return request({
        url: '/api/getindex',
        method: 'get',
    });
}

//  各个页面的参数请求
export function requestGetBannerByType(type){
    return request({
        url: '/api/getbanner',
        method: 'get',
        params: { type },
    });
}


//  高级别辅助驾驶
export function requestGetDriverClient(){
    return request({
        url: '/api/getdriverclient',
        method: 'get',
    });
}

//  智能座舱
export function requestGetCockPitPartner(){
    return request({
        url: '/api/getcockpitpartner',
        method: 'get',
    });
}

//  高精地图
export function requestGetMapClient(){
    return request({
        url: '/api/getmapclient',
        method: 'get',
    });
}

//  智能物联网
export function requestGetIotPartner(){
    return request({
        url: '/api/getiotpartner',
        method: 'get',
    });
}

//  新闻类型
export function requestGetNewsCategory(){
    return request({
        url: '/api/getnewscategory',
        method: 'get',
    });
}

//  新闻内容列表
export function requestGetNewsList(category_id, page){
    page = page || 1;
    category_id = category_id || '';
    return request({
        url: '/api/getnewslist',
        method: 'get',
        params: { category_id, page }
    });
}

//  新闻详情
export function requestGetNewsDetail(id){
    if (isNaN(id)) {
        throw new Error(`错误的id：${id}`);
    }
    return request({
        url: '/api/getnewsdetail',
        method: 'get',
        params: { id }
    });
}

//  关于我们
export function requestGetAboutUs(){
    return request({
        url: '/api/getaboutus',
        method: 'get',
    });
}

//  表单提交
export function requestSave({
    content,
    fullname,
    contact,
    company,
    position,
    email,
}){
    return request({
        url: '/api/save',
        method: 'post',
        data: {
            title: document.title,
            content,
            fullname,
            contact,
            company,
            position,
            email,
        }
    });
}

//  获取seo
export function requestGetSeo(nav_id){
    return request({
        url: '/api/getseo',
        method: 'get',
        params: { nav_id },
    });
}

//  获取页面文案接口
export function requestGetPageContent(name){
    return request({
        url: '/api/getpagecontent',
        method: 'get',
        params: { name },
    });
}

//  获取图片标题接口
export function requestGetImgTitle(name){
    return request({
        url: '/api/getimgtitle',
        method: 'get',
        params: { name },
    });
}

//  获取图片标题接口
export function requestGetClientCase(type){
    return request({
        url: '/api/getclientcase',
        method: 'get',
        params: { type },
    });
}