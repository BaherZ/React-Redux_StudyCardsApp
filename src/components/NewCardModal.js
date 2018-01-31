import CardModal from './CardModal';
import {connect} from 'react-redux';
import {addCard} from '../actions';

//window.location.reload();
function mapStateToProps(state, ownProps) {
	//window.location.reload();
  	console.log("IN NEW CARD MODAL");
	console.log(ownProps);
	return {state};
}

/*const mapStateToProps = (state,ownProps)=>({
	console.log("IN NEW CARD MODAL");
	console.log(ownProps);
	card:{deckId}
});*/

/*const mapStateToProps = (props,{params:{deckId}})=>({
	card:{deckId}
});*/
const mapDispatchToProps = dispatch => ({
	onSave:card=>dispatch(addCard(card))
})

export default connect(mapStateToProps,mapDispatchToProps)(CardModal);