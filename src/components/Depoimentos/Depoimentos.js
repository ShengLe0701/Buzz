// @flow
'use strict';

import React, {
  Component
} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import CardDepoimento from '../CardDepoimento/CardDepoimento';
import ToggleDisplay from 'react-toggle-display';
import './Depoimentos.styl';
import depoimentos from '../../data/depoimentos';

class Depoimentos extends Component {

  render(){
    return(
      <ToggleDisplay hide={this.props.isLoggedIn} className="Depoimentos">
        {
          depoimentos.map((item) => {
            var element = (
              <CardDepoimento
                key={item.id}
                username={item.login}
                goProfile={this.props.actions.goProfile}
                nome={item.nome} foto={item.foto}
                texto={item.texto}
              />
            )
            return element;
          })
        }
      </ToggleDisplay>
    )
  }
}


function mapStateToProps(state) {
  const props = {
    homeReducer: state.home
  }
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    goProfile: require('../../actions/home/goProfile.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(Depoimentos)
