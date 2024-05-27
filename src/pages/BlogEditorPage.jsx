import { createContext, useContext, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import BlogEditorComponent from "../components/BlogEditorComponent";
import PublishBlogComponent from "../components/PublishBlogComponent";

const mBlogModel = {
  blog_title: "",
  blog_banner_img_url: "",
  blog_content: [],
  blog_tags:[],
  blog_des: "",
  author: { user_info: {} },
};

export const EditorContext = createContext({});

const BlogEditorPage = () => {
  const [editorState, setEditorState] = useState("blog-editor");
  const [blog, setBlog] = useState(mBlogModel);
  const [blogEditorPage,setBlogEditorPage]=useState({isReady:false})
  
  let { mUserAuth: { access_token } = { access_token: null } } =
    useContext(UserContext);

  return (
    <EditorContext.Provider value={{blog,setBlog,editorState,setEditorState,blogEditorPage,setBlogEditorPage}}>
      {access_token == null ? (
        <Navigate to="/signin" />
      ) : editorState == "blog-editor" ? (
        <BlogEditorComponent />
      ) : (
        <PublishBlogComponent />
      )}
    </EditorContext.Provider>
  );
};

export default BlogEditorPage;
