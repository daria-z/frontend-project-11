import state from "../state.js";

export const handle = (error, type) => {
  switch (type) {
    case "fetch":
      state.ui.status = "error";
      state.ui.error = "network";
      console.error("Network error:", type, error);
      break;
    case "parse":
      state.ui.status = "error";
      state.ui.error = "noRss";
      console.error("Parse error:", type, error);
      break;
    default:
      state.ui.status = "error";
      state.ui.error = "no_details";
      console.error("Unknown error:", error);
      break;
  }
};
