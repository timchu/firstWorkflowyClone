// This file bootstraps the entire application.

var WorkflowyTree = require('./components/WorkflowyTree.react');
var React = require('react');

window.React = React; // export for http://fb.me/react-devtools ????

React.render( <WorkflowyTree />, document.getElementById('react'));
