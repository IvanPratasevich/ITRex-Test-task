let states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "HI", "IA", "ID", "IL", "IN",
  "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ",
  "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA",
  "WI", "WV", "WY"
]
let counterForSortByColumns = 1;
let counterForSortByColumnsFirstName = 2;
let counterForSortByColumnsLastName = 2;
let counter = 0;
let select = document.getElementById('select')
//Receiving data from the server 
function getData(counter) {
  let url = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json';
  let data = [];
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(dataServer) {
    dataServer.forEach(element => data.push(element));
    localStorage.setItem('data', JSON.stringify(data));
    createTable()
  })
}

function init() {
  select.innerHTML +=
    `
            <option selected="selected" value="0">Filter by state</option>
       `;
  states.forEach(function(item, i, arr) {
    select.innerHTML += `
          <option value="${item}">${item}</option>
        `;
  });
  if (JSON.parse(localStorage.getItem('counter')) === null) {
    counter += 1;
    localStorage.setItem('counter', JSON.stringify(counter));
    getData(counter)
  } else {
    console.log('The data was downloaded from the server once');
    createTable()
  }
}

function createTable() {
  let data = JSON.parse(localStorage.getItem('data'));
  document.getElementById('tbody').innerHTML +=
    `
       <tr>
        <th class="tdHeader" onclick='sortByColumns()' id='id'>Id&#9650</th>
        <th class="tdHeader" onclick='sortByColumnsFirstName()' id ='firstname'>First name</th>
        <th class="tdHeader" onclick='sortByColumnsLastName()' id ='lastname'>Last name</th>
        <th class="tdHeader">Email</th>
        <th class="tdHeader">Phone</th>
        <th class="tdHeader">State</th>
      </tr>
        `;
  data.sort((a, b) => a.id - b.id);
  data.forEach(function(item, i, arr) {
    let id = item.id;
    let firstName = item.firstName;
    let lastName = item.lastName;
    let email = item.email;
    let phone = item.phone;
    let state = item.adress.state;
    document.getElementById('tbody').innerHTML +=
      `
       <tr onclick="return getAdditionalInformation(this);" data-index-number="${id}">
        <td>${id}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${state}</td>
      </tr>
        `;
  });
}

function findData() {
  let flag;
  let input = document.getElementById("create-tag");
  let filter = input.value.toUpperCase();
  let table = document.getElementById("tbody");
  let tr = table.getElementsByTagName("tr");
  Array.from(tr).forEach(function(item, i, arr) {
    if (i == 0) {
      return
    } else {
      let td = item.getElementsByTagName("td");
      Array.from(td).forEach(function(item, i, arr) {
        if (item.innerHTML.toUpperCase().indexOf(filter) > -1) {
          flag = true;
        }
      });
    }
    if (flag) {
      item.style.display = "";
      flag = false;
    } else {
      item.style.display = "none";
    }
  });
}

