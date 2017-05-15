// @flow
'use strict';

import React, {
  Component
} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import './Contato.styl';
import ToggleDisplay from 'react-toggle-display';
import Facebook 	from '../../images/FACEBOOK.png';
import Twitter 	from '../../images/TWITTER.png';
import Instagram from '../../images/INSTAGRAM.png';
import YouTube from '../../images/YOUTUBE.png';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import style from './style';
import Footer from '../Footer/Footer';
import APIService from '../../services/APIService';
import CircularProgress from 'material-ui/CircularProgress';

class Contato extends Component {

	constructor(props){
		super(props);
		this.state = {
			nome: '',
			email: '',
			telefone:'',
			tipoUsuario:'',
			mensagem:'',
      assunto:'',
			erroEmail:'',
			erroNome:'',
      erroMensagem:'',
      erroTelefone:'',
      erroAssunto:'',
      erroTipo:'',
      buttonEnviar:'',
      showSucesso: false,
      showErro:false,
      isLoading: false
		}
	}

  componentWillMount(){
    this.props.actions.forceNotHome();
  }

	nomeChange = (e, value) => {
		console.log(value)
		this.setState({
			nome: value
		})
	}

  maskTel = (v) => {
    v=v.replace(/D/g,'');             //Remove tudo o que não é dígito
    v=v.replace(/^(d{2})(d)/g,'($1) $2'); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(d)(d{4})$/,'$1-$2');    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }

	telefoneChange = (e, value) => {
    let mask = this.maskTel(value)
    console.log(mask)
		this.setState({
			telefone: mask
		})
	}
	emailChange = (e, value) => {
		console.log(value)
		this.setState({
			email: value
		})
	}
	tipoChange = (e, value) => {
		console.log(value)
		this.setState({
			tipoUsuario: value
		})
	}
  assuntoChange = (e, value) => {
    console.log(value)
    this.setState({
      assunto: value
    })
  }
	mensagemChange = (e, value) => {
		console.log(value)
		this.setState({
			mensagem: value
		})
	}
  checkName = () => {
    let name = this.state.nome;
    console.log(name.split(' ').length)
    this.setState({
      erroNome:''
    })
    if (name.split(' ').length < 2 ){
      this.setState({
        erroNome: 'Nome Completo'
      })
      return false
    }
    return true;
  }
  checkEmail = () => {
    let email = this.state.email;
    console.log(email.split('@').length)
    this.setState({
      erroEmail:''
    })
    if (email.split('@').length < 2 ){
      this.setState({
        erroEmail: 'Email Inválido'
      })
      return false
    }
    return true;
  }
  checkTelefone = () => {
    let telefone = this.state.telefone;
    console.log(telefone.split(' ').length)
    this.setState({
      erroTelefone:''
    })
    if (telefone.split('').length < 11 ){
      this.setState({
        erroTelefone:'Telefone Invalido'
      })
    }
    return true;
  }

  checkMensagem = () => {
    let mensagem = this.state.mensagem;
    console.log(mensagem.split(' ').length)
    this.setState({erroMensagem:''})
    if (mensagem.split(' ').length < 2 ){
      this.setState({
        erroMensagem:'Mensagem Inválida'
      })
    }
    return true;
  }
  checkAssunto = () => {
    let assunto = this.state.assunto;
    console.log(assunto.length)
    this.setState({
      erroAssunto:''
    })
    if (assunto.length < 2 ){
      this.setState({
        erroAssunto:'Necessario escolher um assunto.'
      })
    }
    return true;
  }


	onSubmit = () => {
    let checkName = this.checkName();
    let checkEmail = this.checkEmail();
    let checkTelefone = this.checkTelefone();
    let checkMensagem = this.checkMensagem();
    let checkAssunto = this.checkAssunto();
    console.log(checkAssunto)
    if(checkName && checkEmail && checkTelefone && checkMensagem == true){
    this.setState({
      isLoading: true
    })
    var vari={}
    vari.nome = this.state.nome
    vari.email = this.state.email
    vari.telefone = this.state.telefone
    vari.tipoUsuario = this.state.tipoUsuario
    vari.mensagem = this.state.mensagem
    vari.assunto = this.state.assunto
    if(vari.assunto ==0){
      vari.assunto='Duvidas'
    }
    if(vari.assunto ==1){
      vari.assunto='Conteudo'
    }
    if(vari.assunto ==2){
      vari.assunto='Financeiro'
    }
    if(vari.tipoUsuario ==0){
      vari.tipoUsuario='Afiliado'
    }
    if(vari.tipoUsuario ==1){
      vari.tipoUsuario='Anunciante'
    }
    if(vari.tipoUsuario ==2){
      vari.tipoUsuario='Buzzpager'
    }
    if(vari.tipoUsuario ==3){
      vari.tipoUsuario='Usuario'
    }
    APIService.contatoUsuario(vari).then((resposta) => {
      console.log('API contatoUsuario then')
      console.log(resposta.ok)
      if(resposta.ok == true){
        setTimeout(() => {
          this.setState({
            showSucesso:true,
            isLoading: false,
            mensagem:'',
            nome:'',
            email:'',
            telefone:'',
            tipoUsuario:'',
            assunto:'',
            erroEmail:'',
            erroNome:'',
            erroMensagem:'',
            erroTelefone:'',
            erroAssunto:'',
            erroTipo:'',
            erroMensagem:false
          })
        },100);
      }
    })
  }else{
    setTimeout(() => {
    this.setState({
      showErro:true

      })
    },100000);
  }
}



	render(){
		return(
			<div className='Contato'>
        <Helmet title='BuzzPage - Contato' />
        <div className="content-holder">
          <div className='formulario-contato'>
            <ToggleDisplay show={this.state.showSucesso}>
               Mensagem Enviada com sucesso.
            </ToggleDisplay>
            <ToggleDisplay show={this.state.showErro}>
               Necessario preencher todos campos.
            </ToggleDisplay>
    					<form>
    					<div className='primeira'>
    					<TextField
    						value={this.state.nome}
    			      hintText='Nome Completo'
    						onChange={this.nomeChange}
    						onBlur={this.checkName}
    						errorText={this.state.erroNome}
    			    />
    					<TextField
    						value={this.state.email}
    			      hintText='Email'
    						onChange={this.emailChange}
    						onBlur={this.checkEmail}
    						errorText={this.state.erroEmail}
    			    />
    					</div>
    					<div className='segunda'>
              <SelectField
                value={this.state.assunto}
                onChange={this.assuntoChange}
                onBlur={this.checkAssunto}
                autoWidth={true}
                hintText='Assunto'
              >
                <MenuItem value={0} primaryText='Dúvidas' />
                <MenuItem value={1} primaryText='Conteúdo' />
                <MenuItem value={2} primaryText='Financeiro' />
              </SelectField>
    					<SelectField
    						value={this.state.tipoUsuario}
    						onChange={this.tipoChange}
    						autoWidth={true}
    						hintText='Eu sou:'
    					>
    						<MenuItem value={0} primaryText='Afiliado' />
    						<MenuItem value={1} primaryText='Anunciante' />
    						<MenuItem value={2} primaryText='Buzzpager' />
    						<MenuItem value={3} primaryText='Usuário' />
    					</SelectField>
    					</div>
    					<div className='terceira'>
    					<TextField
    					value={this.state.mensagem}
    					onChange={this.mensagemChange}
              onBlur={this.checkMensagem}
    		      floatingLabelText='Mensagem'
              errorText = {this.state.erroMensagem}
    		      multiLine={true}
    		      rows={0}
    		    />
            <div className='input-telefone'>
              <TextField
                type='tel'
                maxLength={11}
                value={this.state.telefone}
                hintText='Telefone'
                onChange={this.telefoneChange}
                onBlur={this.checkTelefone}
                errorText={this.state.erroTelefone}
              />
            </div>
  					</div>
            <ToggleDisplay hide={this.state.isLoading}>
              <FlatButton label='Enviar'
                style={style.btn}
                backgroundColor='white'
                hoverColor='#F14A08'
                onClick={this.onSubmit} />
            </ToggleDisplay>
             <ToggleDisplay show={this.state.isLoading}>
                <CircularProgress />
             </ToggleDisplay>
  					</form>
          </div>
        </div>
        <div className="redes-sociais">
          <img src={Facebook} onTouchTap={this.props.actions.onSocialClick.bind(this, 'facebook')}	alt="Facebook Buzzpage" width="36" height="36" />
          <img src={Twitter} onTouchTap={this.props.actions.onSocialClick.bind(this, 'twitter')}	alt="Twitter Buzzpage" width="36" height="36" />
          <img src={Instagram} onTouchTap={this.props.actions.onSocialClick.bind(this, 'instagram')}	alt="Instagram Buzzpage" width="36" height="36" />
          <img src={YouTube} onTouchTap={this.props.actions.onSocialClick.bind(this, 'youtube')}	alt="Youtube Buzzpage" width="36" height="36" />
          <IconButton
            className='telefonebtn'
            style={style.semPadding}
            iconStyle={style.btnFone}
            iconClassName='muidocs-icon-custom-github' tooltip='(11)55720111'
            tooltipPosition='bottom-center' />
          <IconButton
            className='emailbtn'
            style={style.semPadding}
            iconStyle={style.btnEmail}
            iconClassName='muidocs-icon-custom-github' tooltip='atendimento@buzzpage.com.br'
            tooltipPosition='bottom-center' />
        </div>
        <Footer handleOpenCadastro={this.props.actions.cadastroDialog}/>
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
    cadastroDialog: require('../../actions/home/cadastroDialog.js'),
    onSocialClick: require('../../actions/home/onSocialClick.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(Contato);
