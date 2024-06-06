import axios from "axios";

export const getUploadedImgUrl=async(imageFile)=>{
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const image={image:imageFile}
    const res=await axios.post(image_hosting_api,image,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    return(res.data?.data?.display_url)
}