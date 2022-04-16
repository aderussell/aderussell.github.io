
window.onload = function() {
	document.getElementById('resort_filter').onchange = function(event) {
		loadJSON();
	}
	document.getElementById('input_height').onkeydown = function(event) {
		if (event.keyCode == 13) {
	    	loadJSON();
		}
	}
	loadJSON();
}

function enteredHeight() {
	var input = document.getElementById('input_height').value;
    let enteredHeight = parseInt(input, 10);
    return enteredHeight;
}

function filteredResort() {
	var input = document.getElementById('resort_filter').value;
    return input;
}

function populateFilter(parks) {
	//let parks = ["WDW", "Universal Orlando Resort", "Disneyland Anaheim", "Disneyland Paris"];
	const filterPicker = document.getElementById('resort_filter');
	filterPicker.add(new Option("All", null));
	parks.forEach((park, index) => {
		let option = new Option(park.name, park.tag);
		filterPicker.add(option);
	});
}

var cachedJson = null;

function loadJSON() {
	if (cachedJson != null) {
		updateContent(cachedJson);
		return;
	}
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/demos/heights/data.json', true);
    // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback 
            // as .open() will NOT return a value but simply returns undefined in asynchronous mode
            let v = JSON.parse(xobj.responseText);
            populateFilter(v.resorts);
            cachedJson = v;
            updateContent(v);
        }
    };
    xobj.send(null);
}

function updateContent(v) {
	removeExistingTables();
	let height = enteredHeight();
	let filter = filteredResort();
	if (filter != "null") {
		v.parks.filter(park => park.resort == filter).forEach(i => createTable(document, i, height));
	} else {
		v.parks.forEach(i => createTable(document, i, height));
	}
}

function createRow(table, rowData, enteredHeight) {
	var min = rowData["min-height"];
	var max = rowData["max-height"];

	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML	= rowData.name;

	var cell2 = row.insertCell(1);
	if (Number.isInteger(enteredHeight)) {
		cell2.innerHTML = "OK";
	}

	var details = [];

	if (max != null) {
		if (Number.isInteger(enteredHeight) && enteredHeight > max) {
			cell2.innerHTML = "Too Tall";
		}
		details.push("max: " + max);
	}

	if (min != null) {
		if (Number.isInteger(enteredHeight) && enteredHeight < min) {
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