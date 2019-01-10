import {Action} from 'redux';

/**
 * https://github.com/acdlite/flux-standard-action
 */
export default interface IAction<T> extends Action<string> {
    readonly type: string;
    readonly payload?: T;
    readonly error?: boolean;
    readonly meta?: any;
}
