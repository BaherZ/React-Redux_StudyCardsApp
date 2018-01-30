import React,{Component} from 'react';
import ReactDOM from 'react-dom'

class Sidebar extends Component{

	constructor(props){
		super(props)
		this.createDeck = this.createDeck.bind(this);
	}

	componentDidUpdate(){
		var el = ReactDOM.findDOMNode(this.refs.add)
		if(el){el.focus();}
	}
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
						<li key={i}>{deck.name}</li>
					)}
				</ul>
				
				{props.addingDeck && <input ref='add' onKeyPress = {this.createDeck}></input>}
			</div>)
	}
}
export default Sidebar