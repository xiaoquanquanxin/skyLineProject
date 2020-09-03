//  定义下一帧
(function (){
    let lastTime = 0;
    const vendors = ['webkit', 'moz'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        // Webkit中此取消方法的名字变了
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    window.requestAnimationFrame = window.requestAnimationFrame || function (callback, element){
        let currTime = new Date().getTime();
        let timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
        let id = window.setTimeout(function (){
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    window.cancelAnimationFrame = window.cancelAnimationFrame || function (id){
        clearTimeout(id);
    };
}());

//  滚动事件监听回调函数列表
const scrollController = {
    //  事件队列
    scrollQueue: [],
    //  执行完一次回调
    fallback: true,
};

//  滚动监听
window.addEventListener('scroll', () => {
    if (scrollController.fallback) {
        scrollController.fallback = false;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        for (const value of scrollController.scrollQueue) {
            if (typeof value !== 'function') {
                throw new Error('错误的函数调用。resizeController.resizeQueue里必须是函数');
            }
            //  返回滚动的位置
            value(scrollTop);
        }
        window.requestAnimationFrame(() => {
            scrollController.fallback = true;
        });
    }
});
//  暴露滚动监听
export const scrollListener = (callbackFn) => {
    scrollController.scrollQueue.push(callbackFn);
};
//  删除某个监听，如果不需要的时候
export const deleteScrollListener = (deleteCallbackFn) => {
    scrollController.scrollQueue.splice(scrollController.scrollQueue.indexOf(deleteCallbackFn), 1);
};

//  resize事件监听回调函数列表
const resizeController = {
    resizeQueue: [],
    //  执行完一次回调
    fallback: true,
};
//  resize监听
window.addEventListener('resize', (e) => {
    if (resizeController.fallback) {
        //  返回window的宽度
        for (const value of resizeController.resizeQueue) {
            if (typeof value !== 'function') {
                throw new Error('错误的函数调用。resizeController.resizeQueue里必须是函数');
            }
            value(window.innerWidth);
        }
        resizeController.fallback = false;
        window.requestAnimationFrame(() => {
            resizeController.fallback = true;
        });
    }
});
//  暴露resize监听
export const resizeListener = (callbackFn) => {
    resizeController.resizeQueue.push(callbackFn);
};
//  删除某个监听，如果不需要的时候
export const deleteResizeListener = (deleteCallbackFn) => {
    resizeController.resizeQueue.splice(resizeController.resizeQueue.indexOf(deleteCallbackFn), 1);
};

//  阻止默认事件
export const preventDefaultFn = (e) => {e.preventDefault();};
//  阻止冒泡
export const stopPropagation = (e) => {
    e.stopPropagation();
    e.cancelBubble = false;
    return false;
};

//  重置rem
function remSet(){
    //  设备宽度
    const maxDeviceWidth = 768;
    //  设备比例
    const remCount = 7.68;
    const docEle = document.documentElement;
    const docEleStyle = docEle.style;
    const fn = () => {
        const width = docEle.clientWidth;
        const remFixDom = document.createElement('div');
        docEleStyle.fontSize = 100 * (width / maxDeviceWidth) + 'px';
        remFixDom.style.cssText = 'width:100%;height:1rem;opacity:1;position:absolute;z-index:+9999;top:0;left:0;background-color:#ff0';
        document.body.appendChild(remFixDom);
        requestAnimationFrame(() => {
            const render = window.getComputedStyle(remFixDom);
            const rRate = (render.width.slice(0, -2) / render.height.slice(0, -2)).toFixed(1);
            if (rRate / remCount !== 1) {
                docEleStyle.fontSize = parseInt(docEleStyle.fontSize) * rRate / remCount + 'px';
            }
            document.body.removeChild(remFixDom);
        });
    };
    document.addEventListener('DOMContentLoaded', fn, false);
    resizeListener(fn);
}

remSet();
