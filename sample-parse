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
  var TEMP_DIFF_SWITCH = 7;
  
  var events = this.incomingEvents();
  for(var i = 0; i < events.length; i++) {
    var allSensorData = events[i].payload.data;
    // var allSensorData = JSON.parse(data);
    
    var garageSensorData = allSensorData.sensors[GARAGE_SENSOR_ID];
    var backyardSensorData = allSensorData.sensors[BACKYARD_SENSOR_ID]
    
    // this.log(allSensorData);
    // this.log(garageSensorData);
    // this.log(backyardSensorData);

    var garageTemp = Agent.grabFirstTemp(garageSensorData);
    var backyardTemp = Agent.grabFirstTemp(backyardSensorData);
    
    var targetValue = 0;
    if ((garageTemp != 0) 
          && this.isCorrectTime()
          && (garageTemp > 70)
          && (garageTemp > (backyardTemp + TEMP_DIFF_SWITCH))) {
        this.log("trigger garage fan on!")
        targetValue = 1;
    } else {
        this.log("trigger garage fan off!");
        targetValue = 0;
    }
    
    this.createEvent({'target_value' : targetValue});
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

Agent.isCorrectTime = function() {
  var currentDate = new Date();
  var currentHour =  currentDate.getHours();
  
  this.log(currentDate);

  return true;
}
