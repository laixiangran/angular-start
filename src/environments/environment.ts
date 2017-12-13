/**
 * Created by laixiangran on 2017/4/5.
 * homepage：http://www.laixiangran.cn.
 * 开发环境配置
 */
export const environment = {
	production: false, // false为非开发环境
	hmr: true, // 是否开启模块热更新（应用于开发环境）
	title: 'Angular Start', // 系统名称（请根据实际项目进行修改）
	domain: '/mockjsdata/26879', // 请求的域名（请根据实际项目进行修改）
	mockDomain: '/mockjsdata/26879', // 模拟请求的域名（请根据实际项目进行修改）
	tokenName: 'START_URMS_LOGIN_TOKEN', // 令牌名称（请根据实际项目进行修改，规则：xxx_URMS_LOGIN_TOKEN）
	appDownloadUrl: 'http://rapapi.org/mockjsdata/26879/appVersionAction/disposeScanCode', // app下载路径
	cesiumBaseUrl: '/assets/scripts/cesium', // cesium的请求基础路径
	proxy: null, // 代理文件路径，可用于essence-ng2-esrimap及e-ngx-cesium组件
};
