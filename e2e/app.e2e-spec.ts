import { AppPage } from './app.po';

describe('angular-start App', () => {
	let page: AppPage;

	beforeEach(() => {
		page = new AppPage();
	});

	it('should display welcome message', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual('你已经成功启动并登录angular-start项目，现在开启angular愉悦的开发之旅吧！');
	});
});
