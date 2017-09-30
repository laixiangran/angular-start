/**
 * Created by Hllinc on 2016-11-01 15:25.
 */
export class Resource {
	/**
	 *
	 * @param c_id 系统编号
	 * @param c_name 资源名称
	 * @param c_url 资源路由
	 * @param c_parent_id 所属父节点id
	 * @param c_icon 图标
	 * @param c_comment 备注
	 * @param n_order 排序
	 * @param n_type 资源类型0为菜单，1为子功能菜单，2为操作请求路径
	 * @param children 子条目
	 * @param c_checked 是否选中（前台使用，0未选择，1待确定，2选中）
	 */
	constructor(public name: string,
				public url: string,
				public parentId: string,
				public icon: string,
				public describe: string,
				public sn: string,
				public type: string,
				public children?: Resource,
				public id?: string,
				public c_checked?: number,
				public data?: Resource,
				public order?: number) {
	}
}