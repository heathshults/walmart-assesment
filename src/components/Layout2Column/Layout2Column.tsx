import * as React from 'react';
import logo from 'assets/img/21428161947-rick-and-morty-logo-png.webp'
import { NavLink } from 'react-router-dom'
import NavLeft from 'components/NavLeft'
import { Outlet } from 'react-router-dom'
import GlobalVContext from 'context/global-context';
import EventBus, { LoadDefaultCharactersEvent } from 'utils/PubSubEvents/EventBus'
import './Layout2Column.scss'

export interface Layout2ColumnProps {
  children?: React.ReactNode
}

export function Layout2Column() {
  const gvars = React.useContext(GlobalVContext)
  const loadHomePageContent = () => {
    EventBus.publish('load-default-characters', new LoadDefaultCharactersEvent(true))
  }

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="layout">
          <header className="header">
            <NavLink to="/home" className="logo" onClick={loadHomePageContent}>
              <img src={logo} width="300" alt="Rick and Morty" />
            </NavLink>
          </header>
          <main className="content">


            <aside className="nav-left">
              <div className="nav-left-content">
                <NavLeft />
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
