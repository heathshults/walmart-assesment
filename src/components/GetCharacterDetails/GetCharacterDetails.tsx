import React from 'react';
import api from 'config/api.config'
import { AxiosResponse } from 'axios'
import './GetCharacterDetails.scss';

import { ICharacter } from 'types'

export interface GetCharacterDetailsProps {
  url: string
}

export function GetCharacterDetails({url}:GetCharacterDetailsProps) {
  const [character, setCharacter] = React.useState<Record<string, any>>();

  async function getCharacter() {
    const response = api.get(url)
    console.log('response', response)
  }


  return (
    <>
        {/* src={`https://rickandmortyapi.com/api/character/avatar/${63}.jpeg`}  */}
      <div className="character-display" style={{backgroundImage: character.image, }}>
        <span className="character-display-name">{character.name}</span>
      </div>
    </>
  );
}

export default GetCharacterDetails


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
