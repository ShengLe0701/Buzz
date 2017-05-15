// @flow
'use strict';

import React, {
  Component
} from 'react';
import CardPostPequeno from '../CardPostPequeno/CardPostPequeno';
import CardPostMini from '../CardPostMini/CardPostMini';
import CardPostDestaque from '../CardPostDestaque/CardPostDestaque';
import { browserHistory } from 'react-router';
import './Destaques.styl';

class Destaques extends Component {

  constructor(){
    super();
    this.state = {
      posts: []
    }
  }

  onPostClick = (e, slug) => {
    console.log('onPostClick')
    console.log(slug)
    this.props.startLoading();
    browserHistory.push('/post/'+slug);
  }

  render() {
    let posts = this.props.posts;
    if(posts.length > 0){
      return (
        <div className="Destaques" style={this.props.isLoggedIn ? {marginTop: '135px'} : {}}>
          <span className="section-name">Destaques</span>
          <div className="left">
            <CardPostDestaque post={posts[0]} openPost={this.onPostClick}/>
            <div className="bottom">
              <CardPostMini post={posts[1]} openPost={this.onPostClick}/>
              <CardPostMini post={posts[2]} openPost={this.onPostClick}/>
            </div>
          </div>
          <div className="right">
            <CardPostPequeno post={posts[3]} openPost={this.onPostClick}/>
            <CardPostPequeno post={posts[4]} openPost={this.onPostClick}/>
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

export default Destaques;
