// @flow
'use strict';

import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import FlatButton from 'material-ui/FlatButton';
import './Footer.styl';
import style from './style';

let Footer = (props) => (
  <ToggleDisplay show={props.show}>
    <div className="Footer">
      <div className="footer-holder">
        <h2>Uma BuzzPage feita por você.</h2>
        <span>Crie sua conta e comece agora sua carreira como BuzzPager.</span>
        <FlatButton label="Cadastre-se agora, é simples e de graça" onClick={props.handleOpenCadastro} style={Object.assign({}, style.buttons, style.primary)} labelStyle={style.labelStyle}/>
      </div>
      <div className="termos-holder">
        <img width="130" height="29" src={'../../images/logo-branco.png'} alt=""/>
      </div>
    </div>
  </ToggleDisplay>
)

export default Footer;
