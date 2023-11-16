import React from 'react';
import api from 'config/api.config'
import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';

import './CharacterList.scss';





export interface CharacterListProps {
  page?: number
};

export function CharacterList({page}:CharacterListProps) {
  const [characterData,setCharacterData] = React.useState<Array<any>>()
  
  
  async function getCharacters() {
      const response = await api.get('/character')
      setCharacterData(response.data.results)
      console.log('characterData',response.data.results);
  }


  React.useEffect(()=> {
    getCharacters()
    console.log(characterData)
    }, []);


  return (
    <>
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
                <img src={character.image} width="100%" height="auto"/>  
              </NavLink>
              )) : null 
            }
          </div>
          </div>
          </Scrollbars>
    </>
  );
};

export default CharacterList
