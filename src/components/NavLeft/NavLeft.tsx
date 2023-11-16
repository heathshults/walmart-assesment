import * as React from 'react';
import api from 'config/api.config'
import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import './NavLeft.scss';


// export interface NavLeftProps {
//   children?: React.ReactNode
// };

export interface IEpisodes {
    id:         number;
    name:       string;
    air_date:   string;
    episode:    string;
    characters: string[];
}

export function NavLeft() {
  const [episodes,setEpisodes] = React.useState<Array<IEpisodes>>()
  
  
  async function getEpisodes() {
      const response = await api.get('/episode')
      setEpisodes(response.data.results)
      console.log('episodes',response.data.results);
  }


React.useEffect(()=> {
  getEpisodes()
  console.log(episodes)
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
          { episodes ? episodes.map(episode => (
             <NavLink key={episode.id} to={episode.name.replace(/\s+/g, '-').toLowerCase()} className="btn btn-outline-primary mx-auto my-3 text-start">{episode.name}</NavLink>
            )) : null 
          }
          </Scrollbars>
        </nav>
      </div>
    </div>
  );
};

export default NavLeft
