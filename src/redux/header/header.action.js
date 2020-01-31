import { HeaderActionTypes } from '../config';
import axios from 'axios';

const API = "https://dumbtick-api.herokuapp.com/api/v1/";

export const signIn = (data) => ({
	type: HeaderActionTypes.GET_ARTICLE_DETAIL,
	payload: axios.post(`${API}/login`)
})

export const signOut = () => ({
	type: HeaderActionTypes.GET_RELATED_ARTICLE,
	payload: axios.get(`${API}category/${idCategory}/article`)
})
