import React from 'react';
import style from './index.module.less';
import layout from '@css/layout.module.less';
import { BasicTitleDesc } from '@components/basicTitleDesc';

//  旭日3 系列——释放 “芯” 效能
export const RichInterface = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab: 0,
        };
    }

    setActive(activeTab){
        this.setState(() => {
            return {
                activeTab,
            };
        });
    }

    render(){
        const richInterfaceData = this.props.richInterfaceData || {};
        let list_1;
        let list_2;
        if (richInterfaceData.list_1) {
            list_1 = richInterfaceData.list_1.map((item, index) => {
                return (
                    <RichInterfaceItem key={index} data={item}/>
                );
            });
        }
        if (richInterfaceData.list_2) {
            list_2 = richInterfaceData.list_2.map((item, index) => {
                return (
                    <RichInterfaceItem key={index} data={item}/>
                );
            });
        }
        const { activeTab } = this.state;
        return (
            <div className={style.richInterface}>
                <BasicTitleDesc data={richInterfaceData} widthType={784}/>
                <dl className={style.tabBox}>
                    <dd className={`${style.tab} ${activeTab === 0 ? style.active : ''}`}
                        onClick={() => {this.setActive(0);}}
                        onMouseEnter={() => {this.setActive(0);}}
                    >X3M
                    </dd>
                    <dd className={`${style.tab} ${activeTab === 1 ? style.active : ''}`}
                        onClick={() => {this.setActive(1);}}
                        onMouseEnter={() => {this.setActive(1);}}
                    >X3E
                    </dd>
                </dl>
                <ul className={`${style.list} ${activeTab === 0 ? layout.flex : layout.none}`}>
                    {list_1}
                </ul>
                <ul className={`${style.list} ${activeTab === 1 ? layout.flex : layout.none}`}>
                    {list_2}
                </ul>
            </div>
        );
    }
};
//  每一项
const RichInterfaceItem = ({
    data,
}) => {
    return (
        <li className={style.item}>
            <label className={style.label} dangerouslySetInnerHTML={{ __html: data.label }}/>
            <div className={style.c} dangerouslySetInnerHTML={{ __html: data.content }}/>
        </li>
    );
};
