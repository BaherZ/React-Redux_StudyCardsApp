const {createStore} = Redux;
const {applyMiddleware} = Redux;
const {compose} = Redux;
const {combineReducers} = Redux;

/*import React from 'react';
import ReactDOM from 'react-dom'*/
import {addDeck,showAddDeck,hideAddDeck} from './actions'
import * as reducers from './reducers';
import thunk from 'redux-thunk';

//console.log(thunk);
const middleware = applyMiddleware(thunk);

//STORE
const store = createStore(combineReducers(reducers));

//COMPONENTS
const App = (props)=>{
	return (
		<div className="app">
			{props.children}
		</div>
	)
};

const Sidebar = React.createClass({
	componentDidUpdate(){
		var el = ReactDOM.findDOMNode(this.refs.add)
		if(el){el.focus();}
	},
	render(){
		let props = this.props
		//console.log(props)
		return (
			<div className="sidebar">
				<h2>All decks</h2>
				<button onClick = {e=>this.props.showAddDeck()  }>
					New Deck
				</button>
				<ul>
					{props.decks.map((deck,i)=>
						<li key={i}>{deck.name}</li>
					)}
				</ul>
				<h1>{props.addDeck}</h1>
				{props.addingDeck && <input ref='add' onKeyPress = {this.createDeck}></input>}
			</div>)
	},
	createDeck(e){
		if(e.which!==13)return
		//console.log("here");
		var name = ReactDOM.findDOMNode(this.refs.add).value;
		//console.log("here");
		this.props.addDeck(name);
		this.props.hideAddDeck();
	}
})


function run(){
	let state = store.getState();
	console.log(state);
	ReactDOM.render(<App>
		<Sidebar 
		decks={state.decks} 
		addingDeck={state.addingDeck}
		addDeck = {name=>store.dispatch(addDeck(name))}
		showAddDeck = {()=>store.dispatch(showAddDeck())}
		hideAddDeck = {()=>store.dispatch(hideAddDeck())}
		/> 
		</App>,document.getElementById('root'));
}
run();
store.subscribe(run)

window.show = ()=>{store.dispatch(showAddDeck())};
window.hide = ()=>{store.dispatch(hideAddDeck())};
window.add = ()=>{store.dispatch(addDeck(new Date().toString()))};

