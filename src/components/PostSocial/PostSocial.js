// @flow
'use strict';

import React from 'react';
import style from './style';
import './PostSocial.styl';
import IconButton from 'material-ui/IconButton';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Share from 'material-ui/svg-icons/social/share';
// import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import Comment from 'material-ui/svg-icons/communication/comment';
import ToggleDisplay from 'react-toggle-display'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'


import {
  ShareButtons,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

let PostSocial = (props) => (

	<div id='PostSocial'>
    <div className="left">
      <div className='like-holder'>
        <IconButton tooltip={'Gostou? Recomende!'} iconStyle={style.iconStyle} onTouchTap={props.toggleLike} >
          <ToggleDisplay show={props.curtiu ? false : true}>
            <FavoriteBorder color={'#F14A08'} />
          </ToggleDisplay>
          <ToggleDisplay show={props.curtiu ? true : false}>
            <Favorite color={'#F14A08'} />
          </ToggleDisplay>
        </IconButton>
        {props.curtidas}
      </div>
    </div>
    <div className="right">
    <IconButton tooltip={'Compartilhe em suas redes sociais'} onTouchTap={props.handleTouchTap}  iconStyle={style.iconStyle}>
      <Share />
      <Popover
         open={props.shareOpen}
         anchorEl={props.anchorEl}
         anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
         targetOrigin={{horizontal: 'left', vertical: 'top'}}
         onRequestClose={props.handleRequestClose}>
         <Menu>
           <FacebookShareButton
            url={'http://buzzpage.com.br/post/'+props.slug}
            title={props.titulo ? props.titulo : ''}>
            <MenuItem innerDivStyle={style.menuStyle} primaryText='Facebook' leftIcon={<FacebookIcon size={32} round />} />
          </FacebookShareButton>
           <TwitterShareButton
            url={'http://buzzpage.com.br/post/'+props.slug}
            title={props.titulo ? props.titulo : ''}>
            <MenuItem innerDivStyle={style.menuStyle} primaryText='Twitter' leftIcon={<TwitterIcon size={32} round />} />
          </TwitterShareButton>
           <GooglePlusShareButton
            url={'http://buzzpage.com.br/post/'+props.slug}
            title={props.titulo ? props.titulo : ''}>
            <MenuItem innerDivStyle={style.menuStyle} primaryText='Google+' leftIcon={<GooglePlusIcon size={32} round />} />
          </GooglePlusShareButton>
           <LinkedinShareButton
            url={'http://buzzpage.com.br/post/'+props.slug}
            title={props.titulo ? props.titulo : ''}>
            <MenuItem innerDivStyle={style.menuStyle} primaryText='LinkedIn' leftIcon={<LinkedinIcon size={32} round />} />
          </LinkedinShareButton>
         </Menu>
       </Popover>
    </IconButton>
      <div className="like-holder">
        <IconButton tooltip={'Comentários'} onTouchTap={props.scrollToComments} iconStyle={style.iconStyle}>
          <Comment color={'#F14A08'} />
        </IconButton>
        {props.comentariosLength}
      </div>
    </div>
	</div>
	);

export default PostSocial;
