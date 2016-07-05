var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {
  makeSiblingNodeFor: function(node) {
    AppDispatcher.handleViewAction({
      type: "MAKE_SIBLING_NODE_FOR",
      node: node
    });
  },
  makeNodeChildOfSibling: function(node) {
    AppDispatcher.handleViewAction({
      type: "MAKE_NODE_CHILD_OF_SIBLING",
      node: node
    });
  }
};
