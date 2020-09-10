//  匹配规则
export function matchReg(str){
    let reg = /<\/?.+?\/?>/g;
    return str.replace(reg, '').substr(0, 93);
}

//  转换时间格式
export function transformDateType(string){
    return string.replace('-', '年').replace('-', '月') + '日';
}