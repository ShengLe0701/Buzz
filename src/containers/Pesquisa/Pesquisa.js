// @flow
'use strict';

import React, {
  Component
} from 'react';
import './Pesquisa.styl';

//Component Imports
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import Close from 'material-ui/svg-icons/navigation/close';

const whiteStyle = {
  inputStyle: {
    width: '215px',
    color: '#727272'
  },
  hintStyle: {
    color: '#727272'
  },
  iconStyle: {
    color: '#727272',
    paddingLeft: '0'
  }
}

const transparentStyle = {
  inputStyle: {
    width: '215px',
    color: '#212121'
  },
  hintStyle: {
    color: '#fff'
  },
  iconStyle: {
    color: '#fff',
    paddingLeft: '0'
  }
}

class PesquisaButton extends Component {

  handleClick = () => {
    if(this.props.searchValue != ''){
      this.props.limparPesquisa();
    }
  }

  render(){
    const { headerTheme, searchValue} = this.props

    return(
      <IconButton
        className="search-icon"
        iconStyle={headerTheme.tipo == 'white' ? whiteStyle.iconStyle : transparentStyle.iconStyle}
        onClick={this.handleClick}>
        {searchValue != '' ? <Close/> : <Search/>}
      </IconButton>
    )
  }
}

// Init a timeout variable to be used below
var timeout = null;

class Pesquisa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pesquisa: ''
    }
  }

  limparPesquisa = () => {
    this.setState({
      pesquisa: ''
    })
    this.props.handleClose();
  }

  inputChange = (event, value) => {
    this.setState({
      pesquisa: value
    })

    clearTimeout(timeout);

    timeout = setTimeout(() => {
        this.props.onSearch(value)
    }, 200);

  }

  retomarPesquisa = () => {
    if(this.state.pesquisa != '' && this.state.pesquisa.length >= 3){
      this.props.openPesquisa();
    }
  }

  render() {
    const {headerTheme} = this.props;
    return (
      <div className="Pesquisa">
        <PesquisaButton
          limparPesquisa={this.limparPesquisa}
          searchValue={this.state.pesquisa}
          headerTheme={headerTheme}/>
        <TextField
          value={this.state.pesquisa}
          className="input-pesquisa"
          style={headerTheme.tipo == 'white' ? whiteStyle.inputStyle : transparentStyle.inputStyle}
          hintStyle={headerTheme.tipo == 'white' ? whiteStyle.hintStyle : transparentStyle.hintStyle}
          hintText="Busque seu assunto favorito"
          onFocus={this.retomarPesquisa}
          onChange={this.inputChange}/>
      </div>
    );
  }
}

export default Pesquisa;
