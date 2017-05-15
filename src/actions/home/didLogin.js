import {DID_LOGIN} from './../const';

module.exports = function(usuario, credenciais) {
  return { type: DID_LOGIN, usuario, credenciais };
};
