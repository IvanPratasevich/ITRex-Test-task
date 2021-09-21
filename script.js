let states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "HI", "IA", "ID", "IL", "IN",
  "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ",
  "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA",
  "WI", "WV", "WY"
]
let page = 1;
let table = document.getElementById("tbody");
let tr = table.getElementsByTagName("tr");
let array;
let desk = '';
let sortA = '';
let sortB = '';
let counterForSortByColumns = 1;
let counterForSortByColumnsFirstName = 2;
let counterForSortByColumnsLastName = 2;
let counterForSortByColumnsEmail = 2;
let counterForSortByColumnsPhone = 2;
let counterForSortByColumnsState = 2;
let select = document.getElementById('select')
let findUsers = [];
let data;


//Receiving data from the server 
function getData() {
  let url = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json';
  let dataFromServer = [];
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(dataServer) {
    dataServer.forEach(element => dataFromServer.push(element));
    localStorage.setItem('data', JSON.stringify(dataFromServer));
    createData(dataFromServer)
    createTable()
  })
}

function init() {
  select.innerHTML +=
    `
            <option selected="selected" disabled value="0">Filter by state</option>
            <option  value="0">All States</option>
       `;
  states.forEach(function(item, i, arr) {
    select.innerHTML += `
          <option value="${item}">${item}</option>
        `;
  });
  getData()
}
function createData () {
  data = JSON.parse(localStorage.getItem('data'));
}

