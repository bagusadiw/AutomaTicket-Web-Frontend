import { HeaderActionTypes } from '../config';
import axios from 'axios';

const API = "http://localhost:5000/api/v1/";

export const signIn = (data) => ({
	type: HeaderActionTypes.GET_ARTICLE_DETAIL,
	payload: axios.post(`${API}/login`)
})

export const signOut = () => ({
	type: HeaderActionTypes.GET_RELATED_ARTICLE,
	payload: axios.get(`${API}category/${idCategory}/article`)
})
