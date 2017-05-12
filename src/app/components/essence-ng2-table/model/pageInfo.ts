/**
 * Created by Hllinc on 2016-12-22 0022 11:37.
 * 分页信息类
 */

export class PageInfo {
	constructor(
		public beginRecord: number,// 开始记录序号
		public currentPageNum: number,// 当前页码
		public endRecord: number,// 结束记录序号
		public pageSize: number,// 每页数据条数
		public totalPages: number,// 总页数
		public totalRecords: number,// 总记录数
		public items: any// 数据条目详细，数组，存放后台返回的数据列表
	) {

	}
}
