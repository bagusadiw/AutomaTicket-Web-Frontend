import { CategoryActionTypes } from '../config';

const INITIAL_STATE ={
	categoryList:[],
	isLoadingCategories: false,
	isErrorCategories: false,
}

const categoryReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CategoryActionTypes.GET_CATEGORY_LIST_PENDING :
			return {
				...state,
				isLoadingCategories: true
			}

		case CategoryActionTypes.GET_CATEGORY_LIST_FULFILLED :
			return {
				...state,
				isLoadingCategories: false,
				categoryList: action.payload.data
			}

		case CategoryActionTypes.GET_CATEGORY_LIST_REJECTED :
			return {
				...state,
				isLoadingCategories: false,
				isErrorCategories: true
			}
			
		default:
		return state;
	}
}

export default categoryReducer;