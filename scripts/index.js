/*/////////////////////////////////////////////////////////////////////////////

{{ CityScopeJS_RADAR }}
Copyright (C) {{ 2018 }}  {{ Ariel Noyman }}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

///////////////////////////////////////////////////////////////////////////////

CityScopeJS_RADAR -- RADAR visualization for various land use types.
"@context": "TBD", "@type": "Person", "address": {
"@type": "75 Amherst St, Cambridge, MA 02139", "addressLocality":
"Cambridge", "addressRegion": "MA",}, 
"jobTitle": "Research Scientist", "name": "Ariel Noyman",
"alumniOf": "MIT", "url": "http://arielnoyman.com", 
"https://www.linkedin.com/", "http://twitter.com/relno",
https://github.com/RELNO]

*/ ///////////////////////////////////////////////////////////////////////////

//fixes Uncaught ReferenceError: regeneratorRuntime is not defined
import "babel-polyfill";
import { info } from "./RADAR/ui";
import { radarInit, radarUpdate } from "./RADAR/radarSetup";

// global vars for fun
//let tableName = "cityscopeJSwalk";
let tableName = "CityScopeJS_SZ";

let cityIOtableURL =
  "https://cityio.media.mit.edu/api/table/" + tableName.toString();

// if (window.location.search) {
//   console.log(window.location.search);
//   cityIOtableURL =
//     "https://cityio.media.mit.edu/api/table/"
//     window.location.search.substr(1);
// }
console.log(cityIOtableURL);

//update interval
let interval = 1500;

async function init() {
  info();
  //init the radar
  let radarChartObj = radarInit();
  //send a bare-bone radar to update function
  cityIOupdater(radarChartObj);
}

////////////////////////////////////////////////////////////////////

/**
 * updates the radar on interval
 * @param initalCityIOdata the results of the init call to cityIO.
 */

function cityIOupdater(radarChartObj) {
  let cityIOdata;
  //loop cityIO update recursively
  setInterval(updateCityIO, interval);
  //update grid if cityIO new data arrives
  async function updateCityIO() {
    //get the data through promise
    cityIOdata = await getCityIO(cityIOtableURL);
    // update to radar
    for (var i=0; i<100; i++) {
      if ((cityIOdata['grid'][i] == 1)||(cityIOdata['grid'][i] == 2)||(cityIOdata['grid'][i] == 3)||(cityIOdata['grid'][i] == 4)){
        cityIOdata['grid'][i] = 1
      }
      if ((cityIOdata['grid'][i] == 5)||(cityIOdata['grid'][i] == 6)){
        cityIOdata['grid'][i] = 2
      }
      if ((cityIOdata['grid'][i] == 7)||(cityIOdata['grid'][i] == 8)){
        cityIOdata['grid'][i] = 3
      }
      if ((cityIOdata['grid'][i] == 9)||(cityIOdata['grid'][i] == 10)||(cityIOdata['grid'][i] == 11)||(cityIOdata['grid'][i] == 12)){
        cityIOdata['grid'][i] = 4
      }
      if (cityIOdata['grid'][i] == 13){
        cityIOdata['grid'][i] = 5
      }
    }
    radarUpdate(cityIOdata, radarChartObj, 1500);
  }
}

////////////////////////////////////////////////////////////////////
/**
 * get cityIO method [uses ES6 polyfill]
 * @param cityIOtableURL cityIO API endpoint URL
 */

function getCityIO(cityIOtableURL) {
    // console.log("trying to fetch " + cityIOtableURL);
    return fetch(cityIOtableURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(cityIOdata) {
        //console.log("got cityIO table at " + cityIOdata.meta.timestamp);
        console.log(cityIOdata);
        return cityIOdata;
      });
  }

////////////////////////////////////////////////////////////////////

//start the app
init();