// @flow
'use strict';

import React, {
  Component
} from 'react';
import {
  browserHistory
} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LocalStorage from '../../services/LocalStorage'
import './Localizacao.styl';
import AutoComplete from 'material-ui/AutoComplete';
import imgLogo 	from '../../images/logo-branco.png';
import APIService from '../../services/APIService';
import FlatButton from 'material-ui/FlatButton';
import ToggleDisplay from 'react-toggle-display';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import style from './style'

const dataSourceConfig = {
  text:'descricao',
  value:'idRegiao'
};

class Localizacao extends Component {

  constructor(props){
    super(props)
    this.state = {
      regioes: [],
      idRegiao: ''
    }
  }

	componentWillMount(){
		// this.props.actions.forceNotHome();
    this.fetchRegioes();
	}

  fetchRegioes = () => {
    APIService.buscarRegioes().then((regioes) => {
      console.log(regioes)
      this.setState({
        regioes: regioes
      })
    })
  }

  regiaoChange = (value) => {
    console.log(value)
    this.setState({
      idRegiao: value.idRegiao
    })
  }

  recusar = (event) => {
    event.preventDefault();
    let askedRegiao = {
      rejeitado: true
    }
    LocalStorage.setObject('askedRegiao', askedRegiao)
    browserHistory.goBack()
  }

  selecionarRegiao = (event) => {
    console.log('selecionarRegiao')
    event.preventDefault();
    let geo = {
      idRegiao: this.state.idRegiao
    }
    LocalStorage.setObject('geolocalizacao', geo)
    browserHistory.goBack()
  }

	render(){
		return(
      <div className='Localizacao'>
        <IconButton
          className="close-icon"
          iconStyle={{color: 'white'}}
          onClick={this.recusar}>
          <Close/>
        </IconButton>
        <div className='select-id'>
          <img className='logo-img' src={imgLogo} width='250px' height='auto' />
          <div className='frases-holder'>
            <h1 className='frase'>Seja Bem-Vindo!</h1>
            <h2 className='frase'>Para uma melhor experiência, diga-nos onde você está:</h2>
          </div>
          <div className='select-holder'>
            <AutoComplete
            hintText='Qual a sua localização?'
            filter={AutoComplete.caseInsensitiveFilter}
            value={this.state.idRegiao}
            openOnFocus={false}
            maxSearchResults={5}
            onNewRequest={this.regiaoChange}
            inputStyle={{color:'white'}}
            hintStyle={{color:'white'}}
            underlineFocusStyle={{borderColor:'#01a4ff'}}
            floatingLabelFocusStyle={{color:'#01a4ff'}}
            dataSource={this.state.regioes}
            dataSourceConfig={dataSourceConfig}
            />


          </div>
          <ToggleDisplay show={this.state.idRegiao ? true : false}>
            <FlatButton
              style={style.buttons}
              onClick={this.selecionarRegiao}
              label="Pronto"/>
          </ToggleDisplay>
        </div>
      </div>
    )
	}
}

function mapStateToProps(state) {
  const props = {
    homeReducer: state.home
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    forceNotHome: require('../../actions/home/forceNotHome.js'),
    goHome: require('../../actions/home/goHome.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(Localizacao);
