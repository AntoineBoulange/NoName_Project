var width;
var height;

function createUserTable () {

  width = Number(document.getElementById("width").value);
  if (width < 0)
    width = 0;
  height = Number(document.getElementById("height").value);
  if (height < 0)
    height = 0;

  createTable(width, height);

  document.getElementById("width").value = "";
  document.getElementById("height").value = "";
}

function createTable (width, height) {
  var oldTable = document.getElementById("table");
  if(oldTable !== null)
    oldTable.parentNode.removeChild(oldTable);

  if((height !== 0) && (width !== 0)){
    var newTable = document.createElement("table");
    newTable.setAttribute("id","table");
    var divEle = document.getElementById("pixelsWall");
    divEle.appendChild(newTable);

    for(var row=1; row<=width; row++){
      var newRow = document.createElement("tr");
      newRow.setAttribute("id","tr_" + row);
      var tableEle = document.getElementById("table");
      tableEle.appendChild(newRow);

      for(var col=1; col<=height; col++){
        var newCell = document.createElement("th");
        newCell.setAttribute("id","px_" + row + "_" + col);
        var rowEle = document.getElementById("tr_" + row);
        rowEle.appendChild(newCell);
      }
    }
  }
}

function resetPixelColor (row, col) {
  if((row !== 0) && (col !== 0))
    document.getElementById("px_" + row + "_" + col).style.backgroundColor = "black";
}

function setSimplePixelColor () {
  var row = Number(document.getElementById("row").value);
  var col = Number(document.getElementById("col").value);
  var tps = Number(document.getElementById("tps").value);
  var color = document.getElementById("color").value;

  setPixelColor(row , col, tps, color);



  document.getElementById("row").value = "";
  document.getElementById("col").value = "";
  document.getElementById("color").value = "#ffffff";
  document.getElementById("tps").value = "";
}

function setPixelColor (row , col, tps, color) {

  if(row > height){
    row = height;
  }

  if(row < 0)
    row = 0;

  if(col > width)
    col = width;

  if(col < 0)
    col = 0;

  if((row !== 0) && (col !== 0))
    document.getElementById("px_" + row + "_" + col).style.backgroundColor = color;

  setTimeout(resetPixelColor, tps, row, col);
}

function setGrpPixelColor () {
  var rowB = Number(document.getElementById("rowB").value);
  if(rowB > height)
    rowB = height;
  if(rowB < 0)
    rowB = 0;

  var rowE = Number(document.getElementById("rowE").value);
  if(rowE > height)
    rowE = height;
  if(rowE < 0)
    rowE = 0;

  if(rowE < rowB){
    var tmp = rowE;
    rowE = rowB;
    rowB = tmp;
  }

  var colB = Number(document.getElementById("colB").value);
  if(colB > width)
    colB = width;
  if(colB < 0)
    colB = 0;

  var colE = Number(document.getElementById("colE").value);
  if(colE > width)
    colE = width;
  if(colE < 0)
    colE = 0;

  if(colE < colB){
    var tmp = colE;
    colE = colB;
    colB = tmp;
  }

  var color = document.getElementById("colorG").value;
  var tps = Number(document.getElementById("tpsG").value);

  if((rowB !== 0) && (rowE !== 0) && (colB !== 0) && (colE !== 0)){
    for(var row=rowB; row<=rowE; row++){
      for(var col=colB; col<=colE; col++){
        setPixelColor(row , col, tps, color);
      }
    }
  }

  document.getElementById("rowB").value = "";
  document.getElementById("rowE").value = "";
  document.getElementById("colB").value = "";
  document.getElementById("colE").value = "";
  document.getElementById("colorG").value = "#ffffff";
  document.getElementById("tpsG").value = "";
}
