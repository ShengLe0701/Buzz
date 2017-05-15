// @flow
'use strict';

import React from 'react';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import ToggleDisplay from 'react-toggle-display';
// import Favorite from 'material-ui/svg-icons/action/favorite';
import './AutorPostDetails.styl';

let AutorPostDetails = (props) => (

	<div id='AutorPostDetails'>
		<ToggleDisplay hide={props.hideSubheader}>
			<Subheader style={{paddingLeft: 0}}>Sobre o BuzzPager</Subheader>
		</ToggleDisplay>
		<div className='autor-info-holder'>
			<div className='autor-info' onClick={props.goProfile.bind(this, props.login)}>
				<Avatar size={60} src={props.foto} onClick={props.goProfile.bind(this, props.login)}/>
				<div className='info'>
					<span onClick={props.goProfile.bind(this, props.login)}>{props.nome}</span>
					<span>{props.resumo}</span>
				</div>
			</div>
		</div>
		<ToggleDisplay show={props.posts && props.posts.length > 0 ? true : false}>
		<Divider style={{marginTop: 25, marginBottom: 10}}/>
		<Subheader style={{paddingLeft: 0}}>Mais posts do autor</Subheader>
			<div className='posts-mesmo-autor'>
			{
				props.posts && props.posts.map((item) => {
					var element = (
						<div key={item.idTexto} className='post-details' onClick={e => props.loadNewPost(item.slug, e)} >
							<div className='left'>
								<span className='titulo'>{item.titulo}</span>
								{/* <div className='details'>
									<Favorite color={'#8F8F8F'} />
									<span>{props.curtidas}</span>
								</div> */}
							</div>
							<div className='post-image' style={{background: 'url('+item.fotoDestaque+') no-repeat'}}></div>
						</div>
						)
					return element;
				})
			}
			</div>
		</ToggleDisplay>
	</div>
	);

export default AutorPostDetails;
