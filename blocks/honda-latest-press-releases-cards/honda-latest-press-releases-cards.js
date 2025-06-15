async function fetchChildPages(directoryPath) {
  try {
    const response = await fetch(`/api/get-pages?path=${directoryPath}`); // Example endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch child pages:", error);
    return [];
  }
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  const url = block.children[0].textContent.trim();
  const count = block.children[1].textContent.trim();

  var counter = 0;
  fetchChildPages(url).then(pages => {
    console.log(pages); // Array of child pages
    [...pages.children].forEach((page) => {
    const li = document.createElement('li');

      if (page.firstElementChild || counter < count) {
      li.append(page.firstElementChild);
      ul.append(li);
      counter++;
      }
    
    });
  });
}
