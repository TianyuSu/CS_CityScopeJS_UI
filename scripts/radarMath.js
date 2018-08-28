////////////////////////////////////////////////////////////////////////////////////
//a class to preform math on data arriving from cityIO and return to radar
////////////////////////////////////////////////////////////////////////////////////

export class RadarMath {
  constructor(data) {
    this.data = data;
  }
  ///////////////////////////
  uniqueTypes() {
    var uniqueItems = Array.from(new Set(this.data.grid));
    return uniqueItems.length / this.data.grid.length;
  }

  ///////////////////////////

  typeRatio(type) {
    let ratioCount = 0;
    let d = this.data.grid;

    for (let i = 0; i < d.length; i++) {
      if (d[i].toString() === type) {
        ratioCount += 1;
      }
    }
    return ratioCount / d.length;
  }
  ///////////////////////////

  ratioLiveWork(type1, type2) {
    let rc1 = 0;
    let rc2 = 0;
    let d = this.data.grid;

    for (let i = 0; i < d.length; i++) {
      if (d[i].toString() === type1) {
        rc1 += 1;
      } else if (d[i].toString() === type2) {
        rc2 += 1;
      } else {
        // return;
        continue;
      }
    }
    return rc2 / rc1;
  }
  ///////////////////////////

  timeRemap() {
    var cityioTime = this.data.meta.timestamp;
    var d = new Date();
    var n = d.getTime();
    return (Math.random() * cityioTime) / n;
  }
}

////////////////////////////////////////////////////////////////////////////////////
//a class to set the radar structure
////////////////////////////////////////////////////////////////////////////////////
export function radarStruct(radarMath) {
  return [
    {
      key: "BostonDYNAMIC",
      values: [
        { axis: "Residentia Density", value: 0.70 + radarMath.typeRatio("0") },
        { axis: "Employment Density", value: 0.57 + radarMath.typeRatio("1") },
        { axis: "3rd places (day) Density", value: 0.40 + radarMath.ratioLiveWork("2", "0") },
        { axis: "3rd places (Night) Density", value: 0.20 + radarMath.uniqueTypes("1") },
        { axis: "Cultural Density", value: 0.50 + radarMath.uniqueTypes("1") },
        { axis: "Co-working Density", value: 0.55 + radarMath.typeRatio("3") },
        { axis: "Educational Density", value: 0.60 + radarMath.typeRatio("1") },
        { axis: "Access to Parks", value: 0.45 + radarMath.typeRatio("3") },
        { axis: "Access to public Transport", value: 0.50 + radarMath.typeRatio("3") },
        { axis: "Intersection Density", value: 0.40 + radarMath.uniqueTypes("1") },
        { axis: "Access to look-out (Police)", value: 0.50 + radarMath.typeRatio("0") },
        { axis: "Access to Healthy food", value: 0.35 + radarMath.typeRatio("3") },
        { axis: "Access to Sports", value: 0.54 + radarMath.typeRatio("2") },
        { axis: "Residential Diversity", value: 0.50 + radarMath.typeRatio("3") },
        { axis: "Employment Diversity", value: 0.47 + radarMath.typeRatio("3") },
        { axis: "3rd Places Diversity", value: 0.52 + radarMath.typeRatio("3") },
        { axis: "Cultural Diversity", value: 0.45 + radarMath.typeRatio("3") },
        { axis: "Educational Diversity", value: 0.50 + radarMath.timeRemap("1") }
        //axis: "Educational Diversity", value: 0.50 + radarMath.timeRemap() }
      ]
    },
    {
      key: "BostonEXISTING",
      values: [
        { axis: "Residentia Density", value: 0.70 },
        { axis: "Employment Density", value: 0.57 },
        { axis: "3rd places (day) Density", value: 0.40 },
        { axis: "3rd places (Night) Density", value: 0.20 },
        { axis: "Cultural Density", value: 0.50 },
        { axis: "Co-working Density", value: 0.55},
        { axis: "Educational Density", value: 0.60 },
        { axis: "Access to Parks", value: 0.45 },
        { axis: "Access to public Transport", value: 0.50 },
        { axis: "Intersection Density", value: 0.40 },
        { axis: "Access to look-out (Police)", value: 0.50 },
        { axis: "Access to Healthy food", value: 0.35 },
        { axis: "Access to Sports", value: 0.54 },
        { axis: "Residential Diversity", value: 0.50 },
        { axis: "Employment Diversity", value: 0.47 },
        { axis: "3rd Places Diversity", value: 0.52 },
        { axis: "Cultural Diversity", value: 0.45 },
        { axis: "Educational Diversity", value: 0.50 }
        //{ axis: "J", value: radarMath.uniqueTypes() }
      ]
    },
    {
      key: "Barcelona",
      values: [
          { axis: "Residentia Density", value: 0.85 },
          { axis: "Employment Density", value: 0.60 },
          { axis: "3rd places (day) Density", value: 0.85 },
          { axis: "3rd places (Night) Density", value: 0.78 },
          { axis: "Cultural Density", value: 0.80 },
          { axis: "Co-working Density", value: 0.65 },
          { axis: "Educational Density", value: 0.72 },
          { axis: "Access to Parks", value: 0.40 },
          { axis: "Access to public Transport", value: 0.91 },
          { axis: "Intersection Density", value: 0.89 },
          { axis: "Access to look-out (Police)", value: 0.55 },
          { axis: "Access to Healthy food", value: 0.65 },
          { axis: "Access to Sports", value: 0.60 },
          { axis: "Residential Diversity", value: 0.86 },
          { axis: "Employment Diversity", value: 0.79 },
          { axis: "3rd Places Diversity", value: 0.82 },
          { axis: "Cultural Diversity", value: 0.84 },
          { axis: "Educational Diversity", value: 0.69 }
        //{ axis: "J", value: radarMath.uniqueTypes() }
      ]
    }
  ];
}
