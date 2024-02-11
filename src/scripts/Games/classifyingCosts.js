
var submitButton = document.getElementsByName("submitBtn");
var directOption = document.getElementById("direct");
var indirectOption = document.getElementById("indirect");
var fixedOption = document.getElementById("fixed");
var variableOption = document.getElementById("variable");

const selectedRadioButton = document.querySelector('input[name="ClassA"]:checked');
const selectedRadioButton2 = document.querySelector('input[name="ClassB"]:checked');


// Check if any radio button is selected
if (selectedRadioButton) {
// Access the value property of the selected radio button
const selectedValue = selectedRadioButton.value;

// Output or use the selected value as needed
alert('Selected Option: ' + selectedValue);
} else {
alert('No option selected.');
}
