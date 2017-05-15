import {STOP_LOADING} from './../const';

module.exports = function(parameter) {
  return { type: STOP_LOADING, parameter };
};
