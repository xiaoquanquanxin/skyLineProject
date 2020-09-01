import CSSModules from 'react-css-modules';
import React from 'react';
import style from './index.less';
import layout from '@css/layout.less';

//  官方微博
import qrCodeOfficialWeChat from '@media/basicFooter/QrCodeOfficialWeChat.jpg';
//  招聘
import qrCodeRecruitment from '@media/basicFooter/QrCodeRecruitment.jpg';

//  微信图标
const weixinImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAAD4UlEQVRYR72YW8hVVRSFv5GVlZkFmiWWRlFkF4Ky0shu4oM+RBeMCjIVkwiVoCJLSEFJI4oeAqmwIArEki50oyQzqIQiqFDMzLAkoqtamkLNGLH2z2m39tlnn/P/rsez55xrrDXnHHOsI2pWRBwFXApcAUwATgRGAEOAX4CfgU3AB8A6SZ/VxWzyXVXGEXESMA+YAxzbIOjHwErgGUl/NfDLmv4PYEQMAu4GFgODe9jgc+AOSe/3EIP/AIwIp+4V4OJegrb4/g3cJenRbuP1AYyI411DwNndBmvjt0LSvd3E/RdgSquL/MJMkJ+AHcC5wKFtNvkB+A44D3CZlNdsSauagiwA+nQPZpzXA9Mk7Y2I8wHX05EZu9eBayXtj4hLgHeBw0p2e4HTJe1sAlIRMQz4vmLjWyQ9WwSMiHeAqzIbXCPppRa7jRXZWCVpdlOAcxMt5PxWSro9lcExwBbghIzhw5Lc+S6X4cDWCmraBwx3RjoF6Rt8C5jSxuHlRMTXOUVt7F4EvgJuAMZm7AzuR8BZea8JQJ/2tE4dGth9CvhwrsftwNA0gUzeBrpT0u918XyDPtkRdYYNvr+ZGm4PMAu4EhiX8TdQH8J1/aSkr3N7GOA3wJgGAKpMfwMWpE0fS7O707Am9LXAnZJMVX3LAN8GJncaqcLOHOibmgYsBQ7vMt4uYK6k1YW/AZr/umL5FMRBPRpn9BinwOTbnFOQugFatTj/7aZEuwtxnR0CPFUy2p3S5tF5QUUA158b5voSsQdwuaQNxSR5Dripi7R8mIJvBsyTrWuSlUxEGPxHwPjS9+cl3ezfIsKS7onS923AWQXAkYB13OiGIH17brAHMn4nS/o2AXgBMI+2rmWSFqXv7gH3Qnnd2KpmfMINDSnHY/KTCh41GT+URIYbpywgXAKePk7xMuDMDMDXynrQst4dZF1YtxzY9WserVTmdUFqvm/PKWqn2Sm5qMbZ75CpgHl0oNaf2ZNHxHzAZNtu/QG4dmvHVQ/ot1UBdC36JeflkWSl7XSekSil2POUVLf+NhDrjVyKLacsKs1Fph9325ep245OXetXnp+d1n33p2IfCIAzcwBvAyZ6ZEmyfGq7IuJU4IuG3V8X1t8tosfmAA62dO8kQmETEfcAK5r41J0buFrSq/1CD2laPG0x2k8gF0kyN/YffyWQjwBmgG4PfsD/ZkjqG3vdBqq8qIjwo+rx1PFNL3S6pDWtTv0OMHW741ob+gV3GXBcBVKLXLNB8URdLGnJgANs3SCl3pJ/VBqhpq9fAVOXZZ7Fxn3ArX41SjrnoALsNMcRYaALgeWS+sbnPwcmLPVvu6sNAAAAAElFTkSuQmCC';

export const SiteInfo = CSSModules(
    ({
        isRelativelyWide,
        qrCodeShowIndex,
        qrCodeClick
    }) => (
        <div className={style.siteInfo}>
            <div className={`${style.siteInfoInner} ${layout.clearfix}`}>
                <div className={`${style.buttonGroups} ${layout.clearfix} ${isRelativelyWide ? layout.right : ''}`}>
                    <button className={`${style.button} ${layout.inlineBlock}`}
                            onClick={(e) => {qrCodeClick(0, e);}}>
                        <img src={weixinImg} className={style.icon}/>
                        <span>地平线官微</span>
                        <img src={qrCodeOfficialWeChat}
                             className={`${style.qrCode} ${qrCodeShowIndex === 0 ? layout.block : layout.none}`}/>
                    </button>
                    <button className={`${style.button} ${layout.inlineBlock}`}
                            onClick={(e) => {qrCodeClick(1, e);}}>
                        <img src={weixinImg} className={style.icon}/>
                        <span>地平线招聘号</span>
                        <img src={qrCodeRecruitment}
                             className={`${style.qrCode} ${qrCodeShowIndex === 1 ? layout.block : layout.none}`}/>
                    </button>
                </div>
                <div className={`${style.siteInfoMsg} ${isRelativelyWide ? layout.left : ''} `}>Copyright © 2019-2020
                    地平线官网 粤ICP备17098896号-1 {isRelativelyWide ? '' :
                        <br/>}（深圳地平线机器人科技有限公司）
                </div>
            </div>
        </div>
    )
);

