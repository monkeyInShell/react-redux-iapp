/**
 * Created by ink on 2018/4/9.
 */
import storeLocal from './store.local';
import storeProd from './store.prod';

let configureStore;
if (process.env.NODE_ENV === 'development') {
  configureStore = storeLocal;
} else {
  configureStore = storeProd;
}
module.exports = configureStore;
