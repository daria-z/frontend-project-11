import { createModel } from "./model";
import { createView } from "./view";

const model = createModel();
const view = createView();

view.bindInputChange((value) => {
  model.updateInputValue(value);
  const errors = model.getErrors();
  view.renderErrors(errors);
});

view.bindAddFeed((value) => {
  model.addRssFeed(value);
});











