import { Link } from "react-router-dom";
import { logo, blog_banner } from "../assets/images/index.js";
import { PageAnimation } from "../common/Animation";
import { mUploadImageToAw } from "../common/Aws.jsx";
import { useContext, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/BlogEditorPage.jsx";
import EditorJS from "@editorjs/editorjs";
import { editorjsTool } from "../components/EditorJSTool";
import { mHandleTitleEnter } from "../utils/Utils";
import { UserContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogEditorComponent = () => {
  let {
    blog,
    blog: {
      blog_title,
      blog_banner_img_url,
      blog_content,
      blog_tags,
      blog_des,
    },
    setBlog,
    blogEditorPage,
    setBlogEditorPage,
    setEditorState,
  } = useContext(EditorContext);
  let {mUserAuth:{access_token}}=useContext(UserContext)
  let navigate=useNavigate()
  const handleBlogBannerImgUpload = async (event) => {
    let bannerImg = event.target.files[0];
    if (bannerImg) {
      let loadingToast = toast.loading("Uploading");
      try {
        const url = await mUploadImageToAw(bannerImg);
        if (url) {
          toast.dismiss(loadingToast);
          toast.success("Uploaded..");
          setBlog({ ...blog, blog_banner_img_url: url });
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        return toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  const mHandleHeightBox = (event) => {
    let input = event.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, blog_title: input.value });
  };

  const mHandleDefaultImage = (event) => {
    let img = event.target;
    img.src = blog_banner;
  };

  const mHandlePublishBlog = async () => {
    try {
      // if (!blog_banner_img_url.length) {
      //   return toast.error("Upload a Blog Banner image to Publish it");
      // }
      if (!blog_title.length) {
        return toast.error("Write Blog title to Publish it");
      }
      if (blogEditorPage.isReady) {
        const data = await blogEditorPage.save();

        if (data.blocks.length) {
          setBlog({ ...blog, blog_content: data });
          setEditorState("blog-publish");
        } else {
          return toast.error("Write something for your blog to publish it");
        }
      }
    } catch (err) {
      console.error("Error saving blog:", err.message);
    }
  };

  const mHandleSaveDraft = async (event) => {
    if (event.target.classList.contains("disable")) {
      return;
    }
    if (!blog_title.trim()) {
      return toast.error("Write Blog title to Save it");
    }
    // Add the disable class to prevent multiple submissions
    event.target.classList.add("disable");
    const loading = toast.loading("Saving Draft....");
    const blogObject = {
      blog_title,
      blog_banner_img_url,
      blog_des,
      blog_tags,
      blog_content,
      draft: true,
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
    toast.success("Saved successfully!");
    event.target.classList.remove("disable");
    setTimeout(() => {
      navigate("/");
    }, 2000);

    }catch(err){
      toast.dismiss(loading);
    event.target.classList.remove("disable"); // Ensure the class is removed on error
    console.error("Error saving blog:", err.message);
    toast.error("An error occurred while Saving the blog.");

    }



  }

  useEffect(() => {
    
    setBlogEditorPage(
      new EditorJS({
        holder: "textEditor",
        data: blog_content,
        placeholder: "Lets write your Blog",
        tools: editorjsTool,
      })
    );
  }, [setBlogEditorPage, blog_content]);

  return (
    <>
      <nav className="nav-menu">
        <Link to="/" className="w-8 flex-none">
          <img src={logo} className=" w-full" />
        </Link>

        <p className=" max-md:hidden text-black line-clamp-1 w-full">
          {blog_title.length ? blog_title : "New Blog"}
        </p>

        <div className="flex gap-4 ml-auto">
          <button
            className="btn-dark py-2 text-m text-base lg:text-lg"
            onClick={mHandlePublishBlog}
          >
            Publish
          </button>
          <button className="btn-dark btn-light py-2 text-m text-base lg:text-lg"
          onClick={mHandleSaveDraft}>
            Save Draft
          </button>
        </div>
      </nav>

      <PageAnimation>
        <section>
          <Toaster />
          <div className=" mx-auto max-w-[80%] w-full">
            <div className=" relative  aspect-video bg-white border-2 border-violet/30 rounded-md ">
              <label htmlFor="uploadBanner">
                <img
                  src={blog_banner_img_url}
                  className=" z-20"
                  onError={mHandleDefaultImage}
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBlogBannerImgUpload}
                />
              </label>
            </div>
            <textarea
              defaultValue={blog_title}
              placeholder="Blog Title"
              className="text-3xl font-medium w-full outline-none mt-10 resize-none leading-tight placeholder-opacity-40"
              onKeyDown={mHandleTitleEnter}
              onChange={mHandleHeightBox}
            />
            <hr className="w-full  my-2" />
            <div id="textEditor" className=" font-poppins"></div>
          </div>
        </section>
      </PageAnimation>
    </>
  );
};

export default BlogEditorComponent;
