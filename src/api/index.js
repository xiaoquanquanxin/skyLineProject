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
        //  get:params: { clientKey: CLIENT_IP, }
        //  post:data: data,
    });
}

//  获取首页数据
export function requestIndex(){
    return request({
        url: '/api/getindex',
        method: 'get',
        //  get:params: { clientKey: CLIENT_IP, }
        //  post:data: data,
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

//  天工开物
export function requestGetProductPartner(){
    return request({
        url: '/api/getproductpartner',
        method: 'get',
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
        url: `/api/getnewslist?category_id=${category_id}&page=${page}`,
        method: 'get',
    });
}

//  新闻详情
export function requestGetNewsDetail(id){
    if (isNaN(id)) {
        throw new Error(`错误的id：${id}`);
    }
    return request({
        url: `/api/getnewsdetail?id=${id}`,
        method: 'get',
    });
}