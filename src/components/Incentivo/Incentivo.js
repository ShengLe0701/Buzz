// @flow
'use strict';

import React, {
  Component
} from 'react';
import FlatButton from 'material-ui/FlatButton';
import ToggleDisplay from 'react-toggle-display';
import style from './style';
import './Incentivo.styl';

class Incentivo extends Component {

  goLoginPage(){
    // preventDefault();
  	setTimeout( () => {
  		window.open('http://dashboard.buzzpage.com.br/Login','_blank');
  	}, 50);
  }

  render() {
    return (
      <ToggleDisplay hide={this.props.isLoggedIn} className="Incentivo">
        <div className="banner">
          <div className="left">
            <p>Como <span className="orange">BuzzPager</span> você pode postar seu conteúdo em vídeos, textos ou imagens.</p>
          </div>
          <div className="right">
          <h3>Confira o programa de incentivo ao <span className="orange">BuzzPager</span></h3>
          <ul>
            <li>Você recebe até R$ 5.000,00 pelo seu conteúdo</li>
            <li>Pode participar de cursos e treinamentos gratuitos fornecidos pela BuzzPage</li>
            <li>Tem descontos especiais em universidades e em outras empresas parceiras</li>
            <li>Pode se cadastrar gratuitamente em nosso "Programa de Expansão" e indicar empresas para serem anunciantes</li>
          </ul>
          </div>
        </div>
        <div className="mensagem">
          <p>Nossa equipe está desenvolvendo uma série de benefícios adicionais para que cada <span className="orange">BuzzPager</span> usufrua de oportunidades incríveis, <span className="orange">sempre gratuitamente</span></p>
          <FlatButton onClick={this.props.handleOpenCadastro} label="Criar minha Conta" style={Object.assign({}, style.buttons, style.primary)} labelStyle={style.labelStyle}/>
        </div>
      </ToggleDisplay>
    );
  }
}

export default Incentivo;
