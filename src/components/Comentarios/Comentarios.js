// @flow
'use strict';

import React, {
  Component
} from 'react';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import ToggleDisplay from 'react-toggle-display'
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Delete from 'material-ui/svg-icons/action/delete';
import AvatarHolder from '../../images/avatar.jpg';
import './Comentarios.styl';
import style from './style'

class Comentarios extends Component {

	constructor(props) {
		super(props)
		this.state = {
			comentario: '',
			alert: false,
			alertMessage: ''
		}
	}

	handleComentarioChange = (e, valor) => {
		this.setState({
			comentario: valor
		})
	}

  goPerfil = (idPessoa) => {
    this.props.goProfile(idPessoa)
  }

  keyboardListener = (flag) => {
    if(flag){
      window.onkeydown = event => {
        if (event.keyCode === 13) {
          this.handleEnviarComentario();
        }
      }
    } else {
      window.onkeydown = null;
    }
  }

	handleEnviarComentario = () => {
		if(this.state.comentario != ''){
			if(this.props.idPessoa){
				let comentario = {
					idConteudo: this.props.idPost,
					idPessoa: this.props.usuario.idPessoa,
					textoComentario: this.state.comentario,
          dataComentario: new Date()
				}
				this.props.enviarComentario(comentario)
				this.setState({
					comentario: ''
				})
			} else {
				this.props.showAlert('Login necessário para enviar comentário')
			}
		} else {
      this.props.showAlert('Escreva algo antes de enviar!')
    }
	}

  fixDate = (date) => {
    let fixedDate = new Date(date)
    return fixedDate.toLocaleString()
  }

	render(){
		return(
			<div id='Comentarios'>
					<div className='post-comment-holder'>
						<ToggleDisplay show={this.props.idPessoa ? true : false}>
							<div className='user-details'>
								<Avatar size={35} src={this.props.fotoUsuario ? this.props.fotoUsuario : AvatarHolder} />
								<span className='nome'>{this.props.nomeUsuario}</span>
							</div>
						</ToggleDisplay>
						<div className='input-icon'>
							<TextField
                onFocus={() => this.keyboardListener(true)}
                onBlur={() => this.keyboardListener(false)}
								value={this.state.comentario}
								style={style.commentInput}
								onChange={this.handleComentarioChange}
								hintText={this.props.comentarios.length == 0 ? 'Seja o primeiro a escrever um comentário' : 'Deixe seu comentário!'}
								fullWidth={true}/>
                <span className="counter">{this.state.comentario.length}</span>
						</div>
						<ToggleDisplay show={this.state.comentario.length > 0 ? true : false}>
							<FlatButton onTouchTap={this.handleEnviarComentario} style={style.button} labelStyle={style.labelStyle} label='enviar' primary={true}/>
						</ToggleDisplay>
					</div>
          <ToggleDisplay show={this.props.comentarios.length > 0 ? true : false}>
            <Subheader style={style.commentHeader}>Comentários - {this.props.comentarios.length}</Subheader>
          </ToggleDisplay>
					<div className='comentarios'>
					{
						this.props.comentarios.map((item) => {
							var element = (
								<div className='posts-holder' key={item.idComentario}>
									<div className='user-details' onTouchTap={this.goPerfil.bind(this, item.usuario)}>
										<Avatar size={36} src={item.fotoPerfil ? item.fotoPerfil : AvatarHolder}/>
                    <div className="info">
                      <span className='nome'>{item.nome}</span>
                      <span className='data'>{this.fixDate(item.dataComentario)}</span>
                    </div>
									</div>
									<p className='comentario-holder'>{item.textoComentario}</p>
									<ToggleDisplay show={item.idPessoa == this.props.idPessoa ? true : false}>
										<IconButton onTouchTap={e => this.props.deletarComentario(item.idComentario, e)} className='delete-icon' tooltip='Excluir'>
											<Delete color={'#727272'}/>
										</IconButton>
									</ToggleDisplay>
								</div>
							)
							return element;
						})
					}
					</div>
			</div>
		)
	}
}

export default Comentarios;
