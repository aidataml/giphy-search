// See Giphy API Docs under "Search Endpoint" at https://developers.giphy.com/docs/api/endpoint#search
  
const $searchResults = $("#search-results");
const $searchCriteria = $("#search-criteria");

function showImages(responseData) {
  let numberOfResults = responseData.data.length;
  if (numberOfResults) {
      for (let i = 0; i < 9; i++) {
          let randomIndex = Math.floor(Math.random() * numberOfResults);
          let $newColumn = $("<div>", { class: "col-md-4 col-12 mb-4" });
          let $newImage = $("<img>", {
              src: responseData.data[randomIndex].images.original.url,
              class: "w-100"
          });
          $newColumn.prepend($newImage);
          $searchResults.prepend($newColumn);
      }
  }
}

$("form").on("submit", async function(search) {
  search.preventDefault();
  const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      q: $searchCriteria.val(),
      api_key: "KMPuqCxz7m8XvJL0PuQs0QJyCX7PZ6JW"
    }
  });
  showImages(response.data);
  console.log(response);
});

$("#delete-images").on("click", function() {
  $searchResults.empty();
});
