import {FETCH_POSTS_CATEGORIA} from './../const';
import APIService from '../../services/APIService';

module.exports = function(slug) {
  let quantidade = 10;
  let offset = 0;
  const assuntos = APIService.fetchPostsCategoria(slug, quantidade, offset);
  return (dispatch) => {
    assuntos.then((data) => {
      dispatch({type: FETCH_POSTS_CATEGORIA,
                assuntos: data
                })
    })
  };
};
