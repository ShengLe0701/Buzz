// @flow
'use strict';

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import './RallyBanner.styl';

const style = {
  buttons: {
    margin: '0px auto',
    fontSize: '0.6em',
    lineHeight: '2em',
    borderRadius: '3px',
    border: '1px solid #F53C11',
    color: '#F53C11'
  },
  labelStyle: {
    fontSize: '1.2em'
  }
}

let RallyBanner = (props) => (

  <div className="RallyBanner">
    <div className="banner">
      <div className="left">
        <h1 className="orange">Primeira etapa do Rally BuzzPage</h1>
        <FlatButton label="Clique aqui e saiba mais" onClick={props.openRally} style={style.buttons} labelStyle={style.labelStyle}/>
      </div>
    </div>
    <div className="mensagem-mobile">
      <h1 className="orange">Primeira etapa do Rally BuzzPage</h1>
      <FlatButton label="Clique aqui e saiba mais" onClick={props.openRally} style={style.buttons} labelStyle={style.labelStyle}/>
    </div>
  </div>
	);

export default RallyBanner;
