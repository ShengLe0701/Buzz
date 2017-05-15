// @flow
'use strict'

import React, {
  Component
} from 'react';
import style from './style'
import './BannerContent.styl';
import Close from 'material-ui/svg-icons/navigation/close';
import ToggleDisplay from 'react-toggle-display';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

class BannerContent extends Component {

	closeReferral = (e) => {
		e.preventDefault()
		this.props.closeReferral()
	}

	goProfile = (e) => {
		e.preventDefault()
		this.props.goProfile(this.props.username)
	}

	render(){
		return(
			<ToggleDisplay show={this.props.isLoggedIn && this.props.showReferralBanner}>
				<div className="BannerContent" style={{background: 'url(../../images/bg-convide.jpg) no-repeat'}}>
					<IconButton
						className="close-icon"
						iconStyle={{color: 'white'}}
						onClick={this.closeReferral}>
						<Close/>
					</IconButton>
					<div className="texto">
					<h3>Aumente sua renda!</h3>
					<p>Recomende a BuzzPage a seus amigos e ganhe <br/> participação nos lucros de cada um deles!</p>
					<FlatButton
						style={style.primary}
						onClick={this.goProfile}
						label="quero indicar meus amigos!"/>
					</div>
				</div>
			</ToggleDisplay>
		)
	}
}

export default BannerContent;
