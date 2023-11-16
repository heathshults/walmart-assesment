import * as React from 'react';
import api from 'config/api.config'
import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import EventBus from 'utils/PubSubEvents/EventBus';
import { IShowEpisodeCharacters } from 'types'
import EpisodeCharacterDetails from 'components/EpisodeCharacterDetails';
import './CharacterList.scss';





export interface CharacterListProps {
  data?: string
  key: string
}
export default function CharacterList({data}:CharacterListProps): React.ReactElement<Promise<string>> {
  
  // eslint-disable-next-line prefer-const
  data ? console.log(data) : null
  let eventData: Record<string, any> | Record<string, any>[]
  let episodeCharacters: Record<string, any>
  const [characterData, setCharacterData] = React.useState<Array<Record<string, any>>>()
  // const [episodeCharacters, setEpisodeCharacters] = React.useState<Array<Record<string, any>>>()
  const [charactersOnEpisode, setCharactersOnEpisode] = React.useState<Array<Record<string, any>>>()
  let runOnce: boolean = false
  
  async function getCharacters() {
      const response = await api.get('/character')
      setCharacterData(response.data.results)
      console.log('characterData',response.data.results);
  }

  function loadEpisodeCharacters(data: Record<string, any>){
    episodeCharacters = data
  }


  React.useEffect(()=> {
    if (!data && !runOnce) {
      getCharacters()
    }

    EventBus.subscribe('show-episode-characters', (event: IShowEpisodeCharacters) => {
      alert('event')
      setTimeout(()=> {
      console.log('episodeData',event.episodeData)
        eventData = event?.episodeData as unknown as Array<Record<string, any>>
        loadEpisodeCharacters(eventData)
        console.log(eventData)
        
        setCharacterData([])
        // const coa = event?.episodeData as unknown as Array<Record<string, any>>
        
        console.log('useEffect EventBus.subscribe ', charactersOnEpisode)
      }, 2000)
    })
    console.log('charactersOnEpisode', eventData)
    }, []);


  return <>
    <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={699}
        autoHeightMax={699}
      >
        <div className="container align-items-stretch">
        <div className="row justify-content-evenly">
          
            { !charactersOnEpisode && characterData ? characterData.map(character => (
              <NavLink key={character.id} to={character.name.replace(/\s+/g, '-').toLowerCase()} className="col-2 my-3 mx-2">
                <img src={character.image} width="100%" height="auto"/>  
              </NavLink>
              )) : null 
            }


            { episodeCharacters ? episodeCharacters.map((index: number, characterUrl: string) => (
              
                <EpisodeCharacterDetails key={index} url={characterUrl} cssClass=""/>
              
                // <img src={`https://rickandmortyapi.com/api/character/avatar/${63}.jpeg`} width="100%" height="auto" alt={`character #${index}`}/>  
              
            )) : null 
            }


        </div>
        </div>
        </Scrollbars>
  </>;
}

const _CharacterList = CharacterList
export { _CharacterList as CharacterList }


// {
//   "type": "show-episode-characters",
//   "id": {},
//   "timestamp": "2023-11-16T04:05:39.367Z",
//   "episodeData": {
//     "id": 2,
//     "name": "Lawnmower Dog",
//     "air_date": "December 9, 2013",
//     "episode": "S01E02",
//     "characters": [
//       "https://rickandmortyapi.com/api/character/1",
//       "https://rickandmortyapi.com/api/character/2",
//       "https://rickandmortyapi.com/api/character/38",
//       "https://rickandmortyapi.com/api/character/46",
//       "https://rickandmortyapi.com/api/character/63",
//       "https://rickandmortyapi.com/api/character/80",
//       "https://rickandmortyapi.com/api/character/175",
//       "https://rickandmortyapi.com/api/character/221",
//       "https://rickandmortyapi.com/api/character/239",
//       "https://rickandmortyapi.com/api/character/246",
//       "https://rickandmortyapi.com/api/character/304",
//       "https://rickandmortyapi.com/api/character/305",
//       "https://rickandmortyapi.com/api/character/306",
//       "https://rickandmortyapi.com/api/character/329",
//       "https://rickandmortyapi.com/api/character/338",
//       "https://rickandmortyapi.com/api/character/396",
//       "https://rickandmortyapi.com/api/character/397",
//       "https://rickandmortyapi.com/api/character/398",
//       "https://rickandmortyapi.com/api/character/405"
//     ],
//     "url": "https://rickandmortyapi.com/api/episode/2",
//     "created": "2017-11-10T12:56:33.916Z"
//   }
// }
