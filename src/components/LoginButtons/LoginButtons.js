// @flow
'use strict';

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import style from './style'
import ToggleDisplay from 'react-toggle-display';

let LoginButtons = (props) => (

	<ToggleDisplay hide={props.hide} className="LoginButtons">
		<FlatButton
      onClick={props.openLogin}
      label="Login"
      style={window.innerWidth < 800 ? style.mobileButtons : style.buttons}
      labelStyle={style.labelStyle}/>
		<FlatButton
      onClick={props.openCadastro}
      label="Cadastro"
      style={window.innerWidth < 800 ? style.mobilePrimary : style.primary}
      labelStyle={style.labelStyle}/>
	</ToggleDisplay>
	);

export default LoginButtons;
