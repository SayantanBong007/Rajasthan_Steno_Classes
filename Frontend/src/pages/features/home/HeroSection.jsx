import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[700px]">
      {/* Bootstrap Carousel */}
      <div
        id="carouselExample"
        className="carousel slide h-full"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner h-full">
          <div className="carousel-item active h-full">
            <img
              src="img1.jpg"
              className="d-block w-100 h-full object-cover"
              alt="First slide"
            />
          </div>
          <div className="carousel-item h-full">
            <img
              src="img2.jpg"
              className="d-block w-100 h-full object-cover"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item h-full">
            <img
              src="img3.jpg"
              className="d-block w-100 h-full object-cover"
              alt="Third slide"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Overlay Text */}
      <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center p-5">
        <h1 className="text-3xl font-bold">Rajasthan Steno Classes</h1>
        <p className="text-xl mt-2">
          Steno & Typing Training Institute, Jodhpur
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
