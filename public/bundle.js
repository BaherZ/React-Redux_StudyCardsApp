(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//ACTION CREATORS
var addDeck = exports.addDeck = function addDeck(name) {
  return { type: 'ADD_DECK', data: name };
};
var showAddDeck = exports.showAddDeck = function showAddDeck() {
  return { type: 'SHOW_ADD_DECK' };
};
var hideAddDeck = exports.hideAddDeck = function hideAddDeck() {
  return { type: 'HIDE_ADD_DECK' };
};

},{}],3:[function(require,module,exports){
'use strict';

var _actions = require('./actions');

var _reducers = require('./reducers');

var reducers = _interopRequireWildcard(_reducers);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _Redux = Redux,
    createStore = _Redux.createStore;
var _Redux2 = Redux,
    applyMiddleware = _Redux2.applyMiddleware;
var _Redux3 = Redux,
    compose = _Redux3.compose;
var _Redux4 = Redux,
    combineReducers = _Redux4.combineReducers;

/*import React from 'react';
import ReactDOM from 'react-dom'*/

//console.log(thunk);
var middleware = applyMiddleware(_reduxThunk2.default);

//STORE
var store = createStore(combineReducers(reducers));

//COMPONENTS
var App = function App(props) {
	return React.createElement(
		'div',
		{ className: 'app' },
		props.children
	);
};

var Sidebar = React.createClass({
	displayName: 'Sidebar',
	componentDidUpdate: function componentDidUpdate() {
		var el = ReactDOM.findDOMNode(this.refs.add);
		if (el) {
			el.focus();
		}
	},
	render: function render() {
		var _this = this;

		var props = this.props;
		//console.log(props)
		return React.createElement(
			'div',
			{ className: 'sidebar' },
			React.createElement(
				'h2',
				null,
				'All decks'
			),
			React.createElement(
				'button',
				{ onClick: function onClick(e) {
						return _this.props.showAddDeck();
					} },
				'New Deck'
			),
			React.createElement(
				'ul',
				null,
				props.decks.map(function (deck, i) {
					return React.createElement(
						'li',
						{ key: i },
						deck.name
					);
				})
			),
			React.createElement(
				'h1',
				null,
				props.addDeck
			),
			props.addingDeck && React.createElement('input', { ref: 'add', onKeyPress: this.createDeck })
		);
	},
	createDeck: function createDeck(e) {
		if (e.which !== 13) return;
		//console.log("here");
		var name = ReactDOM.findDOMNode(this.refs.add).value;
		//console.log("here");
		this.props.addDeck(name);
		this.props.hideAddDeck();
	}
});

function run() {
	var state = store.getState();
	console.log(state);
	ReactDOM.render(React.createElement(
		App,
		null,
		React.createElement(Sidebar, {
			decks: state.decks,
			addingDeck: state.addingDeck,
			addDeck: function addDeck(name) {
				return store.dispatch((0, _actions.addDeck)(name));
			},
			showAddDeck: function showAddDeck() {
				return store.dispatch((0, _actions.showAddDeck)());
			},
			hideAddDeck: function hideAddDeck() {
				return store.dispatch((0, _actions.hideAddDeck)());
			}
		})
	), document.getElementById('root'));
}
run();
store.subscribe(run);

window.show = function () {
	store.dispatch((0, _actions.showAddDeck)());
};
window.hide = function () {
	store.dispatch((0, _actions.hideAddDeck)());
};
window.add = function () {
	store.dispatch((0, _actions.addDeck)(new Date().toString()));
};

},{"./actions":2,"./reducers":4,"redux-thunk":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
//REDUCERS
var cards = exports.cards = function cards() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case 'ADD_CARD':
			var newCard = Object.assign({}, action.data, {
				score: 1,
				id: +new Date()
			});
			return state.concat([newCard]);

		default:
			return state;
	}
};

var addingDeck = exports.addingDeck = function addingDeck() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	var action = arguments[1];

	switch (action.type) {
		case 'SHOW_ADD_DECK':
			return true;
		case 'HIDE_ADD_DECK':
			return false;
		default:
			return state;
	}
};

var decks = exports.decks = function decks() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case 'ADD_DECK':
			var newDeck = { name: action.data, id: +new Date() };
			return state.concat([newDeck]);
		default:
			return state;
	}
};

},{}]},{},[3]);
