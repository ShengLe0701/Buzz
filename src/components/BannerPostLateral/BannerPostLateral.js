// @flow
'use strict';

import React from 'react';
import './BannerPostLateral.styl';

let BannerPostLateral = (props) => (

	<div className="BannerPostLateral">
		<div className="anuncio-image" onClick={props.onClick} style={{background: 'url('+props.fotoAnuncio+') no-repeat'}}></div>
	</div>
	);

export default BannerPostLateral;
