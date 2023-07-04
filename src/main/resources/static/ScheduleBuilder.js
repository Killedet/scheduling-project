/**

 */
 $(document).ready(function(){
	var scheduler; //SCHEDULE BUILDER FOR AUTO SCHEDULE CREATION
	var minOnShift; //MIN NUMBER OF WORKERS ON SCHEDULE
	var coverageArray; //COVERAGE ARRAY FROM SCHEDULE EDITOR
	var scheduleEditor; //GLOBAL SCHEDULE EDITOR
	$('#schedule-builder-click-to-start').click(function(){
		$(".schedule-builder-view").show();
	});
	
	$('#24HrCheckInput').change(function() {
  		if ($(this).is(':checked')) {
   		 	$('#openTimeLabelID').text("Day Start");
   		 	$('#closeTimeInput').removeAttr( 'required');
   		 	$('#closeTimeLabelID').hide();
   		 	$('#closeTimeInput').hide();
  		} else {
    		$('#openTimeLabelID').text("Open");
   		 	$('#closeTimeInput').attr( 'required','true');
   		 	$('#closeTimeLabelID').show();
   		 	$('#closeTimeInput').show();
  		}
	});
	
	$('#scheduleTableBodyID').on('click', '.singleScheduleEditButton',function(event){
		event.preventDefault();
		console.log("EDIT");
		var row = $(this).data('rowid');
		var editingRow = scheduleEditor.startEditingSingleWorkSchedule(row);
		$(this).parent().parent().replaceWith(editingRow);
	});
	
	$('#scheduleTableBodyID').on('click', '.singleScheduleDeleteButton',function(event){
		event.preventDefault();
		console.log("DELETE");
		
		var row = $(this).data('rowid');
		$('#tableToolBodyID').empty();
		scheduleEditor.deleteSingleWorkSchedule(row);
		$('#scheduleTableBodyID').empty();
		scheduleEditor.appendEditorScheduleToContainer("#scheduleTableBodyID");
		scheduleEditor.createAndDisplayTableToolBody("#tableToolBodyID");
	});
	
	$('#scheduleTableBodyID').on('click', '.editSaveButton',function(event){
		event.preventDefault();
		console.log("SAVE EDIT");
		var row = $(this).data('rowid');
		var start = true;
		var startTime;
		var endTime;
		var newSingleSchedule = [];
		$(this).closest('tr').find('.tableNewScheduleTime').each(function(){
			var currentTime = $(this).val();
			if(start){
				if(currentTime === ""){
					startTime = new MyTime(-1,0);
				}else{
					var startTimeArray = currentTime.split(':');
					var startHour = parseInt(startTimeArray[0]);
					var startMinute = parseInt(startTimeArray[1]);
					startTime = new MyTime(startHour,startMinute);
				}
				start = false;
			}else{
				if(currentTime === ""){
					startTime = new MyTime(-1,0);
					endTime = new MyTime(-1,0);
				}else{
					var endTimeArray = currentTime.split(':');
					var endHour = parseInt(endTimeArray[0]);
					var endMinute = parseInt(endTimeArray[1]);
					endTime = new MyTime(endHour,endMinute);
				}
				
				newSingleSchedule.push([startTime,endTime]);
				start = true;
			}
		
		});
	
		$('#tableToolBodyID').empty();
		var editingRow = scheduleEditor.submitNewSingleWorkSchedule("#scheduleTableID",newSingleSchedule,row);
		$(this).parent().parent().replaceWith(editingRow);
		scheduleEditor.createAndDisplayTableToolBody("#tableToolBodyID");
	});
	
	$('#addScheduleButtonID').on('click',function(event){
		event.preventDefault();
		$('#addMoreRowsTable').show();
		scheduleEditor.addSingleWorkSchedule("#newScheduleTableBodyID");
		console.log("ADD");
		
	});
	
	$('#newScheduleTableBodyID').on('click', '.newScheduleDeleteButton',function(event){
		event.preventDefault();
		console.log("DELETE NEW");
		$(this).closest('tr').remove();
	});
	
	$('#newScheduleTableBodyID').on('click', '.newScheduleSaveButton',function(event){
		event.preventDefault();
		console.log("SAVE NEW");
		var start = true;
		var startTime;
		var endTime;
		var newSingleSchedule = [];
		$(this).closest('tr').find('.tableNewScheduleTime').each(function(){
			var currentTime = $(this).val();
			if(start){
				if(currentTime === ""){
					startTime = new MyTime(-1,0);
				}else{
					var startTimeArray = currentTime.split(':');
					var startHour = parseInt(startTimeArray[0]);
					var startMinute = parseInt(startTimeArray[1]);
					console.log("startHour");
					console.log(startHour);
					
					console.log("startMinute");
					console.log(startMinute);
					startTime = new MyTime(startHour,startMinute);
				}
				start = false;
			}else{
				if(currentTime === ""){
					startTime = new MyTime(-1,0);
					endTime = new MyTime(-1,0);
				}else{
					var endTimeArray = currentTime.split(':');
					var endHour = parseInt(endTimeArray[0]);
					var endMinute = parseInt(endTimeArray[1]);
					endTime = new MyTime(endHour,endMinute);
				}
				
				newSingleSchedule.push([startTime,endTime]);
				start = true;
			}
			
		});
	
		$(this).closest('tr').remove();
		$('#tableToolBodyID').empty();
		scheduleEditor.submitNewSingleWorkSchedule("#scheduleTableBodyID",newSingleSchedule,-1);
		scheduleEditor.createAndDisplayTableToolBody("#tableToolBodyID");
	});
	
	$('#autoScheduleFormID').submit(function(){
		event.preventDefault();
		//$('#scheduleDisplay').empty();
		$('#scheduleTableBodyID').empty();
		$('#newScheduleTableBodyID').empty();
		$('#tableToolBodyID').empty();
		var numWorkers = $('#numWorkersInput').val();
		var shiftHours = parseInt($('#shiftHoursInput').val());
		var shiftMinutes = parseInt($('#shiftMinutesInput').val());
		var shiftsPerWorker = parseInt($('#shiftsPerWorkerInput').val());
		var workersPerShift = parseInt($('#workersPerShiftInput').val());
		var openTimeArray = $('#openTimeInput').val().split(':');
		var closeTimeArray = $('#closeTimeInput').val().split(':');
		
		if(closeTimeArray.length < 2){
			closeTimeArray = openTimeArray;
			
		}
		var openHour = parseInt(openTimeArray[0]);
		var openMinute = parseInt(openTimeArray[1]);
		var closeHour = parseInt(closeTimeArray[0]);
		var closeMinute = parseInt(closeTimeArray[1]);
		
		
		var daysOpenArray = [];
		if($('#alldayCheckInput').prop('checked')){
			daysOpenArray = [0,1,2,3,4,5,6];
		}else{
			
			if($('#mondayCheckInput').prop('checked')){
				
				daysOpenArray.push(0);
			}
			if($('#tuesdayCheckInput').prop('checked')){
				daysOpenArray.push(1);
			}
			if($('#wednesdayCheckInput').prop('checked')){
				daysOpenArray.push(2);
			}
			if($('#thursdayCheckInput').prop('checked')){
				daysOpenArray.push(3);
			}
			if($('#fridayCheckInput').prop('checked')){
				daysOpenArray.push(4);
			}
			if($('#saturdayCheckInput').prop('checked')){
				daysOpenArray.push(5);
			}
			if($('#sundayCheckInput').prop('checked')){
				daysOpenArray.push(6);
			}
		}
		
		scheduler = new ScheduleBuilder(numWorkers,shiftHours,shiftMinutes,shiftsPerWorker, 
		openHour,openMinute,closeHour,closeMinute,workersPerShift,daysOpenArray);
		minOnShift = workersPerShift;
		
		var totalSchedule = scheduler.getTotalSchedule();
		var scheduleOwnerArray = scheduler.getScheduleOwnerArray();
		
		/*var displayMaker = new ScheduleDisplay(totalSchedule,scheduleOwnerArray,"#scheduleTableBodyID");
		displayMaker.appendAutoScheduleToContainer();*/
		
		scheduleEditor = new ScheduleEditor(totalSchedule,scheduleOwnerArray,numWorkers,shiftHours,shiftMinutes,shiftsPerWorker, 
		openHour,openMinute,closeHour,closeMinute,workersPerShift,daysOpenArray);
		coverageArray = scheduleEditor.getCoverageArray();
		scheduleEditor.appendEditorScheduleToContainer("#scheduleTableBodyID");
		scheduleEditor.createAndDisplayTableToolBody("#tableToolBodyID");
		$('#addMoreRowsTable').hide();
		$("#scheduleAndCoverageDisplayID").show();
	});
	
	$(function () {
      var isMouseDown = false;
      $("#tableToolBodyID").on("mousedown","td",function () {
          isMouseDown = true;
          //console.log("Mouse Down");
          if($(this).attr("class") === "bg-secondary"){
				var colorCode = "bg-success";
				var colID = parseInt($(this).data("colid"));
				var rowID = parseInt($(this).data("rowid"));
				var workersScheduled = coverageArray[colID][rowID].length;
				if(minOnShift != null){
					if(workersScheduled > minOnShift){
						colorCode = "bg-primary";
					}else if(workersScheduled < minOnShift){
						colorCode = "bg-danger";
					}
				}
			$(this).attr("class",colorCode);
		  }else{
				$(this).attr("class","bg-secondary");
		  }
          //$(this).toggleClass("highlighted");
          return false; // prevent text selection
        })
        .on("mouseover","td",function () {
          if (isMouseDown) {
			if($(this).attr("class") === "bg-secondary"){
				var colorCode = "bg-success";
				var colID = parseInt($(this).data("colid"));
				var rowID = parseInt($(this).data("rowid"));
				var workersScheduled = coverageArray[colID][rowID].length;
				if(minOnShift != null){
					if(workersScheduled > minOnShift){
						colorCode = "bg-primary";
					}else if(workersScheduled < minOnShift){
						colorCode = "bg-danger";
					}
				}
			$(this).attr("class",colorCode);
		  	}else{
				$(this).attr("class","bg-secondary");
		  	}
            //$(this).toggleClass("highlighted");
            //console.log("toggled");
          }
        })
        .bind("selectstart", function () {
          return false; // prevent text selection in IE
        });

      $(document)
        .mouseup(function () {
			//console.log("Mouse Up");
          isMouseDown = false;
        });
    });
});
 
 /* Object used to automatically create a basic schedule that 
 satisfies parameters set by Admin. */
 class ScheduleBuilder{
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
	#workDays;
	#numberOfDaysOff;
	#minSchedulesPerShift;
	#maxWorkersPerShift;
	#neededSchedulesPerShift;
	#autoShiftArray;
	#autoSingleShiftWeeklySchedule;
	#totalSchedule;
	#scheduleOwnerArray;
	constructor(workers, shiftHour,shiftMinutes, shiftsPerWorker, openHour, openMinute, closeHour, closeMinute,
	minWorkersPerShift, workDays){
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
		this.#workDays = workDays;
		this.#offDays = 7 - this.#workDays.length;
		this.#numberOfDaysOff = 7 - shiftsPerWorker;
		this.#autoShiftArray = this.#privateSetAutoShiftsArray();
		this.#autoSingleShiftWeeklySchedule = this.#privateGetSingleShiftWeeklySchedule();
		this.#privateMakeTotalSchedule();
		
	}

	getAutoShiftArray(){
		return this.#autoShiftArray;
	}
	getAutoShiftWeeklySchedule(){
		return this.#autoSingleShiftWeeklySchedule;
	}
	getTotalSchedule(){
		return this.#totalSchedule;
	}
	getScheduleOwnerArray(){
		return this.#scheduleOwnerArray;
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
	/* Combines the auto shift array with the weekly schedule array. For each shift in 
	the auto shift array a schedule is created following the weekly schedule array. The
	result is the totalSchedule array (2D array)where each row is a workers schedule complete with
	the shift times they are scheduled for. There are 7 columns each representing a day
	in the week.*/
	#privateMakeTotalSchedule(){
		this.#totalSchedule = [];
		this.#scheduleOwnerArray = [];
		var scheduleNumber = 1;
		var shiftsLeftToFill = this.#autoShiftArray.length;
		var workersLeftToSchedule = this.#workers;
		for(var i = 0; i < this.#autoShiftArray.length; i++){
			var shiftTime = this.#autoShiftArray[i];
			var workersToSchedule = this.#minSchedulesPerShift;
			var test = Math.ceil(workersLeftToSchedule/shiftsLeftToFill);
			if(test > workersToSchedule){
				workersToSchedule = this.#maxWorkersPerShift;
			}
			workersLeftToSchedule-=workersToSchedule;
			shiftsLeftToFill--;
			
			for(var j = 0; j < workersToSchedule;/*this.#autoSingleShiftWeeklySchedule.length;*/ j++){
				var scheduleOwnerArray = [scheduleNumber,-1,"none"];
				this.#scheduleOwnerArray.push(scheduleOwnerArray);
				scheduleNumber++;
				var singleSchedule = [];
				var autoSingleSchedule = this.#autoSingleShiftWeeklySchedule[j];
				for(var k = 0; k < 7; k++){
					if(autoSingleSchedule[k] == 0){
						var offPlaceholder = new MyTime(-1,0);
						singleSchedule.push([offPlaceholder,offPlaceholder]);
						
					}else{
						singleSchedule.push(shiftTime);
					}
				}
				this.#totalSchedule.push(singleSchedule);
			}
			
		}
	}
	/* Creates a 2D array of 1s and 0s. Each row in the array is a single weekly schedule 
	of a worker. Each column is a day in the week. If a worker is scheduled on a day of
	the week the array stores a 1 otherwise a 0. This is used in combination with the 
	auto shift array to create a complete auto schedule*/
	#privateSetAutoScheduleParameters(){
		var minShiftsToFill = this.#workDays.length * this.#minWorkersPerShift;
		this.#minSchedulesPerShift = Math.floor(minShiftsToFill/this.#shiftsPerWorker);
		
		if((minShiftsToFill % this.#shiftsPerWorker) > 0){
			this.#minSchedulesPerShift++;
		}

		this.#maxWorkersPerShift = Math.floor(this.#workers / this.#autoShiftArray.length);

		if((this.#workers % this.#autoShiftArray.length) > 0){
			this.#maxWorkersPerShift++;
		}
	
		this.#neededSchedulesPerShift = this.#minSchedulesPerShift;
		if(this.#maxWorkersPerShift > this.#minSchedulesPerShift){
			this.#neededSchedulesPerShift = this.#maxWorkersPerShift;
		}
		console.log(this.#neededSchedulesPerShift);
	}
	#privateGetSingleShiftWeeklySchedule(){
		/*var minShiftsToFill = this.#workDays.length * this.#minWorkersPerShift;
		var minSchedulesPerShift = Math.floor(minShiftsToFill/this.#shiftsPerWorker);
		console.log("min before");
		console.log(minSchedulesPerShift);
		if((minShiftsToFill % this.#shiftsPerWorker) > 0){
			minSchedulesPerShift++;
		}
		console.log("min after");
		console.log(minSchedulesPerShift);
		var actualWorkersPerShift = Math.floor(this.#workers / this.#autoShiftArray.length);
		console.log("actual before");
		console.log(actualWorkersPerShift);
		if((this.#workers % this.#autoShiftArray.length) > 0){
			actualWorkersPerShift++;
		}
		console.log("actual after");
		console.log(actualWorkersPerShift);
		var neededSchedulesPerShift = minSchedulesPerShift;
		if(actualWorkersPerShift > minSchedulesPerShift){
			neededSchedulesPerShift = actualWorkersPerShift;
		}*/
	
		this.#privateSetAutoScheduleParameters();
		var singleShiftWeeklySchedule = [];//new Array(neededSchedulesPerShift);
		
		if(this.#numberOfDaysOff > this.#offDays){
			
			var daysOffToSchedule = this.#numberOfDaysOff - this.#offDays;
			var startDayOff = 0;
			var endDayOff = daysOffToSchedule;
			var singleSchedule;
			var index;
			for(var i = 0; i < this.#neededSchedulesPerShift; i++){
				singleSchedule = [0,0,0,0,0,0,0];
				for(var j = 0; j < this.#workDays.length; j++){
					if(startDayOff < endDayOff){
						if((j < startDayOff) || (j >= endDayOff)){
							index = this.#workDays[j];
							singleSchedule[index] = 1;
						}
					}else{
						if((j < startDayOff) && (j >= endDayOff)){
							index = this.#workDays[j];
							singleSchedule[index] = 1;
						}
					}
					
				}
				startDayOff = (startDayOff + daysOffToSchedule) % this.#workDays.length;
				endDayOff = (endDayOff + daysOffToSchedule) % this.#workDays.length;
				singleShiftWeeklySchedule.push(singleSchedule);
			}
			
		}else{
			for(var i = 0; i < this.#neededSchedulesPerShift; i++){
				var singleSchedule = new Array(7).fill(0);
				for(var j = 0; j < this.#workDays.length; j++){
					singleSchedule[this.#workDays[j]] = 1;
				}
				singleShiftWeeklySchedule.push(singleSchedule);
			}
		}
		return singleShiftWeeklySchedule;
	}
	/*Creates an array of shift start and end times. Used in combination with weekly
	schedule array to create total schedule */
	#privateSetAutoShiftsArray(){
		var autoShifts = [];
		var openTimeMut = this.#openTime;
		var closeTimeMut = this.#closeTime;
		if((openTimeMut.compareTime(this.#closeTime)) < 0){
			while((openTimeMut.compareTime(this.#closeTime)) < 0){
				var addTime = openTimeMut.addLengthOfTime(this.#shiftHour,this.#shiftMinutes);
				if(addTime.compareTime(this.#closeTime) >= 0){
					autoShifts.push([closeTimeMut.subLengthOfTime(this.#shiftHour,this.#shiftMinutes),this.#closeTime]);
				}else{
					autoShifts.push([openTimeMut,addTime]);
				}
				openTimeMut = addTime;
			}
		}else if((openTimeMut.compareTime(this.#closeTime)) === 0){
			var twenty4HrMins = 1440;
			while(twenty4HrMins > 0){
				var addTime = openTimeMut.addLengthOfTime(this.#shiftHour,this.#shiftMinutes);
				autoShifts.push([openTimeMut,addTime]);
				/*console.log("start");
				console.log(openTimeMut);
				console.log("end");
				console.log(addTime);*/
				openTimeMut = addTime;
				twenty4HrMins = twenty4HrMins - (this.#shiftHour * 60 + this.#shiftMinutes);
			}
		}else{
			while((openTimeMut.compareTime(this.#closeTime) < 0) || (openTimeMut.compareTime(this.#openTime) >= 0)){
				var addTime = openTimeMut.addLengthOfTime(this.#shiftHour,this.#shiftMinutes);
				if((addTime.compareTime(this.#closeTime) > 0) && (addTime.compareTime(this.#openTime) < 0)){
					autoShifts.push([closeTimeMut.subLengthOfTime(this.#shiftHour,this.#shiftMinutes),this.#closeTime]);
				}else{
					autoShifts.push([openTimeMut,addTime]);
				}
				openTimeMut = addTime;
			}
		}
		return autoShifts;
	}
	
	
	
	
	
	
}