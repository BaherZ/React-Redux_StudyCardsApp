import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import {combineReducers,createStore} from 'redux';
import {Provider} from 'react-redux'

import { createBrowserHistory } from 'history';

import { withRouter } from 'react-router';
import {Router,Route,browserHistory,Switch} from 'react-router';
import {syncHistoryWithStore,routerReducer} from 'react-router-redux';

import * as reducers from './reducers';
reducers.routing = routerReducer;

import App from './components/App'
import Sidebar from './components/Sidebar';
import VisibleCards from './components/VisibleCards';

import { Grid } from 'semantic-ui-react'

import * as localStore from './localStore';
//console.log(VisibleCards)
//STORE
const store = createStore(combineReducers(reducers),localStore.get());
const history = syncHistoryWithStore(createBrowserHistory(), store);
console.log("history is");
console.log(history)
/*render={(routeProps)=>
				    		(<VisibleCards{...routeProps}/>)
				    	}*/

function run(){
	let state = store.getState();
	localStore.set(state,['decks','cards']);
	console.log(state);
	ReactDOM.render(
		<Provider store={store}>
			<Router history={history}>
				<div className="holder">
				  

				   	<div className="sidebar">
				    	<Route path='/' component={App}/>
				    </div>
				    <div className="VisibleCards">
				    	<Route path='/deck/:deckId' component={VisibleCards}/>
				    </div>
				</div>
				
				
			</Router>		
		</Provider>,document.getElementById('root'));
}
run();
store.subscribe(run)

window.show = ()=>{store.dispatch(showAddDeck())};
window.hide = ()=>{store.dispatch(hideAddDeck())};
window.add = ()=>{store.dispatch(addDeck(new Date().toString()))};

