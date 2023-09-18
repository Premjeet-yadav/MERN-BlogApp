import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const UserBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <center style={{marginTop:'80px' , gap:'40px'}}>
          <h1>It seems like you haven't created a blog</h1>
          <Button variant="contained" marginTop='40px' onClick={()=>{navigate('/create-blog')}} >Create Blog</Button>
          </center>
      )}
    </div>
  );
};

export default UserBlogs;
