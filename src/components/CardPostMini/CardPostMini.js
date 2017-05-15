// @flow
'use strict';

import React, {
	Component
} from 'react';
import './CardPostMini.styl';
import style from './style';
import Paper from 'material-ui/Paper'

class CardPostMini extends Component {

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
		const { post } = this.props;
		return(
			<Paper
				zDepth={this.state.zIndex}
				className="CardPostMini"
				onMouseEnter={this.paperHoverEnter}
				onMouseLeave={this.paperHoverLeave}
				onClick={e => this.props.openPost(e, post.slug)}>
				<div className="img-holder" style={style.imgStyle}>
					<div className="post-image" style={{background: 'url('+post.fotoDestaque+') no-repeat'}}></div>
				</div>
				<div className="legenda-holder">
					<div className="titulo">{post.titulo ? post.titulo : 'Título'}</div>
					<div className="tags">
						{/*<span className="underline">#amor</span>
						<span className="underline">#domingolegal</span>*/}
					</div>
				</div>
			</Paper>
		)
	}
}

export default CardPostMini;
