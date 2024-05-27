import toast, { Toaster } from "react-hot-toast";
import { PageAnimation } from "../common/Animation";
import { useContext, useState } from "react";
import { EditorContext } from "../pages/BlogEditorPage";
import { mHandleTitleEnter } from "../utils/Utils";
import BlogTagComponent from "./BlogTagComponent";
import axios from "axios";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const PublishBlogComponent = () => {
  let maxtCharaterLimit = 200;
  let tagLimit = 10;
  let navigate=useNavigate()
  let {
    blog,
    blog: { blog_title, blog_banner_img_url, blog_tags, blog_des,blog_content },
    setEditorState,
    setBlog,
  } = useContext(EditorContext);

  let {mUserAuth:{access_token}}=useContext(UserContext)

  const mHandleClosePublishPage = () => {
    setEditorState("blog-editor");
  };

  const mHandleBlogTitle = (event) => {
    event.preventDefault();
    let input = event.target;
    setBlog({ ...blog, blog_title: input.value });
  };

  const mHandleBlogDescription = (event) => {
    // event.preventDefault();
    let input = event.target;
    setBlog({ ...blog, blog_des: input.value });
  };

  const mHandleBlogTags = (event) => {
    const tag = event.target.value.trim();
    if (event.keyCode == 13 && tag) {
      if (blog_tags.length < tagLimit) {
        event.preventDefault();
        setBlog({ ...blog, blog_tags: [...blog_tags, tag] });
        event.target.value = "";
      } else {
        toast.error("You can add a maximum of 10 tags");
      }
    }
  };

  const mHandlePublishBlog = async (event) => {
    if (event.target.classList.contains("disable")) {
      return;
    }
    if (!blog_title.trim()) {
      return toast.error("Write Blog title to Publish it");
    }
     // Add the disable class to prevent multiple submissions
  event.target.classList.add("disable");
  const loading = toast.loading("Publishing....");
  const blogObject = {
    blog_title,
    blog_banner_img_url,
    blog_des,
    blog_tags,
    blog_content,
    draft: false,
  };
  try {
     await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/publish-blog`,
      blogObject,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    toast.dismiss(loading);
    toast.success("Published successfully!");
    event.target.classList.remove("disable");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }catch(err){
    toast.dismiss(loading);
    event.target.classList.remove("disable"); // Ensure the class is removed on error
    console.error("Error saving blog:", err.message);
    toast.error("An error occurred while publishing the blog.");
  }
  
  }



  return (
    <PageAnimation>
      <section className="min-h-screen grid items-center lg:grid-cols-2 lg:gap-4 ">
        <Toaster />
        <button
          className="bg-gray-100 w-12 h-12 rounded-full absolute right-[5%] z-10 top-[5%] lg:top-[5%]"
          onClick={mHandleClosePublishPage}
        >
          <i className="fi fi-br-cross" />
        </button>

        <div className="block mx-auto max-w-[80%] w-full mt-10 sm:mt-20 py-10">
          <div className="w-full overflow-hidden aspect-video bg-white border-2 border-violet/30 rounded-lg">
            <img src={blog_banner_img_url} />
          </div>

          <h1 className="mt-4 text-l font-medium  font-poppins line-clamp-1 leading-7">
            {blog_title}
          </h1>

          <p className="mt-4 font-medium font-poppins leading-7 break-words">
            {blog_des}
          </p>
        </div>

        <div className="block mx-auto w-full p-10">
          <p className=" sm:mt-20">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            defaultValue={blog_title}
            onChange={mHandleBlogTitle}
            className="input-box px-4 placeholder:opacity-30"
          />

          <p className="mb-2 mt-10">
            Short description about your blog (optional)
          </p>
          <textarea
            maxLength={maxtCharaterLimit}
            onChange={mHandleBlogDescription}
            defaultValue={blog_des}
            onKeyDown={mHandleTitleEnter}
            placeholder="Short description"
            className="input-box px-4 resize-none h-40 leading-5 placeholder:opacity-30"
          />
          <p className="text-right mt-2 text-sm">
            {maxtCharaterLimit - blog_des.length} charater left{" "}
          </p>

          <p className="my-4 break-words">
            Topics -(Help is searching and ranking your blog post)
          </p>

          <div className="relative input-box px-4">
            <input
              type="text"
              placeholder="Topic"
              onKeyDown={mHandleBlogTags}
              className=" sticky input-box bg-white placeholder:opacity-30 mb-2 focus:bg-white"
            />
            <p className="text-right text-sm">
              {tagLimit - blog_tags.length} Tags left{" "}
            </p>

            {blog_tags.map((data, index) => {
              return <BlogTagComponent key={index} tag={data} />;
            })}
          </div>
          <button
            className="btn-dark py-2 text-m text-base lg:text-lg mt-7"
            onClick={mHandlePublishBlog}
          >
            Publish
          </button>
        </div>
      </section>
    </PageAnimation>
  );
};

export default PublishBlogComponent;
