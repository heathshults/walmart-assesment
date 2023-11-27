import * as React from 'react';
import api from 'config/api.config'
import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import EventBus from 'utils/PubSubEvents/EventBus';
import GlobalVContext from 'context/global-context';
import { CharacterListProps, IEpisodes } from 'types/types';

import css from './CharacterList.module.scss';

export default function CharacterList({ cssClass }: CharacterListProps) {
  const [eventData, setEventData] = React.useState<Array<string>>([])
  const [characterData, setCharacterData] = React.useState([])
  const gvars = React.useContext(GlobalVContext)
  const [showEpisodeCharacters, setShowEpisodeCharacters] = React.useState(false)

  // Gets all characters
  async function getCharacters() {
    const response = await api.get('/character')
    setCharacterData(response.data.results);
    gvars.allCharacters = response.data.results
    console.log('characterData top', characterData)
  }

  React.useEffect(() => { getCharacters() }, [])

  React.useEffect(() => {
    EventBus.subscribe('show-episode-characters', (event => {
      setEventData(event?.episodeData)
      setCharacterData([])
      setShowEpisodeCharacters(true)
      console.log('eventData-eventbus', event?.episodeData)
    }))
  }, []);


  interface EpisodeCharacterDetailsProps {
    data: Array<string>
    cssClass: string
  }

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

  interface CharacterListProps {
    data: any
    cssClass: string
  }

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
                style={{ width: '33.333333%' }}
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
