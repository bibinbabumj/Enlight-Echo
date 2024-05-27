import axios from "axios";
//import { toast } from "react-hot-toast";

export const mUploadImageToAw=async(image)=>{
   try{
      const response=await axios.get(import.meta.env.VITE_SERVER_DOMAIN+"/get-upload-url")
      const uploadURL=response.data.uploadURL;
      await axios.put(uploadURL, image,{headers:{'Content-Type':'multipart/form-data'}})
      return uploadURL.split("?")[0]

   }catch(error){
      console.error("Error uploading image to AWS",error)
      throw new Error("Failed to upload image. Please try again");
     // toast.error("Failed to upload image. Please try again.");
     // return null
   }

}