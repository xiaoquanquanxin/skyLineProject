import { setBrowserScrollInfo, setRelativeWide } from '@store/browserInfo';
import { setTabBoxActiveIndex, setNewsCategoryData, newsCategoryDataForMap } from '@store/newsInfo';
import { setAboutUsMapOpenIndex, setAboutUsMapActiveAreaId } from '@store/aboutUs';

//  指定如何把当前 Redux store state 映射到展示组件的 props 中
//  ✅读取state到props
export const mapStateToProps = ({
    //  浏览器信息
    REDUCER_BROWSER_INFO,
    //  新闻页面
    REDUCER_NEWS_TAB_BOX,
    //  关于我的，主要是地图
    REDUCER_ABOUT_US_MAP,
}) => {
    return {
        REDUCER_BROWSER_INFO,
        REDUCER_NEWS_TAB_BOX,
        REDUCER_ABOUT_US_MAP,
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
        //  设置浏览器信息
        setBrowserScrollInfoFn: (info) => {
            const { scrollLeft, scrollTop } = info;
            dispatch(setBrowserScrollInfo(scrollLeft, scrollTop));
        },
        //  设置关于我们页面的 activeIndex，选中的哪一个
        setTabBoxActiveIndex: (activeIndex) => {
            dispatch(setTabBoxActiveIndex(activeIndex));
        },
        //  设置新闻菜单数据
        setNewsCategoryData: (newsCategoryData) => {
            dispatch(setNewsCategoryData(newsCategoryData));
            const mapData = {};
            newsCategoryData.forEach(item => {
                mapData[item.id] = item;
            });
            dispatch(newsCategoryDataForMap(mapData));
        },

        //  关于我的，地图相关
        setAboutUsMapOpenIndex: (openIndex) => {
            dispatch(setAboutUsMapOpenIndex(openIndex));
        },
        //  同上
        setAboutUsMapActiveAreaId: (activeAreaId,activeAreaName) => {
            dispatch(setAboutUsMapActiveAreaId(activeAreaId,activeAreaName));
        },
    };
};

