// @flow
'use strict';

import React, {
  Component
} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './Anuncie.styl';
import Footer from '../Footer/Footer';
import Helmet from 'react-helmet'
import imagemMina from '../../images/mina-2.png';
import imagemAnuncie from '../../images/anuncie.png';
import faceImage 	from '../../images/FACEBOOK.png';
import twitterImage 	from '../../images/TWITTER.png';
import instaImage from '../../images/INSTAGRAM.png';
import youtubeImage from '../../images/YOUTUBE.png';


class Anuncie extends Component {

	componentDidMount(){
		this.props.actions.forceNotHome();
	}

  goAnuncieNaBuzz = () => {
    let link = 'http://anuncienabuzz.com.br'
    this.props.actions.openLink(link);
  }

	render(){
		return(
			<div className="Anuncie">
        <Helmet title='Anuncie na BuzzPage' />
        <div className="content-holder">
					<div className="textos">
						<h1>Empresas</h1>
						<p>A BuzzPage acredita que o melhor momento para se fazer propaganda é quando o cliente está se informando sobre o produto/serviço. Por isso criamos uma plataforma que proporciona as marcas falarem com seu público alvo e influenciadores de cada segmento da economia com uma comunicação integrada aos conteúdos mais diversos.</p>
						<p>A BuzzPage oferece o que existe de mais avançado em tecnologia, ações de marketing digital e uma rede de BuzzPagers que colaboram com conteúdo e fomentam o crescimento da plataforma por todo o país.</p>
						<p className="orange"><b>Nossa plataforma não para de crescer! Já estamos chegando na marca de 100.000 BuzzPagers!</b></p>
						<p>Contar com a BuzzPage é ter certeza de uma publicidade com qualidade e ainda proporcionar que milhares de BuzzPagers, participantes da nossa plataforma colaborativa, se beneficiem com a distribuição de renda proporcionada pelo seu anúncio, o quê provoca um grande engajamento e empatia com sua marca.</p>
            <div className="img-anuncie" onTouchTap={this.goAnuncieNaBuzz}>
              <img src={imagemAnuncie}  alt="Anuncie com Buzzpage" width="200px" height="auto" />
            </div>
		   		</div>
						<div className="img-holder">
							<img src={imagemMina} className="imagem-mina" alt="Garota feliz interagindo com a plataforma da buzzpage pelo celular" width="200px" height="auto" />
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
    forceNotHome: require('../../actions/home/forceNotHome.js'),
    cadastroDialog: require('../../actions/home/cadastroDialog.js'),
    openLink: require('../../actions/home/openLink.js'),
    onSocialClick: require('../../actions/home/onSocialClick.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(Anuncie);
