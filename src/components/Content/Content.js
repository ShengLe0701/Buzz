// @flow
'use strict';

import React, {
  Component
} from 'react';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames/bind';
import Helmet from 'react-helmet'
import Incentivo from '../Incentivo/Incentivo';
import Midia from '../Midia/Midia';
import Destaques from '../Destaques/Destaques';
import BannerContent from '../BannerContent/BannerContent';
import Ultimos from '../Ultimos/Ultimos';
import Apresentacao from '../Apresentacao/Apresentacao';
import Depoimentos from '../Depoimentos/Depoimentos';
import PessoasMock from '../../mockups/pessoas'

class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pagina: null
    }
  }

  loadMore = () => {
    console.log('loadMore')
    let pagina = this.state.pagina;
    if(pagina === null){
      this.setState({
        pagina: 0
      })
    } else {
      pagina = pagina+1;
      this.setState({
        pagina: pagina
      })
      this.props.actions.startLoading()
      this.props.actions.fetchUltimos(pagina)
    }
  }

  render(){
    const {actions, homeReducer} = this.props;
    const contentClass = classNames({
      'blur': homeReducer.isLoading && homeReducer.isSearching
    })
    return(
      <div id="Content" className={contentClass}>
        <Helmet title='BuzzPage' />
    		<Apresentacao
          isLoggedIn={homeReducer.isLoggedIn}/>
    		<Destaques
          isLoggedIn={homeReducer.isLoggedIn}
          startLoading={actions.startLoading}
    			posts={homeReducer.melhoresPosts}
    			openPost={actions.postviewDialog}/>
        <BannerContent
          closeReferral={actions.closeReferral}
          goProfile={actions.goProfile}
          username={homeReducer.username}
          isLoggedIn={homeReducer.isLoggedIn}
          showReferralBanner={homeReducer.showReferralBanner}
          />
    		<Ultimos
          isLoggedIn={homeReducer.isLoggedIn}
          isLoading={homeReducer.isLoading}
          startLoading={actions.startLoading}
    			ultimosPosts={homeReducer.ultimosPosts}
          goProfile={actions.goProfile}
          goCategoria={actions.goCategoria}
          loadMore={this.loadMore}
          buzzpagers={homeReducer.topBuzzpagers}
          assuntos={homeReducer.assuntos}
    			openPost={actions.postviewDialog}/>
    		<Midia
          isLoggedIn={homeReducer.isLoggedIn}
    			openRally={actions.rallyPdf}/>
        <Depoimentos
          isLoggedIn={homeReducer.isLoggedIn} />
    		<Incentivo
          isLoggedIn={homeReducer.isLoggedIn}
    			handleOpenCadastro={actions.cadastroDialog}/>
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
    fetchUltimos: require('../../actions/home/fetchUltimos.js'),
    fetchMelhores: require('../../actions/home/fetchMelhores.js'),
    cadastroDialog: require('../../actions/home/cadastroDialog.js'),
    postviewDialog: require('../../actions/home/postviewDialog.js'),
    closeReferral: require('../../actions/home/closeReferral.js'),
    startLoading: require('../../actions/home/startLoading.js'),
    goCategoria: require('../../actions/home/goCategoria.js'),
    goProfile: require('../../actions/home/goProfile.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
