// Request

const API_URL = "http://localhost:8000";

let form = document.querySelector("#upload");
let lineGraph = document.querySelector("#line-graph");
let barGraph = document.querySelector("#bar-graph");
// let pieGraph = document.querySelector("#pie-graph");

function download(file, text) {
  //creating an invisible element
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8, " + encodeURIComponent(text)
  );
  element.setAttribute("download", file);

  // Above code is equivalent to
  // <a href="path of file" download="file name">

  document.body.appendChild(element);

  //onClick property
  element.click();

  document.body.removeChild(element);
}

form.onsubmit = async (e) => {
  e.preventDefault();
  let formData = new FormData();
  let input = e.target.querySelector("input");
  formData.append("dataset", input.files[0], input.files[0].name);

  const { data } = await axios.post(`${API_URL}/api/v1`, formData);

  lineGraph.src = `${API_URL}${data.data.requestEndpoints.line}`;
  barGraph.src = `${API_URL}${data.data.requestEndpoints.bar}`;
  //   pieGraph.src = `${API_URL}${data.data.requestEndpoints.pie}`;

  let images = [lineGraph, barGraph]; // Add pie graph

  for (i = 0; i < images.length; i++) {
    let obj = images[i];

    obj.addEventListener("click", () => {
      window.open(obj.src);
    });
  }
};
