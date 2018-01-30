
import {combineReducers,createStore} from 'redux';
import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import {addDeck,showAddDeck,hideAddDeck} from './actions'
import * as reducers from './reducers';
import App from './components/App'
import Sidebar from './components/Sidebar'

//STORE
const store = createStore(combineReducers(reducers));

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

