// @flow
'use strict';

import React from 'react';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import AvatarHolder from '../../images/avatar.jpg';
import './WidgetPessoas.styl';
import style from './style';

let WidgetPessoas = (props) => (
	<div className="WidgetPessoas">
		<Divider />
		<List>
			<Subheader style={style.subheader}>{props.titulo ? props.titulo : 'Pessoas'}</Subheader>
			{
				props.pessoas.map((pessoa) => {
					var element = <ListItem
													onClick={() => props.goProfile(pessoa.username)}
													key={pessoa.username}
													primaryText={pessoa.nome}
													leftAvatar={<Avatar src={pessoa.foto ? pessoa.foto : AvatarHolder} />}/>
					return element;
				})
			}
		</List>
	</div>
);

export default WidgetPessoas;
