/**
 * Created by Hllinc on 2016-10-30 19:04.
 */

export class Sys {

    constructor () {}

    public static dateFormat (value: any, fmt: string) { //author: meizz
        let date: Date = new Date(value);
        let o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        return fmt;
    }

    public static sysAlert (content: string, title?: string): void {
        if (title == undefined) {
            title = '系统提示';
        }
        let win = jQuery('<div class=\'modal fade\' role=\'dialog\' aria-labelledby=\'myModalLabel\' aria-hidden=\'true\'>'
            + '<div class=\'modal-dialog\'>'
            + '<div class=\'modal-content\'>'
            + '<div class=\'modal-header\'>'
            + '<button type=\'button\' class=\'close\' data-dismiss=\'modal\' aria-hidden=\'true\'>&times;</button>'
            + '<h4 class=\'modal-title\'><span class=\'glyphicon glyphicon-hand-right\'></span> '
            + title
            + '</h4>'
            + '</div>'
            + '<div class=\'modal-body\'>'
            + content
            + '</div>'
            + '<div class=\'modal-footer\'>'
            + '<button type=\'button\' class=\'btn btn-default\' data-dismiss=\'modal\'>确定</button>'
            + '</div>' + '</div>' + '</div>' + '</div>');
        win.appendTo('body');
        win['modal']();
        win.on('hidden.bs.modal', function () {
            win.remove();
        });
    }

    public static sysConfirm (content: string, callback: Function, cancelCallback?: Function): void {
        let win = jQuery('<div class=\'modal fade\' role=\'dialog\' aria-labelledby=\'myModalLabel\' aria-hidden=\'true\'>'
            + '<div class=\'modal-dialog\'>'
            + '<div class=\'modal-content\'>'
            + '<div class=\'modal-header\'>'
            + '<button type=\'button\' class=\'close\' data-dismiss=\'modal\' aria-hidden=\'true\'>&times;</button>'
            + '<h4 class=\'modal-title\'><span class=\'glyphicon glyphicon-hand-right\'></span> 确认窗口</h4>'
            + '</div>'
            + '<div class=\'modal-body\'>'
            + content
            + '</div>'
            + '<div class=\'modal-footer\'>'
            + '<button type=\'button\' class=\'btn btn-default\' data-dismiss=\'modal\'>取消</button>'
            + '<button type=\'button\' class=\'btn btn-primary okBtn\'>确定</button>'
            + '</div>' + '</div>' + '</div>' + '</div>');
        win.appendTo('body');
        win['modal']({
            backdrop: false
        });
        win.find('.okBtn').click(function (e) {
            callback();
            win['modal']('hide');
        });
        win.on('hidden.bs.modal', function (e) {
            if (cancelCallback && typeof cancelCallback == 'function') {
                cancelCallback();
            }
            win.remove();
        });
    }

    public static sysDialog (option: any): Object {
        option = {
            title: option.title ? option.title : '窗口',
            titleIcon: 'glyphicon glyphicon-hand-right',
            headerClass: option.headerClass ? option.headerClass : '',
            content: option.content ? option.content : '内容区域',
            buttons: option.buttons,
            sizeClass: option.sizeClass,
            width: option.width ? option.width : '',
            open: option.open ? option.open : null,
            // 关闭函数
            closeFunction: (typeof (option.closeFunction) === 'function') ? option.closeFunction
                : null
        };
        // 模态框窗体
        let win = jQuery('<div class=\'modal fade\' role=\'dialog\' aria-labelledby=\'myModalLabel\' aria-hidden=\'false\'>' +
            '<div class=\'modal-dialog ' + option.sizeClass + '\' style=\'width:' +
            option.width +
            ';\'>' +
            '<div class=\'modal-content\'>' +
            '<div class=\'modal-header ' +
            option.headerClass +
            '\'>' +
            '<button type=\'button\' class=\'close\' data-dismiss=\'modal\' aria-hidden=\'false\'>&times;</button>' +
            '<h4 class=\'modal-title\' id=\'myModalLabel\'><span class=\'' +
            option.titleIcon +
            '\'></span>' +
            option.title +
            '</h4>' +
            '</div>' +
            '<div class=\'modal-body\'>' +
            option.content +
            '</div>' +
            '<div class=\'modal-footer\'>' +
            '</div>' +
            '</div>' +
            '</div>' + '</div>');
        win.appendTo('body');
        // 窗口关闭触发事件
        win.on('hidden.bs.modal', function (e) {
            if (option.closeFunction)
                option.closeFunction();
            win.remove();
        });
        win.on('shown.bs.modal', function (e) {
            if (option.open) {
                option.open(win);
            }
        });

        win['close'] = function () {
            win['modal']('hide');
        };
        win['modal']({
            backdrop: 'static'
        });
        if (option.buttons != null) {
            for (let i = 0; i < option.buttons.length; i++) {
                let btn = jQuery('<button type=\'button\' class=\'btn '
                    + option.buttons[i].className + '\'>'
                    + option.buttons[i].text + '</button>');
                btn.appendTo(win.find('.modal-footer'));
                btn.on('click', option.buttons[i].click);
            }
        }

        return win;
    }
}
