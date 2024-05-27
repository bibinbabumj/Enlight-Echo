import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import {mUploadImageToAw} from "../common/Aws"

// const uploadImageByUrl=(event)=>{
//     let link=new Promise((reslove,reject)=>{
//         try{
//             reslove(event)
//         }catch(error){
//             reject(error)
//         }
//     })

//     return link.then(url=>{
//         return{
//             success:1,
//             file:{url}
//         }
//     })

// }

const uploadImageByUrl = async (event) => {
  try {
    const url = await Promise.resolve(event);
    return {
      success: 1,
      file: { url },
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: 0,
      message: "Failed to upload image",
    };
  }
};

// const uploadImageByFile=(event)=>{
//   return mUploadImageToAw(event).then(url=>{
//     if(url){
//       return {
//         success: 1,
//         file: { url },
//       };
//     }
//   })

// }

const uploadImageByFile = async (event) => {
  try {
    const url = await mUploadImageToAw(event);
      return {
        success: 1,
        file: { url },
      };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: 0,
      message: 'Failed to upload image',
    };
  }
};

export const editorjsTool = {
  embed: Embed,
  list: { class: List, inlineToolbar: true },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByFile:uploadImageByFile
      },
    },
  },
  quote: { class: Quote, inlineToolbar: true },
  marker: Marker,
  inlineCode: InlineCode,
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [2, 3, 4],
      defaultLevel: 3,
    },
  },
};
