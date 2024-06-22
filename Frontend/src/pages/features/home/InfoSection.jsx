import React from "react";

const InfoSection = () => {
  return (
    <section className="py-16 px-8 bg-white text-center">
      <h2 className="text-2xl font-bold mb-4">
        राजस्थान स्टेनो एवं टाइपिंग क्लासेज, जोधपुर
      </h2>
      <p className="text-lg mb-8">
        स्टेनो एवं टाइपिंग प्रतियोगी परीक्षाओं की तैयारी हेतु सर्वश्रेष्ठ शिक्षण
        संस्थान
      </p>
      <div className="flex flex-wrap justify-center items-center">
        <img
          src="img1.jpg"
          alt="Typing"
          className="w-1/2 md:w-1/3 lg:w-1/4 rounded-lg shadow-lg mb-4"
        />
        <div className="w-full md:w-2/3 lg:w-3/4 p-4 text-left">
          <p className="mb-4">
            "राजस्थान स्टेनो एवं टाइपिंग क्लासेज स्टेनो एवं टाइपिंग की प्रतियोगी
            परीक्षाओं की तैयारी हेतु जोधपुर में सर्वश्रेष्ठ शिक्षण संस्थान है।"
          </p>
          <ul className="list-disc list-inside">
            <li>कक्षा एवं अनुभवी शिक्षकों द्वारा अध्यापन।</li>
            <li>ऑनलाइन टेस्ट सीरीज द्वारा स्टेनो टेस्ट का मुल्यांकन।</li>
            <li>ग्रोइंग डॉक्युमेंटेशन एवं स्टेनो क्लास के विषय में।</li>
            <li>pdf प्रश्न समाधान एवं तैयारी की सुविधा।</li>
            <li>ऑनलाइन क्लास एवं टेस्ट में चयनित के गारंटी के साथ तैयारी।</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
