import * as React from 'react';
import logo from 'assets/img/21428161947-rick-and-morty-logo-png.webp'
import NavLeft from 'components/NavLeft'
import { Outlet } from 'react-router-dom';
import './Layout2Column.scss';

export interface Layout2ColumnProps {
  children?: React.ReactNode
}

export function Layout2Column() {

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="layout">
          <header className="header">
            <img src={logo} width="300" alt="Rick and Morty"/>
          </header>
          <main className="content">
            
            
            <aside className="nav-left">
              <div className="nav-left-content">
                <NavLeft/>
              </div>
            </aside>
            <section className="main-content">
              <Outlet />
            </section>
          </main>
          <footer className="footer">footer</footer>
        </div>
      
      </div>
    </>
  );
}

export default Layout2Column
