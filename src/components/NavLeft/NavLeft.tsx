import React, { useState, useEffect } from 'react';
import api from 'config/api.config'
import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IEpisodes } from 'types';
import EventBus, { ShowEpisodeCharactersEvent } from 'utils/PubSubEvents/EventBus';
import './NavLeft.scss';
import { IShowEpisodeCharacters, ICharacter } from 'types'


// export interface NavLeftProps {
//   children?: React.ReactNode
// };



export function NavLeft() {
  const [episodes, setEpisodes] = useState<Array<IEpisodes> | any>()
  const [episodeCharacters, setEpisodeCharacters] = useState<IEpisodes>()
  const [runOnce, setRunOnce] = useState<boolean>(false)

  async function getEpisodes() {
    setRunOnce(true)
    const response = await api.get('/episode')
    setEpisodes(response.data.results)
    console.log('getepisodes', response.data.results);
  }

  async function showEpisodeCharacters(id: number) {
    const episode = episodes?.find(epi => epi.id === id)
    setEpisodeCharacters(episode)
    console.log('showEpisodeCharacters', episode.characters)
    return EventBus.publish('show-episode-characters', new ShowEpisodeCharactersEvent(episode.characters))

  }


  useEffect(() => {
    !runOnce ? getEpisodes() : void (0)
    console.log('useEffect', episodes)

    EventBus.subscribe('show-episode-characters', (event: IShowEpisodeCharacters) => {
      console.log('episodeCharacters', episodeCharacters)
    })
  }, []);

  return (
    <div className="vstack">
      <h3>Episodes</h3>
      <div className="nav">
        <nav>
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMin={610}
            autoHeightMax={610}
          >
            {episodes ? episodes.map(episode => (
              <NavLink 
                key={episode.id} 
                to={encodeURIComponent(episode.name.replace(/\s+/g, '-').toLowerCase())} 
                onClick={() => showEpisodeCharacters(episode.id)} 
                className="btn btn-outline-primary mx-auto my-3 text-start"
              >
                {episode.name}
              </NavLink>
              // encodeURIComponent(episode.name.replace(/\s+/g, '-').toLowerCase())
            )) : null
            }
          </Scrollbars>
        </nav>
      </div>
    </div>
  );
}

export default NavLeft

// {
//   "id": 1,
//   "name":"Rick Sanchez",
//   "status": "Alive",
//   "species": "Human",
//   "type": "",
//   "gender": "Male",
//   "origin": {
//   "name": "Earth (C-137)",
//   "url": "https://rickandmortyapi.com/api/location/1"
//   },
//   "location": {
//     "name": "Citadel of Ricks",
//     "url": "https://rickandmortyapi.com/api/location/3"
//   },
//   "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg", 
//   "episode": [
//     "https://rickandmortyapi.com/api/episode/1", 
//     "https://rickandmortyapi.com/api/episode/2", 
//     "https://rickandmortyapi.com/api/episode/3", 
//     "https://rickandmortyapi.com/api/episode/4", 
//     "https://rickandmortyapi.com/api/episode/5", 
//     "https://rickandmortyapi.com/api/episode/6", 
//     "https://rickandmortyapi.com/api/episode/7", 
//     "https://rickandmortyapi.com/api/episode/8", 
//     "https://rickandmortyapi.com/api/episode/9", 
//     "https://rickandmortyapi.com/api/episode/10", 
//     "https://rickandmortyapi.com/api/episode/11", 
//     "https://rickandmortyapi.com/api/episode/12", 
//     "https://rickandmortyapi.com/api/episode/13", 
//     "https://rickandmortyapi.com/api/episode/14", 
//     "https://rickandmortyapi.com/api/episode/15", 
//     "https://rickandmortyapi.com/api/episode/16", 
//     "https://rickandmortyapi.com/api/episode/17", 
//     "https://rickandmortyapi.com/api/episode/18", 
//     "https://rickandmortyapi.com/api/episode/19", 
//     "https://rickandmortyapi.com/api/episode/20", 
//     "https://rickandmortyapi.com/api/episode/21", 
//     "https://rickandmortyapi.com/api/episode/22", 
//     "https://rickandmortyapi.com/api/episode/23", 
//     "https://rickandmortyapi.com/api/episode/24", 
//     "https://rickandmortyapi.com/api/episode/25", 
//     "https://rickandmortyapi.com/api/episode/26", 
//     "https://rickandmortyapi.com/api/episode/27", 
//     "https://rickandmortyapi.com/api/episode/28", 
//     "https://rickandmortyapi.com/api/episode/29", 
//     "https://rickandmortyapi.com/api/episode/30", 
//     "https://rickandmortyapi.com/api/episode/31", 
//     "https://rickandmortyapi.com/api/episode/32", 
//     "https://rickandmortyapi.com/api/episode/33", 
//     "https://rickandmortyapi.com/api/episode/34", 
//     "https://rickandmortyapi.com/api/episode/35", 
//     "https://rickandmortyapi.com/api/episode/36", 
//     "https://rickandmortyapi.com/api/episode/37", 
//     "https://rickandmortyapi.com/api/episode/38", 
//     "https://rickandmortyapi.com/api/episode/39", 
//     "https://rickandmortyapi.com/api/episode/40", 
//     "https://rickandmortyapi.com/api/episode/41", 
//     "https://rickandmortyapi.com/api/episode/42", 
//     "https://rickandmortyapi.com/api/episode/43", 
//     "https://rickandmortyapi.com/api/episode/44", 
//     "https://rickandmortyapi.com/api/episode/45", 
//     "https://rickandmortyapi.com/api/episode/46", 
//     "https://rickandmortyapi.com/api/episode/47", 
//     "https://rickandmortyapi.com/api/episode/48", 
//     "https://rickandmortyapi.com/api/episode/49", 
//     "https://rickandmortyapi.com/api/episode/50", 
//     "https://rickandmortyapi.com/api/episode/51"
//   ], 
//   "url": "https://rickandmortyapi.com/api/character/1", 
//   "created": "2017-11-04T18:48:46.250Z"
// }
