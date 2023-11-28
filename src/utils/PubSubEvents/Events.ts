import { EventType, IBaseEvent, IShowEpisodeCharacters, IThemeChange, ILoadDefaultCharacters, ICharacter, IEpisodes } from "types";
import keyGen from "utils/generateKey";

/**
 * @description
 * @class BaseEvent
 * @implements {IBaseEvent}
 */
class BaseEvent implements IBaseEvent {
  public id: Promise<() => string> | string;
  public timestamp: Date;

  constructor(public type: EventType) {
    this.id = keyGen.guid();
    this.timestamp = new Date();
  }
}

/**
 * @description ShowEpisodeCharactersEvent class creates an event to show episode characters.
 * @class ShowEpisodeCharactersEvent
 * @extends {BaseEvent}
 * @implements {IShowEpisodeCharacters}
 */
export class ShowEpisodeCharactersEvent extends BaseEvent implements IShowEpisodeCharacters {
  constructor(public episodeData: []) {
    super("show-episode-characters");
  }
}

/**
 * @description LoadDefaultCharactersEvent class creates an event to load default characters.
 * @class LoadDefaultCharactersEvent
 * @extends {BaseEvent}
 * @implements {ILoadDefaultCharacters}
 */
export class LoadDefaultCharactersEvent extends BaseEvent implements ILoadDefaultCharacters {
  constructor(public loadDefaultData: boolean) {
    super("load-default-characters");
  }
}

/**
 * @description ThemeChangeEvent class creates an event to change theme.
 * @class ThemeChangeEvent
 * @extends {BaseEvent}
 * @implements {IThemeChange}
 */
export class ThemeChangeEvent extends BaseEvent implements IThemeChange {
  constructor(public theme: "light" | "dark") {
    super("theme-change");
  }
}
