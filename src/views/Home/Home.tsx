import * as React from 'react';
import CharacterList from 'components/CharacterList';
import './Home.scss';

// export interface HomeProps {
//     children?: React.ReactNode
// };

export function Home() {
  
  
  
  

  return (
    <>
    <div className="vstack">
      <h1 className="logo text-center mt-3">Characters</h1>
      <CharacterList/>
    </div>
    </>
  );
}

export default Home
