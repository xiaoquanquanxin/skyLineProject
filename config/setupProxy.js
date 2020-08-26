/***
 *
 * 代理，仅devServer
 *
 * ****/
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app){
    app.use(
        createProxyMiddleware('/cloud-pay-api', {
            target: 'https://cloudpay-dev.hachi-tech.com',
            changeOrigin: true,
            pathRewrite: {
                '^/cloud-pay-api': '/property-api'
            }
        }),
        createProxyMiddleware('/hachi-api', {
            target: 'https://common.hachi-tech.com',
            changeOrigin: true,
            pathRewrite: {
                '^/hachi-api': '/api'
            }
        })
    );
};
