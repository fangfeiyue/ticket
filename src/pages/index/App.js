import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Header from '../../components/Header/Header';
import Submit from '../../components/Submit/Submit';
import DepartDate from '../../components/DepartDate/DepartDate';
import Journey from '../../components/Journey/Journey';
import HighSpeed from '../../components/HighSpeed/HighSpeed';

function App(props) {
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
	return (
		<div>
			<div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
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
