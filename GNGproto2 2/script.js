// Get the current date
let currentDate = new Date();

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

  //generate days of week
  for (let i = 0; i < 7; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');

    // Day name and date
    const dayHeader = document.createElement('div');
    dayHeader.classList.add('day-header');
    dayHeader.textContent = startDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    // Hours grid
    const hoursGrid = document.createElement('div');
    hoursGrid.classList.add('hours-grid');

    for (let hour = 0; hour < 24; hour++) {
      const hourDiv = document.createElement('div');
      hourDiv.classList.add('hour');
      hourDiv.textContent = `${(hour < 10 ? '0' : '') + hour}:00`; // Format hour (00:00 format)

      // Optionally, you can add click event listeners or additional functionality to each hour

      hoursGrid.appendChild(hourDiv);
    }

    dayDiv.appendChild(dayHeader);
    dayDiv.appendChild(hoursGrid);
    
    daysContainer.appendChild(dayDiv);

    startDate.setDate(startDate.getDate() + 1);
  }
}


// Function to validate time format (00:00 to 24:00)
// Function to validate time format (00:00 to 24:00)
function validateTime(time) {
  const regex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
  return regex.test(time);
}


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
updateESTDateTime();

// Continuous update for current date and time
setInterval(updateESTDateTime, 1000); // Update every second

// Function to add event to the list
function addEventToList(eventName, eventDate, startTime, endTime) {
  const eventList = document.getElementById('eventList');
  const eventItem = document.createElement('li');
  eventItem.textContent = `${eventName} - ${eventDate} (${startTime} - ${endTime})`;
  eventList.appendChild(eventItem);
}

// Function to open the event modal
function openEventModal() {
  console.log("Modal opened!");
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

      addEventToList(eventName, eventDate, startTime, endTime);
      
      // Update the "Upcoming Events" list directly
      const upcomingEvents = document.getElementById('eventList');
      const eventListItem = document.createElement('li');
      eventListItem.textContent = `${eventName} - ${eventDate} (${startTime} - ${endTime})`;
      upcomingEvents.appendChild(eventListItem);

    } else {
      alert('Please enter a valid date, start time, and end time.');
    }
  });
}

// Event listener for the "Add Event" button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('addEventBtn').addEventListener('click', function() {
    openEventModal();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const addStickyNoteBtn = document.getElementById('addStickyNoteBtn');
  const calendar = document.querySelector('.week');

  let isAddingStickyNote = false;

  addStickyNoteBtn.addEventListener('click', function () {
    isAddingStickyNote = true;
  });

  calendar.addEventListener('click', function (event) {
    if (isAddingStickyNote) {
      const x = event.clientX;
      const y = event.clientY;

      const note = document.createElement('div');
      note.className = 'sticky-note';
      note.contentEditable = 'true';
      note.style.position = 'absolute';
      note.style.left = `${x}px`;
      note.style.top = `${y}px`;
      note.innerText = 'Click to edit';

      calendar.appendChild(note);

      isAddingStickyNote = false;
    }
  });

  // Optional: Add event listeners for dragging the sticky notes
  calendar.addEventListener('mousedown', function (event) {
    const note = event.target.closest('.sticky-note');

    if (note) {
      const offsetX = event.clientX - note.getBoundingClientRect().left;
      const offsetY = event.clientY - note.getBoundingClientRect().top;

      function moveNote(e) {
        note.style.left = `${e.clientX - offsetX}px`;
        note.style.top = `${e.clientY - offsetY}px`;
      }

      function stopDrag() {
        window.removeEventListener('mousemove', moveNote);
        window.removeEventListener('mouseup', stopDrag);
      }

      window.addEventListener('mousemove', moveNote);
      window.addEventListener('mouseup', stopDrag);
    }
  });
});


