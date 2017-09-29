/**
 * Created by laixiangran on 2017/8/29.
 * homepage：http://www.laixiangran.cn.
 * 后台返回结果对象
 */
export class ServerData {
	/**
	 * 响应信息
	 */
	info: string;

	/**
	 * 响应代码（"ok" 或者 "error"）
	 */
	code: string;

	/**
	 * 响应结果
	 */
	result: any;
}
