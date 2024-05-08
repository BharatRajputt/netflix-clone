import React, { useEffect, useRef, useState } from 'react'
import './TitleCarts.css'
import card_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCarts = ({title,category}) => {


  const [apiData,setApiData] = useState([])

const cardsRef = useRef();
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2Q5MDEwYWI5Y2MwMDU5Y2NhMTA2ZjQ3ZWYxYTg4MSIsInN1YiI6IjY2MzkwNDhkYWUzODQzMDEyNWNhMTk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._dirb9V0Fl8pvs21OlR24N4ofjqA-NSByWmVKhbeSuc'
  }
};



const handleWheel = (event)=>{
 event.preventDefault();
cardsRef.current.scrollLeft += event.deltaY;
}





  
useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(data => {
      if (data.results) {
        setApiData(data.results);
      } else {
        console.error('Unexpected API response format:', data);
      }
    })
    .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel);

  // Cleanup function
  return () => {
    cardsRef.current.removeEventListener('wheel', handleWheel);
  };
}, []);


console.log(setApiData);

  return (
    
    <div className='title-cards'>
    <h2>{title?title :'Popular on Netflix'}</h2>
    <div className="card-list" ref={cardsRef}>
      
      {apiData.map((card,index)=>{
        return <Link to={`/player/${ card.id }`} className="card" key={index}>
        <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
        <p>{card.original_title}</p>
        </Link>

      })}
    </div>
    </div>
  )
}

export default TitleCarts;