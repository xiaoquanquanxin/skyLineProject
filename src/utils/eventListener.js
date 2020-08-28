//  滚动事件监听回调函数列表
const scrollStack = [];

//  滚动监听
window.addEventListener('scroll', (e) => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(scrollTop)
    for (const value of scrollStack) {
        if (typeof value !== 'function') {
            throw new Error('错误的函数调用。resizeStack里必须是函数');
        }
        //  返回滚动的位置
        value(scrollTop);
    }
});
//  暴露滚动监听
export const scrollListener = (callbackFn) => {
    scrollStack.push(callbackFn);
};
//  删除某个监听，如果不需要的时候
export const deleteScrollListener = (deleteCallbackFn) => {
    scrollStack.splice(scrollStack.indexOf(deleteCallbackFn), 1);
};



//  resize事件监听回调函数列表
const resizeStack = [];
//  resize监听
window.addEventListener('resize', (e) => {
    //  返回window的宽度
    for (const value of resizeStack) {
        if (typeof value !== 'function') {
            throw new Error('错误的函数调用。resizeStack里必须是函数');
        }
        value(window.innerWidth);
    }

});
//  暴露resize监听
export const resizeListener = (callbackFn) => {
    resizeStack.push(callbackFn);
};
//  删除某个监听，如果不需要的时候
export const deleteResizeListener = (deleteCallbackFn) => {
    resizeStack.splice(resizeStack.indexOf(deleteCallbackFn), 1);
};