/*/////////////////////////////////////////////////////////////////////////////

{{ CityScopeJS_Walkability }}
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

CityScopeJS_Walkability -- Walkability analysis for various land use types.
"@context": "TBD", "@type": "Person", "address": {
"@type": "75 Amherst St, Cambridge, MA 02139", "addressLocality":
"Cambridge", "addressRegion": "MA",}, 
"jobTitle": "Research Scientist", "name": "Ariel Noyman",
"alumniOf": "MIT", "url": "http://arielnoyman.com", 
"https://www.linkedin.com/", "http://twitter.com/relno",
https://github.com/RELNO]

*/ ///////////////////////////////////////////////////////////////////////////

/*
Structure:

+------------+     +------------+     +----------------+   +-------------+
| index.js   +---> | interact   +---> + searchNearest  <---> TweenModules|
+-----+------+     +------------+     +--------+-------+   +-------------+
      |                                         ^
      v                                         |
+-----+------+    +-------------+               |
|threeSetup  |--->|   makeGrid  |----------------
+------------+    +-------------+
*/

/////////////////////////////////////////////////////////////////////////
import * as threeSetup from "./threeSetup";
import { stateManager } from "./stateManager";

////////////////////////////////////////

function init() {
  var tableName = "cityscopeJS";
  let cityIOtableURL =
    "https://cityio.media.mit.edu/api/table/" + tableName.toString();
  //call server once at start, just to setup the grid
  getCityIO(cityIOtableURL);
}
////////////
function start(cityIOdata) {
  // var tableName = window.location.search.substring(1);
  if (cityIOdata.header.spatial.ncols) {
    var gridX = cityIOdata.header.spatial.ncols;
    var gridY = cityIOdata.header.spatial.nrows;
    //build threejs grid onload
    var grid = threeSetup.threeInit(gridX, gridY);
    stateManager(grid, gridX, gridY);
  }
}
//start app
init();

////////////////////////////////////////
//get cityIO method
function getCityIO(tableName) {
  console.log("trying to fetch..");

  const cityIOjson = fetch(tableName)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      console.log("got cityIO table at " + jsonData.meta.timestamp);
      start(jsonData);
    });
  return cityIOjson;
}
