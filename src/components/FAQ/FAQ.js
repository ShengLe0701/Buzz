// @flow
'use strict';

import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Helmet from 'react-helmet'
import './FAQ.styl';
import FAQArquivo from '../../data/faq';


class FAQ extends Component {

	constructor(props) {
		super(props);
		let arrayExpanded = []
		for(let x = 0; x <= FAQArquivo.length; x++){
			arrayExpanded[x] = false
		}
		this.state = {
			expanded: arrayExpanded
		};
	 }

	 componentWillMount(){
 		this.props.actions.forceNotHome();
 	}

	 handleExpandChange = (id, state) => {
		 let newArray = this.state.expanded
		 newArray[id] = state
		 this.setState({
			 expanded: newArray
		 });
	 };

	 handleToggle = (event, toggle) => {
		 this.setState({expanded: toggle});
	 };

	 handleExpand = () => {
		 this.setState({expanded: true});
	 };

	 handleReduce = () => {
		 this.setState({expanded: false});
	 };

	render(){
		return(
			<div className="FAQ">
				<Helmet title='Perguntas Frequentes' />
				<div className="content-holder">
					{
						FAQArquivo.map((faq)=> {
							let element = (
								<Card key={faq.id} expanded={this.state.expanded[faq.id]} onExpandChange={this.handleExpandChange.bind(this, faq.id)}>
									<CardHeader
										title={faq.pergunta}
										actAsExpander={true}
										showExpandableButton={true}/>
									<CardText expandable={true}>
										{faq.resposta}
									</CardText>
								</Card>
							)
							return element
						})
					}
					<Card>
						<CardHeader
							title="10 informações importantes sobre o pagamento de posts:"
							actAsExpander={true}
							showExpandableButton={true}/>
						<CardText expandable={true}>
							<p>1.	Cada post recebe até R$ 5.000,00</p>
							<p>2.	Um usuário (buzzpager) pode ter quantos posts desejar</p>
							<p>3.	Cada post deve ser associado a um assunto.</p>
							<p>4.	Não há garantias que o post receberá pagamentos caso não haja um anunciante para o assunto ao qual o post estiver associado.</p>
							<p>5.	Parte do valor pago pelo anunciante é rateado entre os posts do assunto</p>
							<p>6.	O valor mínimo para solicitar saque é R$ 100,00 (cem Reais)</p>
							<p>7.	Os pagamentos são pagos até o dia 15 do mês subsequente à solicitação do saque</p>
							<p>8.	Os valores não recebidos no mês serão acumulados para o mês seguinte</p>
							<p>9.	Copias e plágios não serão remunerados</p>
						</CardText>
					</Card>
					<Card>
						<CardHeader
							title="Critérios essenciais para elegibilidade de remuneração"
							actAsExpander={true}
							showExpandableButton={true}/>
						<CardText expandable={true}>
							<p>1.	O Conteúdo não pode ser copiado de outro site (plágio)</p>
							<p>2.	O texto não pode conter imagens que ferem direitos autorais.</p>
							<p>3.Os conteúdos (textos,imagens ou vídeos) não podem conter violência ou pornografia.</p>
						</CardText>
					</Card>
					<Card>
						<CardHeader
							title="Posso colocar qualquer tipo de texto, imagem, vídeo e áudio?"
							actAsExpander={true}
							showExpandableButton={true}/>
						<CardText expandable={true}>
				<p>Sim. Porém seguimos o que é previsto em lei:</p>
    		<p><b>Textos</b></p>
        <p>• Se você deseja utilizar textos que não te pertencem, não o copie  integralmente, utilize pequenos trechos e adicione seus comentários e críticas. Indique sempre o nome do autor e o link da fonte original.</p>
      	<p>• Caso você não saiba quem é o autor do texto, não diga que o texto é seu. Informe ao leitor que você desconhece o autor.</p>
        <p>• A manifestação do pensamento é livre, como é definido em nossa Constituição Federal, mas não é permitido desvirtuar o conteúdo original. Em outras palavras, faça suas críticas ao texto, mas cuidado para não distorcer a posição do autor.</p>
        <p>• Você é o responsável legal pela publicação de seus conteúdos.</p>
				<p><b>Músicas</b></p>
				<p>• Não compartilhe arquivos de músicas para download sem a autorização por escrito do autor ou titular dos direitos autorais. </p>
				<p>• A utilização de música como trilha sonora em um vídeo só pode ser feita mediante autorização do seu autor ou titular.</p>
				<p>• Se você quer disponibilizar um arquivo de música, opte pelas obras musicais de domínio público, sempre lembrando de citar o autor e o nome da música. Relembrando que é ilegal a disponibilização e compartilhamento de arquivos musicais sem prévia autorização. Lembre-se que o compartilhamento de arquivos de música na internet é considerado execução pública de obra musical.</p>
				<p><b>Imagens e Fotografias</b></p>
				<p>• Para postagem e compartilhamento de imagens e fotografias: se quer utilizá-las, solicite autorização ao seu autor ou titular e, após autorizado, indicar o nome do autor da imagem ou fotografia.</p>
				<p>• Utilize imagens de bancos de imagens. Nesses bancos, o autor ou titular da imagem já autorizou o seu uso. </p>
				<p>• O Google Images não é um banco de imagens cuja reprodução já está autorizada, a opção dos bancos de imagens citada acima é a mais segura. </p>
				<p>• A fotografia de pessoas é uma obra intelectual com dois direitos importantes: do fotógrafo (direitos autorais) que é o autor da foto, e da pessoa retratada (direitos de imagem), sendo que a autorização para uso deve ser solicitada.  </p>
				<p><b>Vídeos</b></p>
				<p>• Embedar ou incorporar vídeos em programas como YouTube não é crime. É ilegal disponibilizar vídeos que não sejam de sua própria autoria ou cuja utilização não tenha sido formalmente autorizada.</p>
				<p>• Compartilhar vídeos do YouTube não é crime, pois o que é disponibilizado é o link que dá acesso ao vídeo, e não o vídeo em si. </p>
				<p>• O compartilhamento de vídeos do YouTube também não outorga direito ao Ecad de cobrar pela execução pública do vídeo.</p>

						</CardText>
					</Card>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  const props = {
    homeReducer: state.home
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    forceNotHome: require('../../actions/home/forceNotHome.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(FAQ);
