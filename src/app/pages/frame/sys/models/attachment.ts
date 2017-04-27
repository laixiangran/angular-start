/**
 * Created by Hllinc on 2016-12-02 0002 16:03.
 */
import {AttachmentItem} from "./attachment-item";

export class Attachment {
	constructor(
		public c_info:string,
		public c_id?:string,
		public attachmentItems?:AttachmentItem[]
	){}
}
