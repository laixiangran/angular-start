/**
 * Created by Hllinc on 2016-11-01 21:01.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Datadict, DatadictType } from '../../models/datadict';
import { DatadictService } from './datadict.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalComponent } from 'ng2-bs3-modal/components/modal';
import { ConfirmationService } from 'primeng/primeng';

@Component({
	templateUrl: './datadict.component.html',
	styleUrls: ['./datadict.component.scss'],
})

export class DatadictComponent implements OnInit {
	@ViewChild('datadictModal') datadictModal: ModalComponent;
	@ViewChild('treedatadictModal') treedatadictModal: ModalComponent;
	datadicts: any[] = null;
	selectedDatadict: DatadictType = new DatadictType();
	selectedDatadictValue: Datadict = new Datadict();
	tree: any = null;
	DatadictsList: DatadictType[];
	updateTree: boolean = false;

	constructor(public dictionaryService: DatadictService, public confirmationService: ConfirmationService) {
	}

	ngOnInit() {
		this.getDatadictsList()
	}

	/**
	 * 选中数据类型
	 * */
	selectDatadict(info) {
		this.selectedDatadict = info;
	}

	/**
	 * 获取数据字典大类列表
	 * */
	getDatadictsList() {
		const sub: Subscription = this.dictionaryService.postDatadictsList().subscribe(
			(serverData) => {
				sub.unsubscribe();
				if (serverData.code === 'ok') {
					this.DatadictsList = serverData.result;
				}
			}
		)
	}

	/**
	 * 删除字典类
	 * */
	deleteDatadict(info) {
		this.confirmationService.confirm({
			header: '系统提示',
			message: '是否删除该条数据？',
			acceptVisible: true,
			accept: () => {
				const sub = this.dictionaryService.deleteDatadict(info.type).subscribe(
					(serverData) => {
						sub.unsubscribe();
						if (serverData.code) {
							this.getDatadictsList();
							this.selectedDatadict.id = '';
						} else {
							throw serverData.info;
						}
					}
				)
			},
			rejectVisible: true,
			reject: () => {}
		});
	}

	/**
	 * 添加字典类
	 * */
	addDatadict() {
		this.selectedDatadict = new DatadictType();
		this.datadictModal.open();
	}

	/**
	 * 编辑字典类
	 * */
	updateDatadict(info) {
		this.selectedDatadict = info;
		this.datadictModal.open();
	}

	/**
	 * 关闭数据类型表单
	 * */
	onclose(event) {
		this.datadictModal.close();
		this.updateTree = true;
		if (event) {
			this.getDatadictsList();
			if (this.selectedDatadict.id) {
				this.selectedDatadict = JSON.parse(JSON.stringify(this.selectedDatadict));
			}
		}
	}

	/**
	 * 关闭树表单
	 * */
	onclose1($event) {
		this.treedatadictModal.close();
		if ($event) {
			this.selectedDatadict = JSON.parse(JSON.stringify(this.selectedDatadict));
		}
	}

	/**
	 * 选中的树节点
	 * */
	selectedValueInfo($event) {
		this.tree = $event;
		this.selectedDatadictValue = JSON.parse(JSON.stringify($event.data));
	}

	/**
	 * 添加字典数据
	 * */
	addDatadictValue() {
		const type = JSON.parse(JSON.stringify(this.selectedDatadictValue.data.type));
		const parentId = JSON.parse(JSON.stringify(this.selectedDatadictValue.id));
		this.selectedDatadictValue = new Datadict();
		this.selectedDatadictValue.data.parentId = parentId;
		this.selectedDatadictValue.data.type = type;
		this.treedatadictModal.open();
	}

	/**
	 * 更新字典数据
	 * */
	updateDatadictValue() {
		this.treedatadictModal.open();
	}

	/**
	 * 删除字典数据
	 * */
	deleteDatadictValue() {
		this.confirmationService.confirm({
			header: '系统提示',
			message: `确定删除 【${this.selectedDatadictValue.data.name}】？`,
			acceptVisible: true,
			accept: () => {
				const obj: any = {};
				obj.id = this.selectedDatadictValue.id;
				const sub: Subscription = this.dictionaryService.deleteDatadictValue(obj).subscribe(
					(serverData) => {
						sub.unsubscribe();
						if (serverData.code === 'ok') {
							this.selectedDatadict = JSON.parse(JSON.stringify(this.selectedDatadict));
							// this.activateNode(pid);
						} else {
							throw serverData.info;
						}
					});
			},
			rejectVisible: true,
			reject: () => {}
		});
	}
}
