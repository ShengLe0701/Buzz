import {CADASTRAR_CONTA} from './../const';
import APIService from '../../services/APIService';

module.exports = function(usuario) {

  const response = APIService.cadastrarConta(usuario);

  return (dispatch) => {
    response.then((data) => {
      dispatch({type: CADASTRAR_CONTA,
                response: data,
                usuario})
    })
  };
};
