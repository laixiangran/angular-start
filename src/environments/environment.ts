/**
 * Created by laixiangran on 2017/4/5.
 * homepage：http://www.laixiangran.cn.
 * 开发环境配置
 */
export const environment = {
	dev: true, // 是否是开发环境，true为开发环境
	domain: '/drainage', // 请求的域名
	mockDomain: '/mockjsdata/3', // 模拟请求的域名
	tokenName: 'START_URMS_LOGIN_TOKEN', // 令牌名称
	geoUrl: 'http://192.168.0.109:8399/arcgis/rest/services/Geometry/GeometryServer', // 几何服务路径drainage
	gisApiUrl: 'http://192.168.0.8/arcgis_api/3.14/init.js', // arcgis javascript API路径
	esriCSSUrl: 'http://192.168.0.8/arcgis_api/3.14/esri/css/esri.css' // esri.css路径
};
