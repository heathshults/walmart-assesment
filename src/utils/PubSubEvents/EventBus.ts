import Observer, { Listener, IObserver } from "utils/PubSubEvents/EventObserver";
import { Events } from "types";

export * from "utils/PubSubEvents/Events";

type T = keyof Events;

type ObserversMap = {
  [Type in T]?: IObserver<Type>;
};

/* Singleton implementation of Global Event Bus */
export class EventBus {
  private static instance: EventBus;
  private observers: ObserversMap = {};

  private constructor() {}

  static getInstance() {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }

    return EventBus.instance;
  }

  public publish<Type extends T>(type: Type, event: Events[Type]): void {
    if (!EventBus.getInstance().observers[type]) {
      EventBus.getInstance().observers = {
        ...EventBus.getInstance().observers,
        [type]: new Observer<Type>(),
      };
    }

    EventBus.getInstance().observers[type].publish(event);
  }

  public subscribe<Type extends T>(
    type: Type,
    listener: Listener<Type>
  ): () => void {
    if (!EventBus.getInstance().observers[type]) {
      EventBus.getInstance().observers = {
        ...EventBus.getInstance().observers,
        [type]: new Observer<Type>(),
      };
    }

    return EventBus.getInstance().observers[type].subscribe(listener);
  }
}

export default EventBus.getInstance();
