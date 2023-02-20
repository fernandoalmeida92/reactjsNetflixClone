import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */              //[TRATA ERROS EXPORT ANONIMO]
export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

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
  },[]);

  // FAZENDO UM MANITORAMENTO DO SCROLL DA PAGE
  useEffect(()=>{
    //VARIAVEL DE MANITORAMENTO
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    //ADD O EVENTO SCROLL A FUNCAO
    window.addEventListener('scroll', scrollListener);

    //REMOVENDO O EVENTO 
    return () =>{
      window.removeEventListener('scroll', scrollListener);
    }
  },[]);

  return(
    <div className="page">
      <Header black={blackHeader}/>

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
      <footer>
        Feito com coração <span role="img" aria-label="coração"> &#128151;</span> pela B7Web<br/>
        Direitos de imagens para NETFLIX.<br/>
        Dados pegos do site Themoviedb.org 
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          < img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />  
        </div>
      }
    </div>
  )
}