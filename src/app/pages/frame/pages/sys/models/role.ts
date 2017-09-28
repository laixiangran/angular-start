/**
 * Created by Hllinc on 2016-11-08 11:32.
 */
export class Role {
	/**
	 * @param c_name 角色名称
	 * @param c_comment 角色描述
	 * @param n_order
	 * @param c_id 角色id
	 */
	constructor(public rolenm: string,
				public info: string,
				public id?: string,
				public c_checked?: boolean,) {
	}
}
