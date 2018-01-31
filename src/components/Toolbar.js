import React from 'react';
import {showAddDeck} from '../actions';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

const mapDispatchToProps = dispatch => ({
	showAddDeck:()=>dispatch(showAddDeck())
})

const Toolbar = ({deckId,showAddDeck})=>{
	console.log("inside Toolbar,newCard url is:");
	//console.log('/deck'+deckId+'/new');
	//var newCard = '/deck/'+deckId+'/new'
	//.log(typeof(newCard))
	//console.log(newCard)
	let deckTools = deckId ? (
	<div>
		<Link className="btn"  to={`/deck/${deckId}/new`}> <strong>+</strong> New Card</Link>
		<br/>
		<Link className="btn"  to={`/deck/${deckId}/study`}> Study Deck</Link>
		
		{/*<button onClick = {()=>{window.location.assign(`/deck/${deckId}/new`)}}>
			<strong>+</strong> New Card
		</button>
		<br/>
		<button onClick = {()=>{window.location.assign(`/deck/${deckId}/study`)}}>
			<strong>+</strong> Study Deck
		</button>*/}

	</div>):null;
	return (
		<div className="toolbar">
			<div>
				<button onClick={showAddDeck}><strong> + </strong>New Deck</button>
			</div>	

			{deckTools}
		</div>
	)
}
export default connect(null,mapDispatchToProps)(Toolbar);