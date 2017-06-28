export class Util {

    constructor () {}

    /**
     * 扩展对象（浅度）
     * @param target 扩展对象
     * @param source 原始对象
     * @returns {Object}
     */
    public static simpleExtend (target: Object, source: Object): Object {
        for (const p in source) {
            if (source.hasOwnProperty(p)) {
                target[p] = source[p];
            }
        }
        return target;
    }

    /**
     * 扩展对象（深度度）
     * @param target 扩展对象
     * @param source 原始对象
     * @returns {Object}
     */
    public static deepExtend (target: Object, source: Object) {
        for (const p in source) {
            if (source.hasOwnProperty(p)) {
                const copy: any = source[p];
                if (target === copy) { // Array
                    continue;
                }
                if (typeof copy === 'object') {
                    target[p] = this.deepExtend(target[p] || {}, copy);
                } else {
                    target[p] = copy;
                }
            }
        }
        return target;
    }
}
