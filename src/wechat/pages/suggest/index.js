/**
 * Created by laixiangran on 2018/1/16.
 * homepage：http://www.laixiangran.cn.
 * 投诉建议相关业务逻辑
 */

// iOS 系统下默认的 click 事件会有300毫秒的延迟，使用 fastclick 来消除这个延迟。
FastClick.attach(document.body);

var map = new AMap.Map('amapContainer', {
        resizeEnable: true
    }),
    jsApiList = [
        'chooseImage', // 拍照或从手机相册中选图接口
        'uploadImage', // 上传图片接口
        'getNetworkType', // 获取网络状态接口
        'getLocation' // 获取地理位置接口
    ];

// 获取DOM元素
var $addr = $('.addr'),
	$advise = $('.advise'),
	$info = $('.info'),
	$river = $('.river'),
	$tel = $('.tel'),
	$type = $('.type'),
	$cancel = $('.cancel-image'),
	$addImage = $('.add-Image'),
	$imageFiles = $('.image-files'),
	$report = $('.report-problem');

// 表单的值
var longitude, // 经度
	latitude, // 纬度
	questionTypes = [], // 投诉类型
	addr; // 地址

var problemTypes; // 问题类型数组

var localImageIds = []; // 微信服务器图片id

map.on('complete', function () {
    eWechat.wxConfig(jsApiList, function () {

    	// 获取当前经纬度及位置
        wx.getLocation({
            type: 'wgs84', // // 默认为wgs84的gps坐标，如果要返回火星坐标，可传入'gcj02'
            success: function (res) {
                longitude = res.longitude;
                latitude = res.latitude;
                var gcjLnglat = transform.wgs2gcj(longitude, latitude),
                    lnglat = [gcjLnglat.lng, gcjLnglat.lat];
                eWechat.reGeocode(lnglat, function (data) {
                	addr = data.formatted_address;
					$addr.html(addr);
                });

                // 在地图显示当前位置点
                var marker = new AMap.Marker({
                    icon: "../../assets/images/loc.png",
                    position: lnglat
                });
                marker.setMap(map);
                map.setZoomAndCenter(15, lnglat);
            },
            cancel: function (res) {
                $.alert('您已拒绝授权获取地理位置！');
            }
        });
    });
});

// 注册选择图片事件
$addImage.on('click', function() {
	wx.chooseImage({
		count: 1, // 默认9
		sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		success: function (res) {
			var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			localIds.forEach(function(localId) {
				wx.uploadImage({
					localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) {
						var serverId = res.serverId; // 返回图片的服务器端ID
						localImageIds.push(serverId);
						wx.getLocalImgData({
							localId: localId, // 图片的localID
							success: function (res) {
								var localData = res.localData; // localData是图片的base64数据，可以用img标签显示

								// 页面显示图片
								var imageFileHtml = '<li class="weui-uploader__file image-file">' +
									'<div class="cancel-image" data-serverId=">' + serverId + '"' +
									'<i class="weui-icon-cancel"></i>' +
									'</div>' +
									'<img src="' + localData + '" />' +
									'</li>';
								$imageFiles.append(imageFileHtml);
							}
						});
					}
				});
			});
		}
	});
});

// 注册图片取消按钮事件
$cancel.on('click', function() {
	$this = $(this);
	$.confirm("确定删除该图片？", function() {
		var serverId = $this.data().serverId;
		localImageIds.splice(localImageIds.indexOf(serverId), 1);
		$this.parent().remove();
	});
});

// 获取问题类型
$.get(eWechat.domain + '/DictionaryController/queryDictionary/QUESTION_TYPE', function(serverData) {
	if (serverData.code === 'ok') {
		problemTypes = serverData.result.children;
		var items = [];
		problemTypes.forEach(function(type, index) {
			items.push({
				title: type.name,
				value: index // 该值为当前选择类型所在problemTypes的数组下标，提交时使用该值去数组中获取类型对象
			});
		});

		// 初始化投诉类型下拉选择框
		$type.select({
			title: "投诉类型",
			multi: true,
			items: items
		});
	}
});

// 问题上报
$report.on('click', function() {
	var typeIndexs = $type.data().values.split(',');
	typeIndexs.forEach(function(typeIndex) {
		questionTypes.push(problemTypes[typeIndex]);
	});
	var problem = {
		addr: addr,
		advise: $advise.val(),
		info: $info.val(),
		latitude: latitude,
		longitude: longitude,
		picture: localImageIds.join(','),
		questionTypes: questionTypes,
		river: $river.val(),
		tel: $tel.val()
	};

	// 上报问题
	$.showLoading('问题上报中...');
	$.ajax({
		url: eWechat.domain + '/wechatHandle/report',
		type: "post",
		data: JSON.stringify(problem),
		contentType: "application/json; charset=utf-8",
		success: function (serverData) {
			$.hideLoading();
			if (serverData.code === 'ok') {
				$.toast('上报成功！');
			} else {
				$.toast('上报失败！', 'cancel');
			}
		}
	});
});
