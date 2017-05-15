// @flow
'use strict';

import React from 'react';
import './SocialShare.styl';
import Subheader from 'material-ui/Subheader';

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

let SocialShare = (props) => (
	<div className="SocialShare">
		<Subheader>Gostou? Compartilhe!</Subheader>
		<div className="buttons">
			<FacebookShareButton
  			url={'http://buzzpage.com.br/post/'+props.slug}
  			title={props.titulo ? props.titulo : ''}
  			className="share-button">
  			<FacebookIcon size={32} round />
			</FacebookShareButton>
			<TwitterShareButton
  			url={'http://buzzpage.com.br/post/'+props.slug}
  			title={props.titulo ? props.titulo : ''}
  			className="share-button">
  			<TwitterIcon size={32} round />
			</TwitterShareButton>
			<GooglePlusShareButton
  			url={'http://buzzpage.com.br/post/'+props.slug}
  			title={props.titulo ? props.titulo : ''}
  			className="share-button">
  			<GooglePlusIcon size={32} round />
			</GooglePlusShareButton>
			<LinkedinShareButton
  			url={'http://buzzpage.com.br/post/'+props.slug}
  			title={props.titulo ? props.titulo : ''}
  			className="share-button">
  			<LinkedinIcon size={32} round />
			</LinkedinShareButton>
		</div>
	</div>
);

export default SocialShare;
