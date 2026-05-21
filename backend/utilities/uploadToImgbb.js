import axios from "axios";

const uploadToImgBB = async (file) => {
    console.log("uplaod to imgbb called ")
    try {
            console.log('try called fro to gbb')
        // Convert image buffer to base64
        const base64Image = file.buffer.toString("base64");
        console.log("fiel.buffer is ",file.buffer)
        const data = new URLSearchParams();
    data.append("image", base64Image);
        
        

        // Upload to ImgBB
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            data
        );

        console.log("respnse is ",response)
        // Return uploaded image URL
        return response.data.data;

    } catch (error) {
        console.log("have error in uplaod  to imgbb ",error.message)
         
        
        throw new Error("Image upload failed");
    }
};

export default uploadToImgBB;