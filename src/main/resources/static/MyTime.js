class MyTime{
	#hour;
	#minute;
	
	constructor(hr,min){
		this.#hour = hr;
		this.#minute = min;
	}
	getHour(){
		return this.#hour;
	}
	getMinute(){
		return this.#minute;
	}
	addLengthOfTime(hr,min){
		var newMinute = this.#minute + min;
		var newHour = this.#hour;
		if((newMinute/60) >= 1){
			newHour++;
		}
		newMinute %= 60;
		newHour += hr;
		newHour %= 24;
		var newTime = new MyTime(newHour,newMinute);
		return newTime;
	}
	
	subLengthOfTime(hr,min){
		var newMinute = this.#minute - min;
		var newHour = this.#hour;
		if(newMinute < 0){
			newHour--;
			newMinute += 60;
		}
		newHour -= hr;
		if(newHour < 0){
			newHour += 24;
		}
		var newTime = new MyTime(newHour,newMinute);
		return newTime;
	}
	
	minutesBetween(time){
		var totalMinCompare = time.getHour() * 60 + time.getMinute();
		var totalMinThisTime = this.#hour * 60 + this.#minute;
		if(totalMinCompare >= totalMinThisTime){
			return totalMinCompare - totalMinThisTime;
		}
		return ((24 * 60) - totalMinThisTime) + totalMinCompare;
	}
	
	compareTime(time){
		var totalMinCompare = time.getHour() * 60 + time.getMinute();
		var totalMinThisTime = this.#hour * 60 + this.#minute;
		if(totalMinCompare > totalMinThisTime){
			return -1;
		}else if(totalMinCompare < totalMinThisTime){
			return 1;
		}
		return 0;
	}
	
	toString(){
		var minuteStr = this.#minute.toString();
		if(this.#minute < 10){
			if(this.#minute == 0){
				minuteStr = "00";
			}else{
				minuteStr = "0" + this.#minute.toString();
			}
		}
		var hourStr = this.#hour.toString();
		if(this.#hour < 10){
			hourStr = "0" + hourStr;
		}
		return hourStr + ":" + minuteStr;
	}
}