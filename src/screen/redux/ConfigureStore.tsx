import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import BlogReducer from '../blog/redux/BlogReducer';
import HomeReducer from '../home/redux/HomeReducer';
import themeReducer from './themeReducer';
const rootReducer = combineReducers({
  themeReducer,
  BlogReducer,
  HomeReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export type RootState = ReturnType<typeof rootReducer>;
export default configureStore;
