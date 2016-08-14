/**
 * evaluate inspected element
 * 
 * @param Object DOMFirstElement chrome first element selected on DOM stack
 * @returns {?Object}
 */
function evaluateProduct(DOMFirstElement) {

  'use strict';

  var scope;
  if (DOMFirstElement) {
    try {
      var scope = angular.element(DOMFirstElement).scope();
    } catch (err) { // angular is not defined
      // pass
    }
    if (scope && scope.product) {
      copy(scope.product.item_id); // copy id to clipboard
      return scope.product; // return object to panel
    }
  }

  return;
}

/**
 * create sidebar panel with Cp24 name
 * 
 * TODO enable panel on supermercato24 domain
 * 
 * @returns
 */
chrome.devtools.panels.elements.createSidebarPane('Cp24', function(sidebar) {

  'use strict';

  /**
   * pase a function as a string that will be executed later on by chrome
   * 
   * @returns
   */
  function updateElementProperties() {

    // setExpression lets you display DOM elements and arbitrary JavaScript objects
    sidebar.setExpression('(' + evaluateProduct.toString() + ')($0)');
  }

  // attach to chrome events so that the sidebarPane refreshes (contains up to date info)
  chrome.devtools.panels.elements.onSelectionChanged
      .addListener(updateElementProperties);
  sidebar.onShown.addListener(updateElementProperties);
});
