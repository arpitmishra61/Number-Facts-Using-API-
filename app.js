let getNumber = document.querySelector(".getNumber");
let screen = document.querySelector(".screen");
let selectors = document.querySelectorAll(".form-check-input");
let randomButton = document.querySelector(".random");
selectors.forEach(elem => elem.addEventListener("change", dos)); //arrow fn

randomButton.addEventListener("click", randomFacts);

function randomFacts(e) {
  e.preventDefault();
  get(`http://numbersapi.com/random/${selectedData}`).then(fact =>
    showData(fact)
  );
}

function dos(e) {
  selectedData = e.target.nextElementSibling.innerHTML.toLowerCase();

  getNumber.value = "";
  if (selectedData == "date") {
    getNumber.type = "text";
    getNumber.placeholder = "month/date e.g 01/01";
  } else if (selectedData == "year") {
    getNumber.type = "number";
    getNumber.placeholder = "year e.g 2016";
  } else {
    getNumber.type = "number";
    getNumber.placeholder = "Enter number e.g 12";
  }
  screen.innerHTML = "";
}
let selectedData;
selectors.forEach(elem => {
  if (elem.checked) {
    selectedData = elem.nextElementSibling.innerHTML.toLowerCase();
  }
});
console.log(selectedData);
getNumber.addEventListener("input", takeFact);

async function get(url) {
  const response = await fetch(url);
  return response.text();
}

function takeFact(e) {
  if (e.target.value) {
    if (selectedData.toLowerCase() != "date") {
      let number = Number(e.target.value);

      get(`http://numbersapi.com/${number}/${selectedData}`).then(fact =>
        showData(fact)
      );
    } else
      get(`http://numbersapi.com/${e.target.value}/${selectedData}`).then(
        fact => showData(fact)
      );
  } else screen.innerHTML = "";
}

function showData(fact) {
  console.log("working-2");
  let factDisplay = document.createElement("p");
  screen.innerHTML = "";
  screen.parentElement.style.height = "auto";
  factDisplay.classList = "py-4 rounded-circle";
  factDisplay.innerHTML = fact;
  factDisplay.style.fontSize = "25px";
  screen.appendChild(factDisplay);
}
