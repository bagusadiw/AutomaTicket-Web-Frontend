import { ArticleActionTypes } from '../config';

const INITIAL_STATE ={
	articleDetail: [],
	relatedArticle: [],
	isLoading: false,
	isError: false
}

const articleReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		
		case ArticleActionTypes.GET_ARTICLE_DETAIL_PENDING :
			return {
				...state,
				isLoading: true
			}

		case ArticleActionTypes.GET_ARTICLE_DETAIL_FULFILLED :
			return {
				...state,
				isLoading: false,
				articleDetail: action.payload.data,
			}

		case ArticleActionTypes.GET_ARTICLE_DETAIL_REJECTED :
			return {
				...state,
				isLoading: false,
				isError: true
			}	
		
		case ArticleActionTypes.GET_RELATED_ARTICLE_FULFILLED :
			return {
				...state,
				relatedArticle: action.payload.data,
			}
		default:
		return state;
	}
}

export default articleReducer;