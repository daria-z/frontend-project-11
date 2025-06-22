import { model } from "./model/index.js";
export const parseRss = (xmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, "text/xml");

  const error = doc.querySelector("parsererror");
  if (error) {
    model.error.handle(error, "parse");
    throw error;
  }

  const channel = {
    id: doc.querySelector("channel > link")?.textContent || "",
    title: doc.querySelector("channel > title")?.textContent || "",
    description: doc.querySelector("channel > description")?.textContent || "",
    link: doc.querySelector("channel > link")?.textContent || "",
  };

  const items = Array.from(doc.querySelectorAll("item")).map((item) => ({
    id: item.querySelector("guid")?.textContent || "",
    title: item.querySelector("title")?.textContent || "",
    description: item.querySelector("description")?.textContent || "",
    link: item.querySelector("link")?.textContent || "",
  }));

  return { channel, items };
};
