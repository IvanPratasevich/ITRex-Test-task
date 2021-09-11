//Receiving data from the server 
function getData(counter) {
let url = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json';
let data = [];
  fetch(url)
      .then(function(response){
          return response.json();
      })
      .then(function(dataServer){
          dataServer.forEach(element => data.push(element));
          localStorage.setItem('data', JSON.stringify(data));
      })
}
function init(){
  let counter = 0;
  if(JSON.parse(localStorage.getItem('counter')) === null){
    counter += 1;
    localStorage.setItem('counter', JSON.stringify(counter));
    getData(counter)
  } else{
    console.log('The data was downloaded from the server once');
  }
}
init()