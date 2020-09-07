const path = require('path');
module.exports = {
    //  静态文件路径
    staticDir: path.join(__dirname, '..'),

    //  接口是以 '/api' 为开头的
    RegApi: /^\/api/,
    apiTargetUrl: 'http://horizon.wx.h5work.com',

    //  接口是以 '/upload' 为开头的
    RegUpload: /^\/upload/,

    //  端口
    PORT: 8080,
};
