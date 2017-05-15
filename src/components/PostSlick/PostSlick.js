// @flow
'use strict';

import React, {
  Component
} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import emptyImage from '../../images/empty_image.png';

import './PostSlick.styl';
import APIService from '../../services/APIService';


var Slider = require('react-slick');

class PostSlick extends Component {

	constructor(props){
		super(props);
		this.state = {
			SlickItemList:null,
		}
	}

	componentWillMount(){
		APIService.fetchGetPostList(66).then((SlickItemList) => {
			console.log(SlickItemList)
			this.setState({
				SlickItemList: SlickItemList,
			})
		})		
	}

	componentWillReceiveProps(nextProps) {
//		APIService.fetchGetPostList(66).then((this.props.homeReducer.usuario.idPessoa) => {
		APIService.fetchGetPostList(12).then((SlickItemList) => {
			console.log("SlickItemList")
			console.log(SlickItemList)
			this.setState({
				SlickItemList: SlickItemList,
			})
		})
	}

	render(){
		var settings = {
		  className: 'Slider',			
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			prevArrow : <SamplePrevArrow/>,
			nextArrow : <SampleNextArrow/>,
		};

		let returnValue =[];
		if( this.state.SlickItemList != null)
		{
			for( var i = 0 ; i < this.state.SlickItemList.length ; i ++ )
			{
				returnValue.push(
						<div className='slick_item' key={i}>
							<div className='slick_item_section1' >
								<img className='slick_item_iamge' src={emptyImage}  alt="Anuncie com Buzzpage"/>
							</div>
							<div className='slick_item_section2'>
								<div className='slick_item_title_div'>
									<p className='slick_item_title'>{this.state.SlickItemList[i].title}</p>
								</div>
								<div className='slick_item_page_div'>
									<p className='slick_item_page'>{this.state.SlickItemList[i].summary}</p>
								</div>
							</div>
						</div>
				);        
			}
		}

		return(
			<div id='PostSlick'>
				<div className='post_title_div'>
					<p className='post_title'>My Posts</p>
				</div>
				{   
					this.state.SlickItemList != null && (
						<Slider {...settings} className='slider'>
							{returnValue}
						</Slider>
					)
				}

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
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSlick)

var SampleNextArrow = React.createClass({
  render: function() {
    return <div {...this.props} style={{display: 'block'}}></div>;
  }
});

var SamplePrevArrow = React.createClass({
  render: function() {
    return (
      <div {...this.props} style={{display: 'block'}}></div>
    );
  }
});