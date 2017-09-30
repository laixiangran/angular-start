import {AttachmentItem} from './attachment-item';
export class Attachment {
	constructor(public c_info: string,
				public c_id?: string,
				public attachmentItems?: AttachmentItem[]) {
	}
}
