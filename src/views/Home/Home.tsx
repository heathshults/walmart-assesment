import * as React from 'react';
import CharacterList from 'components/CharacterList';
import './Home.scss';

export interface HomeProps {
    children?: React.ReactNode
}

export function Home({ children }: HomeProps) {

  return (
    <>
      <div className="vstack">
        
        <CharacterList />
        { children }
      </div>
    </>
  );
}

export default Home
