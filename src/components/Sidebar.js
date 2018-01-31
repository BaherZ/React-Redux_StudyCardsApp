import {addDeck,showAddDeck,hideAddDeck} from '../actions'
import { withRouter } from 'react-router';

import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

class Sidebar extends Component{

	constructor(props){
		super(props)
		this.createDeck = this.createDeck.bind(this);
		this.refresh = this.refresh.bind(this);
	}

	componentDidUpdate(){
		var el = ReactDOM.findDOMNode(this.refs.add)
		if(el){el.focus();}
	}
	refresh(){window.location.reload()}
	createDeck(e){
		if(e.which!==13)return
		//console.log("here");
		console.log(this);
		var name = ReactDOM.findDOMNode(this.refs.add).value;
		//console.log("here");
		this.props.addDeck(name);
		this.props.hideAddDeck();
	}


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
						<li key={i} onClick={this.refresh} >
							<Link  to={`/deck/${deck.id}`} >{deck.name}</Link>
						</li>
					)}
				</ul>
				
				{props.addingDeck && <input ref='add' onKeyPress = {this.createDeck}></input>}
			</div>)
	}
}
const mapStateToProps = ({decks,addingDeck})=>({
	decks,
	addingDeck
});

const mapDispatchToProps = (dispatch)=>({
	addDeck : name => dispatch(addDeck(name)),
	showAddDeck : () => dispatch(showAddDeck()),
	hideAddDeck : () => dispatch(hideAddDeck())
})



export default withRouter(connect(mapStateToProps,mapDispatchToProps,null, {
  pure: false
})(Sidebar));