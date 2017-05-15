import {DID_FACEBOOK_LOGIN} from './../const';
import APIService from '../../services/APIService';

module.exports = function(facebookUser) {

  const response = APIService.userFacebookLogin(facebookUser);

  return (dispatch) => {
    response.then((data) => {
      dispatch({type: DID_FACEBOOK_LOGIN,
                response: data,
                facebookUser})
    })
  };
};
