import { v2 as cloudinary } from "cloudinary";

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: "dy9spksm1",
    api_key: "846567362284352",
    api_secret: "klNFgBJcp1pGCrWfVuUHLqubyS8",
  });

  const uploadAudio = async(audioUrl);
  {
    try {
      const result = await cloudinary.uploader.upload(audioUrl);
    } catch (err) {
      console.log(err.message);
    }
  }
})();
