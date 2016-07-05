var TreeStore = require('../stores/TreeStore');
var ActionCreator= require('../actions/ActionCreator');
var React = require('react');

var ENTER_KEY_CODE = 13;
var TAB_KEY_CODE = 9;
var DELETE_KEY_CODE = 8;

function isPrintable(charCode) {
    var valid = (charCode >= 32 && charCode <= 126);
    return valid;
}

// Not used yet.
var WorkflowyLine = React.createClass({
  render: function() {
    return (<textarea> {this.props.text} </textarea>);
  }
});

function getStateFromStores() {
  return {
    tree: TreeStore.getTree()
  }
}

// Passed in: node, text.
// Presentational component. Passed in props since this is a recursive structure.
var WorkflowyPresentationTree = React.createClass({
  render: function() {
    return (
      <div>
        <textarea onKeyDown={this._onKeyDown} onKeyPress={this._onKeyPress} value={this.props.tree.data}></textarea>
        <ul>
          { this.props.tree.children.map ((c) => <WorkflowyPresentationTree tree = { c }/>) }
        </ul>
      </div>
    );
  },
  _onKeyPress: function(event) {
    console.log("test");
    console.log(event.charCode);
    if (isPrintable(event.charCode)){
      event.preventDefault();
      var char = String.fromCharCode(event.charCode);
      console.log("Char " + char);
      ActionCreator.addCharTo(this.props.tree, char);
    }
  },

  // Note; I don't like the onkeydown in each presentation tree....
  _onKeyDown: function(event){
    switch (event.keyCode) {
      case ENTER_KEY_CODE:
        event.preventDefault();
        ActionCreator.makeSiblingNodeFor(this.props.tree);
        break;
      case TAB_KEY_CODE:
        event.preventDefault();
        ActionCreator.makeNodeChildOfSibling(this.props.tree);
        break;
      case DELETE_KEY_CODE:
        event.preventDefault();
        ActionCreator.deleteChar(this.props.tree);
        break;
      default:
        // do nothing.
    }
  },
});

var WorkflowyTree = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },
  componentDidMount: function(event){
    TreeStore.addChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getStateFromStores());
  },
  render: function () {
    return (<WorkflowyPresentationTree tree={this.state.tree}/>);
  }
});

module.exports = WorkflowyTree;
