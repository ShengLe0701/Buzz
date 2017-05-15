/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

 // import { browserHistory } from 'react-router';

const initialState = {
    postPayload: {}
  };

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);

  switch(action.type) {

    case 'VERIFICAR_DIGITOS_SENHA': {

    } break;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
