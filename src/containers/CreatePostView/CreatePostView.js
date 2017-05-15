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

import ToggleDisplay from 'react-toggle-display';

import style from './style';
import './CreatePostView.styl';
import MediumEditor  from '../../components/MediumEditor/MediumEditor';

import Avatar from 'material-ui/Avatar';
import AvatarHolder from '../../images/avatar.jpg';

import PostSlick from '../../components/PostSlick/PostSlick';
import PostCombo from '../../components/PostCombo/PostCombo';

import APIService from '../../services/APIService';



class CreatePostView extends Component {

	constructor(props){
      super(props);
      this.state = {
        titulo: '',
        texto: '',
        tituloState: EditorState.createEmpty(),
        textoState: EditorState.createEmpty(),
        idPagina: -1,
      }
	}

	componentWillMount(){
      this.props.actions.forceNotHome();
      console.log(this.props.homeReducer.usuario)

      const script = document.createElement("script");
      script.src = "../../javascripts/imageurl2base64.js";
      script.async = true;
      document.body.appendChild(script);
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

  setIdPagina(idPagina) {
	   this.setState({idPagina: idPagina});
  }

  receiveExposedMethod(getMediumEditor) {
    this.getMediumEditor = getMediumEditor;
  }
  getMediumEditor(type){}

  onSave = () => {
      // console.log('onSave')
      // var data = this.getMediumEditor('title');
      // alert('data:' + data);
      // data = this.getMediumEditor('body');
      // alert('data:' + data);

      var postData={}
      if( this.state.idPagina == -1){
          alert("Please select the category for the story");
          return;
      }
      postData.idPagina = this.state.idPagina

      postData.titulo = this.getMediumEditor('title')
      postData.texto = this.getMediumEditor('body');
      postData.idRedatorPrincipal = this.props.homeReducer.usuario.idPessoa

      var el = document.createElement( 'html' );
      el.innerHTML = "<html><head></head><body>" + postData.texto + "</body></html>";
      var imageObjects = el.getElementsByTagName("img");
      var base64 = "";
      if( imageObjects != null && imageObjects.length > 0 ) {
          base64 = imageObjects[0].src;
      }
      
      window.getBase64FromImageUrl("../../images/avatar.jpg", (base64)=>{
      alert("base64:" + base64);
      console.log("getBase64FromImageUrl");
      console.log(base64);
          
          var imageData = {}
          imageData.image = base64
          imageData.formato = 'jpg'

          APIService.fetchUploadImageBase64(imageData).then((returnData) => {
              console.log("fetchUploadImageBase64")
              console.log(returnData)

              if( returnData.chave == 1 ) {
                  postData.fotoDestaque = returnData.foto
                
                  APIService.fetchAddPost(postData).then((returnData) => {
                    console.log(returnData)
                  })
              }
              else {
                  alert(returnData.mensagem);
//                  alert( returnData.valor);
              }
          })
       });

  }

  onUpdate = (postID) => {
      console.log('onUpdate')

      var postData={}
      postData.idTexto = postID

      if( idPagina == -1){
          Alert("Please select the category for the story");
          return;
      }
      postData.idPagina = idPagina

      postData.idRedatorPrincipal = homeReducer.usuario.idPessoa
      postData.titulo = "The title user typed"
      postData.texto = "the text user typed"
      postData.fotoDestaque = "the photo URL user uploaded"
      APIService.fetchImageURLToBase64(postData.fotoDestaque).then((returnData) => {
        console.log(returnData)
      })

      APIService.fetchAddPost(postData).then((returnData) => {
        console.log(returnData)
      })
  }
  

	render(){
    const {actions, homeReducer} = this.props
    const {tituloState} = this.state;

		return(
			<div className='CreatePostView'>
        <Paper className='content-holder'>

          <div className='autor-info-holder'>
              <div className='autor-info' onClick={actions.goProfile.bind(this, homeReducer.usuario.login)}>
                  <Avatar size={60} src={homeReducer.usuario.foto?homeReducer.usuario.foto:AvatarHolder} onClick={actions.goProfile.bind(this, homeReducer.usuario.login)}/>
                  <div className='info'>
                      <span className='name-info' onClick={actions.goProfile.bind(this, homeReducer.usuario.login)}>{homeReducer.usuario.nome}</span>
                      <span>{homeReducer.usuario.resumo?homeReducer.usuario.resumo:'Welcome to you'}</span>
                  </div>
              </div>
          </div>

          <PostSlick/>

          <PostCombo setIdPagina={this.setIdPagina.bind(this)}/>

          <MediumEditor getExposedMethod={this.receiveExposedMethod.bind(this)}/>
          
          <FlatButton label='Save'
            style={style.btnSave}
            backgroundColor='#F14A08'
            hoverColor='#F14A48'
            onClick={this.onSave} />

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
  const actionMap = { actions:bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostView)

