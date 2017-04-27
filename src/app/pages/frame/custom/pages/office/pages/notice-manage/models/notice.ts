export class Notice {
    constructor (public info: string = '',
                 public recipients: string[] = [],
                 public nos: string[] = [],
                 public type: number = 0,
                 public c_info?: string,
                 public recieveUser?: any[],
                 public subject?: string,
                 public c_subject?: string,
                 public id?: string) {}
}