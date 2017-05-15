import {POSTVIEW_DIALOG} from './../const';

module.exports = function(post) {
  return { type: POSTVIEW_DIALOG, post };
};
