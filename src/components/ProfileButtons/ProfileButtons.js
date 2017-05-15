// @flow
'use strict';

import React, {
  Component
} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import './ProfileButtons.styl'
import Account from 'material-ui/svg-icons/action/account-box'
import Stats from 'material-ui/svg-icons/action/assessment'
import Dashboard from 'material-ui/svg-icons/action/dashboard'
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ToggleDisplay from 'react-toggle-display'
import AvatarHolder from '../../images/avatar.jpg'
import Create from 'material-ui/svg-icons/content/create'
// import Exit from 'material-ui/svg-icons/action/exit-to-app'
// import style from './style'
// import FlatButton from 'material-ui/FlatButton'

class ProfileButtons extends Component {

	constructor(props){
		super(props);
		this.state = {
			menuOpen: false
		}
	}

	handleTouchTap = (event) => {
    event.preventDefault();
    this.setState({
      menuOpen: true,
      anchorEl: event.currentTarget
    })
  };

	handleRequestClose = () => {
		this.setState({
			menuOpen: false
		})
	}

	handleLogout = () => {
		this.handleRequestClose()
    setTimeout(() => {
      this.props.actions.doLogout();
    }, 200);
	}

	handleDashboard = () => {
    this.handleRequestClose()
    this.props.goDashboard();
	}

	handleEscrever = () => {
    this.handleRequestClose()
//    this.props.actions.goDashboardEscrever()
    this.props.actions.goEscreva();
	}

  goProfile = () => {
    this.handleRequestClose()
    this.props.actions.goProfile(this.props.usuario.login)
  }

  goContato = () => {
    this.handleRequestClose()
    this.props.actions.goContato(this.props.usuario.login)
  }

  goAnuncie = () => {
    this.handleRequestClose()
    this.props.actions.goAnuncie(this.props.usuario.login)
  }

  goExtrato = () => {
    this.handleRequestClose()
    this.props.actions.goExtrato()
  }

  goQuemSomos = () => {
    this.handleRequestClose()
    this.props.actions.goQuemSomos(this.props.usuario.login)
  }

  goTermos = () => {
    this.handleRequestClose()
    this.props.actions.goTermos()
  }

  goFaq = () => {
    this.handleRequestClose()
    this.props.actions.goFaq()
  }

	render(){
		return(
			<ToggleDisplay show={this.props.show} className='ProfileButtons'>
        <div className='profile-holder' onTouchTap={this.handleTouchTap} >
          <Avatar className='profile-avatar' size={32} src={this.props.usuario.foto ? this.props.usuario.foto : AvatarHolder}/>
        </div>
				<Popover
					open={this.state.menuOpen}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}>
					 <Menu>
						 {/* <MenuItem onTouchTap={this.handleDashboard} primaryText='Salvos' leftIcon={<Bookmark />} /> */}
             <MenuItem onTouchTap={this.handleEscrever} primaryText='Escrever' leftIcon={<Create />} />
						 <MenuItem onTouchTap={this.goProfile} primaryText='Perfil' leftIcon={<Account />} />
						 <MenuItem onTouchTap={this.goExtrato} primaryText='Extratos' leftIcon={<Stats />} />
             <MenuItem onTouchTap={this.handleDashboard} primaryText='Área do BuzzPager' leftIcon={<Dashboard />} />
             <Divider/>
						 <MenuItem onTouchTap={this.goContato} primaryText='Contato' />
						 <MenuItem onTouchTap={this.goAnuncie} primaryText='Anuncie' />
						 <MenuItem onTouchTap={this.goQuemSomos} primaryText='Quem Somos' />
             <MenuItem onTouchTap={this.goFaq} primaryText='FAQ' />
						 <MenuItem onTouchTap={this.goTermos} primaryText='Termos de Uso' />
             <Divider/>
						 <MenuItem onTouchTap={this.handleLogout} primaryText='Sair' />
					 </Menu>
				 </Popover>
			</ToggleDisplay>
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
    doLogout: require('../../actions/home/doLogout.js'),
    goProfile: require('../../actions/home/goProfile.js'),
    goQuemSomos: require('../../actions/home/goQuemSomos.js'),
    goContato: require('../../actions/home/goContato.js'),
    goExtrato: require('../../actions/home/goExtrato.js'),
    goDashboardEscrever: require('../../actions/home/goDashboardEscrever.js'),
    goEscreva: require('../../actions/home/goEscreva.js'),
    goTermos: require('../../actions/home/goTermos.js'),
    goFaq: require('../../actions/home/goFaq.js'),
    goAnuncie: require('../../actions/home/goAnuncie.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileButtons)
