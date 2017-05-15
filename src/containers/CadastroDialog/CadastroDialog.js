// @flow
'use strict';

import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Clipboard from 'clipboard'
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ToggleDisplay from 'react-toggle-display'
import style from './style'
import FacebookLogin from 'react-facebook-login';
import LocalStorage from '../../services/LocalStorage'
import './CadastroDialog.styl';

var clipboard = new Clipboard('#ClipboardBtn');

class CadastroDialog extends Component {

  constructor(){
    super();
    this.state = {
      nome: '',
      email: '',
      senha: '',
      senhaRepetida: '',
      emailIndicador: '',
      erroEmail: '',
      alert: false,
      referral: false,
      alertMessage: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.cadastroReducer.showCadastro && this.props.cadastroReducer.showCadastro) {
      this.onDialogOpen();
    }
    else if(prevProps.cadastroReducer.showCadastro && !this.props.cadastroReducer.showCadastro){
      this.onDialogClose();
    }
  }

  onDialogOpen = () => {
    this.checkReferral();
  }

  checkReferral = () => {
    let referral = LocalStorage.getObject('referral')
    if(referral){
      this.setState({
        emailIndicador: referral,
        referral: true
      })
    }
  }

  handleNext = () => {
   const {stepIndex} = this.state;
   this.setState({
     stepIndex: stepIndex + 1,
     finished: stepIndex >= 2
   });
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  checkName = () => {
    let name = this.state.nome;
    console.log(name.split(' ').length)
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
    if (email.split('@').length < 2 ){
      this.setState({
        erroEmail: 'Email Inválido'
      })
      return false
    }
    return true;
  }

  checkEmailCadastrado = () => {
    return new Promise((resolve) => {
      let email = this.state.email;
      let url = process.env.SERVER_URL+'api/cadastropessoas/buscaPorEmail/'+email;
      fetch(url).then((response) => {
        return response.json()
      }).then((json) => {
        console.log('checkEmailCadastrado')
        console.log(json)
        if(json.idCadastrado == 0){
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch((ex) => {
        console.log('parsing failed', ex)
      })
    });
  }

  checkPasswords = () => {
    let senha = this.state.senha;
    let senhaRepetida = this.state.senhaRepetida;
    if (senha.length < 6 ){
      this.setState({
        erroSenha: 'Mínimo de 6 dígitos'
      })
      return false;
    } else if (senha != senhaRepetida){
      this.setState({
        erroRepeticaoSenha: 'Senhas não conferem',
        erroSenha: 'Senhas não conferem'
      })
      return false;
    }
    return true;
  }

  closeDialog = () => {
    this.props.actions.cadastroDialog();
  }

  resetErrors = () => {
    this.props.actions.limparErros();
    this.setState({
      erroEmail: ''
    })
  }

  cadastrarUsuario = () => {
    let usuario = {};
    usuario = {
      'nome': this.state.nome,
      'email': this.state.email,
      'senha': this.state.senha,
      'emailIndicador': this.state.emailIndicador,
      'idSexo': '2'
    }
    this.props.actions.startLoading()
    this.props.actions.cadastrarConta(usuario)
  }

  checkFields = () => {
    this.resetErrors();
    let checkName = this.checkName();
    let checkEmail = this.checkEmail();
    let checkPasswords = this.checkPasswords();
    if(checkName && checkEmail && checkPasswords){
      this.checkEmailCadastrado().then((newUser) => {
        if(newUser){
          this.cadastrarUsuario();
        } else {
          this.setState({
            erroEmail: 'Email Já Cadastrado '
          })
        }
      })
    }
  }

  nomeChange = (e, value) => {
    this.setState({
      nome: value
    })
  }

  verificarNome = () => {
    let nome = this.state.nome;
    if(nome != ''){
      this.props.actions.verificarNome(this.state.nome)
    }
  }

  verificarEmail = () => {
    let email = this.state.email;
    if(email != ''){
      this.props.actions.verificarEmail(email)
    }
  }

  verificarDigitosSenha = () => {
    let senha = this.state.senha
    if(senha != ''){
      this.props.actions.verificarDigitosSenha(senha)
    }
  }

  verificarSenhas = () => {
    let senhas = {
      senha: this.state.senha,
      senhaRepetida: this.state.senhaRepetida
    }
    this.props.actions.verificarSenhas(senhas)
  }

  verificarIndicacao = () => {
    let email = this.state.emailIndicador;
    if(email != ''){
      this.props.actions.verificarIndicacao(email)
    }
  }

  emailChange = (e, value) => {
    this.setState({
      email: value
    })
  }

  emailIndicadorChange = (e, value) => {
    this.setState({
      emailIndicador: value
    })
  }

  senhaChange = (e, value) => {
    this.setState({
      senha: value
    })
  }

  repeticaoSenhaChange = (e, value) => {
    this.setState({
      senhaRepetida: value
    })
  }

  copyLink = (e) => {
    e.preventDefault();
    let message = 'Link copiado para sua área de transferência'
    this.setState({
      alert: true,
      alertMessage: message
    })
    setTimeout(() => {
      this.setState({
        alert: false,
        alertMessage: ''
      })
    }, 3000);
  }

  checkEmailIndicador = () => {
    this.setState({
      erroEmailIndicador: ''
    })
    let email = this.state.emailIndicador;
    let url = process.env.SERVER_URL+'api/cadastropessoas/buscaPorEmail/'+email;
    fetch(url).then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json)
      if(json.idCadastrado == 0){
        this.setState({
          erroEmailIndicador: 'Email não cadastrado'
        })
      } else {
        this.setState({
          erroEmailIndicador: json.nome
        })
      }
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  responseFacebook = (response) => {
    console.log('responseFacebook')
    console.log(response)
    this.props.didFacebookLogin(response)
    this.props.fetchUltimos()
    this.closeDialog();
  };

  goTermos = () => {
    this.props.actions.goTermos()
  }

  render() {
    const {cadastroReducer, homeReducer, actions} = this.props;

    const actionButtons = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.closeDialog}/>,
      <FlatButton
        label="Criar minha conta"
        primary={true}
        onTouchTap={this.checkFields}/>
    ];

    const doneButtons = [
      <FlatButton
        label="Finalizar"
        primary={true}
        onTouchTap={this.closeDialog}/>
    ];


    return (
      <div>
        <Dialog
        className="CadastroDialog"
        title={ cadastroReducer.stepIndex == 0 ? 'Crie sua conta gratuitamente' : 'Bem-vindo, BuzzPager!'}
        actions={cadastroReducer.stepIndex == 0 ? actionButtons : doneButtons}
        modal={false}
        autoScrollBodyContent={true}
        open={cadastroReducer.showCadastro}
        handleClose={actions.handleClose}>
        <ToggleDisplay show={cadastroReducer.stepIndex == 0 ? true : false}>
          <div className="dialog-content">

            <div className="login">
              <TextField
               value={this.state.nome}
               onChange={this.nomeChange}
               onBlur={this.verificarNome}
               hintText="Nome Completo"
               errorText={cadastroReducer.erroNome}
               floatingLabelText="Nome*"/>
            </div>
            <div className="email">
              <TextField
               value={this.state.email}
               onChange={this.emailChange}
               onBlur={this.verificarEmail}
               errorText={this.state.erroEmail}
               floatingLabelText="Email*"/>
            </div>
          </div>
          <div className="dialog-content">
            <div className="senha">
              <TextField
               value={this.state.senha}
               onChange={this.senhaChange}
               onBlur={this.verificarDigitosSenha}
               errorText={cadastroReducer.erroSenha}
               hintText="Mínimo 6 dígitos"
               type="password"
               floatingLabelText="Senha*"/>
            </div>
            <div className="confirma-senha">
              <TextField
               value={this.state.senhaRepetida}
               onChange={this.repeticaoSenhaChange}
               onBlur={this.verificarSenhas}
               errorText={cadastroReducer.erroRepeticaoSenha}
               hintText="Confirme a senha"
               type="password"
               floatingLabelText="Repita a senha*"/>
               <span className='campos-obrigatorios'>*Campos obrigatórios</span>
            </div>
          </div>
          <div className='mensagem-termos' onTouchTap={this.goTermos}>Ao se cadastrar, você concorda com nossos Termos de Uso</div>
          <ToggleDisplay hide={this.state.referral}>
            <TextField
              className='email-indicacao-holder'
              onChange={this.emailIndicadorChange}
              floatingLabelText="Email Indicação"
              errorText={cadastroReducer.erroEmailIndicador}
              onBlur={this.verificarIndicacao}/>
          </ToggleDisplay>
          {/* <FacebookLogin
            appId='518458658342941'
            autoLoad={false}
            size='small'
            icon="fa-facebook"
            language='pt_BR'
            textButton='Entrar com Facebook'
            fields='name,email,picture.width(160).height(160)'
            scope='public_profile,user_friends,email'
            callback={this.responseFacebook}/> */}
        </ToggleDisplay>
        <ToggleDisplay show={cadastroReducer.stepIndex == 1 ? true : false}>
          <div className="sucesso">
            <h3>Indique seus amigos e ganhe um percentual sobre os ganhos deles!</h3>
            <FlatButton
              id='ClipboardBtn'
              style={style.primary}
              label="Copiar Link de Indicação"
              primary={true}
              data-clipboard-text={'http://buzzpage.com.br/referral/'+homeReducer.username}
              onTouchTap={this.copyLink}/>
          </div>
        </ToggleDisplay>
      </Dialog>
      <Snackbar
       open={this.state.alert}
       message={this.state.alertMessage}
       onActionTouchTap={actions.loginDialog}
       onRequestClose={this.handleRequestClose}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const props = {
    homeReducer: state.home,
    cadastroReducer: state.cadastro
  }
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    limparErros: require('../../actions/cadastro/limparErros.js'),
    cadastrarConta: require('../../actions/cadastro/cadastrarConta.js'),
    verificarIndicacao: require('../../actions/cadastro/verificarIndicacao.js'),
    verificarNome: require('../../actions/cadastro/verificarNome.js'),
    verificarEmail: require('../../actions/cadastro/verificarEmail.js'),
    verificarSenhas: require('../../actions/cadastro/verificarSenhas.js'),
    verificarDigitosSenha: require('../../actions/cadastro/verificarDigitosSenha.js'),
    startLoading: require('../../actions/home/startLoading.js'),
    stopLoading: require('../../actions/home/stopLoading.js'),
    goTermos: require('../../actions/home/goTermos.js'),
    cadastroDialog: require('../../actions/home/cadastroDialog.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastroDialog)
