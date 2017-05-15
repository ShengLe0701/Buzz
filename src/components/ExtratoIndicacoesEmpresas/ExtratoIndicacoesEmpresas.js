// @flow
'use strict';

import React, {
  Component
} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import './ExtratoIndicacoesEmpresas.styl';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import APIService from '../../services/APIService';
import IconExtrato from '../../images/extrato_icon.png'




class ExtratoIndicacoesEmpresas extends Component {

  constructor(props){
    super(props)
    this.state = {
      extrato: [],
      showCheckboxes:false
    }
  }

	componentWillMount(){
		this.props.actions.forceNotHome();
    this.fetchExtratoPost();
	}

  fetchExtratoPost = () => {
    console.log('fetchExtratoPost')
    let userId = this.props.homeReducer.usuario.idPessoa
    if(userId){
      console.log(userId)
      APIService.extratoIndicacoesEmpresas(userId).then((extrato) => {
        console.log(extrato)
        this.setState({
          extrato: extrato
        })
      })
    }
  }

	render(){
		return(
			<div className="ExtratoIndicacoesEmpresas">
      <ToggleDisplay show={this.state.extrato.length != 0 ? true : false}>
        <div className="Tabela">
          <Table>
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
          >
              <TableRow>
                <TableHeaderColumn>Nome ou Razão Social:</TableHeaderColumn>
                <TableHeaderColumn>Email:</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              >
            {
              this.state.extrato.map((item) => {
                var RowElement = (
                  <TableRow>
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
      <ToggleDisplay show={this.state.extrato.length != 0 ? false : true}>
      <div className="Mensagem">
        <img src={IconExtrato} />
          <h2>Você não possui nenhuma empresas indicada.</h2>
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
	    forceNotHome: require('../../actions/home/forceNotHome.js')
	  };
	  const actionMap = { actions: bindActionCreators(actions, dispatch) };
	  return actionMap;
	}
	export default connect(mapStateToProps, mapDispatchToProps)(ExtratoIndicacoesEmpresas);
