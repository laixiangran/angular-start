import { AppPage } from './app.po';

describe('angular-start App', () => {
	let appPage: AppPage;

	beforeAll(() => {
		appPage = new AppPage();
		appPage.navigateTo();
	});

	it('title should "Angular Start"', () => {
		expect(appPage.getAppTitle()).toEqual('Angular Start');
	});

	it('should display welcome message', () => {
		expect(appPage.getWelcomeMessage()).toEqual('Welcome to Angular World!');
	});
});
