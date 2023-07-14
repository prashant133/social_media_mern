import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaSmileWink } from 'react-icons/fa';

//CSS
import './PostForm.css'

import { useState } from "react";
import postService from "../../services/postService";
import axios from "axios";
const PostForm = () => {

    const params = useParams();
    const service = postService();
    const navigate = useNavigate();

    const [tags, setTags] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);


    const [postData, setPostData] = useState({
        text: '',
        tags: tags,
        img: '',
        userName: params.name
    })

    const handleChange = (e) => {
        setPostData({
            ...postData, [e.target.name]: e.target.value
        })
        console.log(e.target.value);
    }
    const handleTagsChange = (e) => {
        setTags([...tags]);
        postData.tags = [...tags];
        setPostData(postData)
        console.log(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedImage) {
            const data = new FormData();
            const fileName = Date.now() + selectedImage.name;
            data.append('name', fileName);
            data.append('file', selectedImage);
            postData.img = fileName;
            try {
                axios.post('http://localhost:5000/api/upload', data);
                console.log(postData.img);
                // window.location.reload(); for refreshing the page
            } catch (err) { }
        }
        service.addPost(postData);
        console.log(postData);
        navigate(`/mainPage/${params.name}`);
    }

    const handleKeyDown = (e) => {
        if (e.key !== 'Enter') return  // If user did not press enter key, return
        if (!(e.target.value).trim()) return; // If the value is empty, return
        setTags([...tags, e.target.value])
        e.target.value = '';
    }


    const removeTag = (index) => {
        setTags(tags.filter((el, i) => i !== index))
    }
    return (
        <div id="backgroundPageColor"> <br />
            <h1>ITS POST TIME <FaSmileWink /></h1>
            <form onSubmit={handleSubmit} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                <div className="centerPostForm">
                    <label htmlFor="text"><b>Text</b>  : <input type="text" name="text" onChange={handleChange} value={postData.text} />  </label>  <br /> <br />
                    <label htmlFor="tags"><b>Enter Some Tags:</b>
                        <div className="tags-input-container" value={tags} name="tags" onChange={handleTagsChange} >
                            {tags.map((tag, index) => (
                                <div key={index} className="tag-item">
                                    <span>{tag}</span>
                                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                                </div>
                            ))}
                            <input onKeyDown={handleKeyDown} type="text" placeholder="press ENTER to add tags" className="tags-input" />
                        </div>
                    </label> <br />

                    <label htmlFor="img"><b>Select Image</b> :
                        <input
                            type="file"
                            // name="img"
                            // style={{display: "none"}}
                            accept=".png,.jpg,.jpeg"
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                            }}
                            // value={postData.img}
                            required />
                        {/* <FileBase64
                            multiple={false}
                            onDone={({base64})=> setPostData({...postData, img:base64})} /> */}

                    </label> <br /> <br /> <br />
                    <button className="publishBtn" type="submit">Publish</button>

                </div>
            </form>
            <Link to={`/mainPage/${params.name}`}><button className="left-bottom">Back</button></Link>
        </div>
    )
}

export default PostForm 