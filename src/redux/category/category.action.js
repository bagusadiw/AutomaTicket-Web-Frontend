import { CategoryActionTypes } from '../config';
import axios from 'axios';

const API = "http://localhost:5000/api/v1/";

export const getCategoryList = () => ({
	type: CategoryActionTypes.GET_CATEGORY_LIST,
	payload: axios.get(`${API}/categories`)	
})

