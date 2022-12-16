const searchString = new URLSearchParams();

searchString.append('title', 'movies');
searchString.append('cast', 'emma');

console.log(searchString.toString());