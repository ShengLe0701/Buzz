// @flow
'use strict';

import React, {
  Component
} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './PostCombo.styl';
import APIService from '../../services/APIService';

class PostCombo extends Component {

	constructor(props){
		super(props);
		this.state = {
			segmento: '',
			categoria: '',
			subcategoria: '',
			segmentoDisabled: true,
			categoriaDisabled: true,
			subcategoriaDisabled: true,
			segmentoList: null,
			categoriaList: null,
			subcategoriaList: null,
			returnSegmentoValue : [],
			returnCategoriaValue : [],
			returnSubcategoriaValue : [],

		}
	}

	componentWillMount(){
		APIService.fetchGetCategoryList(0).then((segmentoList) => {
			if(segmentoList && segmentoList.length > 0)
			{
				let returnSegmentoValue =[];
				if( segmentoList != null)
				{
					for( var i = 0 ; i < segmentoList.length ; i ++ )
					{
						returnSegmentoValue.push(
							<MenuItem key={i} value={segmentoList[i].idPagina} primaryText={segmentoList[i].titulo} />
						);        
					}
				}
				
				this.setState({
					segmentoList: segmentoList,
					segmentoDisabled: false,
					segmento: '',
					returnSegmentoValue : returnSegmentoValue,
				})
			}
		})
	}

	segmentoChange(e, value) {
		if( this.state.segmento != this.state.segmentoList[value].idPagina )
		{
			this.setState({
				segmento: this.state.segmentoList[value].idPagina,
			})
			
			APIService.fetchGetCategoryList(this.state.segmentoList[value].idPagina).then((categoriaList) => {
				if(categoriaList && categoriaList.length > 0)
				{
					let returnCategoriaValue =[];
					if( categoriaList != null)
					{
						for( var i = 0 ; i < categoriaList.length ; i ++ )
						{
							returnCategoriaValue.push(
								<MenuItem key={i} value={categoriaList[i].idPagina} primaryText={categoriaList[i].titulo} />
							);        
						}
					}


					console.log('segmentoChange')
					this.setState({
						categoriaList: categoriaList,
						categoriaDisabled: false,
						categoria: '',
						returnCategoriaValue : returnCategoriaValue,

						subcategoriaList : null,
						subcategoriaDisabled : true,
						subcategoria : '',
						returnSubcategoriaValue : [],

					})

					this.props.setIdPagina(-1)					
				}
			})
		}
	}

	segmentoCheck(){
		return true;
	}

	categoriaChange(e, value) {
		if( this.state.categoria != this.state.categoriaList[value].idPagina )
		{
			this.setState({
				categoria: this.state.categoriaList[value].idPagina,
			})
			
			APIService.fetchGetCategoryList(this.state.categoriaList[value].idPagina).then((subcategoriaList) => {
				if(subcategoriaList && subcategoriaList.length > 0)
				{
					let returnSubcategoriaValue =[];
					if( subcategoriaList != null)
					{
						for( var i = 0 ; i < subcategoriaList.length ; i ++ )
						{
							returnSubcategoriaValue.push(
								<MenuItem key={i} value={subcategoriaList[i].idPagina} primaryText={subcategoriaList[i].titulo} />
							);        
						}
					}

					console.log('categoriaChange')
					this.setState({
						subcategoriaList: subcategoriaList,
						subcategoriaDisabled: false,
						subcategoria : '',
						returnSubcategoriaValue : returnSubcategoriaValue,
					})

					this.props.setIdPagina(-1)
				}
			})
		}
	}

	categoriaCheck(){
		return true;
	}

	subCategoriaChange(e, value) {
		if( this.state.subcategoria != this.state.subcategoriaList[value].idPagina )
		{
			this.setState({
				subcategoria: this.state.subcategoriaList[value].idPagina,
			})

			this.props.setIdPagina(this.state.subcategoria)
		}
	}

	subCategoriaCheck(){
		return true;
	}
	

	render(){


		return(
				<div id='PostCombo'>
					<div className='post_title_div'>
						<p className='post_title'>Novo Post</p>
					</div>

					<div className='post_combo'>

						<SelectField className='SelectField'
							value={this.state.segmento}
							onChange={this.segmentoChange.bind(this)}
							onBlur={this.segmentoCheck.bind(this)}
							autoWidth={true}
							hintText='Segmento'
							disabled = {this.state.segmentoDisabled}
						>
							{this.state.returnSegmentoValue}
						</SelectField>

						<div className='post_categoria_div'>
						</div>

						<SelectField className='SelectField'
							value={this.state.categoria}
							onChange={this.categoriaChange.bind(this)}
							onBlur={this.categoriaCheck.bind(this)}
							autoWidth={true}
							hintText='Categoria'
							disabled = {this.state.categoriaDisabled}
						>
							{this.state.returnCategoriaValue}
						</SelectField>


						<div className='post_subcategoria_div'>
						</div>

						<SelectField className='SelectField'
							value={this.state.subcategoria}
							onChange={this.subCategoriaChange.bind(this)}
							onBlur={this.subCategoriaCheck.bind(this)}
							autoWidth={true}
							hintText='Sub Categoria'
							disabled = {this.state.subcategoriaDisabled}
						>
							{this.state.returnSubcategoriaValue}
						</SelectField>
					</div>
				</div>
        )
    }
}

function mapStateToProps(state) {
  const props = {
  }
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCombo)

