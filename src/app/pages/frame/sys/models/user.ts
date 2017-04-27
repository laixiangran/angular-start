import {Access} from "./access";
import {Role} from "./role";
import {Org} from "./org";
import {Attachment} from "./attachment";
/**
 * Created by Hllinc on 2016-10-30 18:05.
 */
export class User {
    constructor(
        public c_id?:string,
        public c_name?:string,
        public c_sex?:string,

        public access?:Access,
        public userRoles?:Role[],
        public orgDetail?:Org,

        public d_birthday?:any,
        public c_email?:string,
        public c_telphone?:string,
        public c_access_id?:string,
        public d_createtime?:any,
        public c_org_id?:string,
        public c_org_name?:string,

        public c_attachment?:string,
		public attachmentDetail?:Attachment
    ){
    }
}
