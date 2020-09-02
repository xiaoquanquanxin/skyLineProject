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

