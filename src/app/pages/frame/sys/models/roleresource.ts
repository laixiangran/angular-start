/**
 * Created by laixiangran on 2016/11/23.
 * homepage：http://www.laixiangran.cn.
 */
export class Roleresource {
    /**
     *
     * @param c_id 角色资源id
     * @param c_role_id 角色id
     * @param c_resource_id 资源id
     */
    constructor(
        public c_id:string,
        public c_role_id:string,
        public c_resource_id:string
    ){}
}