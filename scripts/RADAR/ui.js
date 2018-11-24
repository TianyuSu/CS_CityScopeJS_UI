import * as logoPath from "../../images/logo.png";
//
export function info() {
  //
  let logoDiv = document.createElement("div");
  document.body.appendChild(logoDiv);
  logoDiv.id = "logoDiv";
  logoDiv.className = "logoDiv";
  var logo = document.createElement("img");
  logo.src = logoPath.default;
  logoDiv.appendChild(logo);
  logo.width = 100;
  logo.height = 100;
}
