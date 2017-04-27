/**
 * Created by laixiangran on 2017/1/4.
 * homepage：http://www.laixiangran.cn.
 */

/**
 * GP服务异步获取数据的参数类
 */
export class AsyncGetResultParam {

    /**
     * @param url GP服务路径
     * @param inParamVal GP输入参数值
     * @param outParamName 输出参数名
     * @param success 执行成功的函数
     * @param status 执行中的函数
     * @param error 执行发生错误的函数
     */
    constructor(
        public url: string,
        public inParamVal: Object,
        public outParamName: string,
        public success: Function,
        public error: Function,
        public status?: Function
    ) {}
}