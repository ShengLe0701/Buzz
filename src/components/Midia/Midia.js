// @flow
'use strict';

import React from 'react';
import './Midia.styl';
import ToggleDisplay from 'react-toggle-display';

const Midia = (props) => (
  <ToggleDisplay hide={props.isLoggedIn} className="Midia">
    <span className="page-title">BuzzPage na Mídia</span>
    <div className="video-holder">
      <iframe className="video" src="https://www.youtube.com/embed/wR24oiICYqo/controls=0"></iframe>
    </div>

  </ToggleDisplay>
)

export default Midia;
