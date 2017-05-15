// @flow
'use strict';

//Dependencies
import React, {
  Component
} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import $ from 'jquery';
import _ from 'lodash';
import classNames from 'classnames/bind';
import { StickyContainer } from 'react-sticky';
//Style
import './Home.styl';
//Containers
import Header from '../Header/Header';
//Modals
import CadastroDialog from '../CadastroDialog/CadastroDialog';
import LoginDialog from '../LoginDialog/LoginDialog';
import ResultadoPesquisa from '../ResultadoPesquisa/ResultadoPesquisa';
//Components
import Banner from '../../components/Banner/Banner';
const documentElement = $(document);


class Home extends Component {

  componentWillMount(){
    console.log('Home WillMount')
    console.log(this.props.homeReducer.usuario)
    console.log(this.props.homeReducer.usuario.foto)
    this.fetchPosts();
    this.fetchAssuntos();
    this.fetchTopBuzzpagers();
    this.scrollListener();
    this.keyboardListener();
  }

  fetchPosts() {
    this.props.actions.fetchMelhores()
    if(this.props.homeReducer.isLoggedIn){
      this.props.actions.fetchUltimos()
    }
  }

  fetchAssuntos() {
    this.props.actions.fetchAssuntos()
  }

  fetchTopBuzzpagers(){
    this.props.actions.fetchTopBuzzpagers()
  }

  keyboardListener() {
    window.onkeydown = event => {
      if (event.keyCode === 27) {
        this.props.actions.onEsc();
      }
    };
  }
  scrollListener() {
    window.addEventListener('scroll', _.throttle(this.onScroll, 250));
  }

  onScroll = () => {
    let scrollTop = documentElement.scrollTop()
    let themeBreakPoint = 50;
    let theme;
    let activeTheme = this.props.homeReducer.headerTheme.tipo;
    let isHome = this.props.homeReducer.isHome;
    let isLoggedIn = this.props.homeReducer.isLoggedIn;
    if(scrollTop > themeBreakPoint ){
      theme = 'whiteHeader';
      if(activeTheme != 'white'){
        this.changeTheme(theme);
      }
    } else if (scrollTop < themeBreakPoint ){
      if(window.innerWidth > 800 && !isLoggedIn && isHome){
        theme = 'transparentHeader';
        if(activeTheme != 'transparent'){
          // console.log('changind to transparent')
          // console.log(isHome)
          this.changeTheme(theme);
        }
      }
      else {
        // console.log('changing to transparent')
        // console.log(isHome)
        theme = 'transparentHeader';
        if(activeTheme != 'transparent' && isHome && !isLoggedIn){
          this.changeTheme(theme);
        }
      }
    }
  }

  changeTheme = (theme) => {
    this.props.actions.changeTheme(theme);
  }

  onSearch = (value) => {
    if(value.length >= 3){
      this.props.actions.startSearching();
      this.props.actions.resultadoDialog(value);
    }
    else if(value == ''){
      this.props.actions.closeResultadoDialog();
    }
  }

  render() {
    const {actions, homeReducer } = this.props;
    const bannerClass = classNames({
      'Banner' : true,
      'blur': homeReducer.isLoading && homeReducer.isSearching,
      'notHome': !homeReducer.isHome
    })
    return (
      <StickyContainer>
        <div className='Home'>
          <Header
            goHome={actions.goHome}
            goEscreva={actions.goEscreva}
            goDashboard={actions.goDashboard}
            logoHeader={homeReducer.logoHeader}
            headerTheme={homeReducer.headerTheme}
            isLoading={homeReducer.isLoading}
            openLogin={actions.openLoginDialog}
            closeLogin={actions.closeLoginDialog}
            closeResultadoDialog={actions.closeResultadoDialog}
            onSearch={this.onSearch}
            openCadastro={actions.cadastroDialog}
            usuario={homeReducer.usuario}
            isLoggedIn={homeReducer.isLoggedIn}
            openPesquisa={actions.openResultadoDialog}/>
          <Banner
            bannerClass={bannerClass}
            show={homeReducer.isHome}
            isLoggedIn={homeReducer.isLoggedIn}
            handleOpenCadastro={actions.cadastroDialog}/>
          <div className="content-holder">
            {this.props.children}
          </div>
          <ResultadoPesquisa
            goProfile={actions.goProfile}
            openPost={actions.postviewDialog}
            handleClose={actions.closeResultadoDialog}
            payload={homeReducer.pesquisaPayload}
            ultimaPesquisa={homeReducer.ultimaPesquisa}
            startLoading={actions.startLoading}
            isLoading={homeReducer.isLoading}
            fetchMore={actions.fetchMorePesquisa}
            isOpen={homeReducer.showResultado}/>
          <CadastroDialog />
          <LoginDialog
            isLoading={homeReducer.isLoading}
            startLoading={actions.startLoading}
            stopLoading={actions.stopLoading}
            isOpen={homeReducer.showLogin}
            fetchUltimos={actions.fetchUltimos}
            didLogin={actions.didLogin}
            didFacebookLogin={actions.didFacebookLogin}
            closeLogin={actions.closeLoginDialog}/>
        </div>
      </StickyContainer>
    );
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
    fetchUltimos: require('../../actions/home/fetchUltimos.js'),
    fetchAssuntos: require('../../actions/home/fetchAssuntos.js'),
    fetchTopBuzzpagers: require('../../actions/home/fetchTopBuzzpagers.js'),
    fetchMelhores: require('../../actions/home/fetchMelhores.js'),
    cadastroDialog: require('../../actions/home/cadastroDialog.js'),
    loginDialog: require('../../actions/home/loginDialog.js'),
    closeLoginDialog: require('../../actions/home/closeLoginDialog.js'),
    postviewDialog: require('../../actions/home/postviewDialog.js'),
    resultadoDialog: require('../../actions/home/resultadoDialog.js'),
    startLoading: require('../../actions/home/startLoading.js'),
    stopLoading: require('../../actions/home/stopLoading.js'),
    onEsc: require('../../actions/home/onEsc.js'),
    goHome: require('../../actions/home/goHome.js'),
    changeTheme: require('../../actions/home/changeTheme.js'),
    startSearching: require('../../actions/home/startSearching.js'),
    closeResultadoDialog: require('../../actions/home/closeResultadoDialog.js'),
    openResultadoDialog: require('../../actions/home/openResultadoDialog.js'),
    closeLoginDialog: require('../../actions/home/closeLoginDialog.js'),
    openLoginDialog: require('../../actions/home/openLoginDialog.js'),
    goDashboard: require('../../actions/home/goDashboard.js'),
    fetchMorePesquisa: require('../../actions/home/fetchMorePesquisa.js'),
    goProfile: require('../../actions/home/goProfile.js'),
    goEscreva: require('../../actions/home/goEscreva.js'),
    goFaq: require('../../actions/home/goFaq.js'),
    didFacebookLogin: require('../../actions/home/didFacebookLogin.js'),
    didLogin: require('../../actions/home/didLogin.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
