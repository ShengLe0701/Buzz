import { browserHistory } from 'react-router';
import $ from 'jquery';
import _ from 'lodash';
import LocalStorage from '../services/LocalStorage';
import logoLaranja from '../images/logo-laranja.png';
import logoBranco from '../images/logo-branco.png';

const transparentHeader = {
  tipo: 'transparent',
  imageLogo: logoBranco,
  backgroundColor: 'transparent',
  boxShadow : 'none',
  color: '#fff'
}
const whiteHeader = {
  tipo: 'white',
  imageLogo: logoLaranja,
  backgroundColor: '#fff',
  boxShadow : 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
  color: '#727272'
}
const initialState = {
  isOpen: false,
  isLoading: true,
  isSearching: false,
  isHome: true,
  isPost: false,
  isLoggedIn: false,
  showAnuncio: false,
  showPost: false,
  showLogin: false,
  showResultado: false,
  pesquisaHasMore: true,
  username: '',
  categoriaNome: '',
  usuario: {},
  postPayload: {},
  pesquisaPayload: [],
  pessoasPayload: [],
  categoriaPayload: [],
  melhoresPosts: [],
  ultimosPosts: [],
  assuntos: [],
  topBuzzpagers: [],
  ultimaPesquisa: '',
  showReferralBanner: false,
  headerTheme: transparentHeader,
  logoFooter: logoBranco
};

function getUsuarioLocalStorage(){
  let usuario = LocalStorage.getObject('usuario')
  let referral = LocalStorage.getObject('referralBanner')
  console.log('referralBanner localstorage')
  console.log(referral)
  if(usuario != {} && usuario != null){
    initialState.usuario = usuario
    initialState.username = usuario.login
    initialState.isLoggedIn = true
    initialState.headerTheme = whiteHeader
  }
  if(referral == null || referral.show != false){
    initialState.showReferralBanner = true
  }
}

getUsuarioLocalStorage()

function goTopo(){
  $('html, body').animate({
      scrollTop: 0
  }, 0)
}

function openLinkBlank(link){
  setTimeout(function() {
    window.open(link,'_blank');
  }, 150);
}

// function openLink(link){
//   setTimeout(function() {
//     window.location.href = link;
//   }, 150);
// }

