import * as React from 'react';
import CharacterList from 'components/CharacterList';
import './Home.scss';

export interface HomeProps {
    children?: React.ReactNode
};

export function Home({ children }: HomeProps) {

  return (
    <>
      <div className="vstack">
        <h1 className="logo text-left mt-3 px-3">Characters</h1>
        <CharacterList />
        { children }
      </div>
    </>
  );
}

export default Home
