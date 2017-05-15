// @flow
'use strict';

import React, {
  Component
} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './Extrato.styl';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import ExtratoPost from '../ExtratoPost/ExtratoPost.js';
import ExtratoIndicacoes from '../ExtratoIndicacoes/ExtratoIndicacoes.js';
import ExtratoIndicacoesEmpresas from '../ExtratoIndicacoesEmpresas/ExtratoIndicacoesEmpresas.js';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import Money from 'material-ui/svg-icons/editor/attach-money';
import Group from 'material-ui/svg-icons/social/group';
import Job from 'material-ui/svg-icons/places/business-center';
import style from './style.js'




const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};



class Extrato extends Component {

	componentWillMount(){
		this.props.actions.forceNotHome();
	}

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };


	render(){
		return(
			<div className="Extrato">
       <Tabs
         tabItemContainerStyle={style.tabItemContainerStyle}
         onChange={this.handleChange}
         value={this.state.slideIndex}>
         <Tab style={window.innerWidth < 800 ? style.tabMobile : style.tabStyle} icon={<Money className='tab-icon'/>} label="Post" value={0} />
         <Tab style={window.innerWidth < 800 ? style.tabMobile : style.tabStyle} icon={<Group className='tab-icon'/>} label="Amigos Indicados" value={1} />
         <Tab style={window.innerWidth < 800 ? style.tabMobile : style.tabStyle} icon={<Job className='tab-icon'/>} label="Empresas Indicadas" value={2} />
       </Tabs>
       <SwipeableViews
         index={this.state.slideIndex}
         onChangeIndex={this.handleChange}>
          <ExtratoPost />
          <ExtratoIndicacoes />
          <ExtratoIndicacoesEmpresas />
       </SwipeableViews>
      </div>
		)}
	}


	function mapStateToProps(state) {
	  const props = {
	    homeReducer: state.home
	  };
	  return props;
	}

	function mapDispatchToProps(dispatch) {
	  const actions = {
	    onSocialClick: require('../../actions/home/onSocialClick.js'),
	    forceNotHome: require('../../actions/home/forceNotHome.js')
	  };
	  const actionMap = { actions: bindActionCreators(actions, dispatch) };
	  return actionMap;
	}
	export default connect(mapStateToProps, mapDispatchToProps)(Extrato);
