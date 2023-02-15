import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */              //[TRATA ERROS EXPORT ANONIMO]
export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);

  useEffect(() =>{
    const loadall = async () =>{
      //pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      
      //pegando o Featured
      let originals = list.filter(i=>i.slug === 'originais');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      //console.log(chosenInfo);
      setFeaturedData(chosenInfo); 
    }
    loadall();
  },[])

  return(
    <div className="page">
      {
        FeaturedData && <FeaturedMovie item={FeaturedData}/>
      }

      <section className="lists">
        {
          movieList.map((item, key) => (
            <div key={key}>
              <MovieRow key={key} title={item.title} items={item.items} />
            </div>
          ))
        }
      </section>
    </div>
  )
}