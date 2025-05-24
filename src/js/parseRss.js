export const parseRss = (xmlSting) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlSting, 'application/xml');

  const error = doc.querySelector("parsererror");
  if (error) {
    throw new Error('ошибка парсинга xml');
  }

  const channel = {
    title: doc.querySelector("channel > title")?.textContent || "",
    description: doc.querySelector("channel > description")?.textContent || "",
  };

  const items = Array.from(doc.querySelectorAll("item")).map((item) => ({
    title: item.querySelector("title")?.textContent || "",
    description: item.querySelector("description")?.textContent || "",
    link: item.querySelector("link")?.textContent || "",
  }));

  console.log(channel, items);
};





