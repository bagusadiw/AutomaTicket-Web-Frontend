import { HomeActionTypes } from '../config';
import axios from 'axios';

const API = "http://localhost:5000/api/v1/";

export const getEventsFeed = () => ({
	type: HomeActionTypes.GET_EVENTS_FEED,
	payload: axios.get(`${API}/events?title=%%`)	
})
