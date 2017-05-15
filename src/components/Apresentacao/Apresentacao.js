// @flow
'use strict';

import React from 'react';
import './Apresentacao.styl';
import ToggleDisplay from 'react-toggle-display'

let Apresentacao = (props) => (

	<ToggleDisplay show={props.isLoggedIn ? false : true} className="Apresentacao">
		<div className="explicacao-holder">
			<div className="explicacao">
				<img src="../../images/apresentacao1.png" alt=""/>
				<p>A BuzzPage é uma rede social colaborativa que remunera por posts!</p>
			</div>
			<div className="explicacao">
				<img src="../../images/apresentacao2.png" alt=""/>
				<p>Envie posts, vídeos ou imagens do seu assunto favorito.</p>
			</div>
			<div className="explicacao">
				<img src="../../images/apresentacao3.png" alt=""/>
				<p>Você recebe até <br /><span className="bold">R$ 5.000,00</span> pelo seu conteúdo!</p>
			</div>
		</div>
	</ToggleDisplay>
	);

export default Apresentacao;
