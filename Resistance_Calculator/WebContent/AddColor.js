/**
 * 
 *"AddColor" is similar to the class that implements "calculateOhmValue" method
 */
function AddColor() {
}
var addColor;
/*"addColors()"Initializes the "Color" objects and stored in "colors[]"
 * 
 */
AddColor.prototype.addColors = function() {
	this.colors = [];
	this.colors.push(new Color("Black", 0, 0, -100));
	this.colors.push(new Color("Brown", 1, 1, 1));
	this.colors.push(new Color("Red", 2, 2, 2));
	this.colors.push(new Color("Orange", 3, 3, -100));
	this.colors.push(new Color("Yellow", 4, 4, 5));
	this.colors.push(new Color("Green", 5, 5, 0.5));
	this.colors.push(new Color("Blue", 6, 6, 0.25));
	this.colors.push(new Color("Violet", 7, 7, 0.1));
	this.colors.push(new Color("Gray", 8, 8, 0.05));
	this.colors.push(new Color("White", 9, 9, -100));
	this.colors.push(new Color("Gold", -100, -1, 5));
	this.colors.push(new Color("Silver", -100, -2, 10));
	this.colors.push(new Color("None", -100, -100, 20));
}
/*"getColor(col)" returns the object which has name as "col";
 * */
AddColor.prototype.getColor = function(col) {

	var colors_len = this.colors.length;
	for (var i = 0; i < colors_len; i++) {
		if (col == this.colors[i].name) {
			return this.colors[i];
		}
	}
	return -100;
}
/*"CalculateOhmValue()" is called from getData().
 * It takes four color names as arguments.
 * It calls the getColor() by passing the color name,to get the object associated with that passed name.
 * It extracts the required information from  the received object.
 * Performs the necessary calculations to calculate the resistance of the resistor.
 * Depending on the received Color names,tolerance or required value of a color 3 outputs are defined.
 *             If any value is not defined we get value as '-100'
 *             The first significant figure,second significant figure,decimal multiplier cannot be undefined.
 *             i.e. the value of,
 *                  "sfigure" of "bandAColor",
 *                  "sfigure" of "bandBColor",
 *                  "multiplier" of "bandCColor" cannot be '-100'
 *             If any of those three values is '-100' then  "Resistance cannot be calculated for given Combination" is shown.
 *             else if "tolerance" of bandDColor is either '0' or '-100',then it doesnt have any tolerance and calculated resistance is final resistance and appropiate result is displayed;     
 *           else based on tolerance value the range of resistance is displayed.
*/
AddColor.prototype.CalculateOhmValue = function(bandAColor, bandBColor,
		bandCColor, bandDColor) {
	var sfigure1 = this.getColor(bandAColor).sfigure;
	var sfigure2 = this.getColor(bandBColor).sfigure;
	var multiplier = this.getColor(bandCColor).multiplier;
	var tolerance = this.getColor(bandDColor).tolerance;
	if (sfigure1 == -100 || sfigure2 == -100 || multiplier == -100) {
		document.getElementById("result").innerHTML = "Resistance cannot be calculated for given Combination";
		return;
	} else {

		var resistance = (sfigure1 * 10) + sfigure2;
		resistance = resistance * Math.pow(10, multiplier);
		if (tolerance == 0 || tolerance == -100) {
			document.getElementById("result").innerHTML = "Resistance is "
					+ resistance + "ohms";
		} else {
			var min_res = resistance - ((resistance * 0.01) * tolerance);
			var max_res = resistance + (resistance * 0.01 * tolerance);
			document.getElementById("result").innerHTML = "Resistance is in between "
					+ min_res + "ohms and " + max_res + "ohms";
		}
	}
}
/*This function is called when the body of "index.html" is loaded.
 *It concats the available names of "Color" that are stored in "colors[]" into a variable "options".
 *The names of colors are concatenated in such a way that they become the options for the selects used in "index.html"
 *After concatenation of Color names,"options" is assigned to 4 selects in "index.html"
 * */
function loadOptions() {

	addColor = new AddColor();
	addColor.addColors();
	addColor.len_colors = addColor.colors.length;
	addColor.options = "";
	for (var i = 0; i < addColor.len_colors; i++) {
		addColor.options += "<option>" + addColor.colors[i].name + "</option>";
	}
	document.getElementById("menu").innerHTML = addColor.options;
	document.getElementById("menu2").innerHTML = addColor.options;
	document.getElementById("menu3").innerHTML = addColor.options;
	document.getElementById("menu4").innerHTML = addColor.options;

}
/*this function is called when the button in "index.html" is clicked.
  It calls the "CalculateOhmValue()" along with passing the names of four colors that are selected in 4 'selects' identified by 
  'menu','menu2','menu3','menu4' 
*/
function getData() {
	addColor.CalculateOhmValue(document.getElementById("menu").value, document
			.getElementById("menu2").value,
			document.getElementById("menu3").value, document
					.getElementById("menu4").value);

}