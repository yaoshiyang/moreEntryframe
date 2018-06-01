

/**
 * 下载Excel
 * @param {*} url  下载链接
 */
const exportExcel = url => {
    const
        callbackTime = new Date().getTime();
    if (!$("#export_iframe").length) {
        $('<iframe name="export_iframe" id="export_iframe" style="width: 1px;height: 1px;position: absolute;top: -1000px;"></iframe>').appendTo(document.body);
    }
    url = url + (!!~url.indexOf("?") ? "&" : "?") + "callback=" + callbackTime;
    window.open(url, "export_iframe");
}

/**
 * 设置Cookie
 * @param {*} param0  传参
 */
const setCookie = ({ sName, sValue = "", oExpires = new Date(0), sPath, sDomain, bSecure }) => {
    let sCookie = sName + "=" + encodeURIComponent(sValue), d;
    if (oExpires) {
        if (typeof oExpires == 'string') {
            d = new Date();
            d.setTime(new Date().getTime() + parseInt(oExpires));
            oExpires = d.toGMTString();
        } else {
            oExpires = d.toGMTString();
        }
    }
    if (sPath) {
        sCookie += "; path=" + sPath;
    }
    if (sDomain) {
        sCookie += "; domain=" + sDomain;
    }
    if (bSecure) {
        sCookie += "; secure";
    }
    document.cookie = sCookie;
}

/**
 * 删除Cookie
 * @param {*} param0 
 */
const removeCookie = ({ sName, sPath, sDomain, bSecure }) => {
    setCookie({ sName, sPath, sDomain, bSecure });
}

/**
 * 获取Cookie
 * @param {*} sName 
 */
const getCookie = sName => {
    let
        sRE = "(?:; )?" + sName + "=([^;]*);?",
        oRE = new RegExp(sRE);
    return oRE.test(document.cookie) ? decodeURIComponent(RegExp['$1']) : null;
}

/**
 * obj -> params
 * @param {*} obj 
 * @returns 返回编码后的参数
 */
const objToUrlParam = obj => {
    let param = Object.keys(obj).map(key => `${key}=${encodeURIComponent(obj[String(key)])}`).join('&');
    return param ? `?${param}` : '';
}

/**
 *  获取当前Url参数
 */
const urlArgs = () => {
    let args = {};
    let query = location.search ? location.search : location.hash;
    if (!query) {
        return args;
    }
    query = query.substring(1);
    var pairs = query.split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[name] = value;
    }
    return args;
}

export { exportExcel, setCookie, removeCookie, getCookie, objToUrlParam, urlArgs};