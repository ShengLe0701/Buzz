// @flow
'use strict';

import React from 'react';
import $ from 'jquery';

import '../styles/Explicacao.styl';

//Component Imports
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import PostPesquisa from '../components/PostPesquisa';
import AnuncioPesquisa from '../components/AnuncioPesquisa';
import BannerPesquisa from '../components/BannerPesquisa';
import PostComentarios from '../components/PostComentarios';
import AutorPostDetails  from '../components/AutorPostDetails';
import PostSocial from '../components/PostSocial';
import Anunciante from './Anunciante';
import Enviados from './Enviados';

const style = {
  contentStyle: {
    height: '100%',
    width: '100%',
    maxWidth: '1300px',
    top: '-60px',
  },
  overlayStyle: {
    top: '106px'
  },
  dialogStyle: {
    top: '100px',
  },
  bodyStyle : {
    backgroundColor: '#fff',
    padding: '35px 45px'
  },
  closeButton: {
    position: 'absolute',
    top: '5px',
    left: '1px',
  },
  buttonStyle: {
    border: '2px solid white',
    color: 'white',
    padding: '15px',
    lineHeight: '0px',
    backgroundColor: '(0,0,0,0,1)'
  },
  labelStyle: {
    fontWeight: '600'
  }
};


class Explicacao extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClose = () => {
    this.setState({
      isOpen: false
    })
  }

  goAnuncioPage = () => {
    setTimeout( () => {
  		// window.open('http://www.buzzpage.com.br/dashboard/Anuncios','_blank');
  	}, 50);
  }

  render() {
    return (
      <div>
        <Dialog
          className="Explicacao"
          modal={true}
          open={this.props.isOpen}
          style={style.dialogStyle}
          overlayStyle={style.overlayStyle}
          contentStyle={style.contentStyle}
          bodyStyle={style.bodyStyle}
          autoScrollBodyContent={true}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent={true}>
          <IconButton style={style.closeButton} onClick={this.props.handleClose}>
            <Close />
          </IconButton>

          <div className="content">
            <div className="banner">
              <div className="content">
                <div className="first-message">
                  <h3>A concorrência está grande?</h3>
                </div>
                <div className="second-message">
                  <p>Acerte em cheio o seu público com exclusividade e baixo custo!</p>
                </div>
                 <FlatButton onClick={this.goAnuncioPage} labelStyle={style.labelStyle} style={style.buttonStyle} label="Eu Quero!" />
              </div>
            </div>
            <h3>Milhares de empresas já estão na BuzzPage!!!</h3>
            <div className="explicacao-holder">
              <div className="motivos">
                <img src="../images/ico1.jpg" alt=""/>
                <h4>Como Funciona?</h4>
                <p>Selecione sua região, escolha seu nicho e comoece a vender.</p>
              </div>
              <div className="motivos">
                <img src="../images/ico2.jpg" alt=""/>
                <h4>Por que Funciona?</h4>
                <p>Fale direto com o seu público. Plataforma que reúne marketing de perfomance, marketing de conteúdo e marketing de influência em um único lugar.</p>
              </div>
              <div className="motivos">
                <img src="../images/ico3.jpg" alt=""/>
                <h4>Investimento?</h4>
                <p>A melhor relação custo-benefício que você pode encontrar. Seu conteúdo direto na mente do seu consumidor.</p>
              </div>
            </div>
            <RaisedButton onClick={this.goAnuncioPage} backgroundColor='#212121' label="Eu Quero!" primary={true} />
            <h4 className="last-text">Um único anunciante por item, chegue antes do seu concorrente e seja exclusivo em seu seguimento.</h4>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Explicacao;
