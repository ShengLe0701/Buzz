// @flow
'use strict';

import React, {
	Component
} from 'react';
import './CardPostRelacionado.styl';
import style from './style';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

class CardPostRelacionado extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	zIndex: 1
	  }
	}

	paperHoverEnter = () => {
    this.setState({
    	zIndex: 2
    });
	}

	paperHoverLeave = () => {
	  this.setState({
	  	zIndex: 1
	  });
	}

	render(){
		return(
			<Paper
				zDepth={this.state.zIndex}
				className="CardPostRelacionado"
				onMouseEnter={this.paperHoverEnter}
				onMouseLeave={this.paperHoverLeave}
				onClick={e => this.props.openPost(e, this.props.obj)}>
				<div className="img-holder" style={style.imgStyle}>
					{/* <img src={this.props.image ? this.props.image : '../images/buzz.jpg'} alt=""/> */}
					<div className="post-image" style={{background: 'url('+this.props.image+') no-repeat'}}></div>
				</div>
				<div className="legenda-holder">
					<div className="titulo">{this.props.titulo ? this.props.titulo : 'Título'}</div>
					<div className="autor">
						<div className="left">
							<Avatar size={32} src={this.props.fotoRedator} />
							<span>{this.props.nomeRedator}</span>
						</div>
						<div className="right">
							<FavoriteBorder color={'#F14A08'} />
							<span>{this.props.curtidas}</span>
						</div>
					</div>
				</div>
			</Paper>
		)
	}
}

export default CardPostRelacionado;
