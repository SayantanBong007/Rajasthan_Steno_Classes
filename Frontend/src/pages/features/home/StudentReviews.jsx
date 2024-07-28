import React from "react";

const ReviewCard = ({ name, location, review }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 m-4 w-80 relative text-center">
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <img
          src="user.png"
          alt={name}
          className="w-20 h-20 rounded-full border-4 border-white"
        />
      </div>
      <div className="mt-12">
        <div className="flex justify-center mb-4">
          {/* Placeholder for stars. Replace with actual icons if necessary */}
          <span className="text-yellow-500">★★★★★</span>
        </div>
        <h4 className="text-xl font-bold text-gray-800">{name}</h4>
        <p className="text-gray-600 mb-4">{location}</p>
        <p className="text-gray-700">{review}</p>
      </div>
    </div>
  );
};

const StudentReviews = () => {
  const reviews = [
    {
      name: "Archana",
      location: "Jodhpur",
      review:
        "मैंने हिंदी टाइपिंग और स्टेनो क्लास जॉइन की थी और यह मेरा सबसे अच्छा निर्णय था। यहाँ के प्रशिक्षक बहुत ही सहायक और कुशल हैं। उनकी गाइडेंस की वजह से मैं अब आसानी से हिंदी टाइप कर सकती हूँ। मेरे लिए यह एक बहुत ही सकारात्मक अनुभव रहा है।",
    },
    {
      name: "Ritu Sharma",
      location: "Jaipur",
      review:
        "हिंदी टाइपिंग और स्टेनो क्लास ने मेरी टाइपिंग स्पीड और एक्यूरेसी में काफी सुधार किया है। ट्रेनिंग प्रोग्राम बहुत ही अच्छी तरह से डिजाइन किया गया है, जिससे सीखना आसान हो जाता है। मैंने यहाँ से बहुत कुछ सीखा है जो मेरे करियर में मददगार होगा।",
    },
    {
      name: "Amritha Jaiswal",
      location: "Jaisalmer",
      review:
        "यह क्लास वास्तव में बेहतरीन है। यहां के टीचर्स बहुत ही प्रोफेशनल और फ्रेंडली हैं। उन्होंने हर एक छात्र पर व्यक्तिगत ध्यान दिया। अब मुझे हिंदी टाइपिंग और स्टेनोग्राफी में बहुत आत्मविश्वास महसूस होता है। इस कोर्स ने मेरी स्किल्स को एक नया आयाम दिया है।",
    },
  ];

  return (
    <section className="py-16 px-8 bg-sky-50 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Student Reviews</h2>
      <div className="flex flex-wrap justify-center items-start">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
};

export default StudentReviews;
