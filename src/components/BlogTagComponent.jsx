import { useContext } from "react";
import { EditorContext } from "../pages/BlogEditorPage";



const BlogTagComponent = ({ tag }) => {

  let {blog,blog:{blog_tags},setBlog}=useContext(EditorContext)

  const mDeleteTag=()=>{
    console.log("click")
    const updatedTags = blog_tags.filter(mTag => mTag !== tag);
    console.log(updatedTags)
    setBlog({...blog,blog_tags: updatedTags})

  }
  return (
    <div className=" relative m-1 rounded-lg p-2 inline-block bg-white border-b-2 border-violet/30 text-center">
      <small className="px-2">{tag}</small>
      <button onClick={mDeleteTag}>
        <i className=" p-2 fi fi-br-cross text-center  text-sx"></i>
      </button>
    </div>
  );
};

export default BlogTagComponent;
