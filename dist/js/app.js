function setChart(idtable,idgraph,title,linetype,linecolor){
	var lengthRow = document.getElementById(idtable).rows.length;// Variable that stores the number of rows of the table
	var column = []; //Variable that stores the value in each row
	var data_arr; //Variable that stores all data of the table
	var categories; //Variabel that stores xAxis data of the graphics
	var series_data = []; //Variable that stores series data of the graphics
	var yAxis_arr = []; //Variable that stores all yAxis indexs of the graphics
	var lineNumber = 0; //variable that stores the line sequence number
	var int_arr  = 0; //variable that stores array which elements have been converted to integer
	
	//Get all data on each row of the table
	for(i = 0 ; i < lengthRow ; i++){
		//Get all cells on current row
		var row = document.getElementById(idtable).rows[i].cells;
		console.log("Length : "+row.length);
		for(j = 0; j < row.length ; j++){
			column.push({"COLUMN_ROW":j,"VALUE":row[j].innerHTML});
		}
	}
	
	//Make new array that group by value
	result = column.reduce(function (r, a) {
		r[a.COLUMN_ROW] = r[a.COLUMN_ROW] || [];
		r[a.COLUMN_ROW].push(a);
		return r;
	}, Object.create(null));

	//Customize array contents
	$.each(result,function(key,value){
		$.each(value,function(key2,value2){
			result[key][key2] = value2.VALUE;
		});
	});

	data_arr = result;
	categories = data_arr[0];
	categories.shift();

	//Put elements to array of graphics line 
	$.each(data_arr,function(key,value){
		if(key > 0){
			series_data_name = value[0];
			series_data_value = value;
			series_data_value.shift();

			//Convert all elements on array to integer
			int_arr = series_data_value.map(function (x) { 
				return parseInt(x, 10); 
			});

			//Push converted data to series_data array
			series_data.push({
				name: series_data_name,
				data: int_arr,
				type: linetype[lineNumber],
				color:linecolor[lineNumber],
				yAxis: lineNumber
			});

			//Put yAxis Array
			yAxis_arr.push({
				title: {
					text: series_data_name
				}
			});

			//LineNumber increased
			lineNumber++;
		}
	});

	Highcharts.chart(idgraph, {
		chart: {
			type: 'spline'
		},
		title: {
			text: title
		},
		xAxis: {
			categories: categories
		},
		yAxis:yAxis_arr,
		plotOptions: {
			series: {
				fillOpacity: 0.5
			}
		},
		series: series_data
	});
}
