/**
 * Created by Hllinc on 2016-12-22 0022 11:35.
 * 过滤条件类
 */

export class Condition {
	constructor(
		public order: any,// 排序条件，数组
		public all: any,// 全局过滤条件
		public where: any// 单列过滤条件，数组
	) {
	}
}
