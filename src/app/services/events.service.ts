/**
 * Created by laixiangran on 2017/10/27.
 * homepage：http://www.laixiangran.cn.
 */
import { Injectable } from '@angular/core';

/**
 * @name EventsService
 * @description 自定义全局事件服务，用来在全应用中通过发布/订阅事件来进行通信
 * @usage
 * ```ts
 * import { EventsService } from '../services/events.service';
 *
 * constructor(public events: EventsService) {}
 *
 * // 订阅事件并打印信息
 * this.events.subscribe('test', (data: any) => {
 * 		console.log(data); // '我是test事件发送来的信息！'
 * });
 *
 * // 发布事件
 * this.events.publish('test', '我是test事件发送来的信息！');
 *
 * // 取消订阅
 * this.events.unsubscribe('test');
 * ```
 */
@Injectable()
export class EventsService {
	private channels: any = [];

	/**
	 * 通过事件主题订阅相应事件
	 * @param {string} topic 订阅事件的主题
	 * @param {function[]} handlers 事件处理方法
	 */
	subscribe(topic: string, ...handlers: Function[]) {
		if (!this.channels[topic]) {
			this.channels[topic] = [];
		}
		handlers.forEach((handler) => {
			this.channels[topic].push(handler);
		});
	}

	/**
	 * 通过事件主题取消订阅相应事件
	 * @param {string} topic 取消订阅事件的主题
	 * @param {function} handler 指定取消该事件主下的处理方法
	 * @return 如果有事件被取消则返回true
	 */
	unsubscribe(topic: string, handler: Function = null) {
		const t = this.channels[topic];
		if (!t) {
			return false;
		}
		if (!handler) {
			// 如果不指定处理方法，则取消该事件下所有的处理方法
			delete this.channels[topic];
			return true;
		}
		// 找到指定取消的处理方法的位置
		const i = t.indexOf(handler);
		if (i < 0) {
			return false;
		}
		t.splice(i, 1);
		// 如果事件下的处理方法为空则删除该事件
		if (!t.length) {
			delete this.channels[topic];
		}
		return true;
	}

	/**
	 * 通过事件主题发布相应事件
	 * @param {string} topic 发布事件的主题
	 * @param {any[]} args 通过事件发送的数据
	 */
	publish(topic: string, ...args: any[]) {
		const t = this.channels[topic];
		if (!t) {
			return null;
		}
		const responses: any[] = [];
		t.forEach((handler: any) => {
			responses.push(handler(...args));
		});
		return responses;
	}
}
