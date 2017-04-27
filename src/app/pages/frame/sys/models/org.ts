import {Attachment} from "./attachment";
/**
 * Created by Hllinc on 2016-11-07 17:26.
 */
export class Org{
    constructor(
       public c_parent_id:string,
       public c_name:string,
       public n_order:number,
       public children: Org[],
	   public attachmentDetail?: Attachment,
       public c_addr?:string,
       public c_org_type?:string,
       public c_qualification?:string,
       public c_certificate_no?:string,
       public c_comment?: string,
       public c_attachment?:string,
       public c_id?:string
){}
}
