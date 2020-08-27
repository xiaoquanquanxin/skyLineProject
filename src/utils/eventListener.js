export const scrollListener = (callbackFn) => {
    window.addEventListener('scroll', (e) => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //  返回滚动的位置
        callbackFn(scrollTop)
    });
};