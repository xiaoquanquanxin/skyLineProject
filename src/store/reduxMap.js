import { setRelativeWide } from '@store/windowResize';
import { setTabBoxActiveIndex } from '@store/aboutTabBox';

//  指定如何把当前 Redux store state 映射到展示组件的 props 中
//  ✅读取state到props
export const mapStateToProps = ({
    //  浏览器信息
    REDUCER_BROWSER_INFO,
    //  关于我们页面
    REDUCER_ABOUT_TAB_BOX,
}) => {
    return {
        REDUCER_BROWSER_INFO,
        REDUCER_ABOUT_TAB_BOX,
    };
};

//  触发
//  除了读取 state，容器组件还能分发 action。
//  类似的方式，可以定义 mapDispatchToProps() 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
//  ✅通过dispatch触发action到原始的state
export const mapDispatchToProps = (dispatch) => {
    return {
        //  设置浏览器宽度是否>750
        setRelativeWideFn: (bool) => {
            dispatch(setRelativeWide(bool));
        },
        //  设置关于我们页面的 activeIndex，选中的哪一个
        setTabBoxActiveIndex: (activeIndex) => {
            dispatch(setTabBoxActiveIndex(activeIndex));
        }
    };
};

