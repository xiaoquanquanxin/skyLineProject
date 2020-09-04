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

