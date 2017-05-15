// @flow
'use strict';

import React, {
  Component
} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import './MediumEditor.styl';


class MediumEditor extends Component {

	constructor(props){
		super(props);
		this.state = {
		}
	}

	componentWillMount(){
        const script = document.createElement("script");
        script.src = "../../javascripts/medium-editor-export.js";
        script.async = true;
        document.body.appendChild(script);
	}

    componentDidMount() {
        if (typeof this.props.getExposedMethod === 'function') {
        this.props.getExposedMethod(this.getMediumEditor.bind(this));
        }
    }    

    getMediumEditor(type) {
        if( type == 'title' ) {
            return document.getElementById("mediumeditor1").innerHTML;
        } else if( type == 'body' ) {
            return document.getElementById("mediumeditor").innerHTML;
        }

        return "";
    }

    render(){
        return(
            <div id="container">  
                <div id='mediumeditor1' className="editable1">
                    <h1>My Story</h1>
                </div>

                <div id='mediumeditor' className="editable">
                    <p>Hello. I am ...</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(MediumEditor)
