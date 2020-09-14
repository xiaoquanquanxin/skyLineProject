//  倒计时
import { resizeListener, scrollListener } from '@utils/eventListener';
import { BASIC_COMPARE_WIDTH } from '@utils/constant';

export function timeSurplus(countDown){
    const surplus = new Date(countDown).getTime() + 15 * 60 * 1000 - new Date().getTime();
    //  秒
    return Math.trunc(surplus / 1000);
}

//  将时间戳转为展示时间
export function standardTime(timeStamp){
    const minutes = Math.trunc(timeStamp / 60);
    const seconds = timeStamp % 60;
    return `${fillUpWithZero(minutes)}分${fillUpWithZero(seconds)}秒`;
}

//  补充零
function fillUpWithZero(n){
    return n > 9 ? n : '0' + n;
}

//  空函数
export function emptyFunction(){}

//  header排序，按rank排序
/**
 * @param {Array}list
 * @param {String}rank
 * **/
export function navSortByRank(list, rank){
    if (rank === undefined) {
        throw new Error(`排序规则?${rank}`);
    }
    //  如果不是一个合格的数组
    if (!list || !list.length || !Array.prototype.isPrototypeOf(list)) {
        return;
    }
    list.sort((a, b) => a[rank] - b[rank]);
}

/**
 * 正则验证是不是一个http
 * @param {string} str
 * @return boolean
 * */
export const isValidHTTPString = (str) => {
    const reg = /^(https:\/\/|http:\/\/).+/;
    return reg.test(str);
};

/**
 * 验证是不是一个项目资源地址
 * @param {string} str
 * @return boolean
 * */
export const isValidResourceString = (str) => {
    const reg = /^(\/upload).+/;
    return reg.test(str);
};

/**
 * 服务端传回的字符串，替换 <br/>
 * @param {string} str
 * @return {string}
 */
//export const replaceBrString = (str) => {
//    if (!str) {
//        return str;
//    }
//    return str.replace(/<br\/>/ig, '\n');
//};

//  特殊的页面，不存在于服务端返回的路由中，需要自己手动添加
/**
 * @param {string} pathName
 * @param {Array} routeList
 * */
export function specialPathName(pathName, routeList){
    switch (pathName) {
        case 'news-detail.html':
            routeList.forEach(item => {
                if (item.url === 'news.html') {
                    item.isActive = true;
                }
            });
            break;
        default:
            console.log(`非自定义路由:${pathName}`);
    }
}

//  服务端返回数据的匹配规则
export function matchReg(str){
    let reg = /<\/?.+?\/?>/g;
    return str.replace(reg, '');
}

//  转换时间格式
export function transformDateType(string){
    return string.replace('-', '年').replace('-', '月') + '日';
}

//  取页面参数
export function getSearchString(key){
    const str = window.location.search.slice(1);
    // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
    const arr = str.split('&');
    const obj = {};
    // 将每一个数组元素以=分隔并赋给obj对象
    for (let i = 0; i < arr.length; i++) {
        const tmp_arr = arr[i].split('=');
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
    }
    return obj[key];
}

//  统一通过浏览器的resize事件，获取判断是>750px
export const commonRelativeWideFn = (setRelativeWideFn) => {
    resizeListener((width) => {
        setRelativeWideFn(width > BASIC_COMPARE_WIDTH);
    });
};
//  统一通过浏览器的scroll事件，获取滚动信息
export const getBrowserInfo = (setBrowserScrollInfoFn) => {
    scrollListener((info) => {
        setBrowserScrollInfoFn(info);
    });
};

//  浏览器类型
export const getUserAgentType = (function Browser(){
    function isSafari(){
        const ua = window.navigator.userAgent.toLowerCase();
        return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
    }

    return {
        isIE: !!window.navigator.userAgent.match(/Trident/g) || !!window.navigator.userAgent.match(/MSIE/g),
        isEdge: !!window.navigator.userAgent.match(/Edge/g),
        isSafari: isSafari(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
    };
}());

/**
 * 将联系我们的数据格式转为list，主要是用来转换格式的
 * @param {Object} data 数据
 * @param {Number} listType 类型
 * @param {Array<T>} list  返回列表
 * */
export const getContentList = (data, listType) => {
    let index = 1;
    const list = [];
    while (1) {
        const titleKey = data[`title${index}`];
        const contentKey = data[`content${index}`];
        if (titleKey && contentKey) {
            switch (listType) {
                case 1: //  footer
                    list.push({ name: `${titleKey}：${contentKey}`, id: -1000000 + index });
                    break;
                case 2: //  关于我们
                    list.push({ title: titleKey, content: contentKey, id: -1000000 + index });
                    break;
                default:
                    throw new Error(`listType ${listType} 未定义`);
            }
            index++;
            continue;
        }
        break;
    }
    return list;
};