import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1 className="home-title">Welcome to Our Innovative Platform</h1>
        <p className="home-description">
          Explore the diverse range of activities we offer, designed to ignite
          your curiosity and enhance your skills.
        </p>
        <div className="exercise-container">
          <div className="exercise">
            <Link to="search-about-me">
              <img
                src={`https://images.unsplash.com/photo-1527454113887-0c84d9abf9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`}
                alt="Origin"
                className="exercise-image"
              />
            </Link>
            <h2>Discover Your Origin</h2>
            <p>Finding the probability of which country you come from</p>
          </div>
          <div className="exercise">
            <Link to="albums-images">
              <img
                src={
                  "https://images.unsplash.com/photo-1587731556938-38755b4803a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1178&q=80"
                }
                alt="Albums"
                className="exercise-image"
              />
            </Link>
            <h2>Captivating Albums</h2>
            <p>
              Show albums and if you click on the album it will show the photos
            </p>
          </div>
          <div className="exercise">
            <Link to="/news">
              <img
                src={
                  "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                }
                alt="News"
                className="exercise-image"
              />
            </Link>
            <h2>Stay Informed with Ynet News</h2>
            <p>Display data from the Ynet news site</p>
          </div>
          <div className="exercise">
            <Link to="/posts">
              <img
                src={
                  "https://images.unsplash.com/photo-1551636898-47668aa61de2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                }
                alt="Posts"
                className="exercise-image"
              />
            </Link>
            <h2>Bite-sized Posts and Articles</h2>
            <p>Displaying small posts and articles</p>
          </div>
          <div className="exercise">
            <Link to="/garage">
              <img
                src={
                  "https://plus.unsplash.com/premium_photo-1674485300908-da4b93c84c13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                }
                alt="Garage"
                className="exercise-image"
              />
            </Link>
            <h2>Garage Search by City</h2>
            <p>A site for searching a garage by city</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
