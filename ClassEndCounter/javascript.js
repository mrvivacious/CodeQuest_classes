// Check time every 30 seconds (leave this tab running in the background)
// If min = 1000 * 1, for example, a new window would open every 1000 * 1 ms
//  aka every one second
var min = 1000 * 30;
setInterval(hi, min);

// Defines the function
function hi() {
  // The end times of class - 5 minutes
  let endTimes = [
    '9:27', '10:16', '11:05', '11:50', '2:02', '2:51', '3:40'
  ];

  let d = new Date();
  let hours = d.getHours();
  let min = d.getMinutes();

  // Current time as a string
  let ourTime = hours + ':' + min;
  let len = endTimes.length;

  // Check current time with saved times 
  for (let index = 0; index < len; index++) {
    if ( endTimes[index] === ourTime ) {
      window.open('warning.html');
    }
  }
}
