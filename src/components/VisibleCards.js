import React,{Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'

function mapStateToProps(state, ownProps) {
  //console.log(ownProps.location.pathname);
  console.log(`currently is visible cards.js , ownprops is: `);
  console.log(ownProps)
  return {state};
}

class Cards extends Component{
	
	constructor(props){
		super(props)
		//console.log("Currently in VisibleCards, props are:")
		//console.log(props)
		console.log("props in cards are:")
		console.log(props)
	}
	componentWillUpdate(){
		console.log("visible cards called");
	}
	render(){
		return (
			<div>{this.props.match.params.deckId}{this.props.children}</div>
		)
	}
}
export default withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(Cards));

/*const Cards = ({children})=>{
	return (<div>Deck will display{children}</div>)
}*/