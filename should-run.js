Agent.check = function() {
  
  var ALLOWED_DAYS_OF_WEEK = [1, 2, 3, 4, 5];
  var currentDate = new Date();
  var currentHour =  currentDate.getHours();
  var dayOfWeek = currentDate.getDay();

  if ((currentHour >= 20 || currentHour <= 9)
    && (ALLOWED_DAYS_OF_WEEK.indexOf(dayOfWeek) >= 0)) {
      this.createEvent({ 'message': 'Go go go!'});
    // console.log('test');
  }

//   console.log('test2');
  
  // if (this.options('make_event')) {
  //   this.createEvent({ 'message': 'I made an event!' });
  //   var callCount = this.memory('callCount') || 0;
  //   this.memory('callCount', callCount + 1);
  // }
};

Agent.receive = function() {
  // var events = this.incomingEvents();
  // for(var i = 0; i < events.length; i++) {
  //   this.createEvent({ 'message': 'I got an event!', 'event_was': events[i].payload });
  // }
}
