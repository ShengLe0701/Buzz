// @flow
'use strict';

import React from 'react';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import './WidgetAssuntos.styl';
import style from './style';

let WidgetAssuntos = (props) => (
	<div className="WidgetAssuntos">
		<Divider />
		<Subheader style={style.subheader}>Assuntos</Subheader>
		<div className='content-holder'>
			{
				props.assuntos.map((item) => {
					var element = <Chip key={item.idPagina} onTouchTap={() => props.goCategoria(item)} style={style.chip}>{item.titulo}</Chip>
					return element;
				})
			}
		</div>
	</div>
);

export default WidgetAssuntos;
