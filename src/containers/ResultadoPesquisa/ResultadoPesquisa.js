// @flow
'use strict';

import React, {
  Component
} from 'react';
import _ from 'lodash';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router';
import Waypoint from 'react-waypoint';
import ToggleDisplay from 'react-toggle-display';
import './ResultadoPesquisa.styl';
import style from './style';
import Dialog from 'material-ui/Dialog';
import CardPostGrande from '../../components/CardPostGrande/CardPostGrande';
import WidgetPessoas from '../../components/WidgetPessoas/WidgetPessoas';
import CardPessoa from '../../components/CardPessoa/CardPessoa';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';
// import BuzzPageAnuciante from '../../images/br-vita.jpg';
// import BannerPesquisa from '../../components/BannerPesquisa/BannerPesquisa';
// import AcademiaAnuncio from '../images/academia-ad.jpg';

class Resultado extends Component {

  onPostClick = (e, slug) => {
    this.props.closePost();
    browserHistory.push('/post/'+slug);
  }

  render() {
      return (
        <div className='tabs-holder'>
          <Tabs tabItemContainerStyle={style.tabItemContainerStyle}>
            <Tab label='Posts' style={style.tabStyle}>
              <div className='paginas-holder'>
                <div className='posts'>
                  {(() => {
                    let posts = this.props.posts;
                    if(posts && posts.length > 0){
                      return posts.map((item) => {
                        var element = <CardPostGrande
                                        goProfile={this.props.goProfile}
                                        key={item.idTexto}
                                        openPost={this.onPostClick}
                                        post={item}/>;
                        return element;
                      })
                    } else {
                      var element = <Paper className='empty-posts'>Nenhum assunto encontrado. Seja o primeiro a escrever sobre este assunto!</Paper>
                      return element;
                    }
                    })()}
                    <ToggleDisplay show={this.props.isLoading}>
                      <CircularProgress />
                    </ToggleDisplay>
                    <ToggleDisplay show={this.props.posts.length >= 10 && this.props.pesquisaHasMore ? true : false}>
                      <Waypoint onEnter={this.props.loadMore}/>
                    </ToggleDisplay>
                </div>
                <ToggleDisplay show={this.props.buzzpagers.length > 0 ? true : false}>
                  <WidgetPessoas pessoas={_.slice(this.props.buzzpagers, 0, 6)} goProfile={this.props.goProfile}/>
                </ToggleDisplay>
              </div>
            </Tab>
            <Tab
              label='Pessoas' style={style.tabStyle}>
              <div className="users">
                <Paper>

                  {(() => {
                    let buzzpagers = this.props.buzzpagers
                    if(buzzpagers && buzzpagers.length > 0){
                      return buzzpagers.map((pessoa) => {
                        var element = <CardPessoa
                                        goProfile={this.props.goProfile}
                                        key={pessoa.id}
                                        nome={pessoa.nome}
                                        login={pessoa.login}
                                        resumo={pessoa.resumo}
                                        avatar={pessoa.foto}/>;
                        return element;
                      })
                    } else {
                      var element = <Paper className='empty-posts'>Nenhum buzzpager encontrado</Paper>
                      return element;
                    }
                    })()}
                </Paper>
              </div>
            </Tab>
          </Tabs>
        </div>
      )
  }
}


class ResultadoPesquisa extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoria: null,
      isOpen: true,
      pagina: null
    }
  }

  loadMore = () => {
    console.log('loadMore')
    let pagina = this.state.pagina;
    let ultimaPesquisa = this.props.ultimaPesquisa;
    // console.log(pagina)
    // console.log(this.props)
    if(pagina === null){
      this.setState({
        pagina: 0
      })
    } else {
      // console.log('pagina not null')
      pagina = pagina+1;
      // console.log(pagina)
      this.setState({
        pagina: pagina
      })
      this.props.startLoading()
      console.log(ultimaPesquisa)
      console.log(pagina)
      this.props.fetchMore(ultimaPesquisa, pagina)
    }
  }

  handleClose = () => {
    this.setState({
      isOpen: false
    })
  }

  inputChange = (event, value) => {
    this.props.onSearch(value)
  }

  openAnuncio = () => {
    console.log('openAnuncio')
    let link = 'http://www.brvita.com.br/';
    setTimeout(function() {
      window.open(link,'_blank');
    }, 150);
  }

  render() {
    const {payload, isOpen, handleClose, openPost, homeReducer} = this.props;
    return (
      <div>
        <Dialog
          className='ResultadoPesquisa'
          modal={false}
          title={payload ? payload.title : ''}
          open={isOpen}
          style={style.dialogStyle}
          overlayStyle={style.overlayStyle}
          contentStyle={window.innerWidth < 800 ? style.mobileContentStyle : style.contentStyle}
          bodyStyle={style.bodyStyle}
          autoScrollBodyContent={true}
          onRequestClose={handleClose}
          autoScrollBodyContent={true}>
          {/* <BannerPesquisa
            onClick={this.openAnuncio}
            fotoAnuncio={BuzzPageAnuciante}/> */}

          <div className='results-holder'>
            <Resultado
              goProfile={this.props.goProfile}
              loadMore={this.loadMore}
              pesquisaHasMore={homeReducer.pesquisaHasMore}
              posts={homeReducer.pesquisaPayload.posts}
              buzzpagers={payload.buzzpagers ? payload.buzzpagers : []}
              isLoading={this.props.isLoading}
              closePost={handleClose}
              openPost={openPost}/>
            {/* <AnuncioPesquisa /> */}
          </div>
          {/* <CircularProgress /> */}
        </Dialog>
      </div>
    );
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
    cleanPost: require('../../actions/home/cleanPost.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultadoPesquisa);
