import * as React from 'react'
import axios, {AxiosInstance}  from 'axios'
import { iGlobalV,iGlobalConfig,} from 'types'


export const fetcher = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'Rick&Morty'}
});


export const config: iGlobalConfig = {
  go: fetcher,
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL
  }

}
console.log(config)

export interface iGlobalVContext {
  children: React.ReactNode
  Provider: React.FC
  value: iGlobalConfig
}

export const GlobalVContext = React.createContext(config)
export const GlobalVContextProvider = ({children}: iGlobalV) => {
  const Global:iGlobalConfig = config
  // @ts-expect-error
  return <GlobalVContext.Provider value={GlobalVContext}>{children}</GlobalVContext.Provider>
}


export default GlobalVContextProvider
