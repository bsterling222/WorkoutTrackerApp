// Set your desired passkey/PIN here
const ALLOWED_PASSCODES = ["0852", "2580", "0000"]; // 👈 Add as many valid PINs/codes as you want!

// Check lock state when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    checkLockState();
    
    // Allow pressing "Enter" key on passcode input
    const passInput = document.getElementById('passcode-input');
    if (passInput) {
        passInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') unlockApp();
        });
    }
});

function checkLockState() {
    const isUnlocked = sessionStorage.getItem('app_unlocked');
    const overlay = document.getElementById('lock-screen-overlay');

    if (isUnlocked === 'true') {
        overlay.classList.add('unlocked');
    } else {
        overlay.classList.remove('unlocked');
    }
}

function unlockApp() {
    const inputField = document.getElementById('passcode-input');
    const errorMsg = document.getElementById('lock-error-msg');
    const overlay = document.getElementById('lock-screen-overlay');
    
    const enteredCode = inputField ? inputField.value.trim() : '';

    // Check if the entered code exists in our allowed array
    if (ALLOWED_PASSCODES.includes(enteredCode)) {
        sessionStorage.setItem('app_unlocked', 'true');
        
        // Optional: Store which code unlocked the app if you ever want user-level tracking
        sessionStorage.setItem('active_user_code', enteredCode); 
        
        overlay.classList.add('unlocked');
        errorMsg.style.display = 'none';
        inputField.value = '';
    } else {
        errorMsg.style.display = 'block';
        inputField.value = '';
        inputField.focus();
    }
}

// Optional helper to manually re-lock from settings or header
function relockApp() {
    sessionStorage.removeItem('app_unlocked');
    checkLockState();
}

// ==========================================================================
// 1. DATA DEFINITIONS & CONSTANTS
// ==========================================================================

