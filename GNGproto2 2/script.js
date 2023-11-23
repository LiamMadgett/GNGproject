// Function to update EST date and time
function updateESTDateTime() {
  const currentDate = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  document.getElementById('estDateTime').textContent = currentDate;
}

// Function to generate the weekly calendar view
function generateWeeklyCalendar(year, month, day) {
  const daysContainer = document.querySelector('.days');
  const eventList = document.getElementById('eventList');
  daysContainer.innerHTML = '';
  eventList.innerHTML = '';

  const startDate = new Date(year, month, day);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // Generate days for the week
  for (let i = 0; i < 7; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    dayDiv.textContent = startDate.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });

    // Add click event to set an event on the specific day
    dayDiv.addEventListener('click', function() {
      openEventModal(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    });

    daysContainer.appendChild(dayDiv);

    startDate.setDate(startDate.getDate() + 1);
  }
}

// Function to open the event modal
function openEventModal(year, month, day) {
  document.getElementById('eventModal').style.display = 'block';

  document.getElementById('saveEvent').addEventListener('click', function() {
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value; // Get the selected date
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    if (eventDate && validateTime(startTime) && validateTime(endTime)) {
      // Check if date, start time, and end time are selected
      alert(`Event "${eventName}" on ${eventDate} from ${startTime} to ${endTime} saved!`);
      document.getElementById('eventModal').style.display = 'none';

      const eventList = document.getElementById('eventList');
      const eventItem = document.createElement('li');
      eventItem.textContent = `${eventName} - ${eventDate} (${startTime} - ${endTime})`;

      // Add the new task to the upcoming events list
      eventList.appendChild(eventItem);
    } else {
      alert('Please enter valid date, start time, and end time.');
    }
  });
}

// Function to validate time format (00:00 to 24:00)
function validateTime(time) {
  const regex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
  return regex.test(time);
}

// Get the current date
let currentDate = new Date();

// Generate weekly calendar for the current week on page load
generateWeeklyCalendar(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

// Previous and Next week navigation
document.getElementById('prevWeek').addEventListener('click', function() {
  currentDate.setDate(currentDate.getDate() - 7);
  generateWeeklyCalendar(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
});

document.getElementById('nextWeek').addEventListener('click', function() {
  currentDate.setDate(currentDate.getDate() + 7);
  generateWeeklyCalendar(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
});

// Initial update for current date and time
updateCurrentDateTime();

// Continuous update for current date and time
setInterval(updateCurrentDateTime, 1000); // Update every second