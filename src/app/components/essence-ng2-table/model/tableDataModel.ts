/**
 * Created by Hllinc on 2016-12-22 0022 11:34.
 * 表格数据模型类
 */
import {Condition} from "./condition";
import {PageInfo} from "./pageInfo";

export class TableDataModel {
	constructor(
		public condition: Condition,// 过滤条件类
		public hiddenColumns: any,// 隐藏的列，数组
		public pageInfo: PageInfo,// 分页信息类
		public showColumns: any// 显示的列，数组
	){}
}
