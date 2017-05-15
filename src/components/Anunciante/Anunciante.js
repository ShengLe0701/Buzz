// @flow
'use strict';

import React from 'react';
import './Anunciante.styl';

class Anunciante extends React.Component {
  render() {
    return (
      <div className="Anunciante">
        <h3>Anunciante: Veja as vantagens de fazer parte da rede BuzzPage</h3>
        <ul>
          <li>Receba crédito pelo conteúdo publicado e sua foto publicada no site (opcional)</li>
          <li>Passe a ter um perfil na BuzzPage para publicar seus trabalhos</li>
          <li>Parte do valor pago pela empresa anunciante é dividido entre os colaboradores da página</li>
          <li>Receba mensalmente parte dos valores pago pelos anunciante</li>
        </ul>
      </div>
    );
  }
}

export default Anunciante;
