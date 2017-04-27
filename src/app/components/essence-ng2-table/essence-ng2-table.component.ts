/**
 * Created by Hllinc on 2016-12-21 0021 17:23.
 */

import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, DoCheck} from "@angular/core";
import {ControlValueAccessor} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {Sys} from "../../utils/sys";
import {TableDataModel} from "./model/tableDataModel";
import any = jasmine.any;
@Component({
	selector: 'essence-ng2-table',
	templateUrl: './essence-ng2-table.component.html',
	styleUrls: ['./essence-ng2-table.component.scss']
})

export class EssenceNg2TableComponent implements ControlValueAccessor, OnInit, OnDestroy {
	private oldConfig: any = null;

	// 默认配置参数
	private defaultConfig: any = {
		serverUrl: "",
		serverParam: {
			pageInfo: {
				currentPageNum: 1,
				pageSize: 15
			},
			condition: {
				where: null,
				order: null
				// where:[{
				// conn: "and", // 默认为and状态,and | or
				// paramCompare: "=", // 默认是=，[= | > | < | in | between | like]
				// paramType: "string", // 默认为String，[string | int | date | datetime | list |
				// double | float]
				// paramKey: null, // 实体bean对应字段
				// paramValue: null, // 字段对应值
				// paramKeyAlias: null, // 列别名
				// }],
				// order:[{
				// paramKey: null, // 实体bean对应字段
				// paramValue: "asc" // 字段对应值 [asc | desc]
				// }]
			}
		},
		columns: {
			filter: {
				enabled: true
			},
			batch: {
				enabled: true,
				checkAllName: null,
				checkSingleName: null
			},
			index: {
				enabled: true
			},
			items: [{
				label: "编号",
				colName: "",
				colAlias: null,
				visible: true,
				order: true,
				width: 200,
				cls: "text-center",
				style: null,
				ellipsis: false,
				filterProp: {
					enabled: true,
					type: "string",// string,select,date,datetime,num,combobox
					compare: "like", // like,=,>,<,between
					value: ''
				},
				render: (obj) => {
				}
			}]
		},
		tableBar: {
			header: {
				layout: {
					leftWidth: "30%",
					centerWidth: "40%",
					rightWidth: "30%"
				},
				title: {
					enabled: true,
					text: "表格标题",
					cls: "",
					style: null
				},
				toolbar: {
					enabled: true,
					buttons: [{
						type: "button",// button,select,checkbox
						label: "添加",
						cls: null,
						event: {
							type: "click",
							fn: () => {
								alert("添加");
							}
						}
					}]
				},
				finalFilter: {
					enabled: true,
					type: "string" // string,select,date,datetime,num,combobox
				}
			},
			footer: {
				info: {
					enabled: true,
					formatter: "显示_currentMinNum到_currentMaxNum条，共_sum条"
				},
				pagination: {
					enabled: true,
					type: "number"
				}
			}
		},
		event: {
			rowSelect: {
				enabled: true,
				multi: true,
				cls: "default"
			},
			resize: {
				enabled: true
			},
			complete: () => {

			}
		}
	};
	private config: any = {};

	// 表格数据
	private tableData: TableDataModel = null;

	/**
	 * 属性设置
	 * @param config
	 */
	@Input()
	set option (config: any) {
		this.config = $.extend(true, {}, this.defaultConfig, config);
		this._initTable();
	}

	get option (): any {
		return this.config;
	}

	/**
	 * 表格加载完成事件
	 * @type {EventEmitter<any>}
	 */
	@Output()
	private ready: EventEmitter<any> = new EventEmitter<any>(false);

	constructor(private dataService: DataService) {
	}

	ngOnInit() {

	}

	ngOnDestroy() {
		this.tableData = null;
	}

	/**
	 * 加载表格数据
	 */
	private _initTable() {
		this.__sort();
		this.__filter();
		this.dataService.postData(this.config.serverUrl, this.config.serverParam).subscribe(
			(serverData) => {
				if (serverData.code == 'ok') {
					this.tableData = <TableDataModel> serverData.result;
					this.ready.emit();
				}
			},
			(error) => {
				Sys.sysAlert(error);
			}
		)
		// this.dataService.getData('../../../mock/essenceTable/tableData.json', true).subscribe(
		// 	(serverData) => {
		// 		if (serverData.code == 'ok') {
		// 			this.tableData = <TableDataModel> serverData.result;
		// 			this.ready.emit();
		// 		}
		// 	},
		// 	(error) => {
		// 		Sys.sysAlert(error);
		// 	}
		// )
	}

