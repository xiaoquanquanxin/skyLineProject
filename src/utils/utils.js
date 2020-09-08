//  倒计时
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