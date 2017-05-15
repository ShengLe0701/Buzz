
// @flow
'use strict';

import React, {
  Component
} from 'react';
import './CardPostGrande.styl';
import ToggleDisplay from 'react-toggle-display';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import AvatarHolder from '../../images/avatar.jpg';
// import Share from 'material-ui/svg-icons/social/share';
// import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
// import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
// import IconButton from 'material-ui/IconButton'



// const style = {
//   smallIcon: {
//     width: 21,
//     height: 21
//   }
// }

class ImageHolder extends Component {

  render(){
    if(this.props.fotoDestaque){
      return(
        <div className="post-image" onClick={this.props.openPost} style={{background: 'url('+this.props.fotoDestaque+') no-repeat'}}></div>
      )
    } else {
      return(
        <div></div>
      )
    }
  }

}

class PostPesquisa extends Component {

  constructor(props){
    super(props)
    this.state = {
      imgURL : ''
    }
  }

  componentDidMount(){
    this.checkImageExists(this.props.post.fotoDestaque)
  }

  checkImageExists(url){
    var oImg= new Image;
    oImg.src = url;
    oImg.onload = () => {
      this.setState({
        imgURL: url
      })
    }
    oImg.onerror = () => {
      this.setState({
        imgURL: null
      })
    }
  }

  render(){
    const { post, goProfile, openPost } = this.props;
    return(
      <Paper className="CardPostGrande" zDepth={window.innerWidth < 800 ? 0 : 1}>
        <div className="content">
          <ToggleDisplay onClick={goProfile ? goProfile.bind(this, post.usuario) : undefined} hide={this.props.hideCredits} className="credits-holder">
            <Avatar size={30} src={post.fotoRedator ? post.fotoRedator : AvatarHolder}/>
            <div className="info">
              <span>{post.nomeRedator}</span>
              <span className="date">{post.dataPost}</span>
            </div>
          </ToggleDisplay>
          <ImageHolder
            fotoDestaque={this.state.imgURL}
            openPost={e => openPost(e, post.slug)}/>
          <div className="title-holder" onClick={e => openPost(e, post.slug)}>
            <span>{post.titulo}</span>
          </div>
          <div className="text-holder" onClick={e => openPost(e, post.slug)}>
            <p>{post.resumo}</p>
            <span>Leia mais...</span>
          </div>
          <div className="details-holder">
            {/*<div className="tags-holder">
              <span className="underline">#amor</span>
              <span className="underline">#domingolegal</span>
            </div>*/}
            {/* <div className="icons-holder">
              <IconButton disabled iconStyle={style.smallIcon}>
                <FavoriteBorder/>
              </IconButton>
              <IconButton disabled iconStyle={style.smallIcon}>
                <BookmarkBorder/>
              </IconButton>
              <IconButton disabled iconStyle={style.smallIcon}>
                <Share />
              </IconButton>
            </div> */}
          </div>
        </div>
      </Paper>
    )
  }
}

export default PostPesquisa;
