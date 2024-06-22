import React from "react";

const ReviewCard = ({ name, location, review }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 m-4 w-80">
      <div className="flex items-center mb-4">
        <img
          src="user.png"
          alt={name}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h4 className="text-lg font-bold">{name}</h4>
          <p className="text-gray-500">{location}</p>
        </div>
      </div>
      <p>{review}</p>
    </div>
  );
};

const StudentReviews = () => {
  const reviews = [
    {
      name: "Archana",
      location: "Jodhpur",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis nisl vehicula. Quisque dictum dui, imperdiet id.",
    },
    {
      name: "Ritu Sharma",
      location: "Jaipur",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula. Quisque dictum dui, imperdiet id.",
    },
    {
      name: "Amritha Jaiswal",
      location: "Jaisalmer",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula. Quisque dictum dui, imperdiet id.",
    },
  ];

  return (
    <section className="py-16 px-8 bg-white text-center">
      <h2 className="text-2xl font-bold mb-8">Student Reviews</h2>
      <div className="flex flex-wrap justify-center items-center">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
};

export default StudentReviews;
