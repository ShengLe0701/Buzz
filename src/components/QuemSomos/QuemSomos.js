// @flow
'use strict';

import React, {
  Component
} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Helmet from 'react-helmet'
import './QuemSomos.styl';
import Footer from '../Footer/Footer';
import imagemMina from '../../images/mina1.png';
// import imagemAnuncie from '../../images/anuncie.png';
import faceImage 	from '../../images/FACEBOOK.png';
import twitterImage 	from '../../images/TWITTER.png';
import instaImage from '../../images/INSTAGRAM.png';
import youtubeImage from '../../images/YOUTUBE.png';


class QuemSomos extends Component {

	componentWillMount(){
		this.props.actions.forceNotHome();
	}

	render(){
		return(
			<div className="QuemSomos">
        <Helmet title='BuzzPage - Quem Somos' />
        <div className="content-holder">
					<div className="textos">
						<h1>Quem Somos</h1>
						<p>A Buzzpage é uma plataforma colaborativa que permite qualquer pessoa falar sobre seu assunto favorito! Nossa equipe acredita que a conexão através da Internet possibilita coisas incríveis. Nossos engenheiros,programadores, designers e especialistas em marketing digital possuem ampla experiência nos segredos do mundo digital e usando todo esse knowhow para a BuzzPage ser uma revolução.</p>
						<h2>Visão:</h2>
						<p>Ser a maior plataforma colaborativa do mundo, alcançando todos os assuntos e nichos existentes na economia global.</p>
						<h2>Missão:</h2>
						<p>Conectar pessoas e distribuir renda no conceito de economia colaborativa.</p>
						<h2>Valores:</h2>
						<p>Liberdade para criar idéias e projetos que desenvolvem pessoas.</p>
		   		</div>
					<div className="img-holder">
						<img src={imagemMina} className="imagem-mina" alt="Menina Feliz no seu computador escrevendo historias para buzzpage" width="350" height="auto" />
					</div>
        </div>
        <div className="redes-sociais">
          <img src={faceImage} onTouchTap={this.props.actions.onSocialClick.bind(this, 'facebook')}	alt="Facebook Buzzpage" width="36" height="36" />
          <img src={twitterImage} onTouchTap={this.props.actions.onSocialClick.bind(this, 'twitter')}	alt="Twitter Buzzpage" width="36" height="36" />
          <img src={instaImage} onTouchTap={this.props.actions.onSocialClick.bind(this, 'instagram')}	alt="Instagram Buzzpage" width="36" height="36" />
          <img src={youtubeImage} onTouchTap={this.props.actions.onSocialClick.bind(this, 'youtube')}	alt="Youtube Buzzpage" width="36" height="36" />
        </div>
        <Footer handleOpenCadastro={this.props.actions.cadastroDialog}/>
			</div>
		)}
	}


	function mapStateToProps(state) {
	  const props = {
	    homeReducer: state.home
	  };
	  return props;
	}

	function mapDispatchToProps(dispatch) {
	  const actions = {
	    onSocialClick: require('../../actions/home/onSocialClick.js'),
      cadastroDialog: require('../../actions/home/cadastroDialog.js'),
	    forceNotHome: require('../../actions/home/forceNotHome.js')
	  };
	  const actionMap = { actions: bindActionCreators(actions, dispatch) };
	  return actionMap;
	}
	export default connect(mapStateToProps, mapDispatchToProps)(QuemSomos);
