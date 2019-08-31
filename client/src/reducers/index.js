import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import itemReducer from './itemReducer';
import searchReducer from './searchReducer';
import searchTermReducer from './searchTermReducer';
import movieDetailReducer from './movieDetailReducer';
import movieCommentsReducer from './movieCommentsReducer';
import postCommentReducer from './postCommentReducer';
import auth from './auth';
import galleryListReducer from './galleryListReducer';
import galleryBtnReducer from './galleryBtnReducer';

// Create combineReducers for different reducers
export default combineReducers({
  menu: menuReducer,
  item: itemReducer,
  searchTerm: searchReducer,
  searchResult: searchTermReducer,
  movieDetail: movieDetailReducer,
  movieComments: movieCommentsReducer,
  postComment: postCommentReducer,
  auth: auth,
  galleryList: galleryListReducer,
  galleryBtn: galleryBtnReducer
});
