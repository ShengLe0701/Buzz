// @flow
'use strict';

import React, {
  Component
} from 'react';
import { browserHistory } from 'react-router';
import '../styles/ResultadoPesquisa.styl';
import AcademiaAnuncio from '../images/academia-ad.jpg';
import BuzzPageAnuncio from '../images/default-ad.jpg';
import Dialog from 'material-ui/Dialog';
import PostGrande from '../components/PostGrande/PostGrande';
import BannerPesquisa from '../components/BannerPesquisa/BannerPesquisa';

const style = {
  contentStyle: {
    height: '100%',
    width: '100%',
    maxWidth: '1100px',
    top: '-75px',
    overflow: 'hidden'
  },
  mobileContentStyle: {
    top: '-75px',
    width: '100%',
    overflow: 'hidden'
  },
  overlayStyle: {
    top: '120px'
  },
  dialogStyle: {
    top: '115px'
  },
  bodyStyle : {
    backgroundColor: '#eeee',
    padding: 0
  }
};

class Resultado extends Component {

  onPostClick = (slug) => {
    console.log('onPostClick')
    console.log(this.props)
    this.props.closePost();
    browserHistory.push('/post/'+slug);
  }

  render() {
    if(this.props.payload.length > 0){
      return (
        <div id='PesquisaPostsHolder'>
          {
            this.props.payload.map((item) => {
              var element = <PostGrande openPost={this.onPostClick.bind(this, item.slug)} key={item.idTexto} obj={item}/>;
              return element;
            })
          }
        </div>
      )
    } else {
      return (
        <div>Nada encontrado. Seja o primeiro a escrever sobre este assunto!</div>
      )
    }
  }
}


class ResultadoPesquisa extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoria: null,
      isOpen: true
    }
  }

  handleClose = () => {
    this.setState({
      isOpen: false
    })
  }
  inputChange = (event, value) => {
    this.props.onSearch(value)
  }

  render() {
    return (
      <div>
        <Dialog
          className="ResultadoPesquisa"
          modal={true}
          title={this.props.payload.title}
          open={this.props.isOpen}
          style={style.dialogStyle}
          overlayStyle={style.overlayStyle}
          contentStyle={window.innerWidth < 800 ? style.mobileContentStyle : style.contentStyle}
          bodyStyle={style.bodyStyle}
          autoScrollBodyContent={true}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent={true} >
          <BannerPesquisa
            onClick={this.props.handleClose}
            fotoAnuncio={BuzzPageAnuncio}/>

          <div className="results-holder">
            <div className="posts">
              <Resultado
                payload={this.props.payload}
                closePost={this.props.handleClose}
                openPost={this.props.openPost}/>
            </div>
            {/* <AnuncioPesquisa /> */}
          </div>

        </Dialog>
      </div>
    );
  }
}

export default ResultadoPesquisa;
