import * as React from 'react';
import api from 'config/api.config'
import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import EventBus from 'utils/PubSubEvents/EventBus';
import EpisodeCharacterDetails from 'components/EpisodeCharacterDetails';
import GlobalVContext from 'context/global-context';
import { CharacterListProps } from 'types/types';

import './CharacterList.scss';

export default function CharacterList({cssClass}: CharacterListProps) {
  let eventData = null
  const [currentEpisodeCharacters, setCurrentEpisodeCharacters] = React.useState([])
  const [characterData, setCharacterData] = React.useState([])
  const gvars = React.useContext(GlobalVContext)
  const runOnce = React.useRef(false)
  const [showEpisodeCharacters, setShowEpisodeCharacters] = React.useState(false)

  // Gets all characters
  async function getCharacters() {
    const response = await api.get('/character')
    setCharacterData(response.data.results);
    gvars.allCharacters = response.data.results
    console.log('characterData top', characterData)
  }

  React.useEffect(() => { getCharacters() }, [])

  interface EpisodeCharacterDetailsProps {
    data: any
    cssClass: string
  }

  const EpisodeCharactersRenderer = ({data, cssClass}: EpisodeCharacterDetailsProps) => {
    return (
      data.map(async url => {
        const response = await api.get(url)
        setCurrentEpisodeCharacters(prevState => [...prevState, response.data])
        console.log('handleShowEpisodeCharacters', response.data)
        return (  
          <>
            {/*<NavLink
                key={response.data.id + Math.random()}
                to={encodeURIComponent(response.data.name.replace(/\s+/g, '-').toLowerCase())}
                className={`col-2 my-3 mx-2 ${cssClass}`}
              >
                <img src={response.data.image} alt={response.data.name} />
              </NavLink> */}
              { showEpisodeCharacters ?
              <figure key={response.data.id + Math.random()}  className={`col-2 my-3 mx-2 character-display ${cssClass}`} style={{backgroundImage: response.data.image}}>
              <span className='character-display-name'>
                {response.data.name}
                <span className="character-display-info">
                  Status: {response.data.status} <br/>
                  Species: {response.data.species}
                </span>
              </span>
            </figure> : null }
            </>
          )
   
      })
    )
  }

  React.useEffect(() => {

    EventBus.subscribe('show-episode-characters', (event => {
      eventData = event?.episodeData
      setCharacterData([])
      setShowEpisodeCharacters(true)
      console.log('eventData', event?.episodeData)
    }))
  }, []);


  interface CharacterListProps {
    data: any
    cssClass: string
  }

  const CharacterListRenderer = ({data, cssClass}:CharacterListProps) => {
    return (
      <>
        {data ?
          data.map(character => {
            return (
              <NavLink
                key={character.id + Math.random()}
                to={encodeURIComponent(character.name.replace(/\s+/g, '-').toLowerCase())}
                className={`col-2 my-3 mx-2 ${cssClass}`}
              >
                <img src={character.image} alt={character.name} />
              </NavLink>
            )
          })
          : null}
      </>
    )
  }

  return (
   <>
       <Scrollbars
          autoHide
          autoHeight
          autoHeightMin={699}
          autoHeightMax={699}
        > 
    <div className={`container align-items-stretch`}>
      <div className="row justify-content-evenly">
        <>
          {console.log('rendering character list', characterData)}
        </>
        <>
          {characterData ?
            <CharacterListRenderer data={characterData} cssClass="character-image" />
          : null}
        </>
        <>
          {eventData ? (
            <>
        
              <EpisodeCharactersRenderer
                cssClass="character-image"
                data={eventData}
              />
            </>
          ) : null}
        </>

      </div>
    </div>
    </Scrollbars>
    </>
  );
}

const _CharacterList = CharacterList
export { _CharacterList as CharacterList }
//   "https://rickandmortyapi.com/api/character/435"

/*
 
*/