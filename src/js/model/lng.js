import state from "../state.js";

export const handle = (value) => {
  state.ui.lng = value;
};
