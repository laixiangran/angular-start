export class Datadict {
	constructor(public id?: string,
				public data: DatadictType = new DatadictType(),
				public children?: Datadict[],
				public a_attr?: any,
				public iconClass?: string,
				public leaf?: boolean,
				public text?: string,
				public type?: string) {
	}
}

export class DatadictType {
	constructor(public id?: string,
				public info?: string,
				public name?: string,
				public order?: number,
				public leaf?: boolean,
				public parentId?: string,
				public type?: string) {
	}
}