	/**
	 * 排序方法
	 * @param column
	 * @private
	 */
	private _sort(column: any) {
		if (column.order) {
			if (column.order === 'asc') {
				column.order = 'desc'
			} else if (column.order === 'desc') {
				column.order = 'sort';
			} else {
				column.order = 'asc';
			}
			this._initTable();
		}
	}

	private __sort(){
		let orders: any = [];
		for (let i = 0; i < this.config.columns.items.length; i++) {
			let col = this.config.columns.items[i];
			if (col.order === 'asc' || col.order === 'desc') {
				orders.push({
					paramKey: col.colName,
					paramValue: col.order
				});
			}
		}
		this.config.serverParam.condition.order = orders;
	}

	/**
	 * 过滤方法
	 * @param column
	 * @private
	 */
	private _filter($event: any, column: any) {
		let value = $event.target.value;
		column.filterProp.value = value.trim();
		this._initTable();
	}

	private __filter(){
		let filters: any = [];
		for (let i = 0; i < this.config.columns.items.length; i++) {
			let col = this.config.columns.items[i];
			if (col.filterProp.value) {
				filters.push({
					conn: 'and',
					paramCompare: col.filterProp.compare,
					paramType: col.filterProp.type,
					paramKey: col.colName,
					paramKeyAlias: col.colAlias,
					paramValue: (col.filterProp.compare === 'like' ? '%' + col.filterProp.value + '%' : col.filterProp.value)
				});
			}
		}
		this.config.serverParam.condition.where = filters;
	}

	/**
	 * 上一页方法
	 * @private
	 */
	private _prePage() {
		this.config.serverParam.pageInfo.currentPageNum--;
		this.config.serverParam.pageInfo.beginRecord = this.config.serverParam.pageInfo.beginRecord - this.config.serverParam.pageInfo.pageSize;
		this._initTable();
	}

	/**
	 * 下一页方法
	 * @private
	 */
	private _nextPage() {
		this.config.serverParam.pageInfo.currentPageNum++;
		this.config.serverParam.pageInfo.beginRecord = this.config.serverParam.pageInfo.beginRecord + this.config.serverParam.pageInfo.pageSize;
		this._initTable();
	}

	/**
	 * 跳转页方法
	 * @param num
	 * @private
	 */
	private _toPage(num: number) {
		if (this.config.serverParam.pageInfo.currentPageNum !== num && num !== -1) {
			this.config.serverParam.pageInfo.currentPageNum = num;
			this.config.serverParam.pageInfo.beginRecord = this.config.serverParam.pageInfo.pageSize * (num-1);
			this._initTable();
		}
	}

	/**
	 * 获取列样式方法
	 * @param column
	 * @returns {string}
	 * @private
	 */
	private _getColumnStyle(column: any) {
		let cls = [];
		cls.push(column.cls);
		if (column.order) {
			cls.push('order');
		}
		return cls.join(' ');
	}

	/**
	 * 数字转数组方法（为了迁就ngFor）
	 * @param n
	 * @returns {Array}
	 * @private
	 */
	private _numberArray(n: number) {
		let result = [];
		for (let i: number = 0; i < n; i++) {
			result.push(i + 1);
		}
		return result;
	}

	/**
	 * 判断对象是否为方法（模板语法中不支持typeof）
	 * @param param
	 * @returns {boolean}
	 * @private
	 */
	private _isFunction(param: any) {
		return typeof param == 'function';
	}

	/**
	 * 生成分页按钮上的文字
	 * @param index
	 * @param currentPageNum
	 * @param sumPageNum
	 * @returns {string}
	 */
	private _generateForText(index:number, currentPageNum:number, sumPageNum:number):string{
		if(index === 1 || index === sumPageNum || currentPageNum + 1 === index || currentPageNum -1 === index || currentPageNum === index){
			return index.toString();
		}else{
			return '...';
		}
	}

	/**
	 * 生成分页按钮
	 * @param index
	 * @param currentPageNum
	 * @param sumPageNum
	 * @returns {boolean}
	 */
	private _generateForButton(index:number, currentPageNum:number, sumPageNum:number): boolean{
		if((index - currentPageNum > 2 || currentPageNum -index > 2) && index != 1 && index != sumPageNum){
			return false;
		}else{
			return true;
		}
	}


	/**
	 * 刷新列表数据
	 */
	public refresh(){
		this._initTable();
	}

	/**
	 * 以下实现ControlValueAccessor接口的方法
	 * @param value
	 */
	writeValue(value: any): void {
	}

	registerOnChange(fn: any): void {
	}

	registerOnTouched(fn: any): void {
	}

}
