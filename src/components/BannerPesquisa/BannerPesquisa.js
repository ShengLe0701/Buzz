// @flow
'use strict';

import React from 'react';
import './BannerPesquisa.styl';

let BannerPesquisa = (props) => (

	<div className="BannerPesquisa">
		<div className="anuncio-image" onClick={props.onClick} style={{background: 'url('+props.fotoAnuncio+') no-repeat'}}></div>
	</div>
	);

export default BannerPesquisa;
