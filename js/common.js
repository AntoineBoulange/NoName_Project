var width;
var height;
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

function createUserTable () {

  width = Number(document.getElementById("width").value);
  if (width < 1)
    width = 1;
  else if(width > alphabet.length)
    width = alphabet.length;
  height = Number(document.getElementById("height").value);
  if (height < 1)
    height = 1;

  createTable(width, height);

  document.getElementById("width").value = "";
  document.getElementById("height").value = "";
}

function createTable(width, height) {
  var oldTable = document.getElementById("table");
  if(oldTable !== null)
    oldTable.parentNode.removeChild(oldTable);

  if((height !== 0) && (width !== 0)){
    var newTable = document.createElement("table");
    newTable.setAttribute("id","table");
    var divEle = document.getElementById("pixelsWall");
    divEle.appendChild(newTable);

    for(var row=0; row<=height; row++){
      var newRow = document.createElement("tr");
      newRow.setAttribute("id","tr_" + row);
      newTable.appendChild(newRow);
      if(row==0)
      {
        for(var col=0; col<=width; col++){
          if(col==0)
          {
            var newHeader = document.createElement("th");
            newRow.appendChild(newHeader);
          }
          else {
            var newHeader = document.createElement("th");
            newHeader.innerHTML = alphabet[col-1];
            newRow.appendChild(newHeader);
          }
        }
      }
      else {
        var newHeader = document.createElement("th");
        newHeader.innerHTML = row;
        newRow.appendChild(newHeader);

        for(var col=0; col<width; col++){
          var newCell = document.createElement("td");
          newCell.setAttribute("id",alphabet[col] + row);
          newRow.appendChild(newCell);
        }
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

function InterpretCommand() {
  var command = document.getElementById("command").value;

  var commands = command.split(";");

  for( var i=0;i<commands.length;i++)
  {
    var cells = commands[i].split(":");
    if(cells.length == 2)
    {
      for (var j = ExtractRow(cells[0]) ; j <= ExtractRow(cells[1]); j++) {
        for (var k = ConvertLetterToColumn(cells[0]); k <= ConvertLetterToColumn(cells[1]); k++) {
          setPixelColorByCellName(alphabet[k]+j,2000,"#ffffff");
        }
      }
    }
    else if(cells.length == 1)
    {
      setPixelColorByCellName(cells[0],2000,"#ffffff");
    }
  }
}

function ConvertLetterToColumn(cellName)
{
  var letter = cellName.substring(0,1);
  var column = alphabet.findIndex(function(AlphabetLetter){ return letter==AlphabetLetter;});
  if(column > width-1)
    column = width-1;
  return column;
}

function ExtractRow(cellName)
{
  var row = Number(cellName.substring(1,cellName.length));
  if(row < 1 )
    row = 1;
  else if( row > height)
    row = height;

  return row;
}

function setPixelColorByCellName (cellName, tps, color) {
  document.getElementById(cellName).style.backgroundColor = color;
  setTimeout(resetPixelColorByCellName, tps, cellName);
}
function resetPixelColorByCellName (cellName) {
    document.getElementById(cellName).style.backgroundColor = "black";
}
