import * as React from 'react';
import EventBus from 'utils/PubSubEvents/EventBus'
import GlobalVContext from 'context/global-context';
import { NavLink } from 'react-router-dom';
import './EpisodeCharacterDetails.scss';
import api from 'config/api.config';



export function EpisodeCharacterDetails(props){
  const {data, cssClass} = props
  let eventData
  const [episodeCharacterUrl, setEpisodeCharacterUrl] = React.useState([]);
  const [characterUrlList, setCharacterUrlList] = React.useState([])
  const gvars = React.useContext(GlobalVContext)
    

  React.useEffect(() => {
    EventBus.subscribe('show-episode-characters', (event) => {
      eventData = event.episodeData;
      console.log('character details urls: ', eventData)
    }); 

  })
  


    return (
      <>
        <div className="container">
          <div className="row">
            { eventData ? 
            eventData.map(url => {
              const response = api.get(url)
              
              console.log('character details', response.data)
            }) : null}
          </div>
        </div>
      </>
    )
  }

  


export default EpisodeCharacterDetails


/* 
<figure key={index}  className="col-2 my-3 mx-2 character-display" style={{backgroundImage: character.image}}>
  <span className='character-display-name'>
    {character.name}
    <span className="character-display-info">
      Status: {character.status} <br/>
      Species: {character.species}
    </span>
  </span>
</figure>

*/

/** 
 * Character details model
 * {"id":1,"name":"Rick Sanchez","status":"Alive","species":"Human","type":"","gender":"Male","origin":{"name":"Earth (C-137)","url":"https://rickandmortyapi.com/api/location/1"},"location":{"name":"Citadel of Ricks","url":"https://rickandmortyapi.com/api/location/3"},"image":"https://rickandmortyapi.com/api/character/avatar/1.jpeg","episode":["https://rickandmortyapi.com/api/episode/1","https://rickandmortyapi.com/api/episode/2","https://rickandmortyapi.com/api/episode/3","https://rickandmortyapi.com/api/episode/4","https://rickandmortyapi.com/api/episode/5","https://rickandmortyapi.com/api/episode/6","https://rickandmortyapi.com/api/episode/7","https://rickandmortyapi.com/api/episode/8","https://rickandmortyapi.com/api/episode/9","https://rickandmortyapi.com/api/episode/10","https://rickandmortyapi.com/api/episode/11","https://rickandmortyapi.com/api/episode/12","https://rickandmortyapi.com/api/episode/13","https://rickandmortyapi.com/api/episode/14","https://rickandmortyapi.com/api/episode/15","https://rickandmortyapi.com/api/episode/16","https://rickandmortyapi.com/api/episode/17","https://rickandmortyapi.com/api/episode/18","https://rickandmortyapi.com/api/episode/19","https://rickandmortyapi.com/api/episode/20","https://rickandmortyapi.com/api/episode/21","https://rickandmortyapi.com/api/episode/22","https://rickandmortyapi.com/api/episode/23","https://rickandmortyapi.com/api/episode/24","https://rickandmortyapi.com/api/episode/25","https://rickandmortyapi.com/api/episode/26","https://rickandmortyapi.com/api/episode/27","https://rickandmortyapi.com/api/episode/28","https://rickandmortyapi.com/api/episode/29","https://rickandmortyapi.com/api/episode/30","https://rickandmortyapi.com/api/episode/31","https://rickandmortyapi.com/api/episode/32","https://rickandmortyapi.com/api/episode/33","https://rickandmortyapi.com/api/episode/34","https://rickandmortyapi.com/api/episode/35","https://rickandmortyapi.com/api/episode/36","https://rickandmortyapi.com/api/episode/37","https://rickandmortyapi.com/api/episode/38","https://rickandmortyapi.com/api/episode/39","https://rickandmortyapi.com/api/episode/40","https://rickandmortyapi.com/api/episode/41","https://rickandmortyapi.com/api/episode/42","https://rickandmortyapi.com/api/episode/43","https://rickandmortyapi.com/api/episode/44","https://rickandmortyapi.com/api/episode/45","https://rickandmortyapi.com/api/episode/46","https://rickandmortyapi.com/api/episode/47","https://rickandmortyapi.com/api/episode/48","https://rickandmortyapi.com/api/episode/49","https://rickandmortyapi.com/api/episode/50","https://rickandmortyapi.com/api/episode/51"],"url":"https://rickandmortyapi.com/api/character/1","created":"2017-11-04T18:48:46.250Z"}
/*

<div key={index} className="col-2 my-3 mx-2">
    <figure className="character-display" style={{backgroundImage: character.image}}>
      <span className='character-display-name'>
        {character.name}
        <span className="character-display-info">
          Status: {character.status} <br/>
          Species: {character.species}
        </span>
      </span>
    </figure>

  </div>
*/
