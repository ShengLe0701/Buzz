import {VERIFICAR_INDICACAO} from './../const';
import APIService from '../../services/APIService';

module.exports = function(email) {

  const response = APIService.verificaEmailCadastrado(email);

  return (dispatch) => {
    response.then((data) => {
      dispatch({type: VERIFICAR_INDICACAO,
                response: data})
    })
  };
};
