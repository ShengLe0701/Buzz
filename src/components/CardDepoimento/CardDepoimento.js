// @flow
'use strict';

import React from 'react';
import Avatar from 'material-ui/Avatar';
import './CardDepoimento.styl';


let goProfile = (action, username) => {
	action(username)
}

let CardDepoimento = (props) => (

	<div className="CardDepoimento">
    <div className="legenda-holder">
      <p>"{props.texto}"</p>
      <div className="profile-holder" onTouchTap={() => goProfile(props.goProfile, props.username)}>
        <Avatar src={props.foto} />
				<span>
					<span>por</span>
					<span className="underline">{props.nome}</span>
				</span>
      </div>
    </div>
	</div>
	);

export default CardDepoimento;
