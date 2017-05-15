// @flow
'use strict';

import React, {
  Component
} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'
import ToggleDisplay from 'react-toggle-display'
import {Tabs, Tab} from 'material-ui/Tabs'
import Helmet from 'react-helmet'
import _ from 'lodash'
import Clipboard from 'clipboard'
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Avatar from 'material-ui/Avatar'
import CardPostGrande from '../CardPostGrande/CardPostGrande';
import APIService from '../../services/APIService'
import Facebook from '../../images/FACEBOOK.png'
import Instagram from '../../images/INSTAGRAM.png'
import Twitter from '../../images/TWITTER.png'
import YouTube from '../../images/YOUTUBE.png'
import AvatarHolder from '../../images/avatar.jpg';
import style from './style'
import './ProfileView.styl'

var clipboard = new Clipboard('#ClipboardBtn');

class ProfileView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        conteudos: []
      },
      recomendados: [],
      userLogin: '',
      alert: false,
      alertMessage: ''
    }
  }

  componentDidMount(){
    this.props.actions.scrollToTitle();
    this.props.actions.startLoading();
    let loginUsername = this.props.params.profileName;
    this.setState({
      userLogin: this.props.params.profileName
    })
    this.fetchUser(loginUsername);
    this.props.actions.forceNotHome();
  }

  componentWillReceiveProps(nextProps){
    let novoUser = nextProps.params.profileName
    let antigoUser = this.state.userLogin
    if(novoUser != antigoUser){
      this.setState({
        userLogin: novoUser
      })
      this.fetchUser(nextProps.params.profileName)
    }
  }

  fetchUser = (loginUsername) => {
    APIService.fetchUser(loginUsername).then((user) => {
      this.setState({
        user: user
      })
      console.log(user)
      setTimeout(() => {
        this.props.actions.stopLoading();
      }, 250);
    })
  }

  fetchRecomendacoes = (id) => {
    APIService.fetchRecomendacoes(id).then((recomendacoes) => {
      console.log(recomendacoes)
      this.setState({
        recomendados: recomendacoes
      })
      setTimeout(() => {
        this.props.actions.stopLoading();
      }, 350);
    })
  }

  checkRecomendados = () => {
    this.props.actions.startLoading();
    let recomendados = this.state.recomendados
    let id = this.state.user.idPessoa
    if(!recomendados || recomendados.length == 0 ){
      this.fetchRecomendacoes(id);
    }
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

  onPostClick = (e, slug) => {
    browserHistory.push('/post/'+slug);
  }

  render(){
    return(
      <div className="ProfileView">
        <Helmet title={this.state.user.nome ? 'BuzzPager - '+ this.state.user.nome : 'Buzzpager'}/>
          <div className="profile-holder">
            <Avatar size={120} src={this.state.user.fotoPerfil ? this.state.user.fotoPerfil : AvatarHolder}/>
            <div className="details">
              <h2>{this.state.user.nome}</h2>
              <span>{this.state.user.sobreMim}</span>
              <div className="social">
                <ToggleDisplay show={this.state.user.facebook ? true : false}>
                  <img onTouchTap={e => this.props.actions.openLink(this.state.user.facebook, e)} src={Facebook} width="30" height="30" alt=""/>
                </ToggleDisplay>
                <ToggleDisplay show={this.state.user.twitter ? true : false}>
                  <img onTouchTap={e => this.props.actions.openLink(this.state.user.twitter, e)} src={Twitter} width="30" height="30" alt=""/>
                </ToggleDisplay>
                <ToggleDisplay show={this.state.user.instagram ? true : false}>
                  <img onTouchTap={e => this.props.actions.openLink(this.state.user.instagram, e)} src={Instagram} width="30" height="30" alt=""/>
                </ToggleDisplay>
                <ToggleDisplay show={this.state.user.youtube ? true : false}>
                  <img onTouchTap={e => this.props.actions.openLink(this.state.user.youtube, e)} src={YouTube} width="30" height="30" alt=""/>
                </ToggleDisplay>
              </div>
              <ToggleDisplay className='referral' show={this.state.user.idPessoa == this.props.homeReducer.usuario.idPessoa ? true : false}>
                <h3>Indique seus amigos e ganhe um percentual sobre os ganhos deles!</h3>
                <FlatButton
                  id='ClipboardBtn'
                  style={style.primary}
                  label="Copiar Link de Indicação"
                  labelStyle={{color: '#fff'}}
                  primary={true}
                  data-clipboard-text={'http://buzzpage.com.br/referral/'+this.props.homeReducer.username}
                  onTouchTap={this.copyLink}/>
              </ToggleDisplay>
            </div>
            {/* <user={style.button} label="Seguir" /> */}
          </div>
          <Tabs tabItemContainerStyle={style.tabItemContainerStyle}>
            <Tab label="Publicações" style={style.tabStyle}>
            <div className="tab-content-holder">
              {(() => {
                let conteudos = _.slice(this.state.user.conteudos, 0, 30);
                if(conteudos.length > 0){
                  return conteudos.map((item) => {
                    var conteudosElement = <CardPostGrande hideCredits={true} key={item.idTexto} post={item} openPost={this.onPostClick}/>
                    return conteudosElement;
                  })
                } else {
                  var element = (
                    <ToggleDisplay show={!this.props.homeReducer.isLoading}>
                      <Paper zDepth={window.innerWidth < 800 ? 0 : 1} className='nenhuma-recomendacao'>Nada publicado</Paper>
                    </ToggleDisplay>
                  )
                  return element;
                }
              })()}
              <ToggleDisplay show={this.props.homeReducer.isLoading}>
                <CircularProgress />
              </ToggleDisplay>
            </div>
            </Tab>
            <Tab onActive={this.checkRecomendados} label="Recomendados" style={style.tabStyle}>
              <div className="tab-content-holder">
              {(() => {
                let recomendados = _.slice(this.state.recomendados, 0, 30);
                if(recomendados.length > 0){
                  return recomendados.map((item) => {
                    var conteudosElement = <CardPostGrande hideCredits={true} key={item.idCurtida} post={item.texto} openPost={this.onPostClick}/>
                    return conteudosElement;
                  })
                } else {
                  var element = (
                    <ToggleDisplay show={!this.props.homeReducer.isLoading}>
                      <Paper zDepth={window.innerWidth < 800 ? 0 : 1} className='nenhuma-recomendacao'>Nenhuma Recomendação</Paper>
                    </ToggleDisplay>
                  )
                  return element;
                }
              })()}
              </div>
            </Tab>
          </Tabs>
          <Snackbar
           open={this.state.alert}
           message={this.state.alertMessage}/>
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
    startLoading: require('../../actions/home/startLoading.js'),
    forceNotHome: require('../../actions/home/forceNotHome.js'),
    scrollToTitle: require('../../actions/home/scrollToTitle.js'),
    stopLoading: require('../../actions/home/stopLoading.js'),
    openLink: require('../../actions/home/openLink.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
