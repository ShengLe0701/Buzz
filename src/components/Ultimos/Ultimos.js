// @flow
'use strict';

import React, {
  Component
} from 'react';
import { browserHistory } from 'react-router';
import { Sticky } from 'react-sticky';
import Waypoint from 'react-waypoint';
import CardPostGrande from '../../components/CardPostGrande/CardPostGrande';
import WidgetAssuntos from '../../components/WidgetAssuntos/WidgetAssuntos';
import WidgetPessoas from '../../components/WidgetPessoas/WidgetPessoas';
import ToggleDisplay from 'react-toggle-display';
import LoadingGif from '../../images/post-loading.gif';
import './Ultimos.styl';

class Ultimos extends Component {

  constructor(){
    super();
    this.state = {
      posts: []
    }
  }

  onPostClick = (e, slug) => {
    this.props.startLoading();
    browserHistory.push('/post/'+slug);
  }

  render() {
    const { ultimosPosts, isLoggedIn, subheader} = this.props;
    return (
      <ToggleDisplay show={isLoggedIn} className='Ultimos'>
        <div className='left'>
          {
            ultimosPosts.map((item) => {
              var element = (
                <CardPostGrande
                  post={item}
                  key={item.idTexto}
                  goProfile={this.props.goProfile}
                  openPost={this.onPostClick}/>
                );
              return element;
            })
          }
          <ToggleDisplay show={this.props.isLoading}>
            <img className='loading-gif' src={LoadingGif} alt=''/>
          </ToggleDisplay>
          <Waypoint onEnter={this.props.loadMore}/>
        </div>
        <div className='right'>
          <Sticky stickyClassName='fixed-widgets' >
            <ToggleDisplay show={this.props.assuntos ? true : false}>
              <WidgetAssuntos assuntos={this.props.assuntos ? this.props.assuntos : []} goCategoria={this.props.goCategoria}/>
            </ToggleDisplay>
            <ToggleDisplay show={this.props.buzzpagers ? true : false}>
              <WidgetPessoas titulo={'Top BuzzPagers'} pessoas={this.props.buzzpagers ? this.props.buzzpagers : []} goProfile={this.props.goProfile}/>
            </ToggleDisplay>
          </Sticky>
        </div>
      </ToggleDisplay>
    );
  }
}

export default Ultimos;
