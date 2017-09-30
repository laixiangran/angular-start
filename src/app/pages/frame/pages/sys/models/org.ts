import { Attachment } from './attachment';

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
				public data?: any) {

	}
}
