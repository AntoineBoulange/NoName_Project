//CLASS
class Command {
  constructor(id,command, tpsStart,tps,color) {
    this.id=id;
    this.command=command;
    this.tpsStart=tpsStart;
    this.tps=tps;
    this.color=color;
  }
}

var width;
var height;
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var COMMANDS = [];
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

function InterpretCommand(commandObject) {
  // var command = document.getElementById("command").value;
  // var tps  = document.getElementById("tps").value;
  // var color = document.getElementById("color").value;
  var commands = commandObject.command.split(";");

  for( var i=0;i<commands.length;i++)
  {
    var cells = commands[i].split(":");
    if(cells.length == 2)
    {
      for (var j = ExtractRow(cells[0]) ; j <= ExtractRow(cells[1]); j++) {
        for (var k = ConvertLetterToColumn(cells[0]); k <= ConvertLetterToColumn(cells[1]); k++) {
          setPixelColorByCellName(alphabet[k]+j,commandObject.tps,commandObject.color);
        }
      }
    }
    else if(cells.length == 1)
    {
      setPixelColorByCellName(cells[0],commandObject.tps,commandObject.color);
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

function addToScript()
{
  var command = document.getElementById("command").value;
  var tps  = document.getElementById("tps").value;
  var color = document.getElementById("color").value;
  var id;
  if(COMMANDS.length==0)
    id=0;
  else
    id=COMMANDS[COMMANDS.length-1].id+1;

  var newCommand = new Command(id,command,0,tps,color);
  COMMANDS.push(newCommand);
  loadScript();
}

  function loadScript(){
    var oldScript = document.getElementById("script");
    if(oldScript !== null)
      oldScript.parentNode.removeChild(oldScript);
    var newDivScript = document.createElement("div");
    newDivScript.setAttribute("id","script");

    for(var i = 0; i < COMMANDS.length; i++)
    {
      var newDiv = document.createElement("div");
      newDiv.setAttribute("id",COMMANDS[i].id);
      newDiv.setAttribute("class","commands");
      newDiv.setAttribute("style","background-color:"+COMMANDS[i].color);
      //Command
      var sousDivCommand = document.createElement("div");
      sousDivCommand.setAttribute("class","input-group input-group-sm col-md-12 col-lg-12");
      sousDivCommand.innerHTML += "<span class=\"input-group-addon\">Selection</span>"
      var newCommand = document.createElement("input");
      newCommand.setAttribute("type","text");
      newCommand.setAttribute("class","form-control");
      newCommand.setAttribute("aria-describedby","NLigne");
      newCommand.setAttribute("id","command" + COMMANDS[i].id);
      newCommand.setAttribute("value",COMMANDS[i].command);
      sousDivCommand.appendChild(newCommand);
      newDiv.appendChild(sousDivCommand);
      //Color
      var sousDivCouleur = document.createElement("div");
      sousDivCouleur.setAttribute("class","col-md-12 col-lg-12 no-padding");
      var sousSousDivCouleur = document.createElement("div");
      sousSousDivCouleur.setAttribute("class","input-group input-group-sm");
      sousSousDivCouleur.innerHTML = "<span class=\"input-group-addon\" id=\"TColor" + COMMANDS[i].id + "\">Couleur</span>"
      sousSousDivCouleur.innerHTML += "<input type=\"color\" class=\"form-control\" aria-describedby=\"TColor\" id=\"color" + COMMANDS[i].id +"\" value=\""+COMMANDS[i].color+"\">"
      sousDivCouleur.appendChild(sousSousDivCouleur);
      newDiv.appendChild(sousDivCouleur);
      //TpsStart
      var sousDivTpsStart = document.createElement("div");
      sousDivTpsStart.setAttribute("class","col-md-6 col-lg-6 no-padding");
      var sousSousDivTpsStart = document.createElement("div");
      sousSousDivTpsStart.setAttribute("class","input-group input-group-sm");
      sousSousDivTpsStart.innerHTML = "<span class=\"input-group-addon\" id=\"TimeStart" + COMMANDS[i].id + "\">Temps de départ (ms)</span>"
      sousSousDivTpsStart.innerHTML += "<input type=\"number\" class=\"form-control\" aria-describedby=\"Time\" id=\"tpsStart" + COMMANDS[i].id +"\" value=\""+COMMANDS[i].tpsStart+"\">"
      sousDivTpsStart.appendChild(sousSousDivTpsStart);
      newDiv.appendChild(sousDivTpsStart);
      //Tps
      var sousDivTps = document.createElement("div");
      sousDivTps.setAttribute("class","col-md-6 col-lg-6 no-padding");
      var sousSousDivTps = document.createElement("div");
      sousSousDivTps.setAttribute("class","input-group input-group-sm");
      sousSousDivTps.innerHTML = "<span class=\"input-group-addon\" id=\"Time" + COMMANDS[i].id + "\">Durée d'allumage (ms)</span>"
      sousSousDivTps.innerHTML += "<input type=\"number\" class=\"form-control\" aria-describedby=\"Time\" id=\"tps" + COMMANDS[i].id +"\" value=\""+COMMANDS[i].tps+"\">"
      sousDivTps.appendChild(sousSousDivTps);
      newDiv.appendChild(sousDivTps);

      newDivScript.appendChild(newDiv);
    }

    if(COMMANDS.length!==0)
    {
      newDivScript.innerHTML += "<button class=\"btn btn-default\" type=\"button\" onclick=\"StartSimulation()\">Tester</button>";
    }

    document.getElementById("containerScript").appendChild(newDivScript);


  }

  function StartSimulation()
  {
    for(var i=0;i<COMMANDS.length;i++)
    {
      COMMANDS[i].command = document.getElementById("command"+i).value;
      COMMANDS[i].color = document.getElementById("color"+i).value;
      COMMANDS[i].tpsStart = Number(document.getElementById("tpsStart"+i).value);
      COMMANDS[i].tps = Number(document.getElementById("tps"+i).value);

      if(COMMANDS[i].tpsStart!==0)
      {
        setTimeout(InterpretCommand, Number(COMMANDS[i].tpsStart)+250, COMMANDS[i]);
      }
      else {
        InterpretCommand(COMMANDS[i]);
      }
    }
  }
