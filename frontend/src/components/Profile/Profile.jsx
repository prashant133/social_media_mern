import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Post from "../Post/Post";
import { format } from 'timeago.js';
import { MdModeEdit } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';



//CSS
import './Profile.css';
import userService from "../../services/userService";

const Profile = () => {
    const params = useParams();
    const navigate = useNavigate();
    const service = userService()
    const currentUser = localStorage.getItem('currentUser');

    const [userDetails, setUserDetails] = useState({
        userName: '',
        email: ''
    })

    const [postName, setPostName] = useState({
        userName: ''
    })

    const [edit, setEdit] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [userPosts, setUserPosts] = useState([]);

    const Edit = () => {
        setEdit(true);
    }
    const Submit = () => {
        setSubmit(true);
        // navigate(`/mainPage/${submit ? userDetails.userName : params.name}`)
    }

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        service.updateUser(params.name, userDetails);
        localStorage.setItem("currentUser", userDetails.userName)
    }

    //fetching the user data
    useEffect(() => {
        if (params.name === currentUser) {
            axios.get(`http://localhost:5000/api/users/profile/${params.name}`)
                .then(res => {
                    setUserDetails({
                        userName: res.data.userName,
                        email: res.data.email
                    })
                    console.log(res.data);
                })
                .catch(err => console.log(err))
        } else {
            navigate('/error');
        }
    }, [])


    //fetching the user posts data
    useEffect(() => {
        if (params.name === currentUser) {
            axios.get(`http://localhost:5000/api/post/posts/${params.name}`)
                .then(res => {
                    setUserPosts(res.data.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                    }))
                })
                .catch(err => console.log(err))
        }
    }, [])





    return (
        <div id="backgroundPageColor">
            <br /> <br />
            <form onSubmit={handleSubmit}>
                <div className="centering">
                    <img src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" /> <br /> <br />
                    userName: {edit ? <input type="text" value={userDetails.userName} name='userName' onChange={handleChange} /> : userDetails.userName}<br /> <br />
                    email: {edit ? <input type="text" value={userDetails.email} name='email' onChange={handleChange} /> : userDetails.email} <br /> <br />
                    number of posts: {userPosts.length} <br /> <br />
                    {edit ? <button type="submit" onClick={Submit} className="editbtn">Submit</button> : <button type="button" onClick={Edit} className="editbtn">Edit Profile</button>}
                    <MdModeEdit />
                </div>
            </form><br /> <br />
            <div className="posts">
                {userPosts.map((post, index) => {
                    return <React.Fragment key={index}>
                        <Post id={post._id} date={format(post.createdAt)} delete={<MdDeleteForever />} text={post.text} img={post.img} tags={post.tags} comments={post.comments} likes = {post.likes} /> <br /><br />
                        {/* <MdDeleteForever /> */}
                    </React.Fragment>

                })}
            </div>

            <Link to={`/mainPage/${submit ? userDetails.userName : params.name}`}><button className="left-bottom">Back</button></Link>
        </div>
    )
}

export default Profile