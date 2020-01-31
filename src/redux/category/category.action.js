import { CategoryActionTypes } from '../config';
import axios from 'axios';

const API = "https://dumbtick-api.herokuapp.com/api/v1/";

export const getCategoryList = () => ({
	type: CategoryActionTypes.GET_CATEGORY_LIST,
	payload: axios.get(`${API}/categories`)	
})

export const getEventsByCategory = (id) => ({
	type: CategoryActionTypes.GET_CATEGORY_PAGE,
	payload: axios.get(`${API}/category/${id}/events`)	
})



