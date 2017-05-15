// @flow
'use strict'

import React, {
  Component
} from 'react'
import ToggleDisplay from 'react-toggle-display'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import APIService from '../../services/APIService'
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '../../images/white-facebook.png';
import './LoginDialog.styl'

class LoginDialog extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: '',
      senhaError: '',
      emailError: '',
      recuperar: false,
      notification: false,
      notificationMessage: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      this.onDialogOpen();
    }
    else if(prevProps.isOpen && !this.props.isOpen){
      this.onDialogClose();
    }
  }

  onDialogOpen = () => {
    this.keyboardListener(true);
  }

  onDialogClose = () => {
    this.keyboardListener(false);
  }

  keyboardListener = (flag) => {
    if(flag){
      window.onkeydown = event => {
        if (event.keyCode === 13) {
          this.handleLogin();
        }
      }
    } else {
      window.onkeydown = null;
    }
  }

  closeDialog = () => {
    this.props.closeLogin();
  }

  senhaChange = (e, value) => {
    this.setState({
      senha: value
    })
  }

  emailChange = (e, value) => {
    this.setState({
      email: value
    })
  }

  checkEmail = () => {
    let email = this.state.email;
    if (email.split('@').length < 2 ){
      this.setState({
        emailError: 'Email Inválido'
      })
      return false
    }
    return true;
  }

  checkPassword = () => {
    let senha = this.state.senha;
    if (senha.length < 6 ){
      this.setState({
        senhaError: 'Mínimo de 6 dígitos'
      })
      return false;
    }
    return true;
  }

  handleLoggedIn = (usuario, credenciais) => {
    // console.log('handleLoggedIn')
    // console.log(this.props)
    this.props.didLogin(usuario, credenciais)
    this.props.fetchUltimos()
    this.closeDialog();
  }

  handleErroSenha = (error) => {
    this.setState({
      senhaError: error
    })
  }

  handleErroUsuario = (error) => {
    this.setState({
      emailError: error
    })
  }

  handleError = (error) => {
    this.props.stopLoading();
    let codigoErro = parseInt(error.split('-')[0])
    let mensagemErro = error.split('-')[1]
    switch(codigoErro){
      case 104: {
        this.handleErroUsuario(mensagemErro)
      } break;
      case 105: {
        this.handleErroSenha(mensagemErro)
      } break;
      default: {
        this.handleErroUsuario(mensagemErro)
      } break;
    }
  }

  resetErrors = () => {
    this.setState({
      emailError: '',
      senhaError: ''
    })
  }

  cancelarRecuperar = () => {
    this.resetErrors()
    this.setState({recuperar: false})
  }

  modoRecuperacao = () => {
    this.setState({recuperar: true})
  }

  showNotification = (msg) => {
    this.setState({
      notification: true,
      notificationMessage: msg
    })
  }

  recuperarSenha = () => {
    this.resetErrors()
    this.props.startLoading();
    let checkEmail = this.checkEmail()
    if(checkEmail ){
      let email = {
        email: this.state.email
      }
      APIService.esqueciMinhaSenha(email).then((res) => {
        console.log('esqueciMinhaSenha then')
        console.log(res)
        this.props.stopLoading();
        if(res.chave != '0'){
          //senhaEnviadaPor Email
          this.closeDialog();
          this.showNotification('Senha enviada por email')
          setTimeout(() => {
            this.setState({
              recuperar: false,
              notification: false,
              notificationMessage: ''
            })
          }, 3000);
        } else {
          //emailInválido
          this.handleErroUsuario('Email Inválido')
        }
      })
    } else {
      this.props.stopLoading();
    }
  }

  handleLogin = () => {
    this.resetErrors()
    let checkEmail = this.checkEmail()
    let checkPassword = this.checkPassword()
    if(checkEmail && checkPassword){
      let credenciais = {
        usuario: this.state.email,
        senha: this.state.senha
      }
      this.props.startLoading();
      APIService.userLogin(credenciais).then((user) => {
        console.log(user)
        if(user.chave != '0'){
          this.handleLoggedIn(user, credenciais)
        } else {
          this.handleError(user.valor)
        }
      })
    }
  }

  responseFacebook = (response) => {
    console.log('responseFacebook')
    console.log(response)
    this.props.didFacebookLogin(response)
    this.props.fetchUltimos()
    this.closeDialog();
  };

  render() {

    const actions = [
      <FlatButton
        label='Cancelar'
        primary={true}
        onTouchTap={this.closeDialog}/>,
      <FlatButton
        label='Login'
        primary={true}
        onTouchTap={this.handleLogin}/>
    ]

    const recuperarActions = [
      <FlatButton
        label='Cancelar'
        primary={true}
        onTouchTap={this.cancelarRecuperar}/>,
      <FlatButton
        label='Recuperar'
        primary={true}
        onTouchTap={this.recuperarSenha}/>
    ]

    return (
      <div>
        <Dialog
        className='LoginDialog'
        title={this.state.recuperar ? 'Recuperar Senha' : 'Login'}
        actions={this.state.recuperar ? recuperarActions : actions}
        modal={false}
        autoScrollBodyContent={true}
        open={this.props.isOpen}
        handleClose={this.closeDialog}>
        <ToggleDisplay hide={this.props.isLoading}>
          <div className='dialog-content'>
            <div className='email'>
              <TextField
               autoFocus
               ref='loginEmailInput'
               value={this.state.email}
               onChange={this.emailChange}
               onBlur={this.verificarEmail}
               errorText={this.state.emailError}
               floatingLabelText='Email'/>
            </div>
            <ToggleDisplay show={this.state.recuperar ? false : true}>
              <div className='senha'>
                <TextField
                value={this.state.senha}
                onChange={this.senhaChange}
                errorText={this.state.senhaError}
                type='password'
                floatingLabelText='Senha'/>
              </div>
              <span className='recuperar-link' onTouchTap={this.modoRecuperacao}>recuperar senha</span>
            </ToggleDisplay>
          </div>
          </ToggleDisplay>
          <ToggleDisplay show={this.props.isLoading}>
            <CircularProgress/>
          </ToggleDisplay>
          <ToggleDisplay show={this.state.recuperar ? false : true}>
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
        </Dialog>
        <Snackbar
          open={this.state.notification}
          message={this.state.notificationMessage}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default LoginDialog;
