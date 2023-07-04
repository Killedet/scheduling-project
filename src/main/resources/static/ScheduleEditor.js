class ScheduleEditor{
	#workers;
	#shiftHour;
	#shiftMinutes;
	#shiftsPerWorker;
	#openHour;
	#openMinute;
	#openTime;
	#closeHour;
	#closeMinute;
	#closeTime;
	#minWorkersPerShift;
	#offDays
	#workDaysArray;
	#numberOfDaysOff;
	#coverageArray;
	#scheduleOwnerArray;
	#scheduleArray;
	#bgColors=["success","danger","secondary","warning","info"];
	constructor(schedule, scheduleOwnerArray, workers, shiftHour,shiftMinutes, shiftsPerWorker, openHour, openMinute, closeHour, closeMinute,
	minWorkersPerShift, workDaysArray){
		if(typeof(schedule) === "ScheduleBuilder"){
			
		}else{
			this.#scheduleArray = schedule;
			this.#scheduleOwnerArray = scheduleOwnerArray;
			this.#workers = workers;
			this.#shiftHour = shiftHour;
			this.#shiftMinutes = shiftMinutes;
			this.#shiftsPerWorker = shiftsPerWorker;
			this.#openHour = openHour;
			this.#openMinute = this.#privateClosest15Minute(openMinute);
			this.#openTime = new MyTime(this.#openHour, this.#openMinute);
			this.#closeHour = closeHour;
			this.#closeMinute = this.#privateClosest15Minute(closeMinute);
			this.#closeTime = new MyTime(this.#closeHour,this.#closeMinute);
			this.#minWorkersPerShift = minWorkersPerShift;
			this.#workDaysArray = workDaysArray; 
			this.#offDays = 7 - this.#workDaysArray.length;
			this.#numberOfDaysOff = 7 - shiftsPerWorker;
			this.#privateMakeCoverageArray();
			this.#privateFillShiftCoverageArray(this.#scheduleArray);
		}
	}
	getCoverageArray(){
		return this.#coverageArray;
	}
	
	getScheduleOwnerArray(){
		return this.#scheduleOwnerArray;
	}
	deleteSingleWorkSchedule(indexInScheduleArray){
		this.#scheduleArray.splice(indexInScheduleArray,1);
		this.#scheduleOwnerArray.splice(indexInScheduleArray,1);
		this.#privateMakeCoverageArray();
		this.#privateFillShiftCoverageArray(this.#scheduleArray);
	}
	startEditingSingleWorkSchedule(row){
		var template = this.appendEditingSingleWorkSchedule(row);
		return template;
	}
	submitNewSingleWorkSchedule(container,newScheduleArray,row){
		
		if(row === -1){
			this.#scheduleArray.push(newScheduleArray);
			this.#scheduleOwnerArray.push([(this.#scheduleArray.length),-1,"none"]);
		}else{
			this.#scheduleArray[row] = newScheduleArray;
		}
		
		this.#privateMakeCoverageArray();
		this.#privateFillShiftCoverageArray(this.#scheduleArray);
		
		var template = this.insertSingleWorkScheduleIntoTable(container,newScheduleArray,row);
		return template;
		
	}
	insertSingleWorkScheduleIntoTable(container,newScheduleArray,row){
		var color = this.#bgColors[0];
		var lastInTable = (this.#scheduleArray.length * 2) - 2;
		var lastInArray = this.#scheduleArray.length - 1;
			var rowID = this.#scheduleArray.length - 1;
			//colorCode = (colorCode + 1) % 5;
			var singleScheduleName;
			if(row === -1){
				if(this.#scheduleOwnerArray[lastInArray][1] === -1){
					singleScheduleName = "Schedule " + this.#scheduleOwnerArray[lastInArray][0];
				
				}else{
					singleScheduleName = this.#scheduleOwnerArray[lastInArray][2];
				}
			}else{
				var scheduleNumber = row + 1;
				singleScheduleName = "Schedule " + scheduleNumber;
			}
			//singleScheduleName = "Schedule " + (i+1);
			var singleSchedule = newScheduleArray;
			var mondayShift = this.#privateTimeConverter(singleSchedule[0]);
			var tuesdayShift = this.#privateTimeConverter(singleSchedule[1]);
			var wednesdayShift = this.#privateTimeConverter(singleSchedule[2]);
			var thursdayShift = this.#privateTimeConverter(singleSchedule[3]);
			var fridayShift = this.#privateTimeConverter(singleSchedule[4]);
			var saturdayShift = this.#privateTimeConverter(singleSchedule[5]);
			var sundayShift = this.#privateTimeConverter(singleSchedule[6]);
			
			var newRowString = `
				<tr data-rowid= "${rowID}">
  					<th data-rowid= "${rowID}" scope="row">${singleScheduleName}</th>
  					<td data-othercolor= "bg-primary" data-colid= "0" data-rowid= "${rowID}" class= "bg-${color}">${mondayShift}</td>
  					<td data-othercolor= "bg-primary" data-colid= "1" data-rowid= "${rowID}" class= "bg-${color}">${tuesdayShift}</td>
  					<td data-othercolor= "bg-primary" data-colid= "2" data-rowid= "${rowID}" class= "bg-${color}">${wednesdayShift}</td>
  					<td data-othercolor= "bg-primary" data-colid= "3" data-rowid= "${rowID}" class= "bg-${color}">${thursdayShift}</td>
  					<td data-othercolor= "bg-primary" data-colid= "4" data-rowid= "${rowID}" class= "bg-${color}">${fridayShift}</td>
  					<td data-othercolor= "bg-primary" data-colid= "5" data-rowid= "${rowID}" class= "bg-${color}">${saturdayShift}</td>
  					<td data-othercolor= "bg-primary" data-colid= "6" data-rowid= "${rowID}" class= "bg-${color}">${sundayShift}</td>
  					<td data-rowid= "${rowID}"><button data-rowid= "${rowID}" class="btn btn-warning singleScheduleEditButton">Edit</button><button data-rowid= "${rowID}" class="btn btn-danger singleScheduleDeleteButton">Delete</button></td>
  				<tr>
			`;
			//$('#scheduleTableBodyID').append(newRowString);
			//document.getElementById(container).insertRow((this.#scheduleArray.length - 2)).innerHTML = newRowString;
			if(row === -1){
				//var appendTo = container + " > tbody > tr";
				//$(appendTo).eq(lastInTable).after(newRowString);
				$(container).append(newRowString);
			}
			return newRowString;
	}
	appendEditingSingleWorkSchedule(row){
		var singleScheduleToEdit = this.#scheduleArray[row];
		
		var allDefaultStrLiterals = ``;
		for(var i = 0; i < singleScheduleToEdit.length; i++){
			var startTime = singleScheduleToEdit[i][0].toString();
			var endTime = "";
			if(startTime === "0-1:00"){
				startTime = "";
				endTime = "";
			}else{
				endTime = singleScheduleToEdit[i][1].toString();
			}
			var singleRow = `
				<td data-othercolor= "bg-primary" data-colid= "${i}" data-rowid="${row}" class= "bg-dark text-white">
  					<div class="w-100">
  						<input class="tableNewScheduleTime" type="time" value = "${startTime}"> 
  						<div> to </div> 
  						<input class="tableNewScheduleTime" type="time" value = "${endTime}">
  					</div>
  				</td>
			`
			allDefaultStrLiterals += singleRow;
		}
		var singleScheduleName;
		if(this.#scheduleOwnerArray[row][1] === -1){
			singleScheduleName = "Schedule " + this.#scheduleOwnerArray[row][0];
				
		}else{
			singleScheduleName = this.#scheduleOwnerArray[row][2];
		}
		var totalSingleSchedule = `<tr data-rowid="${row}">
									<th data-rowid="${row}" scope="row"> ${singleScheduleName}</th>
									` + allDefaultStrLiterals +
									`
										<td data-rowid="${row}"><button data-rowid="${row}" class="btn btn-success editSaveButton">Save</button></td>
									<tr>`;
		/*var appendTo = container + " > tbody > tr";
		var indexOfRow = (row * 2);
		console.log(totalSingleSchedule);
		console.log(indexOfRow);
		console.log(appendTo);
		$('#testDiv').append(totalSingleSchedule);
		$(appendTo).eq(2).after(totalSingleSchedule);*/
		return totalSingleSchedule;
		
	}
	addSingleWorkSchedule(container){
		var newSingleSchedule = `
				<tr data-rowid>
  					<th data-rowid scope="row">New Schedule</th>
  					<td data-othercolor= "bg-primary" data-colid= "0" data-rowid class= "bg-dark text-white">
  						<div class="w-100">
  							<input class="tableNewScheduleTime" type="time"> 
  							<div> to </div> 
  							<input class="tableNewScheduleTime" type="time">
  						</div>
  					</td>
  					<td data-othercolor= "bg-primary" data-colid= "0" data-rowid class= "bg-dark text-white">
  						<div class="w-100">
  							<input class="tableNewScheduleTime" type="time"> 
  							<div> to </div> 
  							<input class="tableNewScheduleTime" type="time">
  						</div>
  					</td>
  					<td data-othercolor= "bg-primary" data-colid= "0" data-rowid class= "bg-dark text-white">
  						<div class="w-100">
  							<input class="tableNewScheduleTime" type="time"> 
  							<div> to </div> 
  							<input class="tableNewScheduleTime" type="time">
  						</div>
  					</td>
  					<td data-othercolor= "bg-primary" data-colid= "0" data-rowid class= "bg-dark text-white">
  						<div class="w-100">
  							<input class="tableNewScheduleTime" type="time"> 
  							<div> to </div> 
  							<input class="tableNewScheduleTime" type="time">
  						</div>
  					</td>
  					<td data-othercolor= "bg-primary" data-colid= "0" data-rowid class= "bg-dark text-white">
  						<div class="w-100">
  							<input class="tableNewScheduleTime" type="time"> 
  							<div> to </div> 
  							<input class="tableNewScheduleTime" type="time">
  						</div>
  					</td>
  					<td data-othercolor= "bg-primary" data-colid= "0" data-rowid class= "bg-dark text-white">
  						<div class="w-100">
  							<input class="tableNewScheduleTime" type="time"> 
  							<div> to </div> 
  							<input class="tableNewScheduleTime" type="time">
  						</div>
  					</td>
  					<td data-othercolor= "bg-primary" data-colid= "0" data-rowid class= "bg-dark text-white">
  						<div class="w-100">
  							<input class="tableNewScheduleTime" type="time"> 
  							<div> to </div> 
  							<input class="tableNewScheduleTime" type="time">
  						</div>
  					</td>
  					
  					<td data-rowid><button data-rowid class="btn btn-success newScheduleSaveButton">Save</button><button data-rowid class="btn btn-danger newScheduleDeleteButton">Delete</button></td>
  				<tr>
			`;
			$(container).append(newSingleSchedule);
	}
	appendEditorScheduleToContainer(container){
		var colorCode = 0;
		
		for(var i = 0; i < this.#scheduleArray.length; i++){
			var color = this.#bgColors[colorCode];
			var rowID = i;
			colorCode = (colorCode + 1) % 5;
			var singleScheduleName;
			if(this.#scheduleOwnerArray[i][1] === -1){
				singleScheduleName = "Schedule " + this.#scheduleOwnerArray[i][0];
				
			}else{
				singleScheduleName = this.#scheduleOwnerArray[i][2];
			}
			//singleScheduleName = "Schedule " + (i+1);
			var singleSchedule = this.#scheduleArray[i];
			var mondayShift = this.#privateTimeConverter(singleSchedule[0]);
			var tuesdayShift = this.#privateTimeConverter(singleSchedule[1]);
			var wednesdayShift = this.#privateTimeConverter(singleSchedule[2]);
			var thursdayShift = this.#privateTimeConverter(singleSchedule[3]);
			var fridayShift = this.#privateTimeConverter(singleSchedule[4]);
			var saturdayShift = this.#privateTimeConverter(singleSchedule[5]);
			var sundayShift = this.#privateTimeConverter(singleSchedule[6]);
			
			var newRowString = `
				<tr data-rowid= "${rowID}">
  					<th data-rowid= "${rowID}" scope="row">${singleScheduleName}</th>
  					<td data-othercolor= "bg-primary" data-colid= "0" data-rowid= "${rowID}" class= "bg-${color}">${mondayShift}</td>
  					<td data-othercolor= "bg-primary" data-colid= "1" data-rowid= "${rowID}" class= "bg-${color}">${tuesdayShift}</td>
  					<td data-othercolor= "bg-primary" data-colid= "2" data-rowid= "${rowID}" class= "bg-${color}">${wednesdayShift}</td>
  					<td data-othercolor= "bg-primary" data-colid= "3" data-rowid= "${rowID}" class= "bg-${color}">${thursdayShift}</td>
  					<td data-othercolor= "bg-primary" data-colid= "4" data-rowid= "${rowID}" class= "bg-${color}">${fridayShift}</td>
  					<td data-othercolor= "bg-primary" data-colid= "5" data-rowid= "${rowID}" class= "bg-${color}">${saturdayShift}</td>
  					<td data-othercolor= "bg-primary" data-colid= "6" data-rowid= "${rowID}" class= "bg-${color}">${sundayShift}</td>
  					<td data-rowid= "${rowID}"><button data-rowid= "${rowID}" class="btn btn-warning singleScheduleEditButton">Edit</button><button data-rowid= "${rowID}" class="btn btn-danger singleScheduleDeleteButton">Delete</button></td>
  				<tr>
			`;
			$(container).append(newRowString);
		}
		
	}
	#privateTimeConverter(timeArray){
		if(timeArray[0].getHour() < 0){
			return "OFF";
		}
		
		return timeArray[0].toString() + " to " + timeArray[1].toString();
	}
	createAndDisplayTableToolBody(tableBody){
		
		var timeSlot = this.#openTime;
		
		for(var i = 0; i < this.#coverageArray[0].length; i++){
			var mondayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[0][i]);
			var tuesdayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[1][i]);
			var wednesdayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[2][i]);
			var thursdayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[3][i]);
			var fridayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[4][i]);
			var saturdayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[5][i]);
			var sundayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[6][i]);
			
			var mondayStr = mondayInfoArr[0];
			var tuesdayStr = tuesdayInfoArr[0];
			var wednesdayStr = wednesdayInfoArr[0];
			var thursdayStr = thursdayInfoArr[0];
			var fridayStr = fridayInfoArr[0];
			var saturdayStr = saturdayInfoArr[0];
			var sundayStr = sundayInfoArr[0];
			
			var mondayColor = mondayInfoArr[1];
			var tuesdayColor = tuesdayInfoArr[1];
			var wednesdayColor = wednesdayInfoArr[1];
			var thursdayColor = thursdayInfoArr[1];
			var fridayColor = fridayInfoArr[1];
			var saturdayColor = saturdayInfoArr[1];
			var sundayColor = sundayInfoArr[1];
			
			var rowID = i;
			
			var newRowString = `
				<tr>
  					<th scope="row">${timeSlot}</th>
  					<td data-colid= "0" data-rowid= "${rowID}" class= "bg-${mondayColor}">${mondayStr}</td>
  					<td data-colid= "1" data-rowid= "${rowID}" class= "bg-${tuesdayColor}">${tuesdayStr}</td>
  					<td data-colid= "2" data-rowid= "${rowID}" class= "bg-${wednesdayColor}">${wednesdayStr}</td>
  					<td data-colid= "3" data-rowid= "${rowID}" class= "bg-${thursdayColor}">${thursdayStr}</td>
  					<td data-colid= "4" data-rowid= "${rowID}" class= "bg-${fridayColor}">${fridayStr}</td>
  					<td data-colid= "5" data-rowid= "${rowID}" class= "bg-${saturdayColor}">${saturdayStr}</td>
  					<td data-colid= "6" data-rowid= "${rowID}" class= "bg-${sundayColor}">${sundayStr}</td>
  				<tr>
			`;
			$(tableBody).append(newRowString);
			timeSlot = timeSlot.addLengthOfTime(0,15);
		}
		
	}
	displayCoverageArray(container){
		var headingRowString = `
		<div class="row">
  			<div class="col-sm"></div>
  			<div class="col-sm">Monday</div>
  			<div class="col-sm">Tuesday</div>
  			<div class="col-sm">Wednesday</div>
  			<div class="col-sm">Thursday</div>
  			<div class="col-sm">Friday</div>
  			<div class="col-sm">Saturday</div>
  			<div class="col-sm">Sunday</div>
  		</div>
			`;
		$(container).append(headingRowString);
		
		var timeSlot = this.#openTime;
		for(var i = 0; i < this.#coverageArray[0].length; i++){
			var mondayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[0][i]);
			var tuesdayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[1][i]);
			var wednesdayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[2][i]);
			var thursdayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[3][i]);
			var fridayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[4][i]);
			var saturdayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[5][i]);
			var sundayInfoArr = this.#privateMinSlotInfo(this.#coverageArray[6][i]);
			
			var mondayStr = mondayInfoArr[0];
			var tuesdayStr = tuesdayInfoArr[0];
			var wednesdayStr = wednesdayInfoArr[0];
			var thursdayStr = thursdayInfoArr[0];
			var fridayStr = fridayInfoArr[0];
			var saturdayStr = saturdayInfoArr[0];
			var sundayStr = sundayInfoArr[0];
			
			var mondayColor = mondayInfoArr[1];
			var tuesdayColor = tuesdayInfoArr[1];
			var wednesdayColor = wednesdayInfoArr[1];
			var thursdayColor = thursdayInfoArr[1];
			var fridayColor = fridayInfoArr[1];
			var saturdayColor = saturdayInfoArr[1];
			var sundayColor = sundayInfoArr[1];
			
			var newRowString = `
				<div class="row">
  					<div class="col-sm">${timeSlot}</div>
  					<div class="col-sm bg-${mondayColor}">${mondayStr}</div>
  					<div class="col-sm bg-${tuesdayColor}">${tuesdayStr}</div>
  					<div class="col-sm bg-${wednesdayColor}">${wednesdayStr}</div>
  					<div class="col-sm bg-${thursdayColor}">${thursdayStr}</div>
  					<div class="col-sm bg-${fridayColor}">${fridayStr}</div>
  					<div class="col-sm bg-${saturdayColor}">${saturdayStr}</div>
  					<div class="col-sm bg-${sundayColor}">${sundayStr}</div>
  				</div>
			`;
			$(container).append(newRowString);
			timeSlot = timeSlot.addLengthOfTime(0,15);
		}
	}
	/* Returns array that contains a string containing the schedules in the 15 minute slot
	of the coverage array and a color code string depending on the quality of coverage.
	in the given 15 minute slot */
	#privateMinSlotInfo(minSlotArray){
		var returnStr = "";
		var numberWorkersInTimeSlot = minSlotArray.length;
		var returnArr = new Array(2);
		for(var i = 0; i < numberWorkersInTimeSlot; i++){
			returnStr = returnStr + " " + minSlotArray[i];
		}
		returnArr[0] = returnStr;
		var slotColor = "success";
		if(numberWorkersInTimeSlot < this.#minWorkersPerShift){
			slotColor = "danger";
		}else if(numberWorkersInTimeSlot > this.#minWorkersPerShift){
			slotColor = "primary";
		}
		returnArr[1] = slotColor;
		return returnArr;
	}
	/* Smallest time increment is 15 minutes. Used to convert times entered to the
	nearest 15 minute interval always rounding up */
	#privateClosest15Minute(minutes){
		var closest15 = ((minutes/15) * 15);
		if((minutes%15) > 0){
			closest15 += 15;
		}
		closest15 %= 60;
		return closest15;
	}
	/*Creates the 3D coverage array, rows represent 15 minute slots of time in the work day.
	columns are days of the week each point in the array is an empty array to be filled
	with which schedules are scheduled in the given 15 minute slot*/
	#privateMakeCoverageArray(){
		this.#coverageArray = new Array(7);
		var fifteenMinTimeSlots;
		if((this.#openTime.compareTime(this.#closeTime)) == 0){
			fifteenMinTimeSlots = 96;
		}else if(this.#openHour > this.#closeHour){
			fifteenMinTimeSlots = (((96)-(this.#openHour * 4 + (this.#openMinute/15))) + (this.#closeHour * 4 + (this.#closeMinute/15)));
		}else{
			fifteenMinTimeSlots = ( (this.#closeHour * 4 + (this.#closeMinute/15)) - (this.#openHour * 4 + (this.#openMinute/15)) );
		}
		
		for(var i = 0; i < 7; i++){
			var dayFifteenMinSlotsArray = new Array(fifteenMinTimeSlots);
			for(var j = 0; j < fifteenMinTimeSlots; j++){
				dayFifteenMinSlotsArray[j] = new Array(0);
			}
			this.#coverageArray[i] = dayFifteenMinSlotsArray;
		}
	
		
	}
	/* Parses a schedule array and fills the coverage array with the schedules working
	in each 15 minute time slot*/
	#privateFillShiftCoverageArray(schedule){
		var slotShifter = this.#openHour * 4 + (this.#openMinute/15);
		//console.log("schedule Length big")
		//console.log(schedule.length);
		for(var i = 0; i < schedule.length; i++){
			var singleSchedule = schedule[i];
			//console.log("single schedule length");
			//console.log(singleSchedule.length);
			for(var j = 0; j < singleSchedule.length; j++){
				var singleShift = singleSchedule[j];
				//console.log(singleShift[0].getHour());
				if(singleShift[0].getHour() > -1){
					var start15MinuteSlot = singleShift[0].getHour() * 4 + (Math.floor(singleShift[0].getMinute()/15));
					//console.log("start15Minute");
					//console.log(start15MinuteSlot);
					var numberOf15MinuteSlotsInShift = Math.floor((singleShift[0].minutesBetween(singleShift[1]))/15);
					//console.log(numberOf15MinuteSlotsInShift);
					var indexOf15MinuteSlot;
					var scheduleName = (i+1);
					for(var k = 0; k < numberOf15MinuteSlotsInShift; k++){
						indexOf15MinuteSlot = start15MinuteSlot - slotShifter;
						//console.log("index");
						//console.log(indexOf15MinuteSlot);
						if(indexOf15MinuteSlot >= 96){
							indexOf15MinuteSlot%=96;
						}
						if(indexOf15MinuteSlot < 0){
							indexOf15MinuteSlot += 96;
						}
						/*console.log("start15")
						console.log(start15MinuteSlot);
						console.log("index");
						console.log(indexOf15MinuteSlot);
						console.log("--------------------")
						console.log("J");
						console.log(j);
						console.log("Day Array");
						console.log(this.#coverageArray[j]);
						console.log("MinuteArray");
						console.log(this.#coverageArray[j][indexOf15MinuteSlot]);*/
						this.#coverageArray[j][indexOf15MinuteSlot].push(scheduleName);
						start15MinuteSlot++;
					}
				}
			}
		}
	}
}