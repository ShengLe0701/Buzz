import {FETCH_ULTIMOS} from './../const';
import APIService from '../../services/APIService';

module.exports = function(pagina) {
  let quantidade = 8
  let offset = pagina ? pagina*10 : 0;

  const ultimosPosts = APIService.fetchUltimosPosts(quantidade, offset);
  return (dispatch) => {
    ultimosPosts.then((data) => {
      dispatch({type: FETCH_ULTIMOS,
                posts: data})
    })
  };
};
