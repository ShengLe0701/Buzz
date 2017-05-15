// @flow
'use strict';

import React, {
  Component
} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './ExtratoPost.styl';
import ToggleDisplay from 'react-toggle-display'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import APIService from '../../services/APIService';
import IconExtrato from '../../images/extrato_icon_post.png'




class ExtratoPost extends Component {

  constructor(props){
    super(props)
    this.state = {
      post: [],
      showCheckboxes:false
    }
  }

	componentWillMount(){
		this.props.actions.forceNotHome();
    this.fetchExtratoPost();
	}

  fetchExtratoPost = () => {
    console.log('fetchExtratoPost')
    console.log(this.props)
    let userId = this.props.homeReducer.usuario.idPessoa
    if(userId){
      console.log(userId)
      APIService.extratoPost(userId).then((post) => {
        console.log(post)
        this.setState({
          post: post
        })
      })
    }

  }

  ajusteValorMoeda = (valor) => {
    console.log('ajusteValorMoeda')
    console.log(valor)
    valor = valor.replace(".",",")
    valor = valor.toString();
    let valorCorrigido = this.adicionarZero(valor)
    return valorCorrigido
  }

  adicionarZero = (valor) => {
    console.log("Adicionar o Zero")
    console.log(valor)
    console.log(typeof valor)
    console.log(valor.split(",")[1])
    console.log(valor.split(",")[1].length)
    if(valor.split(",")[1].length < 2){
      console.log("Entrou no if")
      console.log(valor + '0' )
      valor = valor+'0'
    }
    return valor
  }

  handleEscrever = () => {
    this.props.actions.goDashboardEscrever()
    // this.props.goEscreva();
  }


	render(){
		return(
			<div className="ExtratoPost">
      <ToggleDisplay show={this.state.post.length != 0 ? true : false}>
        <div className="Tabela">
          <Table>
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            >
              <TableRow>
                <TableHeaderColumn>Post:</TableHeaderColumn>
                <TableHeaderColumn>Anunciante:</TableHeaderColumn>
                <TableHeaderColumn>Valor:</TableHeaderColumn>
                <TableHeaderColumn>Data de fechamento:</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              >
            {
              this.state.post.map((item) => {
                var RowElement = (
                  <TableRow key={item.id  }>
                    <TableRowColumn>
                      {item.post}
                    </TableRowColumn>
                    <TableRowColumn>
                      {item.anunciante}
                    </TableRowColumn>
                    <TableRowColumn>
                      R$ {this.ajusteValorMoeda(item.valor)}
                    </TableRowColumn>
                    <TableRowColumn>
                      {item.data}
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
        <ToggleDisplay show={this.state.post.length != 0 ? false : true}>
        <div className="Mensagem">
          <img src={IconExtrato} />
          <h2>Você não possui textos publicados, <a onClick={this.handleEscrever}>clique aqui</a> e escreva um texto.</h2>
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
	    goDashboardEscrever: require('../../actions/home/goDashboardEscrever.js'),
	    forceNotHome: require('../../actions/home/forceNotHome.js')
	  };
	  const actionMap = { actions: bindActionCreators(actions, dispatch) };
	  return actionMap;
	}
	export default connect(mapStateToProps, mapDispatchToProps)(ExtratoPost);
