import { HomeActionTypes } from '../config';
import axios from 'axios';

const API = "https://dumbtick-api.herokuapp.com/api/v1/";

export const getEventsFeed = () => ({
	type: HomeActionTypes.GET_EVENTS_FEED,
	payload: axios.get(`${API}/events`)	
})

export const getTodayEventsFeed = (today, tomorrow1) => ({
	type: HomeActionTypes.GET_TODAY_EVENTS_FEED,
	payload: axios.get(`${API}/events?start_date=${today}&&end_date=${tomorrow1}`)
})

export const getUpcomingEventsFeed = (tomorrow1, tomorrow2) => ({
	type: HomeActionTypes.GET_UPCOMING_EVENTS_FEED,
	payload: axios.get(`${API}/events?start_date=${tomorrow1}&&end_date=${tomorrow2}`)
})
