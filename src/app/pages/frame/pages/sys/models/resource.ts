export class Resource {
	constructor(public name: string,
				public url: string,
				public parentId: string,
				public icon: string,
				public describe: string,
				public sn: string,
				public type: string,
				public children?: Resource,
				public id?: string,
				public c_checked?: number,
				public data?: Resource,
				public order?: number) {
	}
}
