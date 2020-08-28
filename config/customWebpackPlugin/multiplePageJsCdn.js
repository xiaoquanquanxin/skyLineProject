/****
 *
 * 这个插件是用来，将不同的页面，打入不同的cdn的，因为，不同的页面需要引入的js都不尽相同。
 * 比如有地图的那个页面，需要引入百度的地图js，而其他页面不应该有
 *
 * **/
//  神器
const HtmlWebpackPlugin = require('html-webpack-plugin');

//  设置替换的值
let customJsCdnPlaceholder = '';

//  为html打入完整路径
class MultiplePageJsCdn {
    apply(compiler){
        compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                'GetFullPathPlugin', // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    const outputName = data.outputName;
                    console.log(`当前正在处理的页面是 ${outputName}`);
                    const html = data.html;

                    switch (outputName) {
                        case 'page2/programme.html':
                            //  todo    这里需要百度地图
//                            customJsCdnPlaceholder = `<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=W0xBY4G53d6qSbWYajZKeXVUEkbkM1Mo"></script>`;
                            console.log('🍉🍉', customJsCdnPlaceholder);
                            break;
                        default:
                            break;
                    }
                    //  替换html
                    data.html = html.replace('[[[custom-js-cdn-placeholder]]]', customJsCdnPlaceholder);
                    cb(null, data);
                }
            );
        });
    }
}

module.exports = MultiplePageJsCdn;