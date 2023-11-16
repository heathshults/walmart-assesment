import { EventType, IBaseEvent, IShowEpisodeCharacters, IThemeChange, ILoadDefaultCharacters, ICharacter, IEpisodes } from "types";
import keyGen from "utils/generateKey";

class BaseEvent implements IBaseEvent {
  public id: Promise<() => string> | string;
  public timestamp: Date;

  constructor(public type: EventType) {
    this.id = keyGen.guid();
    this.timestamp = new Date();
  }
}

export class ShowEpisodeCharactersEvent extends BaseEvent implements IShowEpisodeCharacters {
  constructor(public episodeData: IEpisodes) {
    super("show-episode-characters");
  }
}

export class LoadDefaultCharactersEvent extends BaseEvent implements ILoadDefaultCharacters {
  constructor(public characterData: ICharacter) {
    super("load-default-characters");
  }
}

export class ThemeChangeEvent extends BaseEvent implements IThemeChange {
  constructor(public theme: "light" | "dark") {
    super("theme-change");
  }
}
