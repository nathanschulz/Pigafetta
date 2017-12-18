var config = require('../nightwatch.conf.js');
const WAIT_TIME = 500;
var metaData;
var accountToLeadMap = {
	'ID': ['ID'],
	'TEXTAREA': ['TEXTAREA', 'STRING', 'EMAIL', 'URL'],
	'PHONE': ['PHONE', 'STRING'],
	'STRING': ['STRING', 'PICKLIST', 'URL', 'EMAIL'],
	'PICKLIST': ['PICKLIST', 'STRING'],
	'CURRENCY': ['CURRENCY', 'DOUBLE'],
	'DOUBLE': ['DOUBLE', 'PERCENT'],
	'REFERENCE': ['ID'],
	'DATETIME': ['DATETIME'],
	'BOOLEAN': ['BOOLEAN'],
	'INTEGER': ['INTEGER', 'DOUBLE'],
	'DATE': ['DATE', 'DATETIME'],
	'URL': ['URL', 'STRING']
};
/*
var leadBlacklist = ['A2B Account', 'A2B Group', 'Has Matched', 'LeanData MArketing Sys Created Date', 'LeanData Matched Account (deprecated)',
					 'LeanData Matched Lead (deprecated)', 'LeanData Router Status (obsolete)', 'LeanData Routing Status', 'LeanData Salesforce Id',
					 'LeanData Search', 'LeanData Search (obsolete)', 'Reporting Timestamp', 'Segment', 'State Info', 'Tag'];
*/

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

	'navigate-to-mapped-account-fields': function(browser) {
		browser
			.waitForElementVisible('.wt-LeanData', 10000)
			.click('.wt-LeanData')
			.waitForElementVisible('.matching-nav', 10000)
			.click('.matching-nav')
			.waitForElementVisible('.matching-AS-subnav', 10000)
			.click('.matching-AS-subnav')
			.waitForElementVisible('.matching-AS-MAF-subsubnav', 10000)
			.click('.matching-AS-MAF-subsubnav')
			.pause(WAIT_TIME)
		;
	},

	'get-field-meta-data': function(browser) {
		browser
			// Need to make sure the page has loaded before querying for fieldMetaData
			.waitForElementVisible('#save_button', 10000)
			.execute(function() {
				return window.fieldMetaData;
			}, [], function(val) {
				metaData = val.value;
			})
			.pause(WAIT_TIME)
		;
	},

	'test-meta-data': function(browser) {
		browser
			// Add a new row
			.assert.elementPresent('.add-new-row')
			.pause(WAIT_TIME)
			.click('.add-new-row')
			.pause(WAIT_TIME)
			.assert.elementPresent('.left-dropdown-container')
			.assert.elementPresent('.right-dropdown-container')
			.pause(WAIT_TIME)
			.perform(function() {
				for(var i = 0; i < metaData.Account.length; i++) {
					if(metaData.Account[i].type !== 'REFERENCE') {
						/*
						browser
							.click('.left-dropdown-container')
							.click('p[title=' + metaData.Account[i].name + ']')
							.pause(WAIT_TIME)
							.click('.right-dropdown-container')
						;
						var arr = accountToLeadMap[metaData.Account[i].type];
						for(var j = 0; j < metaData.Lead.length; j++) {
							for(var k = 0; k < arr.length; k++) {
								if(metaData.Lead[j].type === arr[k] && (metaData.Lead[j] == false || metaData.Lead[j].isUpdateable == true) && /^leandata/.exec(metaData.Lead[j].name) == null) {
									console.log(metaData.Account[i].label + ' (' + metaData.Account[i].type + ') -> ' + metaData.Lead[j].label + ' (' + metaData.Lead[j].type + ')');
									browser
										.pause(50)
										.verify.containsText('.right-dropdown-container', metaData.Lead[j].label)
									;
								}
							}
						}
						*/
					}
					else {
						console.log('parent = ' + metaData.Account[i].parent);
					}
				}
			})
			/*
			.perform(function() {
				for(var i = 1; i <= metaData.Account.length; i++) {
					browser
						.click('.left-dropdown-container')
						.click('.tt-suggestion:nth-of-type('+i+')')
						.getValue('.typeahead.typeahead-input.tt-input', function(result) {
							//this.assert.equal(typeof result, "object");
							//this.assert.equal(result.status, 0);
							for(var j = 0; j < metaData.Account.length; j++) {
								if(result.value === metaData.Account[j].label && result.value !== '') {
									var arr = accountToLeadMap[metaData.Account[j].type];
									browser.click('.right-dropdown-container');
									for(var k = 0; k < metaData.Lead.length; k++) {
										for(var l = 0; l < arr.length; l++) {
											if(metaData.Lead[k].type === arr[l] && (metaData.Lead[k] == false || metaData.Lead[k].isUpdateable == true) && /^leandata/.exec(metaData.Lead[k].name) == null) {
												console.log(metaData.Account[j].label + ' (' + metaData.Account[j].type + ') -> ' + metaData.Lead[k].label + ' (' + metaData.Lead[k].type + ')');
												browser
													.pause(50)
													.verify.containsText('.right-dropdown-container', metaData.Lead[k].label)
												;
											}
										}
									}
								}
							}
						})
						//.click('.typeahead.typeahead-input.tt-input')
						.click('.root.nts-selected-node.nts-parent-node')
					;
				}
			})
			*/
			/*
			.click('.tt-suggestion:nth-of-type(1)')
			.getValue('.typeahead.typeahead-input.tt-input', function(result) {
				console.log('value = ' + result.value);
				this.assert.equal(typeof result, "object");
				this.assert.equal(result.status, 0);
				this.assert.equal(result.value, "Account Number");
			})

			
			.perform(function() {
				var count = 0;
				for(var i = 0; i < metaData.Account.length; i++) {
				    if(metaData.Account[i].type !== 'REFERENCE') {
						for(var j = 0; j < metaData.Lead.length; j++) {
							var arr = accountToLeadMap[metaData.Account[i].type];
							for(var k = 0; k < arr.length; k++) {
								if(metaData.Lead[j].type === arr[k] && (metaData.Lead[j] == false || metaData.Lead[j].isUpdateable == true)) {
									count++;
									console.log(metaData.Account[i].label + ' (' + metaData.Account[i].type + ') -> ' + metaData.Lead[j].label + ' (' + metaData.Lead[j].type + ')');
									browser.assert.containsText(metaData.Lead[j].label);
								}
							}
						}
					}
				}
				console.log('count = ' + count);
			})
			*/

			.pause(5000)
		;
	},

	'close-chrome': function(browser) {
		browser
			.pause(1000)
			.end()
		;
	}
}

