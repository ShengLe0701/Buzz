import {FETCH_MELHORES} from './../const';
import APIService from '../../services/APIService';

module.exports = function(parameter) {
  let quantidade = 5;

  const melhoresPosts = APIService.fetchMelhoresPosts(quantidade);
  return (dispatch) => {
    melhoresPosts.then((data) => {
      dispatch({type: FETCH_MELHORES,
                posts: data,
                parameter})
    })
  };
};
