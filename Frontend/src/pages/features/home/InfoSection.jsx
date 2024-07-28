import React from "react";
import "tailwindcss/tailwind.css";

const InfoSection = () => {
  return (
    <section className="relative w-full h-auto bg-gray-100 py-16 my-1">
      {/* Background Shape */}
      <div
        className="absolute top-0 right-0 h-full w-1/2 bg-sky-300 z-20"
        style={{
          clipPath: "polygon(45% 100%, 100% 100%, 100% -1px, 0px 0px)",
        }}
      ></div>

      {/* Background Image */}
      <div className="absolute top-0 left-0 h-full w-full md:w-1/3 z-10">
        <img
          src="shap-01.png"
          alt="Background Image"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content Wrapper */}
      <div className="container mx-auto px-4 py-8 relative z-30">
        <div className="flex flex-wrap items-center">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left p-4">
            <h1 className="text-4xl font-bold mb-4">
              राजस्थान स्टेनो एवं टाइपिंग क्लासेज, जोधपुर
            </h1>

            <p className="mb-4">
              "प्रिय प्रिद्यार्थियों यह िेबसाइट पोटिल आपके र्लए आगामी दिनों में
              दकतना लाभिायक र्सद्ध होगा, इसका अनुमान आप यहाां Steno Online Test
              Series के र्लए Demo Test िेने के बाि र्नयर्मत रूप से जब इस िेबसाइट
              पोटिल की Test Series को जॉइन कर लेंगे और Steno Test िेंगे तब पता
              चलेगा। इससे सम्बन्धित सुप्रििाएां र्नम्नर्लन्ित हैं।"
            </p>
            <ul className="list-disc list-inside text-left mb-8">
              <li>
                केंद्रीय स्तर आपकी कौशल परीक्षा का मूलयाांकन कर यह भी बताया
                जाएगा दक अगर 1 हजार अभ्यथी कौशल परीक्षा िेते हैं, तो उसमें आपकी
                रैंक क्या है।
              </li>
              <li>
                आपको आशुर्लप्रप/Steno की कौशल परीक्षा/Skill Test िेते ही, आपकी
                गलर्तयाां दकतनी हैं और दकस-दकस शब्ि में आपकी क्या गलर्तयाां हैं,
                िेबसाइट पोटिल आपको तुरांत बताएगा।
              </li>
              <li>
                िेबसाइट पोटिल पर आपके र्लए परीक्षा केंद्र(जहाां पर आपकी परीक्षा
                होती है) जैसा माहौल उपलब्ि करिाया जाएगा।
              </li>
              <li>रोजाना अलग-अलग स्पीि पर दिक्टेशन।</li>
              <li>शुद्ध दहांिी आिाररत दिक्टेशन।</li>
              <li>पुराने टेस्ट को पुनः िेने की सुप्रििा।</li>
              <li>
                ितिमान में सॉफ्टिेयर ि िेबसाइट पोटिल पर Stenographer पि के र्लए
                कौशल परीक्षा/Skill Test आयोन्जत करिाया जाता है, इसर्लए आपको इससे
                सम्बन्धित Skill Test उत्तीर्ि करने हेतु सुप्रििा र्मलेगी।आपके
                र्लए मैं यही कामना करता हूूँ, आप पररश्रम कर
                आशुर्लप्रपक/Stenographer पि पर चयर्नत होकर अपने भप्रिष्य को
                उज्जज्जिल करें।
              </li>
            </ul>
          </div>
          {/* Image */}
          <div className="flex-1 p-4">
            <div className="slider-image">
              <img src="1.png" alt="Typing" className="w-full h-auto " />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
