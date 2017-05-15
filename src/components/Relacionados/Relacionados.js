// @flow
'use strict';

import React, {
  Component
} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router';
import CardPostRelacionado from '../../components/CardPostRelacionado/CardPostRelacionado';
import _ from 'lodash';
import './Relacionados.styl';

class Relacionados extends Component {


  onPostClick(slug){
    this.props.cleanPostView();
    this.props.actions.startLoading();
    browserHistory.push('/post/'+slug);
  }

  render() {
    let posts = this.props.posts;
    posts = _.drop(posts, 2);
    if(posts.length > 0){
      return (
        <div className="Relacionados">
          <span className="section-name">Relacionados</span>
          <div className="posts-upper">
          {
            posts.map((item) => {
              var element = (
                <CardPostRelacionado
                  key={item.idTexto}
                  titulo={item.titulo}
                  image={item.fotoDestaque}
                  openPost={this.onPostClick.bind(this, item.slug)}
                  fotoRedator={item.fotoRedator}
                  nomeRedator={item.nomeRedator}
                  curtidas={item.curtidas}
                  />
                )
              return element;
            })
          }
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

function mapStateToProps(state) {
  const props = {
    homeReducer: state.home
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    startLoading: require('../../actions/home/startLoading.js'),
    cleanPost: require('../../actions/home/cleanPost.js'),
    postviewDialog: require('../../actions/home/postviewDialog.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(Relacionados);