const WORKOUT_DEFINITIONS = {
    'heavy-glutes': {
        title: 'Monday: Heavy Glutes',
        focus: 'Max Resistance',
        warmup: [
            { name: 'Squat', reps: '10', sets: '1', note: 'Medium' },
            { name: 'Seated Pulls', reps: '10', sets: '1', note: '' },
            { name: 'Walk', reps: '3-5 min', sets: '1', note: '' }
        ],
        core: [
            { name: 'Plank', time: '45s', sets: '1', note: '' },
            { name: 'Side Plank', time: '30s', sets: '1', note: 'Left & Right' },
            { name: 'Reverse Crunch', reps: '20', sets: '1', note: '' },
            { name: 'Slow Mountain Climbers', reps: '20', sets: '1', note: '' }
        ],
        activation: [
            { name: 'Banded Glute Bridges', reps: '20', sets: '1', note: '' },
            { name: 'Lateral Band Walks', reps: '15', sets: '1', note: 'Heavy' },
            { name: 'Standing Kickbacks', reps: '10', sets: '1', note: 'Heavy' }
        ],
        exercises: [
            { id: 'ex1', name: 'Seated Band Abductions', reps: '50', sets: 1, note: 'Med mini band' },
            { id: 'ex2', name: 'Heavy Band Hip Thrusts', reps: '10-12', sets: 4, note: '60-170 band' },
            { id: 'ex3', name: 'Band RDLs', reps: '12', sets: 4, note: '40-70 band' },
            { id: 'ex4', name: 'DB Step-Ups', reps: '10 L / 10 R', sets: 3, note: '20 lb DB' },
            { id: 'ex5', name: 'Lateral Band Walks', reps: '15 L / 15 R', sets: 3, note: 'Burnout' }
        ]
    },
    'upper-push': {
        title: 'Tuesday: Upper Push',
        focus: 'Chest / Shoulders',
        warmup: [
            { name: 'Squat', reps: '10', sets: '1', note: 'Medium' },
            { name: 'Seated Pulls', reps: '10', sets: '1', note: '' },
            { name: 'Walk', reps: '3-5 min', sets: '1', note: '' }
        ],
        core: [
            { name: 'Plank', time: '45s', sets: '1', note: '' },
            { name: 'Side Plank', time: '30s', sets: '1', note: 'Left & Right' },
            { name: 'Reverse Crunch', reps: '20', sets: '1', note: '' },
            { name: 'Slow Mountain Climbers', reps: '20', sets: '1', note: '' }
        ],
        activation: [],
        exercises: [
            { id: 'ex1', name: 'Banded Pushups', reps: 'Failure', sets: 4, note: 'Band around back (10-15 band)' },
            { id: 'ex2', name: 'DB Overhead Press', reps: '10', sets: 4, note: '' },
            { id: 'ex3', name: 'Lateral Raises', reps: '12', sets: 4, note: 'Strict Form!' },
            { id: 'ex4', name: 'Tricep Dips', reps: '12', sets: 3, note: 'Off Bench' }
        ]
    },
    'glute-volume': {
        title: 'Thursday: Glute Volume',
        focus: 'Shape / Reps',
        warmup: [
            { name: 'Squat', reps: '10', sets: '1', note: 'Medium' },
            { name: 'Seated Pulls', reps: '10', sets: '1', note: '' },
            { name: 'Walk', reps: '3-5 min', sets: '1', note: '' }
        ],
        core: [],
        activation: [
            { name: 'Banded Glute Bridges', reps: '20', sets: '1', note: '' },
            { name: 'Lateral Band Walks', reps: '15', sets: '1', note: 'Heavy' },
            { name: 'Standing Kickbacks', reps: '10', sets: '1', note: 'Heavy' }
        ],
        exercises: [
            { id: 'ex1', name: 'Single-Leg Hip Thrust', reps: '12 L / 12 R', sets: 3, note: 'DB on Hip' },
            { id: 'ex2', name: 'Bulgarian Split Squat', reps: '10 L / 10 R', sets: 3, note: 'Light Mini Band' },
            { id: 'ex3', name: 'Donkey Kicks', reps: '15 L / 15 R', sets: 3, note: 'Banded' },
            { id: 'ex4', name: 'Fire Hydrants', reps: '15 L / 15 R', sets: 3, note: 'Light' }
        ]
    },
    'upper-pull': {
        title: 'Friday: Upper Pull & Vanity',
        focus: 'Back / Posture & Definition',
        warmup: [
            { name: 'Squat', reps: '10', sets: '1', note: 'Medium' },
            { name: 'Seated Pulls', reps: '10', sets: '1', note: '' },
            { name: 'Walk', reps: '3-5 min', sets: '1', note: '' }
        ],
        core: [],
        activation: [],
        exercises: [
            { id: 'ex1', name: 'Heavy Band Rows', reps: '12', sets: 4, note: 'Red Band' },
            { id: 'ex2', name: 'Band Pull-Aparts', reps: '20', sets: 4, note: 'Posture Focus' },
            { id: 'ex3', name: 'DB Bicep Curls', reps: '12', sets: 3, note: '' },
            { id: 'ex4', name: 'Single-Arm Rows', reps: '12 L / 12 R', sets: 3, note: 'Variable DB' },
            { id: 'ex5', name: 'Lat Raise (Drop Set)', reps: 'Failure', sets: 3, note: '15 lb DB' },
            { id: 'ex6', name: 'Weighted Crunches', reps: '20', sets: 3, note: '20 lb DB' }
        ]
    }
};

const WORKOUT_NAMES = {
    'heavy-glutes': 'Heavy Glutes (Lower)',
    'upper-push': 'Upper Push (Chest / Shoulders)',
    'glute-volume': 'Glute Volume & Unilateral',
    'upper-pull': 'Upper Pull & Vanity',
    'none': 'None (Rest / Recovery)'
};

let currentCalDate = new Date();
let activeSelectedDate = new Date().toISOString().split('T')[0];
let currentExerciseIndex = 0;
let userWeightChoice = 'last';

// TIMING TRACKING VARIABLES
let workoutStartTime = null;
let workoutInterval = null;
let exerciseStartTime = null;
let exerciseDurations = {}; // Store duration per exercise in seconds

// ==========================================================================
// 2. INITIALIZATION & NAVIGATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('shift-date');
    const today = new Date().toISOString().split('T')[0];
    if (dateInput) dateInput.value = today;

    // Attach Event Listeners
    if (dateInput) dateInput.addEventListener('change', checkPreviousDayWorkout);
    
    const prevBtn = document.getElementById('btn-previous-workouts');
    const exportBtn = document.getElementById('btn-export-excel');
    const clearBtn = document.getElementById('btn-clear-data');

    if (prevBtn) prevBtn.addEventListener('click', renderPreviousWorkouts);
    if (exportBtn) exportBtn.addEventListener('click', exportScheduleToExcel);
    if (clearBtn) clearBtn.addEventListener('click', clearStoredSchedule);

    toggleScheduleOptions();
    checkPreviousDayWorkout();
    renderCalendar();
    loadTodayWorkoutPage(today);
});

