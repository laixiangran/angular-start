/**
 * Created by Hllinc on 2016-12-22 0022 11:34.
 */
import {Condition} from "./condition";
import {PageInfo} from "./pageInfo";

export class TableDataModel {
	constructor(
		public condition: Condition,
		public hiddenColumn: any,
		public pageInfo: PageInfo,
		public showColumns: any
	){}
}
