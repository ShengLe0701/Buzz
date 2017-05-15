import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const reducers = require('../reducers');

module.exports = function(initialState) {
  // const store = createStoreWithMiddleware(reducers, initialState,
  // window.devToolsExtension && window.devToolsExtension())

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk)
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
