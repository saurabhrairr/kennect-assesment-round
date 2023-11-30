

import React, { useEffect, useState } from "react";
import axios from "axios";
import camera from "../assest/camera.jpg";
import insta from "../assest/logo.png";
import { useNavigate } from "react-router-dom";
import "./postview.css";
import paperplan from "../assest/2symbole.jpg";

const Postview = () => {
  const navigate = useNavigate();

  const formpage = () => {
    navigate("/Form");
  };

  const [posts, setPosts] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    axios({
      url: "http://localhost:3082/post",
      method: "GET",
    }).then((itemdata) => {
      setPosts(itemdata.data.item.reverse());
      console.log(itemdata.data);
    });
  }, []);

  const cdate = new Date().toLocaleDateString();

  const handleCommentSubmit = (postId) => {
    axios({
      url: `http://localhost:3082/addComment/${postId}`,
      method: "POST",
      data: {
        text: newCommentText,
        username: "Saurabh", // Replace with actual user information
      },
    })
      .then((res) => {
        console.log(res);
        // Refresh posts after adding a comment
        axios({
          url: "http://localhost:3082/post",
          method: "GET",
        }).then((itemdata) => {
          setPosts(itemdata.data.item.reverse());
          setNewCommentText("");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <header>
        <div className="nav">
          <img src={insta} alt="logoimage" />
          <img id="lobo" onClick={formpage} src={camera} alt="camera-image" />
        </div>
      </header>
      <hr />
      {posts.map((item, i) => {
        return (
          <div className="Post" key={i}>
            <div className="user-information">
              <b className="name">{item.name}</b>
              <p>{item.location}</p>
            </div>

            <div className="dots">
              <p>&#8226;&#8226;&#8226;</p>
            </div>

            <div className="user-image">
              <img src={item.postimage} alt="images"></img>
            </div>

            <div className="data">
              <span>
                <img
                  src="https://icon-library.com/images/instagram-heart-icon/instagram-heart-icon-17.jpg"
                  alt=" currently no detail"
                  className="heart-img"
                />
              </span>
              <span>
                <img
                  src={paperplan}
                  alt=" currently no detail"
                  className="paper-plane"
                />
              </span>
              <span className="date">{cdate}</span>
              <p className="likes">100 likes</p>
            </div>
            <footer className="footer">
              <p> {item.descripation}</p>
              {/* Comment Section */}
              <div className="comment-section">
                {(item.comments || []).map((comment, index) => (
                  <p key={index}>{`${item.name}: ${comment.text}`}</p>
                ))}
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                />
                <button onClick={() => handleCommentSubmit(item._id)}>
                  Add Comment
                </button>
              </div>
            </footer>
          </div>
        );
      })}
    </div>
  );
};

export default Postview;