function showPage(pageId) {
    document.querySelectorAll('.view-screen').forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('active');
    });

    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (pageId === 'schedule-page') {
        checkPreviousDayWorkout();
    } else if (pageId === 'today-workout-page' || pageId === 'workout-page') {
        loadTodayWorkoutPage(activeSelectedDate);
    } else if (pageId === 'history-page') {
        updateStorageViewer();
        renderPreviousWorkouts();
    } else if (pageId === 'home-page' || pageId === 'workout-page') {
        renderCalendar();
    }
}

// ==========================================================================
// 3. STEP-BY-STEP WORKOUT LOGGING ENGINE & TIMERS
// ==========================================================================

function loadTodayWorkoutPage(dateStr) {
    activeSelectedDate = dateStr;
    currentExerciseIndex = 0;
    stopWorkoutTimer(); // Reset timer if navigating fresh

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const dayData = savedSchedules[dateStr] || {};

    const dateLabel = document.getElementById('workout-page-date');
    const metaRoutine = document.getElementById('meta-workout-type');
    const metaShift = document.getElementById('meta-shift-status');
    const timerDisplay = document.getElementById('workout-timer-display');

    if (dateLabel) dateLabel.textContent = dateStr;
    if (metaRoutine) metaRoutine.textContent = WORKOUT_NAMES[dayData.workoutType] || 'Rest / Recovery';
    if (timerDisplay) timerDisplay.style.display = 'none';

    if (metaShift) {
        const shiftMap = { 'day-shift': 'Day Shift', 'night-shift': 'Night Shift', 'off-day': 'Off Day' };
        metaShift.textContent = shiftMap[dayData.dayStatus] || 'Not Scheduled';
    }

    const actionFooter = document.getElementById('workout-overview-actions');
    if (actionFooter) actionFooter.style.display = 'flex';

    renderWorkoutOverview(dayData.workoutType);
}

function renderWorkoutOverview(workoutType) {
    const container = document.getElementById('exercise-logger-container');
    const workoutDef = WORKOUT_DEFINITIONS[workoutType];
    const startBtn = document.getElementById('btn-start-workout');
    const saveProgressBtn = document.querySelector('#workout-overview-actions button[onclick="saveTodayWorkoutProgress()"]');

    if (!workoutDef || !workoutDef.exercises || workoutDef.exercises.length === 0) {
        container.innerHTML = `
            <div class="card" style="text-align: center; padding: 24px;">
                <p style="margin: 0; color: var(--text-secondary);">Rest & Recovery Day</p>
                <span class="text-muted" style="font-size: 0.8rem;">No exercises scheduled for today.</span>
            </div>
        `;
        if (startBtn) startBtn.style.display = 'none';
        if (saveProgressBtn) saveProgressBtn.style.display = 'none';
        return;
    }

    if (startBtn) startBtn.style.display = 'block';
    if (saveProgressBtn) saveProgressBtn.style.display = 'block';

    let previewList = workoutDef.exercises.map((ex, i) => `
        <li style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.88rem;">
            <span><strong>${i + 1}. ${ex.name}</strong></span>
            <span style="color: #e5c185;">${ex.sets} Sets × ${ex.reps}</span>
        </li>
    `).join('');

    container.innerHTML = `
        <div class="card" style="padding: 18px; margin-bottom: 16px;">
            <h3 style="margin: 0 0 12px 0; color: #e5c185; font-size: 1rem; border-bottom: 1px solid rgba(229,193,133,0.2); padding-bottom: 6px;">
                📋 Today's Routine Overview
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
                ${previewList}
            </ul>
        </div>
    `;
}

function startActiveWorkout() {
    const actionFooter = document.getElementById('workout-overview-actions');
    if (actionFooter) actionFooter.style.display = 'none';

    const container = document.getElementById('exercise-logger-container');

    container.innerHTML = `
        <div class="card" style="padding: 20px; text-align: center; margin-bottom: 16px;">
            <h3 style="color: #e5c185; margin-top: 0;">Weight Setup</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 20px;">
                How would you like to set your starting weights for today's session?
            </p>

            <div style="display: flex; flex-direction: column; gap: 12px;">
                <button class="btn btn-primary" onclick="confirmWeightChoice('last')">
                    Use Weights From Last Session
                </button>
                <button class="btn btn-primary" onclick="confirmWeightChoice('fresh')">
                    Enter Fresh Weights Today
                </button>
            </div>
        </div>
    `;
}

