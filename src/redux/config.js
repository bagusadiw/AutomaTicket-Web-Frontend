export const ArticleActionTypes = {
	GET_ARTICLE_DETAIL: 'GET_ARTICLE_DETAIL',
	GET_ARTICLE_DETAIL_PENDING: 'GET_ARTICLE_DETAIL_PENDING',
	GET_ARTICLE_DETAIL_FULFILLED: 'GET_ARTICLE_DETAIL_FULFILLED',
	GET_ARTICLE_DETAIL_REJECTED: 'GET_ARTICLE_DETAIL_REJECTED',

	GET_RELATED_ARTICLE: 'GET_RELATED_ARTICLE',
	GET_RELATED_ARTICLE_PENDING: 'GET_RELATED_ARTICLE_PENDING',
	GET_RELATED_ARTICLE_FULFILLED: 'GET_RELATED_ARTICLE_FULFILLED',
	GET_RELATED_ARTICLE_REJECTED: 'GET_RELATED_ARTICLE_REJECTED',
}

export const HomeActionTypes = {
	GET_EVENTS_FEED : 'GET_EVENTS_FEED',
	GET_EVENTS_FEED_PENDING : 'GET_EVENTS_FEED_PENDING',
	GET_EVENTS_FEED_FULFILLED : 'GET_EVENTS_FEED_FULFILLED',
	GET_EVENTS_FEED_REJECTED : 'GET_EVENTS_FEED_REJECTED',

	GET_TODAY_EVENTS_FEED : 'GET_TODAY_EVENTS_FEED',
	GET_TODAY_EVENTS_FEED_PENDING : 'GET_TODAY_EVENTS_FEED_PENDING',
	GET_TODAY_EVENTS_FEED_FULFILLED : 'GET_TODAY_EVENTS_FEED_FULFILLED',
	GET_TODAY_EVENTS_FEED_REJECTED : 'GET_TODAY_EVENTS_FEED_REJECTED',

	GET_UPCOMING_EVENTS_FEED : 'GET_UPCOMING_EVENTS_FEED',
	GET_UPCOMING_EVENTS_FEED_PENDING : 'GET_UPCOMING_EVENTS_FEED_PENDING',
	GET_UPCOMING_EVENTS_FEED_FULFILLED : 'GET_UPCOMING_EVENTS_FEED_FULFILLED',
	GET_UPCOMING_EVENTS_FEED_REJECTED : 'GET_UPCOMING_EVENTS_FEED_REJECTED',
}

export const HeaderActionTypes = {
	SIGN_IN : 'SIGN_IN',
	SIGN_IN_PENDING : 'SIGN_IN_PENDING',
	SIGN_IN_FULFILLED : 'SIGN_IN_FULFILLED',
	SIGN_IN_REJECTED : 'SIGN_IN_REJECTED',

	SIGN_OUT : 'SIGN_OUT',
	SIGN_OUT_PENDING : 'SIGN_OUT_PENDING',
	SIGN_OUT_FULFILLED : 'SIGN_OUT_FULFILLED',
	SIGN_OUT_REJECTED : 'SIGN_OUT_REJECTED',
}

export const CategoryActionTypes = {
	GET_CATEGORY_LIST : 'GET_CATEGORY_LIST',
	GET_CATEGORY_LIST_PENDING : 'GET_CATEGORY_LIST_PENDING',
	GET_CATEGORY_LIST_FULFILLED : 'GET_CATEGORY_LIST_FULFILLED',
	GET_CATEGORY_LIST_REJECTED : 'GET_CATEGORY_LIST_REJECTED',
}

export const AuthActionTypes = {
	SIGN_IN: 'SIGN_IN',
	SIGN_IN_PENDING: 'SIGN_IN_PENDING',
	SIGN_IN_FULFILLED: 'SIGN_IN_FULFILLED',
	SIGN_IN_REJECTED: 'SIGN_IN_REJECTED',

	SIGN_OUT: 'SIGN_OUT',
	SIGN_OUT_PENDING: 'SIGN_OUT_PENDING',
	SIGN_OUT_FULFILLED: 'SIGN_OUT_FULFILLED',
	SIGN_OUT_REJECTED: 'SIGN_OUT_REJECTED',
}

export const FavoritesActionTypes = {
	CHECK_FAVORITES: 'CHECK_FAVORITES',
	
}