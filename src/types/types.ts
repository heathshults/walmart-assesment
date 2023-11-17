import * as React from 'react'
import axios, {AxiosInstance}  from 'axios'
export interface iGlobalV {
  children: React.ReactNode
}
  
  export interface iGlobalConfig {
    go?: AxiosInstance
    api: {
      baseUrl?: string
    }
  }
  export interface ICharacters {
    info:    PagingInfo;
    results: ICharacter;
  }
  
  export interface PagingInfo {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
  }
  
  export interface ICharacter {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   ICharacterLocation;
    location: ICharacterLocation;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
  }
  
  export interface ICharacterLocation {
    name: string;
    url:  string;
  }
  
  export interface IEpisodes {
    id:         number;
    name:       string;
    air_date:   string;
    episode:    string;
    characters: string[];
  }
  
  export type EventType = 'theme-change' | 'show-episode-characters' | 'load-default-characters';
  
  /* Base Event */
  export interface IBaseEvent {
    id: Promise<() => string> | string;
    type: EventType;
    timestamp: Date;
  }

/* Event Interfaces */
export interface IShowEpisodeCharacters extends IBaseEvent {
  episodeData: IEpisodes;
}
export interface ILoadDefaultCharacters extends IBaseEvent {
  characterData: ICharacter;
}

export interface IThemeChange extends IBaseEvent {
  theme: 'light' | 'dark';
}

/* Global Events Interface */
export interface Events {
  'show-episode-characters': IShowEpisodeCharacters;
  'theme-change': IThemeChange;
  'load-default-characters': ILoadDefaultCharacters;
}

