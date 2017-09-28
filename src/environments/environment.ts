/**
 * Created by laixiangran on 2017/4/5.
 * homepage：http://www.laixiangran.cn.
 * 开发环境配置
 */
export const environment = {
	dev: true, // 是否是开发环境，true为开发环境
	title: 'Angular Start', // 系统名称（请根据实际项目进行修改）
	domain: '/projectStart', // 请求的域名（请根据实际项目进行修改）
	mockDomain: '/mockjsdata/11', // 模拟请求的域名（请根据实际项目进行修改）
	tokenName: 'START_URMS_LOGIN_TOKEN', // 令牌名称（请根据实际项目进行修改，规则：xxx_URMS_LOGIN_TOKEN）
	appDownloadUrl: 'http://192.168.0.8/projectStart/appVersionAction/disposeScanCode', // app下载路径
	gisApiUrl: 'http://192.168.0.8/arcgis_api/3.14/init.js', // arcgis javascript API路径（请根据实际项目进行修改）
	esriCSSUrl: 'http://192.168.0.8/arcgis_api/3.14/esri/css/esri.css' // esri.css路径（请根据实际项目进行修改）
};
