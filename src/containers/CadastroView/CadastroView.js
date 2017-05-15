// @flow
'use strict';

import React, {
  Component
} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ToggleDisplay from 'react-toggle-display';
import LocalStorage from '../../services/LocalStorage'
import './CadastroView.styl';

class CadastroView extends Component {

  constructor(){
    super();
    this.state = {
      nome: '',
      email: '',
      senha: '',
      senhaRepetida: '',
      emailIndicador: '',
      referral: false,
    }
  }

  componentDidMount(){
    this.props.actions.forceNotHome()
    this.checkReferral()
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
    this.props.actions.goHome();
  }

  resetErrors = () => {
    this.props.actions.limparErros();
  }

  cadastrarUsuario = () => {
    console.log('cadastrarUsuario()')
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

  goTermos = () => {
    this.props.actions.goTermos()
  }

  render() {
    const {cadastroReducer} = this.props;
    return (
      <div className="CadastroView">
          <div className="login">
            <TextField
             value={this.state.nome}
             onChange={this.nomeChange}
             onBlur={this.verificarNome}
             hintText="Nome Completo"
             errorText={cadastroReducer.erroNome}
             floatingLabelText="Nome"/>
          </div>
          <div className="email">
            <TextField
             value={this.state.email}
             onChange={this.emailChange}
             onBlur={this.verificarEmail}
             hintText="Seu Email*"
             errorText={cadastroReducer.erroEmail}
             floatingLabelText="Email"/>
          </div>
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
             type="password"
             floatingLabelText="Repita a senha*"/>
          </div>
          <ToggleDisplay hide={this.state.referral}>
            <TextField
              className='email-indicacao-holder'
              onChange={this.emailIndicadorChange}
              floatingLabelText="Email Indicação"
              errorText={cadastroReducer.erroEmailIndicador}
              onBlur={this.verificarIndicacao}/>
          </ToggleDisplay>
          <div className="cadastro-button">
            <RaisedButton
            label="Criar minha conta"
            primary={true}
            onTouchTap={this.checkFields}/>
          </div>
          <div className='mensagem-termos' onTouchTap={this.goTermos}>Ao se cadastrar, você concorda com nossos Termos de Uso</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = {
    homeReducer: state.homeReducer,
    cadastroReducer: state.cadastro
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actions = {
    startLoading: require('../../actions/home/startLoading.js'),
    forceNotHome: require('../../actions/home/forceNotHome.js'),
    verificarIndicacao: require('../../actions/cadastro/verificarIndicacao.js'),
    cadastrarConta: require('../../actions/cadastro/cadastrarConta.js'),
    limparErros: require('../../actions/cadastro/limparErros.js'),
    verificarNome: require('../../actions/cadastro/verificarNome.js'),
    verificarEmail: require('../../actions/cadastro/verificarEmail.js'),
    verificarSenhas: require('../../actions/cadastro/verificarSenhas.js'),
    verificarDigitosSenha: require('../../actions/cadastro/verificarDigitosSenha.js'),
    goTermos: require('../../actions/home/goTermos.js'),
    goHome: require('../../actions/home/goHome.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(CadastroView);
