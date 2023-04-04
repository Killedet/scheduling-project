/*$(document).ready(function(){
	$(function () {
      var isMouseDownSched = false;
      $("#scheduleTableBodyID").on("mousedown","td",function () {
          isMouseDownSched = true;
          //console.log("Mouse Down");
          var temp = $(this).attr("class");
          $(this).attr("class",$(this).data("othercolor"));
          $(this).data("othercolor",temp);
          
          return false; // prevent text selection
        })
        .on("mouseover","td",function () {
          if (isMouseDownSched) {
			var temp = $(this).attr("class");
          	$(this).attr("class",$(this).data("othercolor"));
          	$(this).data("othercolor",temp);
            //console.log("toggled");
          }
        })
        .bind("selectstart", function () {
          return false; // prevent text selection in IE
        });

      $(document)
        .mouseup(function () {
			//console.log("Mouse Up");
          isMouseDownSched = false;
        });
    });
});*/


class ScheduleDisplay{
	#schedule;
	#containerID;
	#scheduleOwnerArray;
	#bgColors=["success","danger","secondary","warning","info"];
	
	constructor(schedule,ownerArray,ID){
		this.#schedule = schedule;
		this.#scheduleOwnerArray = ownerArray;
		this.#containerID = ID;
	}
	
	appendScheduleToContainer(){
		var colorCode = 0;
		
		for(var i = 0; i < this.#schedule.length; i++){
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
			var singleSchedule = this.#schedule[i];
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
  				<tr>
			`;
			$(this.#containerID).append(newRowString);
		}
		
	}
	
	#privateTimeConverter(timeArray){
		if(timeArray[0].getHour() < 0){
			return "OFF";
		}
		
		return timeArray[0].toString() + " to " + timeArray[1].toString();
	}
}