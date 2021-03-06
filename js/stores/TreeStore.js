var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

function newTree(data, parent=null) {
  return {
    data: data,
    children: [],
    parent: parent
  };
}

function addChild(subtree, data){
  var nt = newTree(data, subtree);
  subtree.children.push(nt);
  return nt;
}

var _tree = newTree("Initial Root");
addChild(_tree, "Initial data");

function addSiblingBelow(subtree, data){
  var par = subtree.parent;
  var nt = newTree(data, par);
  addSiblingTreeBelow(subtree, nt);
}

// Adds childtree as the first child of subtree.
function addChildTree(subtree, childtree){
  subtree.children.push(childtree);
  childtree.parent = subtree;
}

function addSiblingTreeBelow(siblingtree, tree){
  var par = siblingtree.parent;
  for (var i = 0; i < par.children.length; ++i){
    if (par.children[i] === siblingtree) {
      par.children.splice(i+1, 0, tree);
      break;
    }
  }
  tree.parent = par;
}

function hasGrandparent(subtree){
  return (subtree.parent != null && subtree.parent.parent!= null);
}

// requires node to have grandparent.
function makeNodeSiblingOfParent(tree){
  if (!hasGrandparent(tree)){
    console.log("NOGP");
    return;
  }
  console.log("TEST");
  var par = tree.parent;
  removeNode(tree);
  addSiblingTreeBelow(par, tree);
}


// Helper methods to modify the tree. Perhaps these should be in a class or a tree object?
// Requires subtree to have a parent. Gets the node directly above the current node.
function isFirstChild(subtree){
  var par = subtree.parent;
  if (par.children[0] === subtree) {
    return true;
  }
}

// Gets node above subtree for non-first children of a tree.
function getNodeAbove(subtree){
  var par = subtree.parent;
  for (var i = 1; i < par.children.length; ++i){
    if (par.children[i] === subtree) {
      return par.children[i-1];
    }
  }
}

// Requires subtree to have a parent. Move these to a tree utils folder.
function removeNode(subtree){
  var par = subtree.parent;
  for (var i = 0; i < par.children.length; ++i){
    if (par.children[i] === subtree) {
      par.children.splice(i, 1);
      break;
    }
  }
  subtree.parent = null;
}

// composed of functions
function makeNodeChildOfSibling(subtree) {
  if (isFirstChild(subtree)){
    return;
  }
  var siblingNode = getNodeAbove(subtree);
  removeNode(subtree);
  addChildTree(siblingNode, subtree);
}


var TreeStore = merge(EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  getTree: function(){
    return _tree;
  }
});

TreeStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.type){
    case "MAKE_SIBLING_NODE_FOR":
      addSiblingBelow(action.node, "");
      TreeStore.emitChange();
      break;
    case "MAKE_NODE_CHILD_OF_SIBLING":
      makeNodeChildOfSibling(action.node);
      TreeStore.emitChange();
      break;
    case "MAKE_NODE_SIBLING_OF_PARENT":
      makeNodeSiblingOfParent(action.node);
      TreeStore.emitChange();
      break;
    case "SET_TEXT":
      action.node.data = action.text;
      TreeStore.emitChange();
      break;
    default: 
      // Do nothing
  }
});

module.exports = TreeStore;
