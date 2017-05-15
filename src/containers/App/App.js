import React, {
  Component
} from 'react'
import {
  Router,
  Route,
  browserHistory
} from 'react-router';
import ReactGA from 'react-ga';
import LocalStorage from '../../services/LocalStorage'
import './App.styl';
import $ from 'jquery';
import 'es6-shim'
import '../../assets/Draft.css';
import '../../assets/editor.css';
import Home from '../Home/Home';
import CadastroView from '../CadastroView/CadastroView';
import CreatePostView from '../CreatePostView/CreatePostView';
import Extrato from '../../components/Extrato/Extrato';
import Content from '../../components/Content/Content';
import Contato from '../../components/Contato/Contato';
import Anuncie from '../../components/Anuncie/Anuncie';
import CategoriaView from '../../components/CategoriaView/CategoriaView';
import QuemSomos from '../../components/QuemSomos/QuemSomos';
import Localizacao from '../../components/Localizacao/Localizacao';
import PostView from '../../components/PostView/PostView';
import FAQ from '../../components/FAQ/FAQ';
import ProfileView from '../../components/ProfileView/ProfileView';
import APIService from '../../services/APIService';

class App extends Component {

  componentWillMount(){
    ReactGA.initialize('UA-77162104-1')
    this.checkGeoLocation()
    // LocalStorage.clearRegiao();
  }

  checkGeoLocation = () => {
    let geo = LocalStorage.getObject('geolocalizacao')
    if(!geo){
      this.askGeoPosition()
    }
  }

  askGeoPosition = () => {
    let askedRegiao = LocalStorage.getObject('askedRegiao')
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition((pos) => {
         let geo = {
           latitude: pos.coords.latitude,
           longitude: pos.coords.longitude
         }
         LocalStorage.setObject('geolocalizacao', geo)
       }, () => {
         if(!askedRegiao){
          //  browserHistory.push('/localizacao')
          this.getClientIP()
         } else {
           this.getClientIP()
         }
       })
    } else {
      if(!askedRegiao){
        // browserHistory.push('/localizacao')
        this.getClientIP()
      } else {
        this.getClientIP()
      }
    }
  }

  getClientIP = () => {
    APIService.getClientIP().then(ip => {
      let geo = {
        ipUsuario: ip
      }
      LocalStorage.setObject('geolocalizacao', geo)
    })
  }

  logPageView = () => {
    let page = window.location.pathname
    ReactGA.set({ page: page })
    ReactGA.pageview(page)
    if(page.split('/')[1] == 'referral'){
      console.log('é indicacao')
      let indicador = page.split('/')[2]
      LocalStorage.setObject('referral', indicador)
    }
    $('html, body').animate({
        scrollTop: 0
    }, 0)
  }

  render() {
    const routes = (
      <Route>
        <Route path='/localizacao' component={Localizacao}/>
        <Route component={Home}>
          <Route path='/' component={Content}/>
          <Route path='/referral/:email' component={Content}/>
          <Route path='/assunto/:assunto' component={CategoriaView}/>
          <Route path='/contato' component={Contato}/>
          <Route path='/anuncie' component={Anuncie}/>
          <Route path='/escreva' component={CreatePostView}/>
          <Route path='/extrato' component={Extrato}/>
          <Route path='/quemsomos' component={QuemSomos}/>
          <Route path='/faq' component={FAQ}/>
          <Route path='/post/:postSlug' component={PostView}/>
          <Route path='/post/index/:postSlug' component={PostView}/>
          <Route path='/@:profileName' component={ProfileView}/>
          <Route path='/cadastro_mobile' component={CadastroView}/>
          <Route path='*' component={Content}/>
        </Route>
      </Route>
    );
    return <Router history={browserHistory} routes={routes} onUpdate={this.logPageView}/>;
  }
}

export default App
