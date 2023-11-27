import * as React from 'react'
import axios from 'axios'
import { iGlobalConfig,} from 'types'


export const fetcher = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'Rick&Morty'}
});
 

export const config: iGlobalConfig = {
  go: fetcher,
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL
  },
  characters: [], // Add an empty array for characters
  currentEpisodeCharacters: [],
  allCharacters: [],
};

console.log('config', config)

export interface iGlobalProviderProps {
  children: React.ReactNode
}

export const GlobalVContext = React.createContext(config)
// export const GlobalVProvider = GlobalVContext.Provider
export function GlobalVProvider({children}:iGlobalProviderProps) {
  return (
    <GlobalVContext.Provider value={config}>
      {children}
    </GlobalVContext.Provider>
  )
}
export default GlobalVContext

// GlobalVProvider = config
/**  to use this context in a componennt:
 * import { GlobalVContext } from 'context/global-context' into App.tsx and
 * wrap the component in the Provider:
 * <GlobalVContext.Provider value={config}>
 * import { useContext } from 'react'
 * const gVars = useContext(GlobalVContext)
*/
