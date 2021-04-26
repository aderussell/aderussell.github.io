
window.onload = function() {
	document.getElementById('input_height').onkeydown = function(event) {
		if (event.keyCode == 13) {
	    	testResults();
		}
	}
}

function testResults() {
    var input = document.getElementById('input_height').value;
    let enteredHeight = parseInt(input, 10);
    loadJSON(console.log, enteredHeight);
}

function loadJSON(callback, enteredHeight) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/demos/heights/data.json', true);
    // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback 
            // as .open() will NOT return a value but simply returns undefined in asynchronous mode
            let v = JSON.parse(xobj.responseText);
            removeExistingTables();
            v.parks.forEach(i => createTable(document, i, enteredHeight));
            callback(v);
        }
    };
    xobj.send(null);
}

function createRow(table, rowData, enteredHeight) {
	var min = rowData["min-height"];
	var max = rowData["max-height"];

	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML	= rowData.name;

	var cell2 = row.insertCell(1);
	cell2.innerHTML = "OK";

	var details = [];

	if (max != null) {
		if (enteredHeight > max) {
			cell2.innerHTML = "Too Tall";
		}
		details.push("max: " + max);
	}

	if (min != null) {
		if (enteredHeight < min) {
			cell2.innerHTML = "Too Short";
			cell2.style.backgroundColor = 'red';
		}
		details.push("min: " + min);
	}
	var formattedDetail = details.join(".  ");
	if (formattedDetail) {
		cell1.innerHTML += '<br /><small>' + formattedDetail + '</small>';
	}
}

function removeExistingTables() {
	document.querySelectorAll('.height-table').forEach(e => e.remove());
}

function createTable(document, tableData, enteredHeight) {
	let table = document.createElement('table');
	table.setAttribute('class', 'height-table');
	createTableHeader(table, tableData.name);

	var body = document.getElementsByClassName('page-content')[0];
	body.appendChild(table);

	let tb = table.createTBody();
	tableData.rides.forEach(i => createRow(tb, i, enteredHeight));

	return table;
}

function createTableHeader(table, park) {
	var header = table.createTHead();
	var row = header.insertRow(0);
	var cell = row.insertCell(0);
	cell.colSpan = 2;
	cell.innerHTML = park;

	var row = header.insertRow(-1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = "Ride";

	var cell2 = row.insertCell(1);
	cell2.innerHTML = "Can Ride";
}