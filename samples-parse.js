Agent.check = function() {
  // if (this.options('make_event')) {
    // this.createEvent({ 'message': 'I made an event!' });
    // var callCount = this.memory('callCount') || 0;
    // this.memory('callCount', callCount + 1);
  // }
};
  
Agent.receive = function() {
  var GARAGE_SENSOR_ID = this.credential("garage_sensor_id");
  var BACKYARD_SENSOR_ID = this.credential("backyard_sensor_id");

  // what should the difference from garage and outside be before turning on the fan?
  var WEEKDAY_TEMP_DIFF_SWITCH = 5;
  var WEEKDEND_TEMP_DIFF_SWITCH = 10;
  
  var events = this.incomingEvents();
  for(var i = 0; i < events.length; i++) {
    var currentDate = new Date();
    var allSensorData = events[i].payload.data;
    var temperature_difference_threshhold;
    var temp_diff;
    var garageSensorData = allSensorData.sensors[GARAGE_SENSOR_ID];
    var backyardSensorData = allSensorData.sensors[BACKYARD_SENSOR_ID]
    
    // this.log(allSensorData);
    // this.log(garageSensorData);
    // this.log(backyardSensorData);

    var garageTemp = Agent.grabFirstTemp(garageSensorData);
    var backyardTemp = Agent.grabFirstTemp(backyardSensorData);
    
    if (Agent.getWeekendOrWeekday(currentDate) == 'weekday') {
      temperature_difference_threshhold = WEEKDAY_TEMP_DIFF_SWITCH;
    } else {
      temperature_difference_threshhold = WEEKDEND_TEMP_DIFF_SWITCH;
    }

    this.log("Temp Difference Threshhold = " + temperature_difference_threshhold);

    temp_diff = garageTemp - backyardTemp;
    this.log("Temp Difference = " + temp_diff);
    

    var targetValue = 0;
    if ((garageTemp != 0) 
          && this.isCorrectTime(currentDate)
          && (garageTemp > 70)
          && (garageTemp > (backyardTemp + temperature_difference_threshhold))) {
        this.log("trigger garage fan on!")
        targetValue = 'on';
    } else {
        this.log("trigger garage fan off!");
        targetValue = 'off';
    }
    
    this.createEvent({'target_value' : targetValue});
  }
}

Agent.getWeekendOrWeekday = function(currentDate) {
  switch (currentDate.getDay())
  {
    case 0:
    case 6:
      return 'weekend';
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return 'weekday';
  }
}

Agent.grabFirstTemp = function(sensorData) {
  if (sensorData.length == 0) {
    return 0;
  }

  for (var i = 0; i < sensorData.length; i++) {
    return parseFloat(sensorData[i].temperature);
  }

  return 0;
}

Agent.isCorrectTime = function(currentDate) {
  
  var currentHour =  currentDate.getHours();
  this.log(currentDate);

  return true;
}
