var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {
  makeSiblingNodeFor: function(node) {
    AppDispatcher.handleViewAction({
      type: "MAKE_SIBLING_NODE_FOR",
      node: node
    });
  },
  setText: function(node, text) {
    AppDispatcher.handleViewAction({
      type: "SET_TEXT",
      node: node,
      text: text
    });
  },
  makeNodeChildOfSibling: function(node) {
    AppDispatcher.handleViewAction({
      type: "MAKE_NODE_CHILD_OF_SIBLING",
      node: node
    });
  },
  makeNodeSiblingOfParent: function(node) {
    AppDispatcher.handleViewAction({
      type: "MAKE_NODE_SIBLING_OF_PARENT",
      node: node
    });
  }
};
