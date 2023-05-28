import React, { useState, useEffect } from "react";
import "./Albums.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.min.css";
import Navbar from "../Navbar/Navbar";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const albumsData = await response.json();
      setAlbums(albumsData);

      // Fetch user data for each album
      const usersData = await Promise.all(
        albumsData.map(async (album) => {
          const userResponse = await fetch(
            `https://jsonplaceholder.typicode.com/users/${album.userId}`
          );
          return await userResponse.json();
        })
      );
      setUsers(usersData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPhotos = async (albumId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
      );
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlbumClick = (albumId) => {
    setSelectedAlbum(albumId);
    fetchPhotos(albumId);
  };

  return (
    <>
      <Navbar />
      <div className="album-container">
        <h1 className="album-title">Albums</h1>
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <ul className="album-list">
            {albums.map((album) => {
              // Find the user corresponding to the album's userId
              const user = users.find((user) => user.id === album.userId);
              const username = user ? user.username : "Unknown User";

              return (
                <li key={album.id} className="album-item">
                  <SwiperSlide key={album.id}>
                    <div>
                      <p className="album-username">User: {username}</p>
                      <button
                        onClick={() => handleAlbumClick(album.id)}
                        className="album-button"
                      >
                        {album.title}
                      </button>
                    </div>
                  </SwiperSlide>
                </li>
              );
            })}
          </ul>
        </Swiper>
        {selectedAlbum && (
          <div className="photos-container">
            <h2 className="photos-title">Photos from Album {selectedAlbum}</h2>
            {photos.map((photo) => (
              <div key={photo.id} className="photo-item">
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="photo-image"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Albums;
