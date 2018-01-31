import React,{Component} from 'react'; 
import {Link} from 'react-router-dom';
import {browserHistory} from 'react-router';
import ReactDOM from 'react-dom';

class CardModal extends Component{

	constructor(props){
		super(props)
		this.onSave = this.onSave.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	componentDidUpdate(){
		ReactDOM.findDOMNode(this.refs.front).focus();
	}
	onSave(evt){
		var front = ReactDOM.findDOMNode(this.refs.front);
		var back = ReactDOM.findDOMNode(this.refs.back);
		this.props.onSave(Object.assign({},this.props.card,{
			front:front.value,
			back:back.value
		}));
		browserHistory.push(`/deck/${this.props.card.deckId}`)
	}
	onDelete(e){
		this.props.onDelete(this.props.card.id);
		browserHistory.push(`/deck/${this.props.card.deckId}`);
	}
	render(){
		let{card,onDelete} = this.props;
		console.log("INSIDE CardModal");
		console.log(this.props);
		return (
			<div className="modal">
				<h1>{onDelete? 'Edit' : 'New' } Card</h1>

				<label>Card Front:</label>
				<textarea ref="front" defaultValue="{card.front}"></textarea>

				<label>Card Back:</label>
				<textarea ref="back" defaultValue="{card.back}"></textarea>

				<p>
					<button onClick={this.onSave}>Save Card</button>
					<Link className="btn" to={`/deck/${card.deckId}`}>Cancel button</Link>
					{onDelete ? 
						<button onClick={this.onDelete} className="delete">Delete Card</button>:
						null
					}
				</p>
			</div>
		)
	}
}
export default CardModal;
// /`/deck/${card.deckId}