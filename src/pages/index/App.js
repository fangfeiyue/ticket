import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import Header from '../../components/Header/Header';
import Submit from '../../components/Submit/Submit';
import DepartDate from '../../components/DepartDate/DepartDate';
import Journey from '../../components/Journey/Journey';
import HighSpeed from '../../components/HighSpeed/HighSpeed';

function App(props) {
	return (
		<div>
			<Header/>
			<Journey/>
			<DepartDate/>
			<HighSpeed/>
			<Submit/>
		</div>
	);
}

export default connect(
	function mapStateToProps(state) { return {} },
	function mapDispatchToProps(dispatch) { return {} }
)(App);
