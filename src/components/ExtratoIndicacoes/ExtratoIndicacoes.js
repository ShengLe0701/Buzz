// @flow
'use strict';

import React, {
  Component
} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import './ExtratoIndicacoes.styl';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import APIService from '../../services/APIService';
import IconExtrato from '../../images/extrato_icon_user.png'




class ExtratoIndicacoes extends Component {

  constructor(props){
    super(props)
    this.state = {
      indicacoes:[],
      showCheckboxes:false
    }
  }

	componentWillMount(){
		this.props.actions.forceNotHome();
    this.fetchExtratoIndicacoes();
	}

  fetchExtratoIndicacoes = () => {
    console.log('fetchExtratoIndicacoes')
    console.log(this.props)
    let userId = this.props.homeReducer.usuario.idPessoa
    if(userId){
      console.log(userId)
      APIService.extratoIndicacoes(userId).then((indicacoes) => {
        console.log(indicacoes)
        this.setState({
          indicacoes:indicacoes
        })
      })
    }
  }

  goProfile = () => {
    this.props.actions.goProfile(this.props.homeReducer.username)
  }

	render(){
		return(
			<div className="ExtratoIndicacoes">
      <ToggleDisplay show={this.state.indicacoes.length > 0 ? true : false}>
        <div className="Tabela">
          <Table>
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
          >
              <TableRow>
                <TableHeaderColumn>Nome:</TableHeaderColumn>
                <TableHeaderColumn>Email:</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              >
            {
              this.state.indicacoes.map((item) => {
                var RowElement = (
                  <TableRow key={item.email}>
                    <TableRowColumn>
                      {item.nome}
                    </TableRowColumn>
                    <TableRowColumn>
                      {item.email}
                    </TableRowColumn>
                  </TableRow>
                )
                return RowElement;
              })
            }
            </TableBody>
          </Table>
        </div>
      </ToggleDisplay>
      <ToggleDisplay show={this.state.indicacoes.length ==  0 ? true : false}>
        <div className="Mensagem">
            <img src={IconExtrato} />
            <h2>Você não possui nenhum amigo indicado, <a onClick={this.goProfile}>clique aqui</a> e faça sua primeira indicação.</h2>
        </div>
      </ToggleDisplay>
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
	    goProfile: require('../../actions/home/goProfile.js'),
	    forceNotHome: require('../../actions/home/forceNotHome.js')
	  };
	  const actionMap = { actions: bindActionCreators(actions, dispatch) };
	  return actionMap;
	}
	export default connect(mapStateToProps, mapDispatchToProps)(ExtratoIndicacoes);
