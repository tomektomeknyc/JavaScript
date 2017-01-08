var student = {
  name: "",
  type: "student"
};

document.addEventListener('DOMContentLoaded', contentLoaded);

function contentLoaded(event){
  document.getElementById('name').addEventListener("keyup", keyUp);
}

function keyUp(event){
  calculateNumericOutput();
}

function calculateNumericOutput(){
  var name = GetNameValue();
  SetNameValue(name);
  displayOutputValue(ComputeNameValue(name));
}

function ComputeNameValue(name){
  var sum = 0;
  for(var i = 0; i < name.length; i++){
    sum += name.charCodeAt(i);
  }
  return sum;
}

function GetNameValue(){return document.getElementById('name').value;}

function SetNameValue(name){student.name = name;}

function displayOutputValue(val){
  var output = "Total Numeric value of a person's name is " + val;
  document.getElementById('output').innerText = output;
}
