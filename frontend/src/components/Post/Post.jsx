import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FcLike } from 'react-icons/fc';
import { FaRegCommentDots } from 'react-icons/fa';
import { format } from 'timeago.js';
import { FcLikePlaceholder } from 'react-icons/fc';

//CSS
import './Post.css';
import postService from "../../services/postService";

const Post = (props) => {
    const currentUser = localStorage.getItem('currentUser');
    const service = postService()


    //COMMENTS STATES AND FUNCTIONS
    const [commentsView, setCommentsView] = useState(false);
    const [comments, setComments] = useState([{
        text: '',
        userName: ''
    }])
    const handleChange = (event) => {
        setComments({
            text: event.target.value,
            userName: currentUser
        })
        console.log(event.target.value);
    }
    //getcomments
    useEffect(() => {
        axios.get(`http://localhost:5000/api/post/${props.id}`)
            .then(res => {
                console.log(res.data[0].comments);
                setComments(res.data[0].comments);
            })
            .catch(err => console.log(err))
    }, [])

    const comment = () => {
        try {
            axios.put(`http://localhost:5000/api/post/${props.id}/comment`, comments)
            console.log(comments.text);
        } catch (error) { }

        setComments({
            text: ''
        })
    }

    const showComments = () => {
        commentsView ? setCommentsView(false) : setCommentsView(true);
        console.log(props.comments.length);

    }



    //LIKES STATES AND FUNCTIONS
    const [likes, setLikes] = useState(props.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [likesListView, setLikesListView] = useState(false);


    //checking if the user has liked the post already
    useEffect(() => {
        setIsLiked(props.likes.includes(currentUser));
    }, [currentUser, props.likes])


    //getlikescount 
    useEffect(() => {
        axios.get(`http://localhost:5000/api/post/${props.id}`)
            .then(res => {
                console.log(res.data[0].likes.length);
                setLikes(res.data[0].likes.length);
            })
            .catch(err => console.log(err))
    }, [])


    const showLikes = () => {
        likesListView ? setLikesListView(false) : setLikesListView(true)
    }

    const likeDislike = () => {
        try {
            axios.put(`http://localhost:5000/api/post/${props.id}/like`, { userName: currentUser })
                .then(res => {
                    console.log(res);
                    setLikes(res.data);
                }).catch(err => console.log(err));
        } catch (error) { }
        setLikes(isLiked ? likes - 1 : likes + 1)
        setIsLiked(!isLiked)
    }

    // const disLike = () => {
    //     axios.get(`http://localhost:5000/api/post/${props.id}`)
    //         .then(res => {
    //             console.log(res.data[0]);
    //             setLikes(res.data[0].likes.length);
    //         })
    //         .catch(err => console.log(err))
    //     try {
    //         axios.put(`http://localhost:5000/api/post/${props.id}/dislike`, { userName: currentUser })
    //         window.location.reload();
    //     } catch (error) { }
    // }

    //deleting function 
    const deletePost = (id) => {
        alert('are you sure you want to delete this post?')
        service.deletePost(id);
        window.location.reload();

    }

    return (

        <div className="centerPost">

            {/* userName  and date*/}
            <div >
                <h3 className="next-to">{props.name}</h3>
                <span className="next-to yamin">{props.date}</span>
                <span className="deletebtn" onClick={() => deletePost(props.id)}>{props.delete}</span>
            </div>

            {/* text */}  <hr />
            <h4>{props.text}</h4><br />

            {/* image */}
            <img src={require(`../../assets/images/${props.img}`)} alt='alr' /> <br /> <br />

            {/* tags */}
            <div>
                <h3 className="next-to">Tags: </h3>
                {props.tags.map((tag, index) => (
                    <div key={index} className="tag-item-post">
                        <span >{tag}</span>
                    </div>
                ))}
            </div> <br />
            {/* like and dislike */}
            <div className="likedislike">
                <span onDoubleClick={showLikes}>{likes}</span>
                <button className="removeStyle" onClick={likeDislike}>{isLiked ? <FcLike /> : <FcLikePlaceholder />} </button>
                {/* <IoIosHeartDislike onClick={disLike} /> */}
            </div>

            {/* comments */}
            <input type="text" onChange={handleChange} value={comments.text} className="comments-searchBar" placeholder="type comments here" />
            <button type="button" className="addcommentbtn" disabled={!comments.text ? true : false} onClick={comment}>Add comment</button>
            <button type="button" className="removeStyle commentsbtn" onClick={showComments}><FaRegCommentDots /></button>
            {commentsView && props.comments[0] &&
                <div>
                    {
                        props.comments.map((comment, index) => {
                            return <><span key={index}> <h4 className="next-to">{comment.commentedBy}:</h4> {comment.text} <span className="yamin" style={{ color: 'red' }}>{format(comment.created)}</span></span> <br /> </>
                        })
                    }
                    <br />  <span className="totalComments">Total number of comments is:{props.comments.length}</span>
                </div>
            }
            {likesListView ? <div>
                {props.likes.map((like) => {
                    return <>
                        <span>{like}</span> <br />

                    </>
                })}

            </div> : null}

        </div>
    )
}

export default Post