import {Injectable} from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {Attachment} from "../models/attachment";
import {ServerData} from "../models/server-data";
import {Observable} from "rxjs";
import {AttachmentItem} from "../models/attachment-item";

@Injectable()
export class AttachmentService {

	constructor(private dataService: DataService) {
	}

	/**
	 * 添加附件分组
	 * @param attachment
	 * @returns {Observable<ServerData>}
	 */
	addAttachmentGroup(attachment: Attachment): Observable<ServerData> {
		return this.dataService.postData('auth/attachment/add.do', attachment);
	}

	/**
	 * 删除单个附件
	 * @param attachmentItem
	 * @returns {Observable<ServerData>}
	 */
	deleteAttachmentItem(attachmentItem: AttachmentItem): Observable<ServerData> {
		return this.dataService.postData('auth/attachmentItemsAction/deleteById.do', attachmentItem);
	}
}
