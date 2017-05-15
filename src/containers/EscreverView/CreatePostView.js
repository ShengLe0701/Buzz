// @flow
'use strict';

import React, {
  Component
} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Editor, EditorState, RichUtils} from 'draft-js';
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import './CreatePostView.styl';
import AutorPostDetails  from '../../components/AutorPostDetails/AutorPostDetails';
import RichEditor from '../RichEditor'

class CreatePostView extends Component {

	constructor(props){
		super(props);
		this.state = {
			titulo: '',
			texto: '',
      tituloState: EditorState.createEmpty(),
      textoState: EditorState.createEmpty(),
		}
	}

	componentWillMount(){
		this.props.actions.forceNotHome();
    console.log(this.props.homeReducer.usuario)
	}

  handleKeyCommand =(command) => {
    const newState = RichUtils.handleKeyCommand(this.state.textoState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

	handleChangeTitulo = (text) => {
	 this.setState({tituloState: text});
  }

  handleChangeTexto = (text) => {

  }

	handleChange = (text) => {
	 this.setState({textoState: text});
  }

  publicar = () => {
    console.log('publicar')
    console.log(this.state)
  }

	render(){
    const {actions, homeReducer} = this.props
    const {tituloState} = this.state;
		return(
			<div className='CreatePostView'>
        <Paper className='content-holder'>
          <AutorPostDetails
            goProfile={actions.goProfile}
            hideSubheader={true}
            foto={homeReducer.usuario.foto}
            login={homeReducer.usuario.login}
            nome={homeReducer.usuario.nome}
            resumo={homeReducer.usuario.resumo}/>
          <RichEditor />
           {/* <Editor editorState={tituloState} onChange={this.handleChangeTitulo} /> */}
           <Divider />
           <FlatButton
             label='Publicar'
             primary={true}
             onTouchTap={this.publicar}/>
        </Paper>
			</div>
		)
	}
}

function mapStateToProps(state) {
  const props = {
    homeReducer: state.home
  }
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    forceNotHome: require('../../actions/home/forceNotHome.js'),
    goProfile: require('../../actions/home/goProfile.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostView)
