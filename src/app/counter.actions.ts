import {createAction} from "@ngrx/store";

export const increment = createAction('[Counter Component] Increment');
export const doubleIncrement = createAction('[Counter Component] Double Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] reset');
