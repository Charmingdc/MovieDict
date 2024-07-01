window.onload = () => {
      
  fetchDefaultInfo();
  
  const btn = document.querySelector('#search-btn');
  btn.addEventListener('click', (e) => {
    const search = document.querySelector('#search');
    
    if (search.value == '') {
      search.style.borderColor = 'red';
      
      setTimeout(() => {
        search.style.borderColor = '';
      }, 2000);
      
    } else {
      
      let plot = document.querySelector('#plot');
      plot.value = plot.value.toLowerCase().trim();
      
      if (plot.value == '') {
        plot.value = 'short';
      } else {
        plot.value = plot.value;
      }
      
      console.log(plot.value)
      fetchInfo();
    
    }
    
  });
  
};


function fetchDefaultInfo() {
 
  $.ajax({
    url: `https://omdbapi.com/?apikey=74644ebd&t=tron&plot=full`,
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      processData(response);
    },
    error: function(error) {
      
      swal({
       title: 'MovieDict',
       text: `An error have occurred, please try again later.`,
       icon: 'error',
       button: 'Okay',
     });
     
    }
  });
}


function fetchInfo() {
  const word = search.value.trim();
  
  const plotType = `${plot.value}`;
  
  $.ajax({
    url: `https://omdbapi.com/?apikey=74644ebd&t=${word}&plot=${plotType}`,
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      processData(response);
    },
    error: function(error) {
      
      swal({
       title: 'MovieDict',
       text: `Error: An error have occurred please try again later`,
       icon: 'error',
       button: 'Okay',
     });
     
      
    }
  });
}




const poster = document.querySelector('#movie-poster');
const title = document.querySelector('#title');
const type = document.querySelector('#type');
const rating = document.querySelector('#rating');
const year = document.querySelector('#year');
const runtime = document.querySelector('#runtime');
const mPlot = document.querySelector('#movie-plot');
const genre = document.querySelector('#genre');
const lang = document.querySelector('#lang');
const actors = document.querySelector('#actors');
const writer = document.querySelector('#writer');



function processData(data) {
    
   if (data.Response == "False") {
     
     swal({
       title: 'MovieDict',
       text: `No matches found for your request. You can try again later or try to search the web.`,
       icon: 'error',
       button: 'Okay',
     });
     
   } else {
     
     poster.src = data.Poster === 'N/A' ? '/images.png' : data.Poster;
    poster.alt = data.Title === 'N/A' ? 'Image not found' : data.Title;
    
    
    title.innerHTML = data.Title;
    type.innerHTML = data.Type;
    rating.innerHTML = data.imdbRating + '<i class="fa-solid fa-star" id="star"></i>';
    runtime.innerHTML = data.Runtime;
    mPlot.innerHTML = data.Plot;
    year.innerHTML = 'Released on : ' + data.Released;
    genre.innerHTML = 'Genre: ' + data.Genre;
    lang.innerHTML = 'Language: ' + data.Language;
    actors.innerHTML = 'Actors: ' + data.Actors;
    writer.innerHTML = "Writer's: " + data.Writer;
     
   }
 
}