module.exports = function(state = initialState, action) {

  switch(action.type) {
    case 'POSTVIEW_DIALOG': {
      let post = {};
      if(action.post){
        post = action.post;
      }
      let postView = {
        showResultado: false,
        postPayload: post,
        isHome: false,
        isPost: true,
        headerTheme: whiteHeader
      };
      let nextState = Object.assign({}, state, postView);
      return nextState;
    }
    case 'DO_LOGOUT': {
      goTopo()
      let newState = {
        isHome: true,
        isPost: false,
        postPayload: {},
        usuario: null,
        username: '',
        isLoggedIn: false,
        headerTheme: transparentHeader
      }
      LocalStorage.clearUsuario();
      LocalStorage.setObject('referralBanner', null)
      let nextState = Object.assign({}, state, newState);
      browserHistory.push('/');
      return nextState;
    }
    case 'DID_LOGIN': {
      let usuario = action.usuario
      let credenciais = action.credenciais
      let newState = {
        usuario: usuario,
        username: usuario.login,
        isLoggedIn: true,
        isLoading: false,
        headerTheme: whiteHeader
      }
      LocalStorage.setObject('usuario', usuario)
      LocalStorage.setObject('credenciais', credenciais)
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'DID_FACEBOOK_LOGIN': {
      console.log('DID_FACEBOOK_LOGIN')
      console.log(action)
      let usuario = action.response
      let newState = {
        usuario: usuario,
        isLoggedIn: true,
        isLoading: false,
        headerTheme: whiteHeader
      }
      LocalStorage.setObject('usuario', usuario)
      LocalStorage.setObject('facebookUser', action.facebookUser)
      let nextState = Object.assign({}, state, newState);
      return nextState;
      // return state;
    }
    case 'GO_DASHBOARD': {
      let url = 'http://dashboard.buzzpage.com.br/';
      openLinkBlank(url)
      return state;
    }
    case 'CLOSE_REFERRAL': {
      console.log('CLOSE_REFERRAL')
      let banner = {
        show: false
      }
      let newState = {
        showReferralBanner: false
      }
      LocalStorage.setObject('referralBanner', banner)
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'CADASTRAR_CONTA': {
      let usuario = action.usuario
      usuario.login = action.response.login
      let newState = {
        isLoading: false,
        usuario: usuario,
        username: usuario.login,
        isLoggedIn: true,
        headerTheme: whiteHeader
      }
      LocalStorage.setObject('usuario', usuario)
      let nextState = Object.assign({}, state, newState);
      browserHistory.push('/');
      return nextState;
    }
    case 'GO_DASHBOARD_ESCREVER': {
      // let url = 'http://dashboard.buzzpage.com.br/Meustextos';
      // openLinkBlank(url)
      browserHistory.push('/escrever');
      return state;
    }
    case 'CLEAN_POST': {
      let newState = {
        postPayload: {}
      }
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'LOGIN_DIALOG': {
      let toggledState = !state.showLogin;
      if(window.innerWidth > 800){
        let dialog = {
          showLogin: toggledState
        };
        let nextState = Object.assign({}, state, dialog);
        return nextState;
      } else {
        let dialog = {
          isHome: false,
          isPost: false
        };
        let nextState = Object.assign({}, state, dialog);
        browserHistory.push('/cadastro_mobile')
        return nextState;
      }
    }
    case 'GO_PROFILE': {
      let profileName = action.parameter;
      browserHistory.push('/@'+profileName);
      let newState = {
        isLoading: true,
        showResultado: false
      }
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'GO_EXTRATO': {
      browserHistory.push('/extrato');
      return state;
    }
    case 'GO_CATEGORIA': {
      // console.log('GO_CATEGORIA')
      // console.log(action)
      let categoria = action.parameter.slug;
      browserHistory.push('/assunto/'+categoria);
      let newState = {
        isLoading: true,
        showResultado: false,
        categoriaNome: action.parameter.titulo
      }
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'GO_FAQ': {
      browserHistory.push('/faq')
      return state;
    }
    case 'GO_ESCREVA': {
      browserHistory.push('/escreva')
      return state;
    }
    case 'GO_CONTATO': {
      browserHistory.push('/contato')
      return state;
    }
    case 'GO_ANUNCIE': {
      browserHistory.push('/anuncie')
      return state;
    }
    case 'GO_QUEM_SOMOS': {
      browserHistory.push('/quemsomos')
      return state;
    }
    case 'GO_TERMOS': {
      // let url = 'http://buzzpage.com.br/assets/termos_de_uso.pdf'
      setTimeout(function() {
        window.open('../assets/termos_de_uso.pdf','_blank');
      }, 150);
      return state;
    }
    case 'OPEN_LINK': {
      let url = action.parameter;
      let n = url.indexOf('http')
      if(n == -1){
        url = 'http://'+url
      }
      openLinkBlank(url)
      return state;
    }
    case 'ON_SOCIAL_CLICK': {
      switch(action.parameter){
        case 'facebook': {
          let url = 'https://www.facebook.com/buzzpageoficial/';
          openLinkBlank(url)
          break;
        }
        case 'twitter': {
          let url = 'https://twitter.com/buzzpageoficial/';
          openLinkBlank(url)
          break;
        }
        case 'instagram': {
          let url = 'https://www.instagram.com/buzzpage/';
          openLinkBlank(url)
          break;
        }
        case 'youtube': {
          let url = 'https://www.youtube.com/channel/UCssrTs0E04P6z2-3EOwc2kw';
          openLinkBlank(url)
          break;
        }
      }
      return state;
    }
    case 'GO_HOME': {
      goTopo();
      browserHistory.push('/');
      let newState = {
        isHome: true,
        isPost: false,
        postPayload: {},
        categoriaPayload: [],
        categoriaNome: '',
        showResultado: false,
        isLoading: false,
        headerTheme: state.isLoggedIn ? whiteHeader : transparentHeader
      }
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'FETCH_MELHORES': {
      let melhores = {
        melhoresPosts: action.posts,
        isLoading: false
      };
      let nextState = Object.assign({}, state, melhores);
      return nextState;
    }
    case 'FETCH_POSTS_CATEGORIA': {
      console.log('FETCH_POSTS_CATEGORIA')
      console.log(action)
      // let resultadoAnterior = state.categoriaPayload;
      // let novoResultado = resultadoAnterior.concat(action.assuntos.posts)
      let melhores = {
        categoriaPayload: action.assuntos.posts,
        categoriaNome: action.assuntos.posts[0].tituloPagina,
        isLoading: false
      };
      let nextState = Object.assign({}, state, melhores);
      console.log(nextState)
      return nextState;
    }
    case 'FETCH_ASSUNTOS': {
      console.log(action.assuntos)
      let assuntos = {
        assuntos: action.assuntos
      };
      let nextState = Object.assign({}, state, assuntos);
      return nextState;
    }
    case 'FETCH_TOPBUZZPAGERS': {
      console.log(action)
      let buzzpagers = {
        topBuzzpagers: action.buzzpagers
      };
      let nextState = Object.assign({}, state, buzzpagers);
      return nextState;
    }
    case 'FETCH_ULTIMOS': {
      let ultimos = {
        ultimosPosts: state.ultimosPosts.concat(action.posts),
        isLoading: false
      };
      let nextState = Object.assign({}, state, ultimos);
      return nextState;
    }
    case 'CADASTRO_DIALOG': {
      if(window.innerWidth < 800){
        let newState = {
          isHome: false,
          isPost: false,
          headerTheme: whiteHeader
        };
        let nextState = Object.assign({}, state, newState);
        return nextState;
      } else {
        return state;
      }
    }
    case 'RESULTADO_DIALOG': {
      // console.log('RESULTADO_DIALOG REDUCER')
      // console.log(action)
      let resultado = {
        pesquisaPayload: action.pesquisaPayload,
        showResultado: true,
        isLoading: false,
        ultimaPesquisa: action.params,
        pesquisaHasMore: action.pesquisaPayload.posts.length < 10 ? false : true
      };
      let nextState = Object.assign({}, state, resultado);
      return nextState;
    }
    case 'FETCH_MORE_PESQUISA': {
      // console.log('FETCH_MORE_PESQUISA')
      // console.log(action)
      let resultadoAnterior = state.pesquisaPayload.posts;
      let novoResultado = resultadoAnterior.concat(action.pesquisaPayload.posts)
      // console.log('novoResultado')
      // console.log(novoResultado)
      let resultado = {
        pesquisaPayload: novoResultado,
        isLoading: false,
        ultimaPesquisa: action.ultimaPesquisa,
        pesquisaHasMore: action.pesquisaPayload.posts.length < 10 ? false : true
      };
      // console.log('resultado')
      // console.log(resultado)
      let nextState = Object.assign({}, state, resultado);
      console.log('nextState')
      console.log(nextState)
      return nextState;
    }
    case 'OPEN_LOGIN_DIALOG': {
      let newState = {
        showLogin: true
      };
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'CLOSE_RESULTADO_DIALOG': {
      let resultado = {
        showResultado: false,
        isLoading: false
      };
      let nextState = Object.assign({}, state, resultado);
      return nextState;
    }
    case 'CLOSE_LOGIN_DIALOG': {
      let resultado = {
        showLogin: false
      };
      let nextState = Object.assign({}, state, resultado);
      return nextState;
    }
    case 'OPEN_LOGIN_DIALOG': {
      let resultado = {
        showLogin: true
      };
      let nextState = Object.assign({}, state, resultado);
      return nextState;
    }
    case 'OPEN_RESULTADO_DIALOG': {
      let resultado = {
        showResultado: true,
        headerTheme: whiteHeader
      };
      let nextState = Object.assign({}, state, resultado);
      return nextState;
    }
    case 'ON_ESC': {
      let close = {
        showResultado: false,
        showPost: false,
        showCadastro: false,
        showLogin: false,
        isLoading: false,
        pesquisaHasMore: true
      };
      let nextState = Object.assign({}, state, close);
      return nextState;
    }
    case 'START_SEARCHING': {
      let searching = {
        isLoading: true,
        isSearching: true,
        headerTheme: whiteHeader
      };
      let nextState = Object.assign({}, state, searching);
      return nextState;
    }
    case 'START_LOADING': {
      let loading = {
        isLoading: true
      };
      let nextState = Object.assign({}, state, loading);
      return nextState;
    }
    case 'STOP_LOADING': {
      let loading = {
        isLoading: false
      };
      let nextState = Object.assign({}, state, loading);
      return nextState;
    }
    case 'SCROLL_TO_TITLE': {
      $('html, body').animate({
          scrollTop: 0
      }, 0)
      return state;
    }
    case 'FORCE_NOT_HOME': {
      let newState = {
        isHome: false,
        isPost: false,
        postPayload: {},
        headerTheme: whiteHeader
      }
      let nextState = Object.assign({}, state, newState);
      return nextState;
    }
    case 'CHANGE_THEME': {
      let theme = {
        headerTheme: {}
      };
      if(action.parameter == 'whiteHeader'){
        theme.headerTheme = whiteHeader;
      } else {
        theme.headerTheme = transparentHeader;
      }
      let nextState = Object.assign({}, state, theme);
      return nextState;
    }

    default: {
      return state;
    }
  }
}
