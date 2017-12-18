var config = require('../nightwatch.conf.js');
const WAIT_TIME = 500;
const MATCH_NODE = '.match-node-stencils-dropdown .type-magellan-models-stencilelement';
const DECISION_NODE = '.decision-node-stencils-dropdown .type-magellan-models-stencilelement';
const ACTION_NODE = '.action-node-stencils-dropdown .type-magellan-models-stencilelement';

/**
 *	Proof of concent for FlowBuilder graph verification potential
 *	1. Creates a workflow graph from JSON
 *	2. Validates it
 *	3. Deletes a condition and re-validates
 *	4. 
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

	'navigate-to-fb-graph': function(browser) {
		browser
			.waitForElementVisible('.wt-LeanData', 10000)
			.click('.wt-LeanData')
			.pause(WAIT_TIME)
			.waitForElementVisible('.router-nav', 10000)
			.click('.router-nav')
			.pause(WAIT_TIME)
			.waitForElementVisible('.router-lead-subnav', 10000)
			.click('.router-lead-subnav')
			.pause(WAIT_TIME)
			.waitForElementVisible('.router-lead-FB-subsubnav', 10000)
			.click('.router-lead-FB-subsubnav')
			.pause(WAIT_TIME)
			.waitForElementVisible('.new-graph-tile', 10000)
			.moveToElement('.new-graph-tile', 50, 50)
			.pause(WAIT_TIME)
			.doubleClick()
			.pause(WAIT_TIME)
			.waitForElementVisible('#board', 10000)
		;
	},

	'enable-grid-lines': function(browser) {
		browser
			.waitForElementVisible('.graph-settings-menu-button')
			.click('.graph-settings-menu-button')
			.pause(WAIT_TIME)
			.waitForElementVisible('.dropdown-menu-item')
			.pause(WAIT_TIME)
			.click('label[for=enableGridlines]')
			.pause(WAIT_TIME)
			.click('.graph-settings-menu-button')
			.pause(WAIT_TIME)
		;
	},

	'insert-graph-from-json': function(browser) {
		var jsonGraph = '{"graphVersion":0.69,"businessLogic":[[{"magellanClass":"Magellan.Models.InsertedLeadTriggerNode","edges":[{"type":"fixed","condition":"New Lead","name":"Insert","target":"Duplicate Lead"}],"type":"TRIGGER","name":"New Lead","filter type":"none"},{"x":560,"y":60}],[{"magellanClass":"Magellan.Models.UpdateTriggerNode","edges":[{"type":"conditions","conditions":[{"field":"website","operand":"","operator":"not null","value/field":"value","type":"URL"}],"logic":"1","rpnLogic":[1],"name":"Edge 1","next node":"","description":"","target":"Duplicate Lead"}],"type":"UPDATE TRIGGER","name":"Updated Lead","filter type":"inclusion","filter":null},{"x":336,"y":60}],[{"type":"ACTION","actionType":"Lead Based Routing","magellanClass":"Magellan.Models.AssignOwnerLead","name":"Assign owner from similar lead","edges":[{"type":"fixed","condition":"Inactive Owner","name":"Inactive Owner","target":-1},{"type":"fixed","condition":"Queue-Owned Matched Lead","name":"Queue Owner","target":-1},{"type":"fixed","condition":"Next Node","name":"Next Node","target":-1}],"a2bbr type":"lead owner"},{"x":196,"y":435}],[{"type":"MATCH","magellanClass":"Magellan.Models.MatchNode","name":"Similar Lead","edges":[{"name":"Match","target":"Assign owner from similar lead","type":"fixed","condition":"Match"},{"name":"No Match","target":"Matched Account","type":"fixed","condition":"No Match"}],"filter type":"none","filter":{"type":"conditions","conditions":[],"logic":""},"objectType":"L2L","tiebreakers":[{"type":"conditions","logic":"1 AND 2 AND 3","conditions":[{"value/field":"field","field":"Country","type":"STRING","operator":"equals","operand":"Country","operand type":"STRING"},{"value/field":"field","field":"State","type":"STRING","operator":"equals","operand":"State","operand type":"STRING"},{"value/field":"field","field":"PostalCode","type":"STRING","operator":"equals","operand":"PostalCode","operand type":"STRING"}],"rpnLogic":[1,2,"AND",3,"AND"]},{"type":"conditions","logic":"1 AND 2 AND 3","conditions":[{"value/field":"field","field":"Country","type":"STRING","operator":"equals","operand":"Country","operand type":"STRING"},{"value/field":"field","field":"State","type":"STRING","operator":"equals","operand":"State","operand type":"STRING"},{"value/field":"field","field":"City","type":"STRING","operator":"equals","operand":"City","operand type":"STRING"}],"rpnLogic":[1,2,"AND",3,"AND"]},{"type":"conditions","logic":"1 AND 2","conditions":[{"value/field":"field","field":"Country","type":"STRING","operator":"equals","operand":"Country","operand type":"STRING"},{"value/field":"field","field":"State","type":"STRING","operator":"equals","operand":"State","operand type":"STRING"}],"rpnLogic":[1,2,"AND"]},{"type":"conditions","logic":"1","conditions":[{"value/field":"field","field":"Country","type":"STRING","operator":"equals","operand":"Country","operand type":"STRING"}],"rpnLogic":[1]},{"type":"optima","field":"LastActivityDate","direction":"max"},{"type":"optima","field":"CreatedDate","direction":"min"}]},{"x":448,"y":420}],[{"type":"MATCH","magellanClass":"Magellan.Models.MatchNode","name":"Duplicate Lead","edges":[{"name":"Match","target":"Merge Dupe Lead","type":"fixed","condition":"Match"},{"name":"No Match","target":"Similar Lead","type":"fixed","condition":"No Match"}],"filter type":"none","filter":{"type":"conditions","conditions":[],"logic":""},"objectType":"Dupe","tiebreakers":[{"type":"conditions","logic":"1 AND 2 AND 3","conditions":[{"value/field":"field","field":"Country","type":"STRING","operator":"equals","operand":"Country","operand type":"STRING"},{"value/field":"field","field":"State","type":"STRING","operator":"equals","operand":"State","operand type":"STRING"},{"value/field":"field","field":"PostalCode","type":"STRING","operator":"equals","operand":"PostalCode","operand type":"STRING"}],"rpnLogic":[1,2,"AND",3,"AND"]},{"type":"conditions","logic":"1 AND 2 AND 3","conditions":[{"value/field":"field","field":"Country","type":"STRING","operator":"equals","operand":"Country","operand type":"STRING"},{"value/field":"field","field":"State","type":"STRING","operator":"equals","operand":"State","operand type":"STRING"},{"value/field":"field","field":"City","type":"STRING","operator":"equals","operand":"City","operand type":"STRING"}],"rpnLogic":[1,2,"AND",3,"AND"]},{"type":"conditions","logic":"1 AND 2","conditions":[{"value/field":"field","field":"Country","type":"STRING","operator":"equals","operand":"Country","operand type":"STRING"},{"value/field":"field","field":"State","type":"STRING","operator":"equals","operand":"State","operand type":"STRING"}],"rpnLogic":[1,2,"AND"]},{"type":"conditions","logic":"1","conditions":[{"value/field":"field","field":"Country","type":"STRING","operator":"equals","operand":"Country","operand type":"STRING"}],"rpnLogic":[1]},{"type":"optima","field":"LastActivityDate","direction":"max"},{"type":"optima","field":"CreatedDate","direction":"min"}]},{"x":448,"y":225}],[{"type":"ACTION","actionType":"Merge Dupe Lead","magellanClass":"Magellan.Models.Merge","name":"Merge Dupe Lead","edges":[{"type":"fixed","condition":"Inactive Lead Owner","name":"Inactive Owner","target":-1},{"type":"fixed","condition":"Next Node","name":"Next Node","target":-1}]},{"x":224,"y":240}],[{"type":"MATCH","magellanClass":"Magellan.Models.MatchNode","name":"Matched Account","edges":[{"name":"Match","target":"Account Based Routing","type":"fixed","condition":"Match"},{"name":"No Match","target":"Explicit Owner Assignment","type":"fixed","condition":"No Match"}],"filter type":"none","filter":{"type":"conditions","conditions":[],"logic":""},"objectType":"L2A","tiebreakers":[{"type":"conditions","logic":"1 AND 2 AND 3","conditions":[{"value/field":"field","field":"BillingCountry","type":"STRING","operator":"equals","operand":"Country","operand type":"STRING"},{"value/field":"field","field":"BillingState","type":"STRING","operator":"equals","operand":"State","operand type":"STRING"},{"value/field":"field","field":"BillingPostalCode","type":"STRING","operator":"equals","operand":"PostalCode","operand type":"STRING"}],"rpnLogic":[1,2,"AND",3,"AND"]},{"type":"conditions","logic":"1 AND 2","conditions":[{"value/field":"field","field":"BillingCountry","type":"STRING","operator":"equals","operand":"Country","operand type":"STRING"},{"value/field":"field","field":"BillingState","type":"STRING","operator":"equals","operand":"State","operand type":"STRING"}],"rpnLogic":[1,2,"AND"]},{"type":"conditions","logic":"1","conditions":[{"value/field":"field","field":"BillingCountry","type":"STRING","operator":"equals","operand":"Country","operand type":"STRING"}],"rpnLogic":[1]},{"type":"optima","field":"#children","direction":"max"},{"type":"optima","field":"#opportunities","direction":"max"},{"type":"optima","field":"#contacts","direction":"max"},{"type":"optima","field":"LastActivityDate","direction":"max"},{"type":"optima","field":"CreatedDate","direction":"min"}]},{"x":448,"y":600}],[{"type":"ACTION","actionType":"Explicit Owner Assignment","magellanClass":"Magellan.Models.ExplicitOwnerAssignment","name":"Explicit Owner Assignment","edges":[{"type":"fixed","condition":"Inactive User","name":"Inactive User","target":-1},{"type":"fixed","condition":"Next Node","name":"Next Node","target":-1}],"explicit owner assignment id":"0051N000005MmhgQAC","success notification enabled":false,"failure notification enabled":false},{"x":588,"y":765}],[{"type":"ACTION","actionType":"Account Based Routing","magellanClass":"Magellan.Models.AssignOwnerAccount","name":"Account Based Routing","edges":[{"type":"fixed","condition":"Inactive User","name":"Inactive User","target":-1},{"type":"fixed","condition":"Next Node","name":"Next Node","target":-1}],"abr type":"account owner"},{"x":280,"y":765}]]}';
		browser
			.execute(function(jsonGraph) {
				window.graph.clear();
				window.assembleGraph(jsonGraph);
			}, [jsonGraph])
			.pause(WAIT_TIME)
		;
	},
	
	'validate-graph': function(browser) {
		browser
			.waitForElementVisible('div[id=validate-button]')
			.click('div[id=validate-button]')
			.pause(WAIT_TIME)
			.assert.containsText('#validation-successful-modal-text', 'Graph is well-formed and valid')
			.pause(WAIT_TIME)
			.click('span[id=validation-successful-button-2]')
			.pause(WAIT_TIME)
		;
	},

	// Remove first condition in L2A Node and re-validate
	'delete-one-condition': function(browser) {
		browser
			.execute(function() {
				return graph.getLastCell().findView(paper).id;
			}, [], function(id) {
				var cellId = 'g#' + id.value + ' .main-icon';
				browser
					.waitForElementVisible(cellId)
					.pause(WAIT_TIME)
					.moveToElement(cellId, 50, 50)
					.pause(WAIT_TIME)
					.doubleClick()
					.pause(WAIT_TIME)
				;
			})
			.waitForElementVisible('.decision-criteria-text:nth-of-type(1)')
			.pause(WAIT_TIME)
			.click('.delete-column ')
			.pause(WAIT_TIME)
			.assert.elementPresent('.ld-button:nth-of-type(2)')
			.click('.ld-button:nth-of-type(2)')
			.pause(WAIT_TIME)
			.waitForElementVisible('div[id=validate-button]')
			.click('div[id=validate-button]')
			.pause(WAIT_TIME)
			.assert.containsText('#validation-successful-modal-text', 'Graph is well-formed and valid')
			.pause(WAIT_TIME)
			.click('span[id=validation-successful-button-2]')
			.pause(WAIT_TIME)
		;
	},
	
	// Add invalid condition in L2A Node and re-validate (should be invalid)
	//     - Add invalid SOQL Condition: Account.Id='asdf'
	'add-invalid-condition': function(browser) {
		browser
			.execute(function() {
				return graph.getLastCell().findView(paper).id;
			}, [], function(id) {
				var cellId = 'g#' + id.value + ' .main-icon';
				browser
					.waitForElementVisible(cellId)
					.pause(WAIT_TIME)
					.moveToElement(cellId, 50, 50)
					.pause(WAIT_TIME)
					.doubleClick()
					.pause(WAIT_TIME)
				;
			})
			.moveToElement('.add-rule-div', 0, 0)
			.pause(WAIT_TIME)
			.assert.elementPresent('.rule-type:nth-of-type(2)')
			.click('.rule-type:nth-of-type(2)')
			.pause(WAIT_TIME)
			.assert.elementPresent('.empty-criteria-label')
			.click('.criteria-list-item:last-of-type')
			.pause(WAIT_TIME)
			.click('.input-invalid')
			.pause(WAIT_TIME)
			.setValue('.input-invalid', 'Account.Id=\'asdf\'')
			.assert.elementPresent('.ld-button:nth-of-type(2)')
			.click('.ld-button:nth-of-type(2)')
			.pause(WAIT_TIME)
			.waitForElementVisible('div[id=validate-button]')
			.click('div[id=validate-button]')
			.pause(WAIT_TIME)
			.assert.elementPresent('#graph-status-message-icon')
			.assert.containsText('#graph-status-message-description', 'Graph contains errors')
		;
	},

	// Fix validation error in L2A Node and re-validate
	//     - New valid SOQL Condition: Account.Name!=null
	'fix-invalid-condition': function(browser) {
		browser
			.execute(function() {
				return graph.getLastCell().findView(paper).id;
			}, [], function(id) {
				var cellId = 'g#' + id.value + ' .main-icon';
				browser
					.waitForElementVisible(cellId)
					.pause(WAIT_TIME)
					.moveToElement(cellId, 50, 50)
					.pause(WAIT_TIME)
					.doubleClick()
					.pause(WAIT_TIME)
				;
			})
			.click('.criteria-list-item:last-of-type')
			.pause(WAIT_TIME)
			.assert.elementPresent('.input-invalid')
			.clearValue('.input-invalid')
			.pause(WAIT_TIME)
			.assert.containsText('.input-invalid', '')
			.setValue('.input-invalid', 'Account.Name!=null')
			.pause(WAIT_TIME)
			.assert.elementPresent('.ld-button:nth-of-type(2)')
			.click('.ld-button:nth-of-type(2)')
			.pause(WAIT_TIME)
			.assert.elementPresent('div[id=validate-button]')
			.click('div[id=validate-button]')
			.pause(WAIT_TIME)
			.assert.containsText('#validation-successful-modal-text', 'Graph is well-formed and valid')
			.pause(WAIT_TIME)
			.click('span[id=validation-successful-button-2]')
			.pause(WAIT_TIME)
		;

	},
	/*
	// Copy LBR - Dupe - Convert Graph
	'create-LBR-graph': function(browser) {
		// Match Node - Duplicate Lead
		browser
			.waitForElementVisible('.toggle-match-nodes', 10000)
			.click('.toggle-match-nodes')
			.pause(WAIT_TIME)
			.waitForElementVisible(MATCH_NODE + ':nth-child(4)')
			.click(MATCH_NODE + ':nth-child(4)')
			.pause(WAIT_TIME)
		;
		browser
			.execute(function() {
				return graph.getLastCell().findView(paper).id;
			}, [], function(id) {
				var cellId = 'g#' + id.value + ' .main-icon';
				browser
					.waitForElementVisible(cellId)
					.pause(WAIT_TIME)
					.moveToElement(cellId, 50, 50)
					.pause(WAIT_TIME)
					.mouseButtonDown(0)
					.pause(WAIT_TIME)
					.moveToElement('.joint-paper-scroller', WAIT_TIME, 310)
					.pause(WAIT_TIME)
					.mouseButtonUp(0)
				;
			})
		;
		// Action Node - Merge Dupe Lead
		browser
			.waitForElementVisible('.toggle-action-nodes', 10000)
			.click('.toggle-action-nodes')
			.pause(WAIT_TIME)
			.waitForElementVisible(ACTION_NODE + ':nth-child(7)')
			.click(ACTION_NODE + ':nth-child(7)')
			.pause(WAIT_TIME)
		;
		browser
			.execute(function() {
				return graph.getLastCell().findView(paper).id;
			}, [], function(id) {
				var cellId = 'g#' + id.value + ' .main-icon';
				browser
					.waitForElementVisible(cellId)
					.pause(WAIT_TIME)
					.moveToElement(cellId, 50, 50)
					.pause(WAIT_TIME)
					.mouseButtonDown(0)
					.pause(WAIT_TIME)
					.moveToElement('.joint-paper-scroller', 200, 310)
					.pause(WAIT_TIME)
					.mouseButtonUp(0)
				;
			})
		;
		// Match Node - Lead2Lead
		browser
			.waitForElementVisible('.toggle-match-nodes', 10000)
			.click('.toggle-match-nodes')
			.pause(WAIT_TIME)
			.waitForElementVisible(MATCH_NODE + ':nth-child(3)')
			.click(MATCH_NODE + ':nth-child(3)')
			.pause(WAIT_TIME)
		;
		browser
			.execute(function() {
				return graph.getLastCell().findView(paper).id;
			}, [], function(id) {
				var cellId = 'g#' + id.value + ' .main-icon';
				browser
					.waitForElementVisible(cellId)
					.pause(WAIT_TIME)
					.moveToElement(cellId, 50, 50)
					.pause(WAIT_TIME)
					.mouseButtonDown(0)
					.pause(WAIT_TIME)
					.moveToElement('.joint-paper-scroller', 500, 510)
					.pause(WAIT_TIME)
					.mouseButtonUp(0)
				;
			})
		;
		// Action Node - Lead Based Routing
		browser
			.waitForElementVisible('.toggle-action-nodes', 10000)
			.click('.toggle-action-nodes')
			.pause(WAIT_TIME)
			.waitForElementVisible(ACTION_NODE + ':nth-child(2)')
			.click(ACTION_NODE + ':nth-child(2)')
			.pause(WAIT_TIME)
		;
		browser
			.execute(function() {
				return graph.getLastCell().findView(paper).id;
			}, [], function(id) {
				var cellId = 'g#' + id.value + ' .main-icon';
				browser
					.waitForElementVisible(cellId)
					.pause(WAIT_TIME)
					.moveToElement(cellId, 50, 50)
					.pause(WAIT_TIME)
					.mouseButtonDown(0)
					.pause(WAIT_TIME)
					.moveToElement('.joint-paper-scroller', 200, 520)
					.pause(WAIT_TIME)
					.mouseButtonUp(0)
				;
			})
		;
		// Match Node - Lead2Account
		browser
			.waitForElementVisible('.toggle-match-nodes', 10000)
			.click('.toggle-match-nodes')
			.pause(WAIT_TIME)
			.waitForElementVisible(MATCH_NODE + ':nth-child(1)')
			.click(MATCH_NODE + ':nth-child(1)')
			.pause(WAIT_TIME)
		;
		browser
			.execute(function() {
				return graph.getLastCell().findView(paper).id;
			}, [], function(id) {
				var cellId = 'g#' + id.value + ' .main-icon';
				browser
					.waitForElementVisible(cellId)
					.pause(WAIT_TIME)
					.moveToElement(cellId, 50, 50)
					.pause(WAIT_TIME)
					.mouseButtonDown(0)
					.pause(WAIT_TIME)
					.moveToElement('.joint-paper-scroller', WAIT_TIME, 710)
					.pause(WAIT_TIME)
					.mouseButtonUp(0)
				;
			})
		;
		// Action - Account Based Routing
		browser
			.waitForElementVisible('.toggle-action-nodes', 10000)
			.click('.toggle-action-nodes')
			.pause(WAIT_TIME)
			.waitForElementVisible(ACTION_NODE + ':nth-child(1)')
			.click(ACTION_NODE + ':nth-child(1)')
			.pause(WAIT_TIME)
		;
		browser
			.execute(function() {
				return graph.getLastCell().findView(paper).id;
			}, [], function(id) {
				var cellId = 'g#' + id.value + ' .main-icon';
				browser
					.waitForElementVisible(cellId)
					.pause(WAIT_TIME)
					.moveToElement(cellId, 50, 50)
					.pause(WAIT_TIME)
					.mouseButtonDown(0)
					.pause(WAIT_TIME)
					.moveToElement('.joint-paper-scroller', 350, 910)
					.pause(WAIT_TIME)
					.mouseButtonUp(0)
				;
			})
		;
		// Action - Explicit Owner Assignment
		browser
			.waitForElementVisible('.toggle-action-nodes', 10000)
			.click('.toggle-action-nodes')
			.pause(WAIT_TIME)
			.waitForElementVisible(ACTION_NODE + ':nth-child(4)')
			.click(ACTION_NODE + ':nth-child(4)')
			.pause(WAIT_TIME)
		;
		browser
			.execute(function() {
				return graph.getLastCell().findView(paper).id;
			}, [], function(id) {
				var cellId = 'g#' + id.value + ' .main-icon';
				browser
					.waitForElementVisible(cellId)
					.pause(WAIT_TIME)
					.moveToElement(cellId, 50, 50)
					.pause(WAIT_TIME)
					.mouseButtonDown(0)
					.pause(WAIT_TIME)
					.moveToElement('.joint-paper-scroller', 650, 910)
					.pause(WAIT_TIME)
					.mouseButtonUp(0)
				;
			})
		;
	},
	*/
	'close-chrome': function(browser) {
		browser
			.pause(2500)
			.end()
		;
	}
};