function getAdditionalInformation(element) {
  let data = JSON.parse(localStorage.getItem('data'));
  let elementId = element.dataset.indexNumber;
  let profile = document.getElementById("profile");
  let findUser = Array.from(data).find(item => item.id == elementId);
  console.log(findUser.firstName)
  profile.innerHTML =
    `
      <h1 class="profile-title">Profile info:</h1><br>
      <span class="profile-info">Selected Profile: ${findUser.firstName} ${findUser.lastName}</span>
      <span class="profile-info">Description: ${findUser.description}</span>
      <address class="profile-info">Adress: ${findUser.adress.streetAddress}</address>
      <span class="profile-info">City: ${findUser.adress.city}</span>
      <span class="profile-info">State: ${findUser.adress.state}</span>
      <span class="profile-info">Index: ${findUser.adress.zip}</span>   
        `;
}
document.getElementById('select').addEventListener('change', function() {
  let flag;
  let input = document.getElementById("create-tag");
  let filter = this.value.toUpperCase();
  let table = document.getElementById("tbody");
  let tr = table.getElementsByTagName("tr");
  let states = [];
  Array.from(tr).forEach(function(item, i, arr) {
    td = tr[i].getElementsByTagName("td")[5];
    if (td) {
      value = td.innerHTML;
      states.push(value)
      if (value.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  });
  if (filter == 0) {
    Array.from(tr).forEach(function(item, i, arr) {
      tr[i].style.display = "";
    });
  }
})
function sortByColumns(){
  let data = JSON.parse(localStorage.getItem('data'));
  document.getElementById('tbody').innerHTML =
    `
       <tr>
        <th class="tdHeader" onclick='sortByColumns()'  id='id'>Id</th>
        <th class="tdHeader" onclick='sortByColumnsFirstName()' id ='firstname'>First name</th>
        <th class="tdHeader" onclick='sortByColumnsLastName()' id ='lastname'>Last name</th>
        <th class="tdHeader">Email</th>
        <th class="tdHeader">Phone</th>
        <th class="tdHeader">State</th>
      </tr>
        `;
  if(counterForSortByColumns % 2 === 0){
    data.sort((a, b) => a.id - b.id);
    document.getElementById('id').innerHTML = `   <th class="tdHeader" onclick='sortByColumns()'  id='id'>Id&#9650</th>`
  } else{
    data.sort((a, b) => b.id - a.id);
     document.getElementById('id').innerHTML = `   <th class="tdHeader" onclick='sortByColumns()'  id='id'>Id&#9660</th>`
  }
  counterForSortByColumns += 1;
  data.forEach(function(item, i, arr) {
    let id = item.id;
    let firstName = item.firstName;
    let lastName = item.lastName;
    let email = item.email;
    let phone = item.phone;
    let state = item.adress.state;
    document.getElementById('tbody').innerHTML +=
      `
       <tr onclick="return getAdditionalInformation(this);" data-index-number="${id}">
        <td>${id}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${state}</td>
      </tr>
        `;
  });
}
function sortByColumnsFirstName(){
  let data = JSON.parse(localStorage.getItem('data'));
  let tr = table.getElementsByTagName("tr");
  document.getElementById('tbody').innerHTML =
    `
       <tr>
        <th class="tdHeader" onclick='sortByColumns()' id='id'>Id</th>
        <th class="tdHeader" onclick='sortByColumnsFirstName()' id ='firstname'>First name</th>
        <th class="tdHeader" onclick='sortByColumnsLastName()' id ='lastname'>Last name</th>
        <th class="tdHeader">Email</th>
        <th class="tdHeader">Phone</th>
        <th class="tdHeader">State</th>
      </tr>
        `;
  if(counterForSortByColumnsFirstName % 2 === 0){
    data.sort((a, b) => a.firstName.localeCompare(b.firstName))
    document.getElementById('firstname').innerHTML = `        <th class="tdHeader" onclick='sortByColumnsFirstName()' id ='firstname'>First name&#9650</th>`
  } else{
    data.sort((a, b) => b.firstName.localeCompare(a.firstName))
    document.getElementById('firstname').innerHTML = `        <th class="tdHeader" onclick='sortByColumnsFirstName()' id ='firstname'>First name&#9660;</th>`
  }
  counterForSortByColumnsFirstName += 1;
  data.forEach(function(item, i, arr) {
    let id = item.id;
    let firstName = item.firstName;
    let lastName = item.lastName;
    let email = item.email;
    let phone = item.phone;
    let state = item.adress.state;
    document.getElementById('tbody').innerHTML +=
      `
       <tr onclick="return getAdditionalInformation(this);" data-index-number="${id}">
        <td>${id}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${state}</td>
      </tr>
        `;
  });
}
function sortByColumnsLastName(){
  let data = JSON.parse(localStorage.getItem('data'));
  let tr = table.getElementsByTagName("tr");
  document.getElementById('tbody').innerHTML =
    `
       <tr>
        <th class="tdHeader" onclick='sortByColumns()' id='id'>Id</th>
        <th class="tdHeader" onclick='sortByColumnsFirstName()' id ='firstname'>First name</th>
        <th class="tdHeader" onclick='sortByColumnsLastName()' id ='lastname'>Last name</th>
        <th class="tdHeader">Email</th>
        <th class="tdHeader">Phone</th>
        <th class="tdHeader">State</th>
      </tr>
        `;
  if(counterForSortByColumnsLastName % 2 === 0){
    data.sort((a, b) => a.lastName.localeCompare(b.lastName))
    document.getElementById('lastname').innerHTML = `           <th class="tdHeader" onclick='sortByColumnsLastName()' id ='lastname'>Last name&#9650;</th>`;
  } else{
    data.sort((a, b) => b.lastName.localeCompare(a.lastName))
    document.getElementById('lastname').innerHTML = `        <th class="tdHeader" onclick='sortByColumnsLastName()' id ='lastname'>Last name&#9660;</th>`;
  }
  counterForSortByColumnsLastName += 1;
  data.forEach(function(item, i, arr) {
    let id = item.id;
    let firstName = item.firstName;
    let lastName = item.lastName;
    let email = item.email;
    let phone = item.phone;
    let state = item.adress.state;
    document.getElementById('tbody').innerHTML +=
      `
       <tr onclick="return getAdditionalInformation(this);" data-index-number="${id}">
        <td>${id}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${state}</td>
      </tr>
        `;
  });    
}

init()