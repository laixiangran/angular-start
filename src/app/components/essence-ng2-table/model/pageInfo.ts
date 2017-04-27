/**
 * Created by Hllinc on 2016-12-22 0022 11:37.
 */

export class PageInfo {
	constructor(
		public beginRecord: number,
		public currentPageNum: number,
		public endRecord: number,
		public pageSize: number,
		public totalPages: number,
		public totalRecords: number,
		public items: any
	) {

	}
}
