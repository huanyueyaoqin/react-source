import * as TYPES from "../action-types";

let initialState = { num: 0 };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.INCREMENT1:
      return { num: state.num + 1 };
    case TYPES.DECREMENT1:
      return { num: state.num - 1 };
    default:
      return state;
  }
}
