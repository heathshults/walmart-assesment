import * as React from 'react';
import api from 'config/api.config'
import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import EventBus from 'utils/PubSubEvents/EventBus';
import GlobalVContext from 'context/global-context';
import { CharacterListProps } from 'types/types';

import css from './CharacterList.module.scss';

export default function CharacterList({ cssClass }: CharacterListProps) {
  const [runOnce, setRunOnce] = React.useState<boolean>(false)
  const [eventData, setEventData] = React.useState<Array<string>>([])
  const [characterData, setCharacterData] = React.useState([])
  const gvars = React.useContext(GlobalVContext)
  const [showEpisodeCharacters, setShowEpisodeCharacters] = React.useState(false)
  const [pageTitle, setPageTitle] = React.useState<string>('Characters')

  // Gets all characters
  const getCharacters = React.useCallback(async () => {
    setRunOnce(true)
    setPageTitle('Characters')
    const response = await api.get('/character')
    setCharacterData(response.data.results);
    gvars.allCharacters = response.data.results
    console.log('characterData top', characterData)
  }, [])


  React.useEffect(() => {

    // Listen for show-episode-characters event to show episode characters
    EventBus.subscribe('show-episode-characters', (event => {
      setEventData(event?.episodeData)
      setCharacterData([])
      setShowEpisodeCharacters(true)
      setPageTitle(`${gvars.currentEpisode} Characters`)
      console.log('eventData-eventbus', event?.episodeData)
    }))

    // Listen for load-default-characters event to load default characters
    EventBus.subscribe('load-default-characters', (event => {
      event?.loadDefaultData ? getCharacters() : void (0)
      setEventData([])
      setShowEpisodeCharacters(false)
      setCharacterData(gvars.allCharacters)
      setPageTitle('Characters')
    }))
    
    !runOnce ? getCharacters() : void (0)
  }, []);


  interface EpisodeCharacterDetailsProps {
    data: Array<string>
    cssClass: string
  }

  // Renders episode characters
  const EpisodeCharactersRenderer = ({ data, cssClass }: EpisodeCharacterDetailsProps) => {
    const container = React.useRef<HTMLDivElement>(null)

    if (data) data.map(url => api.get(url)
      .then(response => response.data)
      .then(data => {
        console.log('data', data)

        const element = `
          <div 
            key="${data.id + Math.random()}"
            class="ratio ratio-1x1 p-2"
            style="background-image: url('${data.image}'); background-size: cover; background-position: top center;"
          >
            <span class='${css.characterDisplayName}'>
              ${data.name}
              <span class='${css.characterDisplayInfo}'>
                Status: ${data.status} <br />
                Species: ${data.species}
              </span>
            </span>
          </div>
          `

        const character = document.createElement('div')
        character.classList.add('my-3', 'mx-2', cssClass, css.characterDisplay)
        character.innerHTML = element

        container.current?.appendChild(character)
      }))


    return (
      <>
        {showEpisodeCharacters ?
          <div ref={container} className="w-100 100vh"></div>
          : null}
      </>

    )
  }

  interface ISingleCharacter {
    id: number; 
    name: string; 
    image: string;
  }

  interface CharacterListProps {
    data: Array<ISingleCharacter>
    cssClass: string
  }

  // Renders all characters
  const CharacterListRenderer = ({ data, cssClass }: CharacterListProps) => {
    return (
      <>
        {data ?
          data.map((character: { id: number; name: string; image: string; }) => {
            return (
              <NavLink
                key={character.id + Math.random()}
                to={encodeURIComponent(character.name.replace(/\s+/g, '-').toLowerCase())}
                className={`col-2 my-3 mx-2 ${cssClass}`}
                style={{ width: '25%' }}
              >
                <img src={character.image} alt={character.name} className={css.characterImage} />
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
        <div className={`container align-items-stretch  ${cssClass}`}>
        <h1 className="logo text-left mt-3 px-3">{ pageTitle }</h1>
          <div className="row justify-content-evenly">
            <span className="mx-auto">
              <>
                {characterData ?
                  <CharacterListRenderer data={characterData} cssClass="d-inline-flex" />
                  : null}
                {eventData ?

                  <EpisodeCharactersRenderer cssClass="d-inline-flex" data={eventData} />
                  : null}
              </>

            </span>
          </div>
        </div>
      </Scrollbars>
    </>
  );
}

const _CharacterList = CharacterList
export { _CharacterList as CharacterList }
