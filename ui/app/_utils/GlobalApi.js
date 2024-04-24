import { data } from "autoprefixer";


const { default: axios } = require("axios");

//created axio client to create endpoint
const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_HOST
});

const createUser = (data) => axiosClient.post('/user', data);
const getUserByEmail = (email) => axiosClient.get('/user/' + email);
const createPost = (data) => axiosClient.post('/post', data);
const getAllPost = () => axiosClient.get('/post');
const onPostLike = (postId, data) => axiosClient.put('/post/like/' + postId, data);
// add new comment
const addComment = (data) => axiosClient.post('/comment', data);
//delete comment
const deleteComment = (commentId) => axiosClient.delete('/comment/' + commentId);


export default {
    createUser,
    getUserByEmail,
    createPost,
    getAllPost,
    onPostLike
    , addComment,
    deleteComment

}