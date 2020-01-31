import { combineReducers } from 'redux';

import homeReducer from './home/home.reducer';
import categoryReducer from './category/category.reducer';

export default combineReducers({
	homeReducer,
	categoryReducer
})