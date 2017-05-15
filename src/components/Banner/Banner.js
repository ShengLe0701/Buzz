// @flow
'use strict';

import React from 'react';
import './Banner.styl';
import style from './style';
import FlatButton from 'material-ui/FlatButton';
import ToggleDisplay from 'react-toggle-display';

const Banner = (props) => (
  <ToggleDisplay show={props.isLoggedIn ? false : props.show}>
    <div className={props.bannerClass}>
      <div className="content">
        <div className="texts-holder">
          <h3>Qual seu assunto favorito?</h3>
          <p>Conte o que você sabe na BuzzPage e ganhe até<br/>R$ 5.000,00 pelo seu conteúdo!</p>
          <FlatButton label="Cadastre-se agora, é simples e de graça" onClick={props.handleOpenCadastro} style={Object.assign({}, style.buttons, style.primary)} labelStyle={style.labelStyle}/>
        </div>
      </div>
    </div>
  </ToggleDisplay>
)

export default Banner;
