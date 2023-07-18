import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdNightlight } from 'react-icons/md';
import { BsSunFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineHome } from 'react-icons/ai';
import { format } from 'timeago.js';
//CSS
import './MainPage.css';
import Post from "../Post/Post";
import { useEffect } from "react";
import axios from "axios";

const MainPage = () => {

    const params = useParams();
    const navigate = useNavigate();
    const currentUser = localStorage.getItem('currentUser');
    const [changeBackgroundColor, setChangeBackgroundColor] = useState(false);
    const [postsList, setPostsList] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const change = (e) => {
        setSearchValue(e.target.value);
        console.log(e.target.value);
    }

    const changeColorToLight = () => {
        setChangeBackgroundColor(true);
    }

    const changeColorToDark = () => {
        setChangeBackgroundColor(false);
    }

    const clearStorage = () => {
        window.localStorage.clear();
    }

    useEffect(() => {
        if (params.name === currentUser) {
            axios.get('http://localhost:5000/api/post/posts')
                .then(res => {
                    setPostsList(res.data.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                    }))

                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            navigate('/error');
        }
    }, []); // the empty arr in the useEffect hook means: run this useeffect just once when you render the MainPage functional component


    return (
        <div id={changeBackgroundColor ? 'darkBackgroundPageColor' : 'backgroundPageColor'}>
            {/* navbar */}
            <div className="navbar">
                <b><span className="left">Hi {currentUser}</span></b>
                <span> <input className="middle" type="text" value={searchValue} onChange={change} placeholder="filter posts by friends name here" /></span>
                <span className="right"><AiOutlineHome /></span>
                <Link to={`/profile/${currentUser}`}> <span className="right"><CgProfile /></span></Link>
                <span className="light" onClick={changeColorToLight}><MdNightlight /> </span><span className="light">|</span>
                <span className="light" onClick={changeColorToDark}><BsSunFill /></span>
            </div>
            <h1 style={{ color: changeBackgroundColor ? 'white' : null }}>WELCOME TO LINKME APP</h1>
            <hr />
            {postsList.filter((searchval) => {
                if (searchValue === '') {
                    return searchval
                } else if (searchval.userName.toLowerCase().includes(searchValue.toLowerCase())) {
                    return searchval
                }
            }).map((post, index) => {
                return <React.Fragment key={index}>
                    <Post name={post.userName} id={post._id} date={format(post.createdAt)} text={post.text} img={post.img} tags={post.tags} comments={post.comments} likes={post.likes} /> <br /><br />
                </React.Fragment>

            })}
            <Link to={`/post/${currentUser}`}><button className="right-bottom"> <b>+</b> Add Post</button></Link>
            <Link to='/'><button onClick={clearStorage} className="left-bottom">Sign Out</button></Link>

        </div>
    )

}

export default MainPage