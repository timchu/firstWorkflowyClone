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
  },
  deleteChar: function(node) {
    AppDispatcher.handleViewAction({
      type: "DELETE_CHAR",
      node: node
    })
  },
  addCharTo: function(node, char) {
    AppDispatcher.handleViewAction({
      type: "ADD_CHAR_TO",
      node: node,
      char: char
    })
  }
};
