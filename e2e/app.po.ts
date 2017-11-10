import { browser, by, element } from 'protractor';

export class AppPage {
	navigateTo() {
		return browser.get('/');
	}

	getAppTitle() {
		return browser.getTitle();
	}

	getWelcomeMessage() {
		return element(by.css('h1')).getText();
	}
}
