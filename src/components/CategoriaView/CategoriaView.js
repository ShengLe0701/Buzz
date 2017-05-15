// @flow
'use strict';

import React, {
  Component
} from 'react';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Sticky, StickyContainer } from 'react-sticky';
import classNames from 'classnames/bind';
import Ultimos from '../Ultimos/Ultimos';
import AnuncioTopoDefault from '../../images/default-ad.jpg';
import BannerPostTopo from '../BannerPostTopo/BannerPostTopo';
import './CategoriaView.styl';

class CategoriaView extends Component {

  componentDidMount(){
    // console.log('CategoriaView didMount')
    let slug = this.props.params.assunto
    this.props.actions.fetchPostsCategoria(slug)
  }

  render(){
    const {actions, homeReducer} = this.props;
    const contentClass = classNames({
      'blur': homeReducer.isLoading && homeReducer.isSearching
    })
    return(
        <div id="CategoriaView" className={contentClass}>
          <BannerPostTopo
          fotoAnuncio={AnuncioTopoDefault}/>
          <Sticky stickyClassName='fixed-section'>
            <div className="categoria-name">
              <span className="section-name">{homeReducer.categoriaNome ? homeReducer.categoriaNome : ''}</span>
            </div>
          </Sticky>
      		<Ultimos
            subheader={homeReducer.categoriaNome}
            isLoggedIn={homeReducer.isLoggedIn}
            startLoading={actions.startLoading}
            isLoading={homeReducer.isLoading}
      			ultimosPosts={homeReducer.categoriaPayload}
            goProfile={actions.goProfile}
            goCategoria={actions.goCategoria}
      			openPost={actions.postviewDialog}/>
      	</div>
    )
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
    fetchMelhores: require('../../actions/home/fetchMelhores.js'),
    fetchPostsCategoria: require('../../actions/home/fetchPostsCategoria.js'),
    postviewDialog: require('../../actions/home/postviewDialog.js'),
    startLoading: require('../../actions/home/startLoading.js'),
    goCategoria: require('../../actions/home/goCategoria.js'),
    goProfile: require('../../actions/home/goProfile.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaView);
