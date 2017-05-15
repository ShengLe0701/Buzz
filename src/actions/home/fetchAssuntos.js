import {FETCH_ASSUNTOS} from './../const';
import APIService from '../../services/APIService';

module.exports = function() {

  const assuntos = APIService.fetchAssuntos();
  return (dispatch) => {
    assuntos.then((data) => {
      dispatch({type: FETCH_ASSUNTOS,
                assuntos: data
                })
    })
  };
};
