import * as React from 'react';
import api from 'config/api.config'
import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import EventBus from 'utils/PubSubEvents/EventBus';
import { IShowEpisodeCharacters } from 'types'
import EpisodeCharacterDetails from 'components/EpisodeCharacterDetails';
import GlobalVContext from 'context/global-context';
import { generateAESKey } from 'utils/generateKey';

import './CharacterList.scss';





export interface CharacterListProps {
  data?: string
  key?: string
}
export default function CharacterList({data}:CharacterListProps): React.ReactElement<Promise<string>> {
  
  // eslint-disable-next-line prefer-const
  console.log(data)
  const [eventData, setEventData] = React.useState<Array<string>>([])
  const [currentEpisodeCharacters, setCurrentEpisodeCharacters] = React.useState<Array<string>>([])
  const [characterData, setCharacterData] = React.useState<Array<Record<string, any>>>()
  const [charactersOnEpisode, setCharactersOnEpisode] = React.useState<Array<string>>()
  const gvars = React.useContext(GlobalVContext)
  const runOnce = React.useRef(false)
  
  async function getCharacters() {
    if (runOnce) console.info('Can only run getCharacters one time and it has definitely ran.')
    const response = await api.get('/character')
    setCharacterData(response.data.results)
    gvars.characters = characterData
    console.log('characterData',response.data.results)     
  }
  
  
  function loadEpisodeCharacters(data: Array<string>) {
    console.log('loadEpisodeCharacters', data)
    setCurrentEpisodeCharacters(data)
    // const test = data.map((characterUrl: string) => {JSON.stringify(characterUrl)})
  }
  
  
  React.useEffect(()=> {
    
    if (!data && !runOnce.current) {
      getCharacters()
      runOnce.current = true
    }

    EventBus.subscribe('show-episode-characters', (event: IShowEpisodeCharacters) => {
      
      // setTimeout(()=> {
      console.log('episodeData',event.episodeData)
      setEventData(event?.episodeData as unknown as Array<string>)
        loadEpisodeCharacters(eventData)
        console.log('bottom of subscribe',eventData)
        
        
        // const coa = event?.episodeData as unknown as Array<Record<string, any>>
        
        console.log('useEffect EventBus.subscribe ', charactersOnEpisode)
      // }, 2000)
    })
    console.log('charactersOnEpisode', eventData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log('gvars.characters',gvars.characters)

  return <>
    <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={699}
        autoHeightMax={699}
      >
        <div className="container align-items-stretch">
        <div className="row justify-content-evenly">
          
            { characterData ? characterData.map(character => (
              <NavLink key={character.id} to={character.name.replace(/\s+/g, '-').toLowerCase()} className="col-2 my-3 mx-2">
                <img src={character.image} width="100%" height="auto" alt="character.namecharacter.name"/>  
              </NavLink>
              )) : null 
            }


            { eventData ? 
              <>
              {/* <div key={generateAESKey as unknown as React.Key} className="col-2 my-3 mx-2">
                {characterUrl}
              </div> */}
              <EpisodeCharacterDetails 
                cssClass="d-inline"
                data={eventData}
              />
              
              
            </> 
            : null 
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
// const urlList = [
//   "https://rickandmortyapi.com/api/character/1",
//   "https://rickandmortyapi.com/api/character/2",
//   "https://rickandmortyapi.com/api/character/35",
//   "https://rickandmortyapi.com/api/character/38",
//   "https://rickandmortyapi.com/api/character/62",
//   "https://rickandmortyapi.com/api/character/92",
//   "https://rickandmortyapi.com/api/character/127",
//   "https://rickandmortyapi.com/api/character/144",
//   "https://rickandmortyapi.com/api/character/158",
//   "https://rickandmortyapi.com/api/character/175",
//   "https://rickandmortyapi.com/api/character/179",
//   "https://rickandmortyapi.com/api/character/181",
//   "https://rickandmortyapi.com/api/character/239",
//   "https://rickandmortyapi.com/api/character/249",
//   "https://rickandmortyapi.com/api/character/271",
//   "https://rickandmortyapi.com/api/character/338",
//   "https://rickandmortyapi.com/api/character/394",
//   "https://rickandmortyapi.com/api/character/395",
//   "https://rickandmortyapi.com/api/character/435"
// ]
