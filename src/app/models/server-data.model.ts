/**
 * Created by Hllinc on 2016-11-01 19:05.
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

