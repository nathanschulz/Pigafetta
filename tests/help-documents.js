var config = require('../nightwatch.conf.js');
const WAIT_TIME = 500;
const PASSPHRASE = 'Frictionless Funnel';

/**
 *	Navigates to the Help section of the LeanData Dashboard.
 *	Verifies that all documents are present and then verifies that all
 *	links are working by switching focus to the newly opened window and
 *	asserting that the title of the new window is equal to that of the document.
 *	
 *	Note:
 *	Methods will break if document titles change
 **/
module.exports = {
	// Login depends on LeanData being an option on the homepage of SFDC
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
			.pause(WAIT_TIME)
		;
	},

	'navigate-to-help': function(browser) {
		browser
			.waitForElementVisible('.wt-LeanData', 10000)
			.click('.wt-LeanData')
			.waitForElementVisible('.help-nav', 10000)
			.click('.help-nav')
	},

	'verify-present-documents': function(browser) {
		browser
			// Make sure the last Help document section has loaded
			.waitForElementVisible('.dg_section:last-of-type', 10000)
			.pause(WAIT_TIME)
			// Verify that Matching document links are present
			.assert.containsText('.dg_section:nth-of-type(1)', 'Matching Datasheet')
			.assert.containsText('.dg_section:nth-of-type(1)', 'Account Scoring Datasheet')
			.assert.containsText('.dg_section:nth-of-type(1)', 'Tagging FAQ')
			.assert.containsText('.dg_section:nth-of-type(1)', 'Marketo Webhook Integration')
			// Verify that Router document links are present
			.assert.containsText('.dg_section:nth-of-type(2)', 'Lead Router Datasheet')
			.assert.containsText('.dg_section:nth-of-type(2)', 'Contact Router Datasheet')
			.assert.containsText('.dg_section:nth-of-type(2)', 'Routing Action Guide')
			.assert.containsText('.dg_section:nth-of-type(2)', 'Round Robin FAQ')
			.assert.containsText('.dg_section:nth-of-type(2)', 'Router FAQ')
			// Verify that Attribution links are present
			.assert.containsText('.dg_section:nth-of-type(3)', 'Multi-Touch Attribution Datasheet')
			.assert.containsText('.dg_section:nth-of-type(3)', 'Attribution Overview')
			.assert.containsText('.dg_section:nth-of-type(3)', 'Attribution Wizard')
			.assert.containsText('.dg_section:nth-of-type(3)', 'Attribution Views Setup')
			// Verify that View links are present
			.assert.containsText('.dg_section:nth-of-type(4)', 'View Datasheet')
			.assert.containsText('.dg_section:nth-of-type(4)', 'Product Overview')
			.assert.containsText('.dg_section:nth-of-type(4)', 'Setup')
			.assert.containsText('.dg_section:nth-of-type(4)', 'Best Practices')
			.assert.containsText('.dg_section:nth-of-type(4)', 'FAQ')
			// Verify that Admin links are present
			.assert.containsText('.dg_section:nth-of-type(5)', 'Managed App Installation')
			.assert.containsText('.dg_section:nth-of-type(5)', 'Dashboard Overview')
			// Verify that Contact Us links are present
			.assert.containsText('.dg_section:nth-of-type(6)', 'customersuccess@leandatainc.com')
			.assert.containsText('.dg_section:nth-of-type(6)', '1-669-721-9386')
			.pause(WAIT_TIME)
		;
	},

	'verify-matching-datasheet': function(browser) {
		browser
			.useXpath()
			.getAttribute("//a[text()='Matching Datasheet']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Matching Datasheet']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.waitForElementVisible('#username', 10000);
				this.setValue('#username', PASSPHRASE);
				this.pause(WAIT_TIME);
				this.click('#login');
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - Matching Datasheet');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},
	
	'verify-accout-scoring-datasheet': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Account Scoring Datasheet']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Account Scoring Datasheet']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - Account Scoring Datasheet');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-tagging-faq': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Tagging FAQ']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Tagging FAQ']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - LeanData - Tagging FAQ');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-marketo-webhook-integration': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Marketo Webhook Integration']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Marketo Webhook Integration']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - LeanData Lead-to-Account Matching Marketo Webhook Setup');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-lead-router-datasheet': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Lead Router Datasheet']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Lead Router Datasheet']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - Routing Datasheet');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-contact-router-datasheet': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Contact Router Datasheet']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Contact Router Datasheet']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - Contact Routing Datasheet');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-routing-action-guide': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Routing Action Guide']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Routing Action Guide']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - Routing Action Guide');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-round-robin-faq': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Round Robin FAQ']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Round Robin FAQ']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - LeanData - Router - Round Robin Overview');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-router-faq': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Router FAQ']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Router FAQ']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - LeanData - Router FAQ');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-multi-touch-attribution-datasheet': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Multi-Touch Attribution Datasheet']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Multi-Touch Attribution Datasheet']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - Multi-Touch Attribution Datasheet');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-attribution-overview': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Attribution Overview']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Attribution Overview']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - LeanData Attribution Overview');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-attribution-wizard': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Attribution Wizard']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Attribution Wizard']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - LeanData Attribution Wizard');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-attribution-views-setup': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Attribution Views Setup']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Attribution Views Setup']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - LeanData Attribution Views Setup');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-multi-touch-attribution-datasheet': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Multi-Touch Attribution Datasheet']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Multi-Touch Attribution Datasheet']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - Multi-Touch Attribution Datasheet');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-view-datasheet': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='View Datasheet']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='View Datasheet']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - View Datasheet');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-product-overview': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Product Overview']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Product Overview']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - View Product Overview');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-setup': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			// Need to use more complex XPath here due to Salesforce having another default 'Setup' link
			.getAttribute(".//*[@id='j_id0:j_id7:j_id43_0']/div/div[2]/div[4]/div[2]/a[3]", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click(".//*[@id='j_id0:j_id7:j_id43_0']/div/div[2]/div[4]/div[2]/a[3]")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - View Setup');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-best-practices': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Best Practices']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Best Practices']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - View Best Practices');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-faq': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='FAQ']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='FAQ']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - View FAQ');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},
	
	'verify-managed-app-installation': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Managed App Installation']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Managed App Installation']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - LeanData Managed App Install');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},
	
	'verify-dashboard-overview': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			.getAttribute("//a[text()='Dashboard Overview']", 'href', function(link) {
				newWindowUrl = link.value;
			})
			
			.click("//a[text()='Dashboard Overview']")
			.useCss()
			.windowHandles(function(result) {
				var newWindow;
				newWindow = result.value[1];
				this.switchWindow(newWindow);
				this.pause(WAIT_TIME);
				this.waitForElementVisible('.content-subtitle', 10000)
				this.assert.title('Help Documentation - LeanData Dashboard Overview');
				this.pause(WAIT_TIME);
				this.closeWindow();
				this.switchWindow(result.value[0]);
			})
		;
	},

	'verify-email-link': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			// Not sure if this is the best way to check if an email link is correct
			.assert.attributeContains("//a[text()='customersuccess@leandatainc.com']", 'href', 'mailto:customersuccess@leandatainc.com')
		;
	},

	'verify-phone-number-link': function(browser) {
		browser
			.useXpath()
			.pause(WAIT_TIME)
			// Not sure if this is the best way to check if a phone link is correct
			// Will also break if the phone number changes on the website
			.assert.attributeContains("//a[text()='1-669-721-9386']", 'href', 'tel:1-669-721-9386')
		;
	},

	'close-chrome': function(browser) {
		browser
			.pause(1000)
			.end()
		;
	}
}