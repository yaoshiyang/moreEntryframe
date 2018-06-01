// Jquery 版本ajax封装拦截器

class JqjaxClass {
    constructor(options) {
        this.options = options;
    }
    error(XMLHttpRequest, textStatus, errorThrown) {
        // 同一封装的error

        this.options.error && this.options.error(XMLHttpRequest, textStatus, errorThrown);
    }
    success(data, textStatus, jqXHR) {
        // 统一封装

        this.options.success && this.options.success(data, textStatus, jqXHR);
    }

    complete(XHR, TS) {
        // 统一封装
        this.options.complete && this.options.complete(XHR, TS);
    }
    send(resove, reject) {
        const that = this;
        // 修改发送异步之前的状态
        (!this.options.type || this.options.type.toLowerCase() === 'get') && (this.options.data.r = Math.random());
        this.options.error = that.error;
        this.options.success = that.success;
        this.options.complete = that.complete;
        $.ajax(that.options).then(resove,reject);
    }
    done() {
        const that = this;
        return new Promise((resove, reject) => {
            if (!$.ajax) {
                throw `没有引入Jquery包`;
            }
            that.send(resove, reject);
        });
    }
};

const Jqjax = options => new JqjaxClass(options).done();

export default Jqjax;
