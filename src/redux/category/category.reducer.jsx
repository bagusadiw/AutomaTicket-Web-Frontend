import { CategoryActionTypes } from '../config';

const INITIAL_STATE ={
	categoryList:[],
	eventsByCategory: [],
	isLoadingCategories: false,
	isErrorCategories: false,
	isLoadingEventsByCategory: false,
	isErrorEventsByCategory: false,
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

		case CategoryActionTypes.GET_CATEGORY_PAGE_PENDING :
			return {
				...state,
				isLoadingEventsByCategory: true
			}

		case CategoryActionTypes.GET_CATEGORY_PAGE_FULFILLED :
			return {
				...state,
				isLoadingEventsByCategory: false,
				eventsByCategory: action.payload.data
			}

		case CategoryActionTypes.GET_CATEGORY_PAGE_REJECTED :
			return {
				...state,
				isLoadingEventsByCategory: false,
				isErrorEventsByCategory: true
			}
			
		default:
		return state;
	}
}

export default categoryReducer;