function createTable() {
  switch (page) {
    case 1:
      array = data.slice(0,20);
      break;
    case 2:
      array = data.slice(20,40);
      break;
    case 3:
      array = data.slice(40,60);
      break;
    case 4:
      array = data.slice(60,80);
      break;
    case 5:
      array = data.slice(80,100);
      break;
    case 6:
      array = data.slice(100,120);
      break;
    default:
      // statements_def
      break;
  }
  array.forEach(function(item, i, arr) {
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
  document.location.href = '#profile';
  let elementId = element.dataset.indexNumber;
  let profile = document.getElementById("profile");
  let findUser = Array.from(data).find(item => item.id == elementId);
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
  data = JSON.parse(localStorage.getItem('data'));
    document.getElementById('firstname').classList.remove("sortB");
    document.getElementById('firstname').classList.remove("sortA");
    document.getElementById('lastname').classList.remove("sortB");
    document.getElementById('lastname').classList.remove("sortA");
    document.getElementById('email').classList.remove("sortB");
    document.getElementById('email').classList.remove("sortA");

    document.getElementById('phone').classList.remove("sortB");
    document.getElementById('phone').classList.remove("sortA");

    document.getElementById('state').classList.remove("sortB");
    document.getElementById('state').classList.remove("sortA");

    document.getElementById('id').classList.remove("sortB");
    document.getElementById('id').classList.remove("sortA");

  let flag;
  let input = document.getElementById("create-tag");
  let filter = this.value.toUpperCase();
  let table = document.getElementById("tbody");
  let tr = table.getElementsByTagName("tr");
  let states = [];
  findUsers = data.filter(item => item.adress.state === filter);
  document.getElementById('tbody').innerHTML= '';
  findUsers.forEach(function(item, i, arr) {
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
  data = findUsers;
  document.getElementById('pages').innerHTML= '';
  if (filter == 0) {
  data = JSON.parse(localStorage.getItem('data'));
  document.getElementById('tbody').innerHTML= '';
  document.getElementById('header').innerHTML= '';
  document.getElementById('header').innerHTML +=
    `
     <tr>
        <th class="tdHeader" onclick='sortByColumns()' id='id'>Id</th>
        <th class="tdHeader" onclick='sortByColumnsFirstName()' id ='firstname'>First name</th>
        <th class="tdHeader" onclick='sortByColumnsLastName()' id ='lastname'>Last name</th>
        <th class="tdHeader" onclick='sortByColumnsEmail()' id ='email'>Email</th>
        <th class="tdHeader" onclick='sortByColumnsPhone()' id ='phone'>Phone</th>
        <th class="tdHeader" onclick='sortByColumnsState()' id ='state'>State</th>
      </tr>
        `;
    createTable()
  document.getElementById('pages').innerHTML +=
    `
      <button class="btn active" onclick="changePage(this)">1</button>
      <button class="btn" onclick="changePage(this)">2</button>
      <button class="btn" onclick="changePage(this)">3</button>
      <button class="btn" onclick="changePage(this)">4</button>
      <button class="btn" onclick="changePage(this)">5</button>
      <button class="btn" onclick="changePage(this)">6</button>
        `;
  }

})

function sortByColumns() {
    document.getElementById('firstname').classList.remove("sortB");
    document.getElementById('firstname').classList.remove("sortA");

    document.getElementById('lastname').classList.remove("sortB");
    document.getElementById('lastname').classList.remove("sortA");

    document.getElementById('email').classList.remove("sortB");
    document.getElementById('email').classList.remove("sortA");


    document.getElementById('phone').classList.remove("sortB");
    document.getElementById('phone').classList.remove("sortA");


    document.getElementById('state').classList.remove("sortB");
    document.getElementById('state').classList.remove("sortA");


  if (counterForSortByColumns % 2 === 0) {
    data.sort((a, b) => a.id - b.id);
    document.getElementById('id').classList.remove("sortB");
    document.getElementById('id').classList.add("sortA");
  } else {
    data.sort((a, b) => b.id - a.id);
    document.getElementById('id').classList.remove("sortA");
    document.getElementById('id').classList.add("sortB");
  }
  counterForSortByColumns += 1;
  switch (page) {
    case 1:
      array = data.slice(0,20);
      break;
    case 2:
      array = data.slice(20,40);
      break;
    case 3:
      array = data.slice(40,60);
      break;
    case 4:
      array = data.slice(60,80);
      break;
    case 5:
      array = data.slice(80,100);
      break;
    case 6:
      array = data.slice(100,120);
      break;
    default:
      // statements_def
      break;
  }
  document.getElementById('tbody').innerHTML = "";
  array.forEach(function(item, i, arr) {
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

function sortByColumnsFirstName() {
  let tr = table.getElementsByTagName("tr");
    document.getElementById('id').classList.remove("sortB");
    document.getElementById('id').classList.remove("sortA");

    document.getElementById('lastname').classList.remove("sortB");
    document.getElementById('lastname').classList.remove("sortA");

    document.getElementById('email').classList.remove("sortB");
    document.getElementById('email').classList.remove("sortA");


    document.getElementById('phone').classList.remove("sortB");
    document.getElementById('phone').classList.remove("sortA");


    document.getElementById('state').classList.remove("sortB");
    document.getElementById('state').classList.remove("sortA");


  if (counterForSortByColumnsFirstName % 2 !== 0) {
    data.sort((a, b) => a.firstName.localeCompare(b.firstName))
    document.getElementById('firstname').classList.remove("sortB");
    document.getElementById('firstname').classList.add("sortA");
  } else {
    data.sort((a, b) => b.firstName.localeCompare(a.firstName))
    document.getElementById('firstname').classList.remove("sortA");
    document.getElementById('firstname').classList.add("sortB");
  }
  counterForSortByColumnsFirstName += 1;
    switch (page) {
    case 1:
      array = data.slice(0,20);
      break;
    case 2:
      array = data.slice(20,40);
      break;
    case 3:
      array = data.slice(40,60);
      break;
    case 4:
      array = data.slice(60,80);
      break;
    case 5:
      array = data.slice(80,100);
      break;
    case 6:
      array = data.slice(100,120);
      break;
    default:
      // statements_def
      break;
  }
  document.getElementById('tbody').innerHTML = "";
  array.forEach(function(item, i, arr) {
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

function sortByColumnsLastName() {
  let tr = table.getElementsByTagName("tr");
    document.getElementById('id').classList.remove("sortB");
    document.getElementById('id').classList.remove("sortA");

    document.getElementById('firstname').classList.remove("sortB");
    document.getElementById('firstname').classList.remove("sortA");

    document.getElementById('email').classList.remove("sortB");
    document.getElementById('email').classList.remove("sortA");


    document.getElementById('phone').classList.remove("sortB");
    document.getElementById('phone').classList.remove("sortA");


    document.getElementById('state').classList.remove("sortB");
    document.getElementById('state').classList.remove("sortA");


  if (counterForSortByColumnsLastName % 2 !== 0) {
    data.sort((a, b) => a.lastName.localeCompare(b.lastName))
    document.getElementById('lastname').classList.remove("sortB");
    document.getElementById('lastname').classList.add("sortA");
  } else {
    data.sort((a, b) => b.lastName.localeCompare(a.lastName))
    document.getElementById('lastname').classList.remove("sortA");
    document.getElementById('lastname').classList.add("sortB");
  }
  counterForSortByColumnsLastName += 1;
  switch (page) {
    case 1:
      array = data.slice(0,20);
      break;
    case 2:
      array = data.slice(20,40);
      break;
    case 3:
      array = data.slice(40,60);
      break;
    case 4:
      array = data.slice(60,80);
      break;
    case 5:
      array = data.slice(80,100);
      break;
    case 6:
      array = data.slice(100,120);
      break;
    default:
      // statements_def
      break;
  }
  document.getElementById('tbody').innerHTML = "";
  array.forEach(function(item, i, arr) {
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

function sortByColumnsEmail() {
  let tr = table.getElementsByTagName("tr");
    document.getElementById('id').classList.remove("sortB");
    document.getElementById('id').classList.remove("sortA");

    document.getElementById('firstname').classList.remove("sortB");
    document.getElementById('firstname').classList.remove("sortA");

    document.getElementById('lastname').classList.remove("sortB");
    document.getElementById('lastname').classList.remove("sortA");


    document.getElementById('phone').classList.remove("sortB");
    document.getElementById('phone').classList.remove("sortA");


    document.getElementById('state').classList.remove("sortB");
    document.getElementById('state').classList.remove("sortA");


  if (counterForSortByColumnsEmail % 2 !== 0) {
    data.sort((a, b) => a.email.localeCompare(b.email))
    document.getElementById('email').classList.remove("sortB");
    document.getElementById('email').classList.add("sortA");
  } else {
    data.sort((a, b) => b.email.localeCompare(a.email))
    document.getElementById('email').classList.remove("sortA");
    document.getElementById('email').classList.add("sortB");
  }
  counterForSortByColumnsEmail += 1;
  switch (page) {
    case 1:
      array = data.slice(0,20);
      break;
    case 2:
      array = data.slice(20,40);
      break;
    case 3:
      array = data.slice(40,60);
      break;
    case 4:
      array = data.slice(60,80);
      break;
    case 5:
      array = data.slice(80,100);
      break;
    case 6:
      array = data.slice(100,120);
      break;
    default:
      // statements_def
      break;
  }
  document.getElementById('tbody').innerHTML = "";
  array.forEach(function(item, i, arr) {
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

function sortByColumnsPhone() {
    document.getElementById('id').classList.remove("sortB");
    document.getElementById('id').classList.remove("sortA");

    document.getElementById('firstname').classList.remove("sortB");
    document.getElementById('firstname').classList.remove("sortA");

    document.getElementById('lastname').classList.remove("sortB");
    document.getElementById('lastname').classList.remove("sortA");


    document.getElementById('email').classList.remove("sortB");
    document.getElementById('email').classList.remove("sortA");


    document.getElementById('state').classList.remove("sortB");
    document.getElementById('state').classList.remove("sortA");


  if (counterForSortByColumnsPhone % 2 === 0) {
    data.sort((a, b) => b.phone.replace(/\D/g, '') - a.phone.replace(/\D/g, ''));
    document.getElementById('phone').classList.remove("sortA");
    document.getElementById('phone').classList.add("sortB");
  } else {
    data.sort((a, b) => a.phone.replace(/\D/g, '') - b.phone.replace(/\D/g, ''));
    document.getElementById('phone').classList.remove("sortB");
    document.getElementById('phone').classList.add("sortA");
  }
  counterForSortByColumnsPhone += 1;
    switch (page) {
    case 1:
      array = data.slice(0,20);
      break;
    case 2:
      array = data.slice(20,40);
      break;
    case 3:
      array = data.slice(40,60);
      break;
    case 4:
      array = data.slice(60,80);
      break;
    case 5:
      array = data.slice(80,100);
      break;
    case 6:
      array = data.slice(100,120);
      break;
    default:
      // statements_def
      break;
  }
  document.getElementById('tbody').innerHTML = "";
  array.forEach(function(item, i, arr) {
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

function sortByColumnsState() {
  let tr = table.getElementsByTagName("tr");
    document.getElementById('id').classList.remove("sortB");
    document.getElementById('id').classList.remove("sortA");

    document.getElementById('firstname').classList.remove("sortB");
    document.getElementById('firstname').classList.remove("sortA");

    document.getElementById('lastname').classList.remove("sortB");
    document.getElementById('lastname').classList.remove("sortA");


    document.getElementById('email').classList.remove("sortB");
    document.getElementById('email').classList.remove("sortA");


    document.getElementById('phone').classList.remove("sortB");
    document.getElementById('phone').classList.remove("sortA");


  if (counterForSortByColumnsState % 2 !== 0) {
    data.sort((a, b) => a.adress.state.localeCompare(b.adress.state))
    document.getElementById('state').classList.remove("sortB");
    document.getElementById('state').classList.add("sortA");
  } else {
    data.sort((a, b) => b.adress.state.localeCompare(a.adress.state))
    document.getElementById('state').classList.remove("sortA");
    document.getElementById('state').classList.add("sortB");
  }
  counterForSortByColumnsState += 1;
  switch (page) {
    case 1:
      array = data.slice(0,20);
      break;
    case 2:
      array = data.slice(20,40);
      break;
    case 3:
      array = data.slice(40,60);
      break;
    case 4:
      array = data.slice(60,80);
      break;
    case 5:
      array = data.slice(80,100);
      break;
    case 6:
      array = data.slice(100,120);
      break;
    default:
      // statements_def
      break;
  }
  document.getElementById('tbody').innerHTML = "";
  array.forEach(function(item, i, arr) {
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
function changePage(btn){
  let table = document.getElementById('tbody');
  table.innerHTML = '';
  page = Number(btn.innerHTML);
  let buttons = document.querySelectorAll(".btn");
  for (let button of buttons) {
    buttons.forEach(element => element.classList.remove('active'));
    btn.classList.toggle('active');  
  }
  createTable();
}
init()