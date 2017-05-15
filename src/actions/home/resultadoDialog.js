import {RESULTADO_DIALOG, CLOSE_RESULTADO_DIALOG} from './../const';
import APIService from '../../services/APIService';

module.exports = function(params) {
  let quantidade = 10;
  let offset = 0;

  const resultadoPesquisa = APIService.fetchPesquisa(quantidade, offset, params);

  if(params != ''){
    return (dispatch) => {
      resultadoPesquisa.then((data) => {
        console.log('resultadoPesquisa then data')
        dispatch({type: RESULTADO_DIALOG,
          pesquisaPayload: data,
          params})
        })
    };
  } else {
    return (dispatch) => {
      dispatch({type: CLOSE_RESULTADO_DIALOG})
    };
  }
};
