import axios from "axios";


const postService = () => {
    const API = "http://localhost:5000/api/";

    const addPost = (postInfo) => {
        axios.post(API + 'post', postInfo)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const likePost = (id, currentUser) => {
        console.log(currentUser);
        axios.post(`http://localhost:5000/api/post/like/${id}/${currentUser}`, currentUser)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const addComment = (id, currentUser) => {
        axios.post(`http://localhost:5000/api/post/comment/${id}/${currentUser}`, currentUser)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const updateUser = (name, newInfo) => {
        axios.post(API + `post/update/${name}`, newInfo)
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deletePost = (id) => {
        axios.delete(`http://localhost:5000/api/post/delete/${id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return {
        addPost: addPost,
        likePost: likePost,
        updateUser: updateUser,
        addComment: addComment,
        deletePost: deletePost
    }
}


export default postService