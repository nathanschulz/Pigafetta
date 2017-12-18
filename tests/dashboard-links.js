var config = require('../nightwatch.conf.js');
const WAIT_TIME = 500;

/**
 *	Tests whether all links on LeanData dashboard still load.
 *	The following custom settings are enabled on Edge:
 *		- campaign report on?
 *		- attribution on?
 *		- campaign influence on?
 *		- clarity frontend on?
 *		- clarity on?
 *		- has routing product
 *		- has tagging product
 *		- list analyzer on?
 **/
module.exports = {
	'login': function(browser) {
		browser
			.maximizeWindow()
			//.resizeWindow(2460, 1440)
			.url('https://login.salesforce.com')
			.waitForElementVisible('#username', 1000)
			.waitForElementVisible('#password', 1000)
			.waitForElementVisible('#Login', 1000)
			.setValue('#username', process.env.SFDC_CI_NAME)
			.setValue('#password', process.env.SFDC_CI_PASSWORD)
			.click('#Login')
		;
	},