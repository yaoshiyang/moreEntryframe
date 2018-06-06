import $  from 'window$';
import label from 'common';
import test from 'Tpl/test.art';

// 如果想用管道
// var runtime = require('art-template/lib/runtime');
// runtime.dateFormat = function(date, format){ /*[...]*/ };

const html = test({
    user:{name:'feel so great'}
});

$('div').html(html);

console.log(label,'在index页面');

console.log(label,'在index111页面');