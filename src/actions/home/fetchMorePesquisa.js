import {FETCH_MORE_PESQUISA} from './../const';
import APIService from '../../services/APIService';

module.exports = function(ultimaPesquisa, pagina) {
  let quantidade = 10;
  let offset = pagina*10;

  const resultadoPesquisa = APIService.fetchPesquisa(quantidade, offset, ultimaPesquisa);

  return (dispatch) => {
    resultadoPesquisa.then((data) => {
      console.log('resultadoPesquisa then data')
      dispatch({type: FETCH_MORE_PESQUISA,
        pesquisaPayload: data,
        ultimaPesquisa})
      })
  };
};
