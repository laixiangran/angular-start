/**
 * Created by Hllinc on 2016-11-29 0029 17:02.
 */
export class Datadict{
    constructor(
        public c_name:string,
        public c_parent_id:string,
        public n_order:number,
        public n_type:number,
        public c_info:string,
        public children:Datadict[],
        public c_value?:string,
        public c_id?:string
){
    }
}