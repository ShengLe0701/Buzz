import {FETCH_TOPBUZZPAGERS} from './../const';
import APIService from '../../services/APIService';

module.exports = function() {

  const buzzpagers = APIService.fetchTopBuzzpagers();
  return (dispatch) => {
    buzzpagers.then((data) => {
      dispatch({type: FETCH_TOPBUZZPAGERS,
                buzzpagers: data
                })
    })
  };
};
