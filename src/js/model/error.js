import state from "../state.js";

export const handle = (error, type) => {
  switch (type) {
    case "fetch":
      console.error("Network error:", type, error);
      state.ui.error = "network";
      break;
    case "parse":
      console.error("Parse error:", type, error);
      state.ui.error = "noRss";
      break;
    default:
      console.error("Unknown error:", error);
      state.ui.error = "no_details";
      break;
  }
};
