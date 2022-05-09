import { Store, Action, ReducersMapObject } from "redux";
import { AppContext } from "next/dist/pages/_app";

export interface AppCache {
  actionHandlers: ActionHandlers;
  store?: Store<any>;
  // Add a dictionary to keep track of the registered async reducers
  asyncReducers: ReducersMapObject<StateView, any>;
  // adds the async reducer, and creates a new combined reducer
  injectReducer: (
    namespace: string,
    asyncReducers: ReducersMapObject<StateView, any>
  ) => any;
}

export interface ActionHandlers {
  [key: string]: (...args: any[]) => any;
}

export interface StateView {
  [namespace: string]: any;
  "@error": ErrorState;
  "@loading": Partial<LoadingState>;
}

export interface ErrorState {
  runtimeException: any;
  apiException: any;
}

export interface LoadingState {
  [loadingType: string]: number;
}

export interface ActionType<P = any> extends Action {
  name?: string;
  payload: P;
}

export interface ActionPayload {
  module: string;
  state: object;
}

export abstract class BaseModel<S = {}, R = any> {
  abstract readonly moduleName: string;
  abstract readonly initState: S;
  abstract state: Readonly<S>;
  abstract rootState: Readonly<R>;
  abstract setState(newState: Partial<S>): void;
  abstract resetState(): void;
  async onReady(_context?: AppContext): Promise<any> {
    // Extends to be overrode
    // Execute on the server or execute on the client before module render
    // Similar to getInitialProps in nextjs
  }
  async onLoad(): Promise<any> {
    // Extends to be overrode
    // Similar to componentDidMount
  }
  async onUpdate(): Promise<any> {
    // Extends to be overrode
    // Similar to componentDidUpdate
  }
  async onUnload(): Promise<any> {
    // Extends to be overrode
    // Similar to componentWillUnMount
  }
  async onShow(): Promise<any> {
    // Extends to be overrode
    // Display in viewport
  }
  async onHide(): Promise<any> {
    // Extends to be overrode
    // Disappear in viewport
  }
}

export abstract class Exception {
  protected constructor(public message: string) {}
}


export interface StartOptons {
  withAction: boolean; // 是否生成action
  withDispatch: boolean; // 是否生成dispatch action
  withEffect: boolean; // 是否生成副作用函数
}

export type PageContext = AppContext;