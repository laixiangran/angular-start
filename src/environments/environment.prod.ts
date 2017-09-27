/**
 * Created by laixiangran on 2017/4/5.
 * homepage：http://www.laixiangran.cn.
 * 生产环境配置
 */

export const environment = {
	dev: false,
	domain: 'http://192.168.0.8/drainage',
	tokenName: 'START_URMS_LOGIN_TOKEN',
	geoUrl: 'http://192.168.0.109:8399/arcgis/rest/services/Geometry/GeometryServer', // 几何服务路径drainage
	gisApiUrl: 'http://192.168.0.8/arcgis_api/3.14/init.js', // arcgis javascript API路径
	esriCSSUrl: 'http://192.168.0.8/arcgis_api/3.14/esri/css/esri.css' // esri.css路径
};
