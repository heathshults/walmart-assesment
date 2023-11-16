import React, { useState } from 'react';
import api from 'config/api.config'
import EventBus from 'utils/PubSubEvents/EventBus'
import './EpisodeCharacterDetails.scss';

import { ICharacter } from 'types'
import { AxiosResponse } from 'axios';

export interface EpisodeCharacterDetailsProps {
  url: string
  cssClass: string
}

export function EpisodeCharacterDetails({url, cssClass}:EpisodeCharacterDetailsProps) {
  const [character, setCharacter] = React.useState<Record<string, any>>();
  const [episodeCharacters, setEpisodeCharacters] = React.useState<ICharacter>()
  let response: AxiosResponse<ICharacter>
  
  async function getCharacter() {
    response = await api.get(url)
    setCharacter(response)
    console.log('characterDetails', response)
  }
React.useEffect(()=> {
  url ? getCharacter() : null

  EventBus.subscribe('show-episode-characters', 
  (event: any) => {

  })
})



  return (
    <>
        {/* src={`https://rickandmortyapi.com/api/character/avatar/${63}.jpeg`}  */}
      {
        <figure className={`character-display ${cssClass}`} style={{backgroundImage: character.image, }}>
          <span className="character-display-name">{character.name}</span>
        </figure> 
      }
    </>
  );
}

export default EpisodeCharacterDetails


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
