import {Injectable} from '@angular/core';
import {AttachmentItem} from '../models/attachment-item';
import {Observable} from 'rxjs/Observable';
import { RequestService } from '../../../../../services/request.service';
import { ServerData } from '../../../../../models/server-data.model';

@Injectable()
export class AttachmentService {

	constructor(private requestService: RequestService) {
	}

	/**
	 * 添加附件分组
	 * @param attachment
	 * @returns {Observable<ServerData>}
	 */
	addAttachmentGroup(attachment: any): Observable<ServerData> {
		return this.requestService.post('/SysUserAction/addSysUser', attachment);
	}

	/**
	 * 删除单个附件
	 * @param attachmentItem
	 * @returns {Observable<ServerData>}
	 */
	deleteAttachmentItem(attachmentItem: AttachmentItem): Observable<ServerData> {
		return this.requestService.post('auth/attachmentItemsAction/deleteById', attachmentItem);
	}
}
