1.项目搭建使用create-react-app，具体版本见[package.json](../package.json)

2.[webpack配置项](../config)已经暴露

3.webpack配置项有自定义插件，用于向模板打入必要代码。如果改同构也可以参考。

4.编译为多页方案，入口文件为[src/pages/**](../src/pages)，详细配置见webpack配置。

5.有[node代理方案](../public/server)，但目前没有采用，可以用来改同构。

6.css模块化已经配置，具体看[/config/webpack.config.js](../config/webpack.config.js)

