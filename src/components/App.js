import React,{Component} from 'react';
import Sidebar from './Sidebar';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
/*const mapStateToProps = (state, { params:{deckId} })=>({
	deckId
});*/
function mapStateToProps(state, ownProps) {
  //console.log(ownProps.location.pathname);
  console.log(`currently is App.js , state is: `);
  console.log(state);
  console.log(`currently is App.js , ownProps is: `)

  var deckId = (ownProps.location.pathname).substring(6);
  console.log(ownProps)
  //console.log(state);
  return {deckId};
}

class App extends Component{
	constructor(props){
		super(props);
		console.log("inside APP class:")
		console.log(props);
	}

	render(){
		return (
			<div className="app">
				<h1>{this.props.deckId}</h1>
				<Sidebar/>
				{this.props.children}
			</div>
		)
	}
}
/*
const App = ({deckId,children})=>{
	return (
		<div className="app">
			<h1>{deckId}</h1>
			<Sidebar/>
			{children}
		</div>
	)
};*/

export default connect(mapStateToProps, null, null, {
  pure: false
})(App);