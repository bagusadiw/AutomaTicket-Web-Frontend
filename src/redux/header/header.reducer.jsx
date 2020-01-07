import { HeaderActionTypes } from '../config';

const INITIAL_STATE ={
	userProfile:[],
	isLogged: false
}

const headerReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HeaderActionTypes.GET_ARTICLE_DETAIL_FULFILLED :
			return {
				...state,
				articleDetail: action.payload.data,
				articleAuthor: action.payload.data.articleAuthor,
				articleComments: action.payload.data.articleComments
			}

		case HeaderActionTypes.GET_RELATED_ARTICLE_FULFILLED :
			return {
				...state,
				relatedArticle: action.payload.data,
			}
		default:
		return state;
	}
}

export default headerReducer;