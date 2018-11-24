////////////////////////////////////////////////////////////////////////////////////
//a class to preform math on data arriving from cityIO and return to radar
////////////////////////////////////////////////////////////////////////////////////

export class RadarMath {
  constructor(data) {
    this.data = data;
  }

  ///////////// diversity /////////////
  diversity(type) {
    let diversityCount = 0;
    let d = this.data.grid;
    for (let i = 0; i < 100; i++) {
      if (d[i].toString() == type) {
        diversityCount += 1;
      }
    }
    console.log('diversity:',diversityCount/100)
    return diversityCount / 100
  }


  ///////////// cosharing /////////////

  avg5x5(row,col,d){

    let count0=0;
    let count1=0;
    let count2=0;
    let count3=0;
    let count4=0;

    for (let i = row-2; i <=row+2; i++){
      for (let j = col-2; j <=col+2; j++){
        if ((i < 0) || (j<0) || (i>9) || (j>9) || ((i==row) && (j==col))){
          continue;
        }
        else if (d[i][j] == 5){
          count0 += 1;
        }
        else if (d[i][j] == 1){
          count1 += 1;
        }
        else if (d[i][j] == 2){
          count2 += 1;
        }
        else if (d[i][j] == 3){
          count3 += 1;
        }
        else if (d[i][j] == 4){
          count4 += 1;
        }
      }
    }
    let cell = {"1":count1/24,"2":count2/24,"3":count3/24,"4":count4/24,"5":count0/24};
    return cell
  }

  sqr(a,b){
    return (a-b)*(a-b)
  }


  std(arr,d) {
    let ans = [];

    let coef = [[0,0,0,0,0],
                [0.5,0.2,0.1,0.1,0.1],
                [0.3,0.2,0.1,0.2,0.2],
                [0.3,0.2,0.1,0.1,0.3],
                [0.2,0.2,0.2,0.3,0.1],
                [0.4,0.1,0.1,0.2,0.1]];

    for (let i = 0; i < 100; i++) {
      let tmp = 0;
      for (let j = 0; j < 5; j++){
        if (d[i]+1 != 6) {
          tmp += this.sqr(arr[i][j+1], coef[(d[i]+1)][j]);
        }
      }
      ans.push(Math.sqrt(tmp/5))
    }

    return ans
  }

  coSharing(type){
    let res = [];
    let arr = [];

    let n = 10;
    let d = this.data.grid;
    for (let i = 0; i < 100; i++) {
      let temp = d.slice(i*n, i*n+n);
      res.push(temp);
    }
    for (let i = 0; i < 10; i++){
      for (let j = 0; j < 10; j++){
        arr.push(this.avg5x5(i,j,res)) //10*10*5
      }
    }
    let coShare = this.std(arr,d);

    let ans = 0
    let count = 0
    for (let i = 0; i < 100; i++){
      if ( d[i]== type ){
        ans += coShare[i]
        count += 1
      }
    }
    ans = ans/count 
    return ans
  }
}







////////////////////////////////////////////////////////////////////////////////////
//a class to set the radar structure
////////////////////////////////////////////////////////////////////////////////////
export function radarStruct(radarMath) {
  return [
    {
      key: "Boston",
      values: [
        { axis: "ratio", value:0},
        { axis: "Start-up: D", value: radarMath.diversity("5") },
        { axis: "Incubator: D", value: radarMath.diversity("1") },
        { axis: "Service: D", value: radarMath.diversity("2") },
        { axis: "Key Lab: D", value: radarMath.diversity("3") },
        { axis: "Co-creation: D", value: radarMath.diversity("4") },
        { axis: "%", value:0},
        { axis: "Start-up: S", value: radarMath.coSharing("0") },
        { axis: "Incubator: S", value: radarMath.coSharing("1") },
        { axis: "Service: S", value: radarMath.coSharing("2") },
        { axis: "Key Lab: S", value: radarMath.coSharing("3") },
        { axis: "Co-creation: S", value: radarMath.coSharing("4") }
      ]
    }
  ];
}
