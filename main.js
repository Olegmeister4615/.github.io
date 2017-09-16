var height=100000;
var a;
var calculus={};

calculus.sum = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
      if (typeof (arr[i]) === 'number') {
        total = total + arr[i];
      } else {
        throw new Error('All elements in array must be numbers');
      }
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};

calculus.Riemann = function (func, start, finish, n, sampler) {
  var inc = (finish - start) / n;
  var totalHeight = 0;
  var i;

  if (typeof sampler === 'function') {
    for (i = start; i < finish; i += inc) {
      totalHeight += func(sampler(i, i + inc));
    }
  } else {
    for (i = start; i < finish; i += inc) {
      totalHeight += func(i);
    }
  }

  return totalHeight * inc;
};
calculus.mean = function (arr) {
  var count = arr.length;
  var sum = calculus.sum(arr);
  return sum / count;
};
calculus.median = function (arr) {
  return calculus.quantile(arr, 1, 2);
};
calculus.quantile = function (arr, k, q) {
  var sorted, count, index;

  if (k === 0) return Math.min.apply(null, arr);

  if (k === q) return Math.max.apply(null, arr);

  sorted = arr.slice(0);
  sorted.sort(function (a, b) {
    return a - b;
  });
  count = sorted.length;
  index = count * k / q;

  if (index % 1 === 0) return 0.5 * sorted[index - 1] + 0.5 * sorted[index];

  return sorted[Math.floor(index)];
};



function deposFunc(x){
    return (d.Value()*Math.pow((1 + c.Value()),(x-1)));
}
function cachFunc(x){
    return ((d.Value()*(1 - Math.pow((1 + c.Value()),x))/-c.Value())*u.Value())+(depositeDaily.Y(x) * refPursentOfPeople.Value() * refPursent.Value());
}
function DiffFunc(x){
    return deposFunc(x) - cachFunc(x);
}


var brd = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-5, height, 100, -(height*0.4)], axis:true}),
    d = brd.create('slider',[[1,-height*0.10],[20,-height*0.1],[0,2000,10000]], {name:'d(суточный депозит)'}),
    c = brd.create('slider',[[1,-height*0.2],[20,-height*0.2],[0,0.0490,0.1]], {name:'c(увеличение депозита)',precision:4}),
    u = brd.create('slider',[[1,-height*0.3],[20,-height*0.3],[0,0.0495,0.15]], {name:'u(процент)',precision:4}),

    refPursentOfPeople = brd.create('slider',[[55,-height*0.1],[65,-height*0.1],[0,0.45,1]], {name:'проц. людей',precision:4}),
    refPursent = brd.create('slider',[[55,-height*0.2],[65,-height*0.2],[0,0.15,0.3]], {name:'реф. пр.',precision:4}),
    
    depositeDaily = brd.create('functiongraph',[function(x){
        return d.Value()*Math.pow((1 + c.Value()),(x-1));
    }]),
    dailyCashback = brd.create('functiongraph',[function(x){
        var sumOfDeposites=(d.Value()*(1 - Math.pow((1 + c.Value()),x))/-c.Value());
        return sumOfDeposites*u.Value()+(depositeDaily.Y(x) * refPursentOfPeople.Value() * refPursent.Value());
    }],
    {strokeColor:'#00ff00'}),

    li2 = brd.create('line',[[()=>(1/u.Value()),0],[()=>(1/u.Value()),1]], {straightFirst:false, strokeWidth:0.5, dash:2, visible:true}),

    i0 = brd.create('intersection', [depositeDaily,dailyCashback,0], {visible:true});
    /*
    depCurve=brd.create('curve',[
        (x)=>{return x;},
        (x)=>{return d.Value()*Math.pow((1 + c.Value()),(x-1));},
        0,
        i0.X()
    ]);
    cashCurve=brd.create('curve',[
        (x)=>{return x;},
        (x)=>{return (d.Value()*(1 - Math.pow((1 + c.Value()),x))/-c.Value())*u.Value();},
        0,
        i0.X()
    ]);
    */






//board2
var height2 = 500;
var lowedPursent = function(x){
    var delta=1-selflowedPursent.Value();
    return Math.pow(delta,x);
};
var brd2 = JXG.JSXGraph.initBoard('jxgbox2', {boundingbox: [-15, height2, 100, -(height2*0.4)], axis:true}),
    selfD = brd2.create('slider',[[10,-height2*0.10],[30,-height2*0.10],[0,400,500]], {name:'selfD средний вклад'}),
    selflowedPursent = brd2.create('slider',[[10,-height2*0.17],[30,-height2*0.17],[0,0.01,0.1]], {name:'процент понижение selfD'}),
    conversionPursent = brd2.create('slider',[[10,-height2*0.235],[30,-height2*0.235],[0,0.25,0.7]], {name:'конверсия'}),
    reinvest = brd2.create('slider',[[10,-height2*0.3],[30,-height2*0.3],[0,0.25,0.7]], {name:'реинвест'}),


    CountOfMen = brd2.create('functiongraph',[function(x){
        return (depositeDaily.Y(x)/(selfD.Value()*lowedPursent(x)))*(1-reinvest.Value());
    }]),
    totalCountOfMen = brd2.create('functiongraph',[function(x){

        return (CountOfMen.Y(x)/conversionPursent.Value());
    }]),


    pointBr = brd2.create('point',[()=>i0.X(),()=>CountOfMen.Y(i0.X())], {name:"A"});
    totalPointBr = brd2.create('point',[()=>i0.X(),()=>totalCountOfMen.Y(i0.X())], {name:"total A"});

    totalCountOfMenFunc = function(x){
        return CountOfMen.Y(x)/conversionPursent.Value();
    }


//doIt
    var meanPeoples = function() {
        console.log('i0:',i0);
        var n = Math.round(i0.X());
        var arr=[];
        for(var i = 0;i <= n; i++){
            arr.push(totalCountOfMen.Y(i));
        }
        console.log('array',arr);
        var mean = Math.round(calculus.mean(arr));
        var median = Math.round(calculus.median(arr));
        console.log('среднее:',mean,median);
        return {mean,median};

    }

    var doIt = function(){
        console.log("update");
        var lol = calculus.Riemann(DiffFunc, 0, i0.X(), 200, 0.0001);
        var lolDepos = calculus.Riemann(deposFunc, 0, i0.X(), 200, 0.0001);
        var lolCach = calculus.Riemann(cachFunc, 0, i0.X(), 200, 0.0001);
        var pursent = lol/lolDepos;
        var peopleStat = calculus.Riemann(totalCountOfMenFunc, 0, i0.X(), 200, 0.0001);
        var peopleM = meanPeoples();
        document.getElementById('myCash').innerHTML = "Заработано: " + Math.round(lol)+" долларов"
        document.getElementById('depos').innerHTML = "всего вложено: "+Math.round(lolDepos)+" долларов";
        document.getElementById('allCash').innerHTML = "всего выплачено: " + Math.round(lolCach)+" долларов";
        document.getElementById('pursent').innerHTML = pursent;
        document.getElementById('peopleStat').innerHTML = "привлечено людей:" + Math.round(peopleStat)+" в среднем:"+peopleM.median+"/"+peopleM.mean;
    };

    var lol = calculus.Riemann(DiffFunc, 0, i0.X(), 200, 0.0001);
    document.getElementById('myCash').innerHTML = Math.round(lol)+" долларов";

    brd.on('update',()=>{
        doIt();
        brd2.update();
    });
    brd2.on('update',()=>{
        doIt();
    });

    doIt();



var valArr=[d,c,u,selfD,selflowedPursent,conversionPursent,reinvest];




