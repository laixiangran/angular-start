/**
 * Created by laixiangran on 2017/8/29.
 * homepage：http://www.laixiangran.cn.
 * 后台返回结果对象
 */
export class ServerData {
	/**
	 * @param info 返回的信息
	 * @param code 返回的代码（"ok","error"）
	 * @param result 返回的结果
	 */
	constructor(public info: string,
				public code: string,
				public result: any) {}
}

