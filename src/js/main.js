import { createModel } from "./model";
import { createView } from "./view";

const model = createModel();
const view = createView();

view.bindInputChange((value) => {
  model.updateInputValue(value);
  view.renderErrors(null);
});

view.bindAddFeed(() => {
  model.validateInput()
    .then((value) => {
      model.addRssFeed(value);
      view.renderErrors(null);
      model.updateInputValue("");
    })
    .catch(() => {
      view.renderErrors(model.getErrors());
    });
});
