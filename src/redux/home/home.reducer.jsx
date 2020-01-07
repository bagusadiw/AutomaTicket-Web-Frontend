import { HomeActionTypes } from '../config';

const INITIAL_STATE ={
	eventsFeed:[],
	isLoadingEvents: false,
	isErrorEvents: false,
}

const homeReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		
		case HomeActionTypes.GET_EVENTS_FEED_PENDING :
			return {
				...state,
				isLoadingEvents: true
			}

		case HomeActionTypes.GET_EVENTS_FEED_FULFILLED :
			return {
				...state,
				isLoadingEvents: false,
				eventsFeed: action.payload.data.events
			}

		case HomeActionTypes.GET_EVENTS_FEED_REJECTED :
			return {
				...state,
				isLoadingEvents: false,
				isErrorEvents: true
			}

		default:
			return state;
	}
}

export default homeReducer;