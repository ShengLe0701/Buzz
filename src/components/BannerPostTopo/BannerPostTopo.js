// @flow
'use strict'

import React from 'react';
import './BannerPostTopo.styl';

let BannerPostTopo = (props) => (

	<div className="BannerPostTopo">
		<div className="anuncio-image" onClick={props.onClick} style={{background: 'url('+props.fotoAnuncio+') no-repeat'}}></div>
	</div>
	);

export default BannerPostTopo;
