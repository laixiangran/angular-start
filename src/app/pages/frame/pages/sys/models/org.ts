import {Attachment} from './attachment';
/**
 * Created by Hllinc on 2016-11-07 17:26.
 */
export class Org {
	constructor(public name: string,
				public parentId: string,
				public type?: number,
				public address?: string,
				public createTime?: string,
				public tel?: number,
				public district?: string,
				public fax?: string,
				public email?: string,
				public principal?: string,
				public id?: string,
				public unit?: string,
				public text?: string,
				public sex?: number,
				public attachmentDetail?: Attachment,
				public c_attachment?: string,
				public data?: any,
				// public c_addr?:string,
				//
				// public c_qualification?:string,
				// public c_certificate_no?:string,
				// public c_comment?: string,

				// public c_id?:string
	) {
	}
}
