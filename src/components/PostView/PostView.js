// @flow
'use strict';

import React, {
  Component
} from 'react';
import { browserHistory } from 'react-router';
import './PostView.styl';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import $ from 'jquery'
import Helmet from 'react-helmet';
import AutorPostDetails  from '../AutorPostDetails/AutorPostDetails';
import APIService from '../../services/APIService';
import Divider from 'material-ui/Divider';
import Comentarios from '../Comentarios/Comentarios';
import PostSocial from '../PostSocial/PostSocial';
import Snackbar from 'material-ui/Snackbar';
import ToggleDisplay from 'react-toggle-display';
import AnuncioTopoDefault from '../../images/default-ad.jpg';
import LoadingGif from '../../images/post-loading.gif';
import BannerPostTopo from '../BannerPostTopo/BannerPostTopo';
import Footer from '../../components/Footer/Footer';
import Relacionados from '../../components/Relacionados/Relacionados';
import BannerPostLateral from '../BannerPostLateral/BannerPostLateral';
// import SocialShare from '../SocialShare/SocialShare';
// import AnuncioPesquisa from '../AnuncioPesquisa';
// import Anunciante from '../../containers/Anunciante';

class PostView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoria: null,
      postText: [],
      slug: '',
      idTexto: '',
      curtiu: false,
      shareOpen: false,
      comentarios: [],
      banners: {},
      alert: false,
      alertMessage: '',
      curtidas: 0,
      linkBannerTopo: undefined,
      relacionados: [],
      outrosPostsAutor: []
    }
  }

  componentDidMount(){
    this.fetchPost(this.props.params.postSlug)
  }

  componentWillReceiveProps(nextProps){
    // console.log('PostView nextProps')
    // console.log(nextProps)
    // console.log('PostView state')
    // console.log(this.state)
    this.scrollToTitle();
    if(this.state.slug != '' &&  nextProps.params.postSlug != this.state.slug){
      this.setState({
        curtiu: false
      })
      this.fetchPost(nextProps.params.postSlug)
    }
    if(nextProps.homeReducer.postPayload.texto){
      this.setState({
        postText: nextProps.homeReducer.postPayload.texto
      })
    }
  }

  fetchPost = (slug) => {
    APIService.fetchPost(slug).then((post) => {
      console.log('fetchPost then')
      console.log(post)
      this.props.actions.postviewDialog(post.post)
      this.props.actions.stopLoading();
      let idPost = post.post.idTexto
      let curtidas = post.post.curtidas
      let comentarios = post.post.comentarios
      let outrosPostsAutor = post.postsColaborador
      this.setState({
        slug: slug,
        idTexto: idPost,
        curtidas: curtidas,
        comentarios: comentarios ? comentarios : [],
        banners: post.banner,
        relacionados: post.postsRelacionados,
        outrosPostsAutor: outrosPostsAutor ? outrosPostsAutor : []
      })
      let usuario = this.props.homeReducer.usuario
      if(usuario && usuario.idPessoa){
        this.fetchLike(usuario.idPessoa, idPost)
      }
    })
  }

  fetchLike = (idPessoa, idPost) => {
    APIService.checkLiked(idPessoa, idPost).then((liked) => {
      if(liked.idCurtida){
        this.setState({
          curtiu: true
        })
      }
    })
  }

  scrollToTitle = () => {
    this.props.actions.scrollToTitle();
  }

  scrollToComments = () => {
    console.log('scrollToComments')
    $('html, body').animate({
        scrollTop: $('#Comentarios').offset().top
    }, 0)
  }

  toggleLike = () => {
    let idUser = this.props.homeReducer.usuario.idPessoa
    let idPost = this.state.idTexto
    let toggledLike = !this.state.curtiu
    if(idUser){
      APIService.postLike(idUser, idPost)
      this.setState({
        curtiu: toggledLike,
        curtidas: toggledLike ? this.state.curtidas+1 : this.state.curtidas-1
      })
    } else {
      this.showAlert('Login necessário para recomendar posts')
    }
  }

  handleTouchTap = (event) => {
    event.preventDefault();
    this.setState({
      shareOpen: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose = () => {
		this.setState({
			shareOpen: false
		})
	}

  showAlert = (message) => {
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

  deletarComentario = (idDeletado) => {
    APIService.deletarComentario(idDeletado).then((res) => {
      let comentarios = this.state.comentarios
      this.state.comentarios
      if(res.chave == 'OK'){
        for(var x = 0; x < this.state.comentarios.length; x++){
          let comentario = this.state.comentarios[x]
          if(comentario.idComentario == idDeletado){
            comentarios.splice(x, 1)
            this.setState({
              comentarios: comentarios
            })
            this.showAlert('Comentário excluído com sucesso')
          }
        }
      }
    })
  }

  enviarComentario = (comentario) => {
    console.log('enviarComentario')
    APIService.postarComentario(comentario).then((res) => {
      console.log('postarComentario then')
      console.log(res)
      if(res.chave == 'OK'){
        comentario.idComentario = res.idCadastrado
        comentario.nome = this.props.homeReducer.usuario.nome
        comentario.fotoPerfil = this.props.homeReducer.usuario.foto
        let comentarios = this.state.comentarios
        comentarios.unshift(comentario)
        this.setState({
          comentarios: comentarios
        })
        this.showAlert('Comentário enviado')
      } else {
        this.showAlert('Ops. Ocorreu algum erro, tente novamente')
      }
    })
  }

  cleanPostView = () => {
    console.log('cleanPostView')
    this.setState({
      postText: [],
      relacionados: [],
      outrosPostsAutor: [],
      linkBannerTopo: undefined
    })
    this.props.actions.cleanPost();
  }

  loadNewPost = (slug) => {
    this.cleanPostView()
    this.props.actions.startLoading();
    browserHistory.push('/post/'+slug);
  }

  keyboardListener = (flag) => {
    console.log('keyboardListener')
    console.log(flag)
    if(flag){
      window.onkeydown = event => {
        if (event.keyCode === 13) {
          this.enviarComentario();
        }
      }
    } else {
      window.onkeydown = null;
    }
  }

  openAnuncio = (link) => {
    console.log('openAnuncio')
    setTimeout(() => {
      if(link){
        window.open(link,'_blank');
      } else {
        this.props.actions.goAnuncie();
      }
    }, 50);
  }

  render(){
    const {actions, homeReducer} = this.props;
    return(
      <div className='PostView'>
       <Helmet
        title={homeReducer.postPayload.titulo} />
        <BannerPostTopo
          onClick={() => this.openAnuncio(this.state.banners.linkBannerTopo)}
          fotoAnuncio={this.state.banners.bannerTopo ? this.state.banners.bannerTopo : AnuncioTopoDefault}/>
        <div className='results-holder'>
          <div className='posts'>
            <ToggleDisplay show={homeReducer.isLoading ? true : false}>
              <img src={LoadingGif} alt=''/>
            </ToggleDisplay>
            <div id='PostTitle' className='post-holder'>
              <div className="conteudo">
                <h1 className='titulo'>{homeReducer.postPayload.titulo}</h1>
                <div dangerouslySetInnerHTML={{__html: this.state.postText}}/>
              </div>
              <ToggleDisplay hide={homeReducer.isLoading}>
                <div className="banner-lateral-container">
                  <BannerPostLateral onClick={() => this.openAnuncio(this.state.banners.linkBannerLateral2)} fotoAnuncio={this.state.banners.bannerLateral2 ? this.state.banners.bannerLateral2 : null}/>
                  <BannerPostLateral onClick={() => this.openAnuncio(this.state.banners.linkBannerLateral3)} fotoAnuncio={this.state.banners.bannerLateral3 ? this.state.banners.bannerLateral3 : null}/>
                </div>
              </ToggleDisplay>
            </div>
              <PostSocial
                titulo={homeReducer.postPayload.titulo}
                slug={this.state.slug}
                curtidas={this.state.curtidas}
                handleTouchTap={this.handleTouchTap}
                anchorEl={this.state.anchorEl}
                shareOpen={this.state.shareOpen}
                scrollToComments={this.scrollToComments}
                curtiu={this.state.curtiu}
                handleRequestClose={this.handleRequestClose}
                comentariosLength={this.state.comentarios ? this.state.comentarios.length : 0}
                toggleLike={this.toggleLike}/>
              <Divider />
              <AutorPostDetails
                goProfile={actions.goProfile}
                loadNewPost={this.loadNewPost}
                foto={homeReducer.postPayload.fotoRedator}
                nome={homeReducer.postPayload.nomeRedator}
                login={homeReducer.postPayload.usuario}
                posts={this.state.outrosPostsAutor}
                resumo={homeReducer.postPayload.resumoRedator}/>
              <ToggleDisplay hide={homeReducer.isLoading ? true : false}>
                <Relacionados cleanPostView={this.cleanPostView} posts={this.state.relacionados}/>
                <div className='comentarios-holder'>
                  <Comentarios
                    idPost={this.state.idTexto}
                    goProfile={actions.goProfile}
                    deletarComentario={this.deletarComentario}
                    enviarComentario={this.enviarComentario}
                    fotoUsuario={homeReducer.usuario ? homeReducer.usuario.foto : ''}
                    nomeUsuario={homeReducer.usuario ? homeReducer.usuario.nome : ''}
                    idPessoa={homeReducer.usuario ? homeReducer.usuario.idPessoa : ''}
                    comentarios={this.state.comentarios}
                    onComentarioFocus={() => this.keyboardListener(true)}
                    onComentarioBlur={() => this.keyboardListener(false)}
                    showAlert={this.showAlert.bind(this)}
                    usuario={homeReducer.usuario}/>
                </div>
              </ToggleDisplay>
          </div>
          <Snackbar
           open={this.state.alert}
           message={this.state.alertMessage}
           onActionTouchTap={actions.loginDialog}
           onRequestClose={this.handleRequestClose}/>
        </div>
        <Footer handleOpenCadastro={actions.cadastroDialog} show={!homeReducer.isLoggedIn}/>
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
	    postviewDialog: require('../../actions/home/postviewDialog.js'),
      cleanPost: require('../../actions/home/cleanPost.js'),
      stopLoading: require('../../actions/home/stopLoading.js'),
      startLoading: require('../../actions/home/startLoading.js'),
      loginDialog: require('../../actions/home/loginDialog.js'),
      scrollToTitle: require('../../actions/home/scrollToTitle.js'),
      goProfile: require('../../actions/home/goProfile.js'),
      goAnuncie: require('../../actions/home/goAnuncie.js'),
      cadastroDialog: require('../../actions/home/cadastroDialog.js')
	  };
	  const actionMap = { actions: bindActionCreators(actions, dispatch) };
	  return actionMap;
	}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
