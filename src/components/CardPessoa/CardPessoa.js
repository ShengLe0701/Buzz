// @flow
'use strict';

import React from 'react';
import './CardPessoa.styl';
import Avatar from 'material-ui/Avatar';
import AvatarHolder from '../../images/avatar.jpg';

let CardPessoa = (props) => (
	<div className="CardPessoa" onClick={props.goProfile.bind(this, props.login)}>
		<div className="avatar-holder">
			<Avatar size={80} src={props.avatar ? props.avatar : AvatarHolder} />
		</div>
		<div className="detalhes">
			<span className="nome">{props.nome}</span>
			<span className="resumo">{props.resumo}</span>
		</div>
	</div>
);

export default CardPessoa;