function confirmWeightChoice(choice) {
    userWeightChoice = choice;
    currentExerciseIndex = 0;
    exerciseDurations = {};

    // START TIMERS
    workoutStartTime = new Date();
    startWorkoutTimer();

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const dayData = savedSchedules[activeSelectedDate] || {};
    const workoutDef = WORKOUT_DEFINITIONS[dayData.workoutType];

    renderSingleExerciseScreen(workoutDef, dayData.loggedSets || {});
}

// Timer Functions
function startWorkoutTimer() {
    const timerDisplay = document.getElementById('workout-timer-display');
    if (timerDisplay) timerDisplay.style.display = 'inline-block';

    workoutInterval = setInterval(() => {
        if (!workoutStartTime) return;
        const now = new Date();
        const diffMs = now - workoutStartTime;
        const mins = Math.floor(diffMs / 60000);
        const secs = Math.floor((diffMs % 60000) / 1000);
        
        if (timerDisplay) {
            timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
    }, 1000);
}

function stopWorkoutTimer() {
    if (workoutInterval) clearInterval(workoutInterval);
    workoutInterval = null;
}

function renderSingleExerciseScreen(workoutDef, loggedSets) {
    exerciseStartTime = new Date(); // Track start of current exercise

    const container = document.getElementById('exercise-logger-container');
    const exercises = workoutDef.exercises;
    const totalExercises = exercises.length;
    const ex = exercises[currentExerciseIndex];

    let setRowsHtml = '';
    for (let s = 1; s <= ex.sets; s++) {
        const setKey = `${ex.id}_s${s}`;
        const setSaved = loggedSets[setKey] || { reps: '', weight: '', done: false, timeCompleted: '' };

        let weightVal = setSaved.weight;
        if (!weightVal && userWeightChoice === 'last') {
            weightVal = ex.note ? (ex.note.match(/\d+/) || [''])[0] : '';
        }

        setRowsHtml += `
            <div class="set-row" style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px;">
                <span style="font-size: 0.85rem; font-weight: 700; width: 50px; color: var(--text-secondary);">Set ${s}</span>
                <input type="number" placeholder="Lbs" value="${weightVal}" id="w_${setKey}" class="set-input" style="width: 32%; text-align: center;">
                <input type="number" placeholder="Reps" value="${setSaved.reps || ex.reps.split(' ')[0]}" id="r_${setKey}" class="set-input" style="width: 32%; text-align: center;">
                <input type="checkbox" id="c_${setKey}" ${setSaved.done ? 'checked' : ''} onchange="toggleSetCompletion(this, '${setKey}')" style="width: 22px; height: 22px; accent-color: #e5c185;">
            </div>
        `;
    }

    const isLastExercise = currentExerciseIndex === totalExercises - 1;

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="text-muted" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">
                Exercise ${currentExerciseIndex + 1} of ${totalExercises}
            </span>
            <span style="font-size: 0.8rem; color: #e5c185; font-weight: 700;">Target: ${ex.reps}</span>
        </div>

        <div class="card exercise-log-card" style="padding: 18px; margin-bottom: 16px;">
            <h3 style="margin: 0 0 6px 0; color: #e5c185; font-size: 1.2rem;">${ex.name}</h3>
            ${ex.note ? `<p style="font-size: 0.82rem; color: #a1a1aa; margin: 0 0 14px 0;">Note: ${ex.note}</p>` : ''}

            <div class="set-rows-container">
                ${setRowsHtml}
            </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 18px;">
            <button class="btn btn-primary" onclick="${isLastExercise ? 'finishWorkout()' : 'advanceToNextExercise()'}" style="width: 100%;">
                ${isLastExercise ? 'FINISH WORKOUT' : 'NEXT EXERCISE →'}
            </button>
            
            ${currentExerciseIndex > 0 ? `
                <button class="btn btn-primary" onclick="advanceToNextExercise(-1)" style="width: 100%; opacity: 0.7;">
                    ← PREVIOUS EXERCISE
                </button>
            ` : ''}
        </div>
    `;
}

function advanceToNextExercise(direction = 1) {
    saveCurrentExerciseProgress();

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const dayData = savedSchedules[activeSelectedDate] || {};
    const workoutDef = WORKOUT_DEFINITIONS[dayData.workoutType];

    currentExerciseIndex += direction;
    renderSingleExerciseScreen(workoutDef, dayData.loggedSets || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveCurrentExerciseProgress() {
    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    if (!savedSchedules[activeSelectedDate]) return;

    const dayData = savedSchedules[activeSelectedDate];
    const workoutDef = WORKOUT_DEFINITIONS[dayData.workoutType];
    if (!workoutDef) return;

    const loggedSets = dayData.loggedSets || {};
    const ex = workoutDef.exercises[currentExerciseIndex];

    // Calculate time spent on this exercise
    if (exerciseStartTime) {
        const timeSpentSecs = Math.round((new Date() - exerciseStartTime) / 1000);
        exerciseDurations[ex.id] = (exerciseDurations[ex.id] || 0) + timeSpentSecs;
    }

    for (let s = 1; s <= ex.sets; s++) {
        const setKey = `${ex.id}_s${s}`;
        const weightVal = document.getElementById(`w_${setKey}`)?.value || '';
        const repsVal = document.getElementById(`r_${setKey}`)?.value || '';
        const doneVal = document.getElementById(`c_${setKey}`)?.checked || false;
        const prevTime = loggedSets[setKey]?.timeCompleted || '';

        loggedSets[setKey] = { 
            weight: weightVal, 
            reps: repsVal, 
            done: doneVal,
            timeCompleted: doneVal && !prevTime ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : prevTime
        };
    }

    savedSchedules[activeSelectedDate].loggedSets = loggedSets;
    savedSchedules[activeSelectedDate].exerciseDurations = exerciseDurations;
    localStorage.setItem('user_schedule', JSON.stringify(savedSchedules));
}

function finishWorkout() {
    saveCurrentExerciseProgress();
    stopWorkoutTimer();

    // Store total duration
    const totalWorkoutSecs = workoutStartTime ? Math.round((new Date() - workoutStartTime) / 1000) : 0;
    const totalMins = Math.floor(totalWorkoutSecs / 60);

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    if (savedSchedules[activeSelectedDate]) {
        savedSchedules[activeSelectedDate].totalDurationSecs = totalWorkoutSecs;
        localStorage.setItem('user_schedule', JSON.stringify(savedSchedules));
    }

    alert(`🎉 Workout Completed in ${totalMins} minutes! Great work!`);
    showPage('workout-page');
}

function toggleSetCompletion(checkbox, setKey) {
    const setRow = checkbox.closest('.set-row');
    if (checkbox.checked) {
        setRow.style.opacity = '0.5';
    } else {
        setRow.style.opacity = '1';
    }
}

function saveTodayWorkoutProgress() {
    saveCurrentExerciseProgress();
    alert(`Workout progress saved for ${activeSelectedDate}!`);
}

// ==========================================================================
// 4. CALENDAR ENGINE
// ==========================================================================

function changeMonth(direction) {
    currentCalDate.setMonth(currentCalDate.getMonth() + direction);
    renderCalendar();
}

function renderCalendar() {
    const monthTitle = document.getElementById('calendar-month-title');
    const grid = document.getElementById('calendar-days-grid');
    if (!grid || !monthTitle) return;

    grid.innerHTML = '';

    const year = currentCalDate.getFullYear();
    const month = currentCalDate.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthTitle.textContent = `${monthNames[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const todayStr = new Date().toISOString().split('T')[0];

    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('cal-day', 'empty');
        grid.appendChild(emptyDiv);
    }

    for (let day = 1; day <= totalDays; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('cal-day');
        dayDiv.textContent = day;

        const formattedMonth = String(month + 1).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');
        const dateKey = `${year}-${formattedMonth}-${formattedDay}`;

        if (dateKey === todayStr) {
            dayDiv.classList.add('today');
        }

        const dayData = savedSchedules[dateKey];
        if (dayData) {
            if (dayData.dayStatus) {
                dayDiv.classList.add(`shift-${dayData.dayStatus}`);
            }
            if (dayData.workoutType && dayData.workoutType !== 'none') {
                dayDiv.classList.add(`workout-${dayData.workoutType}`);
            }
        }

        dayDiv.addEventListener('click', () => {
            activeSelectedDate = dateKey;
            showPage('today-workout-page');
        });

        grid.appendChild(dayDiv);
    }
}

// ==========================================================================
// 5. SCHEDULE FORM & PREVIOUS DAY HINTS
// ==========================================================================

function toggleScheduleOptions() {
    const dayStatusEl = document.getElementById('day-status');
    if (!dayStatusEl) return;
    
    const dayStatus = dayStatusEl.value;
    const isCustom = document.getElementById('custom-time-toggle')?.checked || false;
    const timeCheckboxGroup = document.getElementById('custom-time-checkbox-group');
    const timeInputs = document.getElementById('time-inputs');
    const startTime = document.getElementById('start-time');
    const endTime = document.getElementById('end-time');

    if (dayStatus === 'off-day') {
        if (timeCheckboxGroup) timeCheckboxGroup.style.display = 'none';
        if (timeInputs) timeInputs.style.display = 'none';
    } else {
        if (timeCheckboxGroup) timeCheckboxGroup.style.display = 'flex';

        if (dayStatus === 'night-shift' && startTime && endTime) {
            startTime.value = '17:00';
            endTime.value = '05:30';
        } else if (dayStatus === 'day-shift' && startTime && endTime) {
            startTime.value = '05:00';
            endTime.value = '17:30';
        }

        if (timeInputs) timeInputs.style.display = isCustom ? 'flex' : 'none';
    }
}

function checkPreviousDayWorkout() {
    const currentDateVal = document.getElementById('shift-date')?.value;
    const hintBox = document.getElementById('prev-workout-hint');
    if (!currentDateVal || !hintBox) return;

    const currentDate = new Date(currentDateVal + 'T00:00:00');
    currentDate.setDate(currentDate.getDate() - 1);
    const prevDateStr = currentDate.toISOString().split('T')[0];

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const prevDayData = savedSchedules[prevDateStr];

    if (prevDayData && prevDayData.workoutType) {
        const workoutName = WORKOUT_NAMES[prevDayData.workoutType] || 'None';
        hintBox.innerHTML = `<strong>Yesterday (${prevDateStr}):</strong> ${workoutName}`;
        hintBox.style.display = 'block';
    } else {
        hintBox.innerHTML = `<strong>Yesterday (${prevDateStr}):</strong> No workout logged`;
        hintBox.style.display = 'block';
    }
}

function saveShiftAndReturn() {
    const dateVal = document.getElementById('shift-date').value;
    const dayStatus = document.getElementById('day-status').value;
    const startTime = document.getElementById('start-time')?.value || '';
    const endTime = document.getElementById('end-time')?.value || '';
    const workoutType = document.getElementById('workout-type').value;

    if (!dateVal) {
        alert("Please select a valid date.");
        return;
    }

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const existingLogged = savedSchedules[dateVal]?.loggedSets || {};

    savedSchedules[dateVal] = {
        dayStatus: dayStatus,
        startTime: startTime,
        endTime: endTime,
        workoutType: workoutType,
        loggedSets: existingLogged
    };

    localStorage.setItem('user_schedule', JSON.stringify(savedSchedules));
    renderCalendar();
    alert(`Schedule saved for ${dateVal}!`);
}

// ==========================================================================
// 6. STORAGE, HISTORY & EXCEL EXPORT (WITH TIMING DATA)
// ==========================================================================

function updateStorageViewer() {
    const rawData = localStorage.getItem('user_schedule');
    const viewer = document.getElementById('json-data-viewer');
    const countLabel = document.getElementById('stored-count');

    if (!rawData || rawData === '{}') {
        if (viewer) viewer.textContent = "No data stored in localStorage.";
        if (countLabel) countLabel.textContent = "0";
        return;
    }

    const parsedData = JSON.parse(rawData);
    const dayKeys = Object.keys(parsedData);

    if (countLabel) countLabel.textContent = dayKeys.length;
    if (viewer) viewer.textContent = JSON.stringify(parsedData, null, 2);
}

function renderPreviousWorkouts() {
    const container = document.getElementById('previous-workouts-container');
    if (!container) return;
    container.innerHTML = '';

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const dates = Object.keys(savedSchedules).sort().reverse();

    const workoutDates = dates.filter(dateKey => {
        const dayData = savedSchedules[dateKey];
        return dayData && dayData.workoutType && dayData.workoutType !== 'none';
    });

    if (workoutDates.length === 0) {
        container.innerHTML = `<div class="empty-history-card"><p>No workout history logged yet.</p></div>`;
        return;
    }

    workoutDates.forEach(dateKey => {
        const dayData = savedSchedules[dateKey];
        const durationMins = dayData.totalDurationSecs ? Math.round(dayData.totalDurationSecs / 60) : null;
        
        const card = document.createElement('div');
        card.classList.add('history-card');

        card.innerHTML = `
            <div class="history-card-header">
                <span class="history-date">${dateKey}</span>
                <span class="history-workout-type">${WORKOUT_NAMES[dayData.workoutType] || dayData.workoutType}</span>
            </div>
            <div class="history-card-body">
                <p><strong>Shift Status:</strong> ${dayData.dayStatus || 'N/A'}</p>
                ${durationMins ? `<p>⏱️ <strong>Total Session Time:</strong> ${durationMins} mins</p>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

function exportScheduleToExcel() {
    const rawData = localStorage.getItem('user_schedule');
    if (!rawData || rawData === '{}') {
        alert("No schedule or workout data available to export.");
        return;
    }

    const parsedData = JSON.parse(rawData);
    const rows = [];
    const sortedDates = Object.keys(parsedData).sort();

    sortedDates.forEach(date => {
        const item = parsedData[date];
        const dayStatusText = item.dayStatus === 'night-shift' ? 'Night Shift' : 
                             (item.dayStatus === 'day-shift' ? 'Day Shift' : 'Off Day');
        const workoutName = WORKOUT_NAMES[item.workoutType] || 'None';
        const workoutDef = WORKOUT_DEFINITIONS[item.workoutType];
        const loggedSets = item.loggedSets || {};
        const exerciseDurations = item.exerciseDurations || {};

        const totalWorkoutMins = item.totalDurationSecs ? Math.round(item.totalDurationSecs / 60) : 'N/A';

        let hasDetailedLogs = false;

        if (workoutDef && workoutDef.exercises) {
            workoutDef.exercises.forEach(ex => {
                const exTimeMins = exerciseDurations[ex.id] ? Math.round(exerciseDurations[ex.id] / 60) : 'N/A';

                for (let s = 1; s <= ex.sets; s++) {
                    const setKey = `${ex.id}_s${s}`;
                    const setData = loggedSets[setKey];

                    if (setData && (setData.weight || setData.reps || setData.done)) {
                        hasDetailedLogs = true;
                        rows.push({
                            "Date": date,
                            "Shift Status": dayStatusText,
                            "Total Session (Mins)": totalWorkoutMins,
                            "Assigned Routine": workoutName,
                            "Exercise Name": ex.name,
                            "Exercise Time (Mins)": exTimeMins,
                            "Set #": `Set ${s}`,
                            "Weight (Lbs)": setData.weight || '0',
                            "Reps Completed": setData.reps || '0',
                            "Time Set Completed": setData.timeCompleted || 'N/A',
                            "Completed Status": setData.done ? 'DONE' : 'SKIPPED'
                        });
                    }
                }
            });
        }

        if (!hasDetailedLogs) {
            rows.push({
                "Date": date,
                "Shift Status": dayStatusText,
                "Total Session (Mins)": 'N/A',
                "Assigned Routine": workoutName,
                "Exercise Name": 'N/A',
                "Exercise Time (Mins)": 'N/A',
                "Set #": 'N/A',
                "Weight (Lbs)": 'N/A',
                "Reps Completed": 'N/A',
                "Time Set Completed": 'N/A',
                "Completed Status": item.workoutType === 'none' ? 'REST DAY' : 'NOT LOGGED'
            });
        }
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const colWidths = [
        { wch: 12 }, // Date
        { wch: 14 }, // Shift Status
        { wch: 20 }, // Total Session Time
        { wch: 28 }, // Assigned Routine
        { wch: 26 }, // Exercise Name
        { wch: 20 }, // Exercise Time
        { wch: 8 },  // Set #
        { wch: 14 }, // Weight
        { wch: 16 }, // Reps Completed
        { wch: 18 }, // Time Set Completed
        { wch: 18 }  // Completed Status
    ];
    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Detailed Workout Log");

    const exportToday = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `Detailed_Workout_Log_${exportToday}.xlsx`);
}

function clearStoredSchedule() {
    if (confirm("Are you sure you want to clear all stored schedule data?")) {
        localStorage.removeItem('user_schedule');
        updateStorageViewer();
        renderCalendar();
        renderPreviousWorkouts();
        alert("Data cleared!");
    }
}