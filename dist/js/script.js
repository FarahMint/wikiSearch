// https://www.mediawiki.org/wiki/API:Main_page
https://www.mediawiki.org/wiki/Special:ApiSandbox#action=query&format=json&origin=*&prop=&list=search&srsearch=apple




//var
const input = document.querySelector(".main-search");
const searchBtn = document.querySelector(".main-btn");

//event
searchBtn.addEventListener("click", searchWiki);

//function

function searchWiki(e) {
  e.preventDefault();
  showGif("show");
  // get search value
  let searchValue = input.value;

  // api
  const origin = "https://en.wikipedia.org";
  const url = `${origin}/w/api.php?action=query&format=json&origin=*&prop=&list=search&srsearch=${searchValue}`;

  fetch(url)
    .then(data => {
      return data.json();
    })
    .then(displayData)
    .catch(err => {
      console.log(err);
    });
}

function showGif(value) {
  if (value === "show") {
    document.querySelector(".wait-icon").classList.add("show");
  } else if (value === "hide") {
    document.querySelector(".wait-icon").classList.remove("show");
  }
}

function displayData(data) {
  showGif("hide");
  // console.log(data);
  let result = data.query.search;
  // console.log(result);

  let output = "";

  result.forEach(item => {
    output += `<li class="search-item">
    <h2 class="search-item__title">${item.title}</h2>
    <p class="search-item__text">${item.snippet}</p>
    <a href='http://en.wikipedia.org/?curid=${
      item.pageid
    }' class="search-item__link" target='_blank'> Read More ...</a>
  </li>`;
  });

  //target ul
  document.querySelector(".results").innerHTML = output;
}
