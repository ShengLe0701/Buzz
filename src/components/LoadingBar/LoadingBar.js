// @flow
'use strict';

import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import LinearProgress from 'material-ui/LinearProgress';
import style from './style';

const LoadingBar = (props) => (
  <ToggleDisplay show={props.isLoading} >
    <LinearProgress style={style.loadingBar} className="loadingBar" mode="indeterminate" />
  </ToggleDisplay>
)

export default LoadingBar;
