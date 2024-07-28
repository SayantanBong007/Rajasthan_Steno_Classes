import React from "react";

const ContentPage = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
        {/* Left Column (Image) */}
        <div className="cal-box md:mr-8 mb-8 md:mb-0">
          <img src="2.png" alt="Image" className="w-full h-auto" />
        </div>

        {/* Right Column (Text Content) */}
        <div className="cal-box p-4 md:ml-8">
          <p className="mb-4 text-2xl font-semibold md:text-xl text-zinc-400">
            Rajasthan Steno Classes is the premier institute in Jodhpur for
            preparing for stenography and typing competitive exams.
          </p>
          <p className="text-2xl font-semibold md:text-xl text-zinc-400">
            We offer expert teaching by experienced instructors, online test
            series for steno exams, comprehensive course materials, PDF question
            solutions, and guaranteed preparation in online classes and tests.
          </p>
          <ol className="mt-4">
            <li className="mb-4">
              <div className="_lk_bg_cd flex items-center">
                <div className="counting bg-blue-300 text-white rounded-full p-2 mr-2">
                  02
                </div>
                <h5>Active Courses</h5>
              </div>
            </li>
            <li className="mb-4">
              <div className="_lk_bg_cd flex items-center">
                <div className="counting bg-blue-300 text-white rounded-full p-2 mr-2">
                  130
                </div>
                <h5>Student Learning</h5>
              </div>
            </li>
            <li>
              <div className="_lk_bg_cd flex items-center">
                <div className="counting bg-blue-300 text-white rounded-full p-2 mr-2">
                  02
                </div>
                <h5>Free Courses</h5>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ContentPage;
