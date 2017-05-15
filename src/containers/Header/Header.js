// @flow
'use strict';

import './Header.styl'
import React, {
  Component
} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Pesquisa from '../Pesquisa/Pesquisa'
import LoginButtons from '../../components/LoginButtons/LoginButtons'
import ProfileButtons from '../../components/ProfileButtons/ProfileButtons'
import LoadingBar from '../../components/LoadingBar/LoadingBar'
import ToggleDisplay from 'react-toggle-display'

class Header extends Component {

  goContato = () => {
    this.props.actions.goContato(this.props.usuario.login)
  }

  goAnuncie = () => {
    this.props.actions.goAnuncie(this.props.usuario.login)
  }

  goQuemSomos = () => {
    this.props.actions.goQuemSomos(this.props.usuario.login)
  }

  goTermos = () => {
    this.props.actions.goTermos()
  }

  goFaq = () => {
    this.props.actions.goFaq()
  }

  openCadastro = (event) => {
    event.preventDefault();
    this.props.openCadastro()
  }

  openLogin = (event) => {
    event.preventDefault();
    this.props.openLogin()
  }

  render() {
    const {headerTheme, closeResultadoDialog} = this.props;
    let headerStyle = {
      boxShadow: headerTheme.boxShadow,
      backgroundColor: headerTheme.backgroundColor,
      color: headerTheme.color
    }

    return (
      <div className="Header" style={headerStyle}>
        <LoadingBar
          isLoading={this.props.isLoading}/>
        <div className="header-content">

          <div className="top">
            <div className="logo-holder">
              <img onClick={this.props.goHome} width="185" height="43" src={headerTheme.imageLogo} alt=""/>
            </div>


            <div className="buttons-holder">
              <ToggleDisplay hide={this.props.isLoggedIn ? true : false}>
                <div className="links-holder">
                  <span onTouchTap={this.goContato}className="link">Contato</span>
                  <span>|</span>
                  <span onTouchTap={this.goAnuncie}className="link">Anuncie</span>
                  <span>|</span>
                  <span onTouchTap={this.goQuemSomos}className="link">Quem Somos</span>
                  <span>|</span>
                  <span onTouchTap={this.goFaq}className="link">FAQ</span>
                </div>
              </ToggleDisplay>

              <LoginButtons
                hide={this.props.isLoggedIn ? true : false}
                openCadastro={this.openCadastro}
                goDashboard={this.props.goDashboard}
                openLogin={this.openLogin}/>
              <ProfileButtons
                show={this.props.isLoggedIn ? true : false}
                closeLogin={this.props.closeLogin}
                goDashboard={this.props.goDashboard}
                goEscreva={this.props.goEscreva}
                usuario={this.props.usuario ? this.props.usuario : {}}/>
            </div>
          </div>
          {/* <Sticky stickyClassName={'sticked'}> */}
            <div className="bottom">
              <Pesquisa
                headerTheme={headerTheme}
                onSearch={this.props.onSearch}
                searchInput={this.props.searchInput}
                handleClose={closeResultadoDialog}
                openPesquisa={this.props.openPesquisa}/>
            </div>
          {/* </Sticky> */}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const props = {
    homeReducer: state.home
  }
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    goQuemSomos: require('../../actions/home/goQuemSomos.js'),
    goContato: require('../../actions/home/goContato.js'),
    goTermos: require('../../actions/home/goTermos.js'),
    goFaq: require('../../actions/home/goFaq.js'),
    goAnuncie: require('../../actions/home/goAnuncie.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
