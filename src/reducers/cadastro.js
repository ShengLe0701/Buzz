import { browserHistory } from 'react-router';
import LocalStorage from '../services/LocalStorage';

const initialState = {
    erroNome: '',
    erroEmail: '',
    erroSenha: '',
    erroRepeticaoSenha: '',
    erroEmailIndicador: '',
    showCadastro: false,
    finished: false,
    stepIndex: 0
  };

function verificaNomeCompleto(nome){
  if (nome.split(' ').length < 2 ){
    return false
  }
  return true;
}

function verificaEmail(email){
  console.log(email.split('@').length)
  if (email.split('@').length < 2 ){
    return false
  }
  return true;
}

function verificaDigitosSenha(senha){
  if (senha.length < 6 ){
    return false
  }
  return true;
}

function verificarSenhas(obj){
  if (obj.senha != obj.senhaRepetida ){
    return false
  }
  return true;
}


module.exports = function(state = initialState, action) {

  switch(action.type) {

    case 'CADASTRO_DIALOG': {
      let toggledState = !state.showCadastro;
      if(window.innerWidth > 800){
        let dialog = {
          showCadastro: toggledState
        };
        let nextState = Object.assign({}, state, dialog);
        return nextState;
      } else {
        browserHistory.push('/cadastro_mobile')
        return state;
      }
    }
    case 'LIMPAR_ERROS': {
      let newState = {
        erroNome: '',
        erroEmail: '',
        erroSenha: '',
        erroRepeticaoSenha: '',
        erroEmailIndicador: ''
      };
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'VERIFICAR_NOME': {
      let nome = action.parameter;
      let newState = {
        erroNome: ''
      };
      if(!verificaNomeCompleto(nome)){
        newState.erroNome = 'Nome Completo'
      }
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'VERIFICAR_EMAIL': {
      let email = action.parameter;
      let newState = {
        erroEmail: ''
      };
      if(!verificaEmail(email)){
        newState.erroEmail = 'Email Inválido'
      }
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'VERIFICAR_DIGITOS_SENHA': {
      console.log('VERIFICAR_DIGITOS_SENHA')
      let senha = action.parameter;
      let newState = {
        erroSenha: ''
      };
      if(!verificaDigitosSenha(senha)){
        newState.erroSenha = 'Mínimo de 6 dígitos'
      }
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'VERIFICAR_SENHAS': {
      let senhas = action.parameter;
      let newState = {
        erroRepeticaoSenha: ''
      };
      if(!verificarSenhas(senhas)){
        newState.erroRepeticaoSenha = 'Senhas não conferem'
      }
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'VERIFICAR_INDICACAO': {
      let newState = {
        erroEmailIndicador: ''
      };
      if(action.response.idCadastrado != 0){
        newState.erroEmailIndicador = action.response.nome;
      } else {
        newState.erroEmailIndicador = 'Email não incorreto ou não cadastrado'
      }
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'CADASTRAR_CONTA': {
      // console.log(action)
      let newState = {};
      if(action.response){
        newState = {
          erroNome: '',
          erroEmail: '',
          erroSenha: '',
          erroRepeticaoSenha: '',
          erroEmailIndicador: '',
          stepIndex: 1
        }
      }
      if(window.innerWidth < 800){
        newState.isHome = true;
        browserHistory.push('/')
      }
      LocalStorage.setObject('referral', null)
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    default: {
      return state;
    }
  }
}
