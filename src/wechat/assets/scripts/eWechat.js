/**
 * Created by laixiangran on 2018/1/16.
 * homepage：http://www.laixiangran.cn.
 * 基于微信JS-SDK进行封装的微信公众号相关开发API
 */

(function ($, window) {
	var wechatConfig = {
			beta: true,  // 必须这么写，否则在微信插件有些jsapi会有问题
			debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: '', // 必填，企业微信的corpID
			timestamp: 0, // 必填，生成签名的时间戳
			nonceStr: '', // 必填，生成签名的随机串
			signature: '',// 必填，签名，见[附录1](#11974)
			jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		},
		domain = 'http://1ov6623906.imwork.net/rcs', // 域名，根据实际情况修改
		wechatConfigUrl = domain + '/wechat/config'; // 获取签名信息的路径，根据实际情况修改

	/**
	 *  获取签名信息
	 * @param callback 获取成功的回调函数
	 */
	function getSignature(callback) {
		$.get(wechatConfigUrl + '?url=' + encodeURIComponent(window.location.href.split('#')[0]), function(serverData) {
			if (serverData.code === 'ok') {
				var result = serverData.result;
				wechatConfig.appId =  result.appId;
				wechatConfig.nonceStr =  result.nonceStr;
				wechatConfig.timestamp = result.timestamp;
				wechatConfig.signature = result.signature;
				callback();
			} else {
				$.alert('获取签名失败！');
			}
		});
	}

	/**
	 * 通过config接口注入权限验证配置，并分别处理验证成功和验证失败
	 * @param jsApiList 调用的JS接口列表
	 * @param callback 接口验证成功的回调函数
	 */
	function wxConfig(jsApiList, callback) {
		wechatConfig.jsApiList = jsApiList;
		wechatConfig.jsApiList.push('checkJsApi');
		getSignature(function () {
			wx.config(wechatConfig);

			// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			wx.ready(function() {
				wx.checkJsApi({
					jsApiList: wechatConfig.jsApiList,
					success: function(res) {
						callback(res);
					}
				});
			});

			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			wx.error(function(res){
				$.alert('权限验证配置注入失败！');
			});
		});
	}

	/**
	 * 逆地理编码（使用高德服务）
	 * @param point 位置点坐标，[x,y]
	 * @param success 查询成功的回调函数
	 */
	function reGeocode(point, success) {
		var parameters = 'output=json&location=' + point.join(',') + '&key=0df36377c23e75585d4ed4fcb4baf807&radius=100&extensions=base',
			url = 'http://restapi.amap.com/v3/geocode/regeo?' + parameters;
		$.get(url, function(serverData) {
			if (serverData.status === '1') {
				var result = serverData.regeocode;
				success(result);
			} else {
				$.alert('获取当前地址失败！');
			}
		});
	}

	window.eWechat = {
		domain: domain,
		wxConfig: wxConfig,
		reGeocode: reGeocode
	};
})($, window);
