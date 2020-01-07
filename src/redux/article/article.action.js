import { ArticleActionTypes } from '../config';
import axios from 'axios';

const API = "http://localhost:5000/api/v1/";

export const getArticleDetail = (idArticle) => ({
	type: ArticleActionTypes.GET_ARTICLE_DETAIL,
	payload: axios.get(`${API}article/${idArticle}`)
})

export const getRelatedArticle = (idCategory) => ({
	type: ArticleActionTypes.GET_RELATED_ARTICLE,
	payload: axios.get(`${API}category/${idCategory}/articles`)
})

// export const getArticlComments = article => ({
// 	type: ArticleActionTypes.GET_ARTICLE_COMMENTS,
// 	payload: article 
// })
