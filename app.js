// Set your desired passkey/PIN here. Added "9999" as the secret Developer PIN.
const ALLOWED_PASSCODES = ["0852", "2580", "0000", "301537", ""];
const DEV_PASSCODE = "301537";

// Check lock state when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    checkLockState();
    checkDevMode(); // Check if the active session is a developer session
    
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

    if (overlay) {
        if (isUnlocked === 'true') {
            overlay.classList.add('unlocked');
        } else {
            overlay.classList.remove('unlocked');
        }
    }
}

// Shows or hides developer tools based on the active session PIN
function checkDevMode() {
    const activeCode = sessionStorage.getItem('active_user_code');
    const devBtn = document.getElementById('dev-test-btn');
    const devRemoveBtn = document.getElementById('dev-remove-test-btn');
    
    if (activeCode === DEV_PASSCODE) {
        if (devBtn) devBtn.classList.remove('hidden');
        if (devRemoveBtn) devRemoveBtn.classList.remove('hidden');
    } else {
        if (devBtn) devBtn.classList.add('hidden');
        if (devRemoveBtn) devRemoveBtn.classList.add('hidden');
    }
}

function unlockApp() {
    const inputField = document.getElementById('passcode-input');
    const errorMsg = document.getElementById('lock-error-msg');
    const overlay = document.getElementById('lock-screen-overlay');
    
    const enteredCode = inputField ? inputField.value.trim() : '';

    if (ALLOWED_PASSCODES.includes(enteredCode)) {
        sessionStorage.setItem('app_unlocked', 'true');
        sessionStorage.setItem('active_user_code', enteredCode); 
        
        if (overlay) overlay.classList.add('unlocked');
        if (errorMsg) errorMsg.style.display = 'none';
        if (inputField) inputField.value = '';
        
        // Check if we need to reveal the dev tools immediately after unlocking
        checkDevMode();
    } else {
        if (errorMsg) errorMsg.style.display = 'block';
        if (inputField) {
            inputField.value = '';
            inputField.focus();
        }
    }
}

// Manual re-lock function
function relockApp() {
    sessionStorage.removeItem('app_unlocked');
    checkLockState(); // Brings back the lock screen overlay immediately
}

// Helper to get local date string YYYY-MM-DD
function getLocalDateString(dateObj = new Date()) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// ==========================================================================
// 1. DATA DEFINITIONS & CONSTANTS
// ==========================================================================

const WORKOUT_DEFINITIONS = {
    'glutes-lowercore': {
        title: 'Workout A: Glute Hypertrophy & Lower Core',
        focus: 'Glutes & Lower Core',
        exercises: [
            { id: 'ex1', name: 'Stomach Vacuums', reps: '15-20 sec', sets: 3, note: 'Mat or Standing' },
            { id: 'ex2', name: 'Pelvic Tucks', reps: '12-15', sets: 3, note: 'Roman Chair Pin-Loaded Ab Crunch Machine' },
            { id: 'ex3', name: 'Hip Abduction', reps: '15-20', sets: 4, note: 'Pin-Loaded Abductor' },
            { id: 'ex4', name: 'Hip Thrusts', reps: '8-10', sets: 4, note: 'Smith Machine/ Glute Drive Machine' },
            { id: 'ex5', name: 'Leg Press', reps: '10-12', sets: 4, note: '45 deg or Cable Leg Press' },
            { id: 'ex6', name: 'Incline Treadmill Walk', reps: '15 min', sets: 1, note: '10-12% incline @ 3.0 mph' }
        ]
    },
    'upper-body': {
        title: 'Workout B: Upper Body V-Taper',
        focus: 'Lats & Shoulders',
        exercises: [
            { id: 'ex1', name: 'Incline Dumbbell Press', reps: '10-12', sets: 3, note: '30 deg Incline' },
            { id: 'ex2', name: 'Wide-Grip Lat Pulldown', reps: '10-12', sets: 4, note: 'Cable Pulldown Tower' },
            { id: 'ex3', name: 'Hammer Strength MTS Row', reps: '10-12', sets: 3, note: 'Machine Row'},
            { id: 'ex4', name: 'Cable Lateral Raise', reps: '12-15', sets: 4, note: 'Dual Cable (Cuff or Handle), Can do single arm too' },
            { id: 'ex5', name: 'Low-to-High Cable Curls', reps: '12-15', sets: 3, note: 'Cable Curl Machine' },
            { id: 'ex6', name: 'Chest-Supported Row', reps: '10-12', sets: 3, note: 'Seated Cable/Machine Row' },
            { id: 'ex7', name: 'Cable Face Pulls', reps: '15-20', sets: 3, note: 'Cable Column + Rope' },
            { id: 'ex8', name: 'Rope Pushdown / DB Curl', reps: '12-15', sets: 2, note: 'Cable Rope & DBs' }
        ]
    },
    'glute-detail': {
        title: 'Workout C: Glute Detail and Core',
        focus: 'Glute Shelf Detail, Hamstrings & Core',
        exercises: [
            { id: 'ex1', name: 'Stomach Vacuums', reps: '15-20', sets: 3, note: ''},
            { id: 'ex2', name: 'Seated Chest Press Machine', reps: '10-12', sets: 3, note: 'Horizontal Flat/Sternal Press Machine'},
            { id: 'ex3', name: 'Romanian Deadlift', reps: '10-12', sets: 4, note: 'Smith Machine or Dumbbells' },
            { id: 'ex4', name: 'Kickbacks', reps: '12-15 L / 12-15 R', sets: 3, note: 'Low Cable + Ankle Cuff' },
            { id: 'ex5', name: 'Seated Cable Row', reps: '10-12', sets: 3, note: 'Cable Row Machine' },
            { id: 'ex6', name: 'Incline Dumbell Lateral Raises', reps: '12-15', sets: 3, note: '' },
            { id: 'ex7', name: 'Lying or Seated Leg Curl', reps: '10-12', sets: 3, note: 'Pin-Loaded Leg Curl Machine' },
            { id: 'ex8', name: 'Incline Treadmill Walk', reps: '15 min', sets: 1, note: '10-12% incline @ 3.0 mph' }
        ]
    }
};

const WORKOUT_NAMES = {
    'glutes-lowercore': 'Workout A: Glute Hypertrophy & Lower Core',
    'upper-body': 'Workout B: Upper Body V-Taper',
    'glute-detail': 'Workout C: Glute Detail and Core',
    'none': 'None (Rest / Recovery)'
};

let currentCalDate = new Date();
let activeSelectedDate = getLocalDateString();
let currentExerciseIndex = 0;
let userWeightChoice = 'last';

// TIMING TRACKING VARIABLES
let workoutStartTime = null;
let workoutInterval = null;
let exerciseStartTime = null;
let exerciseDurations = {};

// ==========================================================================
// 2. INITIALIZATION & NAVIGATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    loadCustomRoutines();
    const dateInput = document.getElementById('shift-date');
    const today = getLocalDateString();
    if (dateInput) dateInput.value = today;

    // Attach Event Listeners
    if (dateInput) dateInput.addEventListener('change', checkSelectedDateSchedule);
    
    const prevBtn = document.getElementById('btn-previous-workouts');
    const exportBtn = document.getElementById('btn-export-excel');
    const clearBtn = document.getElementById('btn-clear-data');

    if (prevBtn) prevBtn.addEventListener('click', renderPreviousWorkouts);
    if (exportBtn) exportBtn.addEventListener('click', exportScheduleToExcel);
    if (clearBtn) clearBtn.addEventListener('click', clearStoredSchedule);

    checkSelectedDateSchedule();
    renderCalendar();
    updateTodaysFocus(); // Added Today's Focus update
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
        if (pageId === 'workout-page') {
            renderCalendar();
            updateTodaysFocus(); // Syncs the home screen focus text
        }
    } else if (pageId === 'history-page') {
        // 1. Force the detail view to hide and clear its data
        document.getElementById('history-detail-view').classList.add('hidden');
        document.getElementById('history-detail-content').innerHTML = '';
        document.getElementById('history-detail-date').textContent = '';
        
        // 2. Force the main list and footer to show
        document.getElementById('history-list-view').classList.remove('hidden');
        document.getElementById('history-action-footer').classList.remove('hidden');
        
        // 3. Render the list
        renderPreviousWorkouts();
    } else if (pageId === 'home-page') {
}
}
// ==========================================================================
// 3. STEP-BY-STEP WORKOUT LOGGING ENGINE & TIMERS
// ==========================================================================

function loadTodayWorkoutPage(dateStr) {
    activeSelectedDate = dateStr;
    currentExerciseIndex = 0;
    stopWorkoutTimer();

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const dayData = savedSchedules[dateStr] || {};

    const dateLabel = document.getElementById('workout-page-date');
    const metaRoutine = document.getElementById('meta-workout-type');
    const metaShift = document.getElementById('meta-shift-status');
    const timerDisplay = document.getElementById('workout-timer-display');

    if (dateLabel) dateLabel.textContent = dateStr;
    if (metaRoutine) metaRoutine.textContent = WORKOUT_NAMES[dayData.workoutType] || 'Rest / Recovery';
    if (timerDisplay) timerDisplay.style.display = 'none';

    const actionFooter = document.getElementById('workout-overview-actions');
    if (actionFooter) actionFooter.style.display = 'flex';

    renderWorkoutOverview(dayData.workoutType);
}

function renderWorkoutOverview(workoutType) {
    const container = document.getElementById('exercise-logger-container');
    const workoutDef = WORKOUT_DEFINITIONS[workoutType];
    const startBtn = document.getElementById('btn-start-workout');
    const fullViewBtn = document.getElementById('btn-full-workout-view');
    const saveProgressBtn = document.querySelector('#workout-overview-actions button[onclick="saveTodayWorkoutProgress()"]');

    if (!workoutDef || !workoutDef.exercises || workoutDef.exercises.length === 0) {
        container.innerHTML = `
            <div class="card" style="text-align: center; padding: 24px;">
                <p style="margin: 0; color: var(--text-secondary);">Rest & Recovery Day</p>
                <span class="text-muted" style="font-size: 0.8rem;">No exercises scheduled for today.</span>
            </div>
        `;
        if (startBtn) startBtn.style.display = 'none';
        if (fullViewBtn) fullViewBtn.style.display = 'none';
        if (saveProgressBtn) saveProgressBtn.style.display = 'none';
        return;
    }

    // Show all action buttons with full opacity and solid gold styling
    if (startBtn) startBtn.style.display = 'block';
    if (fullViewBtn) fullViewBtn.style.display = 'block';
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
                Today's Routine Overview
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
    exerciseStartTime = new Date();

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
            const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
            const dayData = savedSchedules[activeSelectedDate] || {};
            const pastWeight = getLastLoggedWeight(dayData.workoutType, ex.id, activeSelectedDate);
            
            weightVal = pastWeight !== '' ? pastWeight : (ex.note ? (ex.note.match(/\d+/) || [''])[0] : '');
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
            <h3 style="margin: 0 0 6px 0; color: #e5c185; font-size: 1.2rem;">${ex.name}</h3>${ex.note ? `<p style="font-size: 0.82rem; color: #a1a1aa; margin: 0 0 14px 0;">Note: ${ex.note}</p>` : ''}

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
    // 1. Save the current sets/reps first
    saveCurrentExerciseProgress();

    // 2. Safely load the schedule AFTER saving
    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const dayData = savedSchedules[activeSelectedDate] || {};
    const workoutDef = WORKOUT_DEFINITIONS[dayData.workoutType];

    // 3. Safely check for user notes if the input exists
    if (workoutDef && workoutDef.exercises) {
        const ex = workoutDef.exercises[currentExerciseIndex];
        const noteInput = document.getElementById(`note_${ex.id}`);
        
        if (noteInput) {
            const userNotes = dayData.exerciseUserNotes || {};
            if (noteInput.value.trim() !== '') {
                userNotes[ex.id] = noteInput.value.trim();
            } else {
                delete userNotes[ex.id];
            }
            savedSchedules[activeSelectedDate].exerciseUserNotes = userNotes;
            localStorage.setItem('user_schedule', JSON.stringify(savedSchedules));
        }
    }

    // 4. Advance the index and re-render the screen
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

        // Only save if the user actually interacted with the set
        if (weightVal !== '' || repsVal !== '' || doneVal) {
            loggedSets[setKey] = { 
                weight: weightVal, 
                reps: repsVal, 
                done: doneVal,
                timeCompleted: doneVal && !prevTime ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : (doneVal ? prevTime : '')
            };
        } else {
            delete loggedSets[setKey]; // Remove empty data
        }
    }

    savedSchedules[activeSelectedDate].loggedSets = loggedSets;
    savedSchedules[activeSelectedDate].exerciseDurations = exerciseDurations;
    localStorage.setItem('user_schedule', JSON.stringify(savedSchedules));
}

function finishWorkout() {
    saveCurrentExerciseProgress();
    stopWorkoutTimer();

    const totalWorkoutSecs = workoutStartTime ? Math.round((new Date() - workoutStartTime) / 1000) : 0;
    const totalMins = Math.floor(totalWorkoutSecs / 60);

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    if (savedSchedules[activeSelectedDate]) {
        savedSchedules[activeSelectedDate].totalDurationSecs = totalWorkoutSecs;
        localStorage.setItem('user_schedule', JSON.stringify(savedSchedules));
    }

    alert(`Workout Completed in ${totalMins} minutes! Great work!`);
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
// 4. FULL PAGE WORKOUT VIEW
// ==========================================================================

// Renders all exercises at once on a single non-refreshing page with manual time entry
function renderFullWorkoutView() {
    const actionFooter = document.getElementById('workout-overview-actions');
    if (actionFooter) actionFooter.style.display = 'none';

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const dayData = savedSchedules[activeSelectedDate] || {};
    const workoutDef = WORKOUT_DEFINITIONS[dayData.workoutType];
    const container = document.getElementById('exercise-logger-container');

    if (!workoutDef || !workoutDef.exercises || workoutDef.exercises.length === 0) {
        container.innerHTML = `<div class="card" style="text-align: center; padding: 20px;"><p>No exercises scheduled for today.</p></div>`;
        return;
    }

    const loggedData = dayData.loggedSets || {};
    const totalMinsSaved = dayData.totalDurationSecs ? Math.round(dayData.totalDurationSecs / 60) : '';

    let html = `
        <div class="card" style="padding: 16px; margin-bottom: 20px; text-align: center;">
            <label style="color: #e5c185; font-weight: bold; font-size: 0.9rem; display: block; margin-bottom: 8px;">
                Total Time to Complete Workout (Minutes):
            </label>
            <input type="number" id="full-view-total-mins" placeholder="e.g. 45" value="${totalMinsSaved}" 
                   style="width: 120px; padding: 8px; border-radius: 6px; border: 1px solid rgba(229,193,133,0.4); background: rgba(0,0,0,0.5); color: #fff; text-align: center; font-size: 1rem;">
        </div>
    `;

    workoutDef.exercises.forEach((ex) => {
        const savedUserNote = (dayData.exerciseUserNotes || {})[ex.id] || '';
        html += `
            <div class="card exercise-log-card" style="margin-bottom: 16px; padding: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <strong style="color: #e5c185; font-size: 1.05rem;">${ex.name}</strong>
                    <span class="text-muted" style="font-size: 0.8rem;">Target: ${ex.reps}</span>
                </div>
                ${ex.note ? `<p style="font-size: 0.8rem; color: #a1a1aa; margin: 0 0 10px 0;">Routine Note: ${ex.note}</p>` : ''}

                <input type="text" id="note_${ex.id}" class="exercise-note-input" placeholder="Add machine pin, seat height, or custom notes..." value="${savedUserNote}">

                <div class="set-rows-container">
        `;

        for (let s = 1; s <= ex.sets; s++) {
            const setKey = `${ex.id}_s${s}`;
            const setSaved = loggedData[setKey] || { reps: '', weight: '', done: false };
            
            let weightVal = setSaved.weight;
            if (!weightVal) {
                weightVal = getLastLoggedWeight(dayData.workoutType, ex.id, activeSelectedDate);
            }

            html += `
                <div class="set-row" style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 0.85rem; font-weight: 700; width: 45px; color: var(--text-secondary);">Set ${s}</span>
                    <input type="number" placeholder="Lbs" value="${weightVal}" id="w_${setKey}" class="set-input" style="width: 30%; text-align: center;">
                    <input type="number" placeholder="Reps" value="${setSaved.reps || ex.reps.split(' ')[0]}" id="r_${setKey}" class="set-input" style="width: 30%; text-align: center;">
                    <input type="checkbox" id="c_${setKey}" ${setSaved.done ? 'checked' : ''} onchange="toggleSetCompletion(this, '${setKey}')" style="width: 22px; height: 22px; accent-color: #e5c185;">
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;
    });

    // Action buttons with unified solid styling and updated text
    html += `
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
            <button class="btn btn-primary" onclick="saveFullWorkoutViewProgress()">
                SAVE WORKOUT & TIME
            </button>
            <button class="btn btn-primary" onclick="loadTodayWorkoutPage('${activeSelectedDate}')">
                BACK TO OVERVIEW
            </button>
            <button class="btn btn-primary" onclick="showPage('workout-page')">
                BACK TO WORKOUT
            </button>
        </div>
    `;

    container.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveFullWorkoutViewProgress() {
    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    if (!savedSchedules[activeSelectedDate]) {
        savedSchedules[activeSelectedDate] = {workoutType: 'none' };
    }

    const dayData = savedSchedules[activeSelectedDate];
    const workoutDef = WORKOUT_DEFINITIONS[dayData.workoutType];

    if (workoutDef && workoutDef.exercises) {
        const loggedSets = dayData.loggedSets || {};

        workoutDef.exercises.forEach(ex => {
            const userNotes = dayData.exerciseUserNotes || {};
            const noteInput = document.getElementById(`note_${ex.id}`);
            if (noteInput && noteInput.value.trim() !== '') {
                userNotes[ex.id] = noteInput.value.trim();
            } else if (noteInput) {
                delete userNotes[ex.id];
            }
            dayData.exerciseUserNotes = userNotes;
            for (let s = 1; s <= ex.sets; s++) {
                const setKey = `${ex.id}_s${s}`;
                const weightVal = document.getElementById(`w_${setKey}`)?.value || '';
                const repsVal = document.getElementById(`r_${setKey}`)?.value || '';
                const doneVal = document.getElementById(`c_${setKey}`)?.checked || false;

                if (weightVal !== '' || repsVal !== '' || doneVal) {
                    loggedSets[setKey] = {
                        weight: weightVal,
                        reps: repsVal,
                        done: doneVal,
                        timeCompleted: doneVal ? (loggedSets[setKey]?.timeCompleted || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) : ''
                    };
                } else {
                    delete loggedSets[setKey]; // Remove empty data
                }
            }
        });

        savedSchedules[activeSelectedDate].loggedSets = loggedSets;
    }

    const minsInput = document.getElementById('full-view-total-mins')?.value;
    if (minsInput !== '' && !isNaN(minsInput)) {
        savedSchedules[activeSelectedDate].totalDurationSecs = parseInt(minsInput, 10) * 60;
    }

    localStorage.setItem('user_schedule', JSON.stringify(savedSchedules));
    alert(`Full workout & time saved for ${activeSelectedDate}!`);
    loadTodayWorkoutPage(activeSelectedDate);
}

// ==========================================================================
// 5. CALENDAR ENGINE & TODAYS FOCUS
// ==========================================================================

function updateTodaysFocus() {
    const summaryContainer = document.getElementById('todays-focus-summary');
    if (!summaryContainer) return;

    const todayStr = getLocalDateString();
    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const todayData = savedSchedules[todayStr];

    if (!todayData || !todayData.workoutType || todayData.workoutType === 'none') {
        summaryContainer.innerHTML = `<p class="text-muted">Rest Day / No Workout Scheduled</p>`;
    } else {
        const workoutName = WORKOUT_NAMES[todayData.workoutType];
        summaryContainer.innerHTML = `<p style="color: #e5c185; font-weight: bold; margin: 0;">${workoutName}</p>`;
    }
}

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
    const todayStr = getLocalDateString();

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
            if (dayData.workoutType && dayData.workoutType !== 'none') {
                const def = WORKOUT_DEFINITIONS[dayData.workoutType];
                // Use the custom color tag if it exists, otherwise fall back to original logic
                if (def && def.color) {
                    dayDiv.classList.add(def.color);
                } else {
                    dayDiv.classList.add(`workout-${dayData.workoutType}`);
                }
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
// 6. SCHEDULE FORM & PREVIOUS DAY HINTS
// ==========================================================================

function checkSelectedDateSchedule() {
    const dateVal = document.getElementById('shift-date')?.value;
    if (!dateVal) return;

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const dayData = savedSchedules[dateVal];
    const workoutSelect = document.getElementById('workout-type');

    // Auto-fill the dropdown with the existing workout for that date, if one exists
    if (dayData && dayData.workoutType) {
        if (workoutSelect) workoutSelect.value = dayData.workoutType;
    } else {
        if (workoutSelect) workoutSelect.value = 'none';
    }

    // Keep the "Yesterday" hint running
    checkPreviousDayWorkout();
}

function checkPreviousDayWorkout() {
    const currentDateVal = document.getElementById('shift-date')?.value;
    const hintBox = document.getElementById('prev-workout-hint');
    if (!currentDateVal || !hintBox) return;

    const currentDate = new Date(currentDateVal + 'T00:00:00');
    currentDate.setDate(currentDate.getDate() - 1);
    const prevDateStr = getLocalDateString(currentDate);

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

function saveScheduledWorkout() {
    const dateVal = document.getElementById('shift-date').value;
    const workoutType = document.getElementById('workout-type').value;

    if (!dateVal) {
        alert("Please select a valid date.");
        return;
    }

    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    
    // Safety Check: Ask before overwriting an existing scheduled workout
    if (savedSchedules[dateVal] && savedSchedules[dateVal].workoutType && savedSchedules[dateVal].workoutType !== 'none') {
        const isConfirmed = confirm(`A workout is already saved for ${dateVal}. Are you sure you want to modify this day?`);
        if (!isConfirmed) return; // Stop the save process if the user taps "Cancel"
    }

    // Preserve all existing data (weights, notes, and timers) if modifying the day
    const existingLogged = savedSchedules[dateVal]?.loggedSets || {};
    const existingNotes = savedSchedules[dateVal]?.exerciseUserNotes || {};
    const existingDurations = savedSchedules[dateVal]?.exerciseDurations || {};
    const existingTotalSecs = savedSchedules[dateVal]?.totalDurationSecs || null;

    savedSchedules[dateVal] = {
        workoutType: workoutType,
        loggedSets: existingLogged,
        exerciseUserNotes: existingNotes,
        exerciseDurations: existingDurations,
        totalDurationSecs: existingTotalSecs
    };

    localStorage.setItem('user_schedule', JSON.stringify(savedSchedules));
    renderCalendar();
    updateTodaysFocus(); 
    alert(`Schedule saved for ${dateVal}!`);
}

// ==========================================================================
// 7. STORAGE, HISTORY & EXCEL EXPORT (WITH TIMING DATA)
// ==========================================================================

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
        card.style.cursor = 'pointer';
        card.onclick = () => viewPastWorkoutDay(dateKey);

        card.innerHTML = `
            <div class="history-card-header" style="border: none; padding: 0; margin: 0;">
                <div>
                    <div class="history-date">${dateKey}</div>
                    <div class="history-workout-type" style="margin-top: 4px;">${WORKOUT_NAMES[dayData.workoutType] || dayData.workoutType}</div>
                </div>
                <div style="color: #e5c185; font-size: 1.2rem;">→</div>
            </div>
            ${durationMins ? `<div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 8px;">Time: ${durationMins} mins</div>` : ''}
        `;
        container.appendChild(card);
    });
}

function viewPastWorkoutDay(dateKey) {
    document.getElementById('history-list-view').classList.add('hidden');
    document.getElementById('history-action-footer').classList.add('hidden');
    document.getElementById('history-detail-view').classList.remove('hidden');
    
    document.getElementById('history-detail-date').textContent = dateKey;
    
    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const dayData = savedSchedules[dateKey];
    const workoutDef = WORKOUT_DEFINITIONS[dayData.workoutType];
    const loggedSets = dayData.loggedSets || {};
    const userNotes = dayData.exerciseUserNotes || {};
    const container = document.getElementById('history-detail-content');
    
    let html = '';
    
    if (workoutDef && workoutDef.exercises) {
        workoutDef.exercises.forEach(ex => {
            let setsHtml = '';
            let hasLoggedSets = false;

            for (let s = 1; s <= ex.sets; s++) {
                const setKey = `${ex.id}_s${s}`;
                const setData = loggedSets[setKey];

                if (setData && (setData.weight || setData.reps || setData.done)) {
                    hasLoggedSets = true;
                    setsHtml += `
                        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <span style="color: var(--text-secondary);">Set ${s}</span>
                            <span>${setData.weight ? setData.weight + ' lbs' : '-- lbs'} × ${setData.reps ? setData.reps + ' reps' : '-- reps'}</span>
                            <span style="color: ${setData.done ? '#e5c185' : '#a1a1aa'};">${setData.done ? '✓' : 'Skipped'}</span>
                        </div>
                    `;
                }
            }

            if (hasLoggedSets) {
                const savedUserNote = userNotes[ex.id] ? `<p style="font-size: 0.82rem; color: #b8a896; margin: 0 0 10px 0; font-style: italic; border-left: 2px solid #e5c185; padding-left: 8px;">📝 ${userNotes[ex.id]}</p>` : '';
                html += `
                    <div style="margin-bottom: 16px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px; border: 1px solid rgba(229,193,133,0.1);">
                        <strong style="color: #e5c185; display: block; margin-bottom: 8px;">${ex.name}</strong>
                        ${savedUserNote}
                        ${setsHtml}
                    </div>
                `;
            }
        });
    }

    if (html === '') {
        html = '<p class="text-muted" style="text-align: center;">No specific sets logged for this day.</p>';
    }

    container.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closePastWorkoutDetail() {
    // 1. Physically clear out the workout data and date from the screen
    document.getElementById('history-detail-content').innerHTML = '';
    document.getElementById('history-detail-date').textContent = '';
    
    // 2. Hide the detail view and show the history list again
    document.getElementById('history-detail-view').classList.add('hidden');
    document.getElementById('history-list-view').classList.remove('hidden');
    document.getElementById('history-action-footer').classList.remove('hidden');
    
    // 3. Snap back to the top of the list
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteSpecificWorkout() {
    const dateVal = document.getElementById('history-detail-date').textContent;
    if (!dateVal) return;

    if (confirm(`Are you sure you want to completely delete the workout data for ${dateVal}?`)) {
        const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
        
        // Remove the specific day from storage
        delete savedSchedules[dateVal];
        localStorage.setItem('user_schedule', JSON.stringify(savedSchedules));
        
        // Update the UI
        renderCalendar();
        updateTodaysFocus(); 
        closePastWorkoutDetail(); // Snaps back to the list view
        
        alert(`Workout for ${dateVal} has been deleted.`);
    }
}

function editSpecificWorkout() {
    const dateVal = document.getElementById('history-detail-date').textContent;
    if (!dateVal) return;
    
    // Set the active date to the past date and launch the full logger
    activeSelectedDate = dateVal;
    closePastWorkoutDetail(); 
    showPage('today-workout-page');
    renderFullWorkoutView();
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

    const exportToday = getLocalDateString();
    XLSX.writeFile(workbook, `Detailed_Workout_Log_${exportToday}.xlsx`);
}

function clearStoredSchedule() {
    if (confirm("Are you sure you want to clear all stored schedule data?")) {
        localStorage.removeItem('user_schedule');
        renderCalendar();
        updateTodaysFocus(); // Clears focus text
        renderPreviousWorkouts();
        alert("Data cleared!");
    }
}

// Helper to find the last logged weight for a specific exercise in a specific routine
function getLastLoggedWeight(workoutType, exerciseId, targetDateStr) {
    const savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    const dates = Object.keys(savedSchedules).sort().reverse(); // Newest to oldest

    for (const dateStr of dates) {
        if (dateStr < targetDateStr) { // Only look at history prior to the active date
            const dayData = savedSchedules[dateStr];
            if (dayData && dayData.workoutType === workoutType && dayData.loggedSets) {
                // Look for the first set that has a weight recorded
                for (let s = 1; s <= 6; s++) { 
                    const setKey = `${exerciseId}_s${s}`;
                    if (dayData.loggedSets[setKey] && dayData.loggedSets[setKey].weight) {
                        return dayData.loggedSets[setKey].weight;
                    }
                }
            }
        }
    }
    return ''; // Return empty string if no history is found
}

// ==========================================================================
// 8. CUSTOM ROUTINE BUILDER ENGINE
// ==========================================================================

let builderExerciseCount = 0;

function addExerciseField(existingData = null) {
    builderExerciseCount++;
    const container = document.getElementById('exercise-builder-container');
    
    const row = document.createElement('div');
    row.className = 'builder-exercise-row';
    row.id = `builder-row-${builderExerciseCount}`;
    
    // Auto-fill values if loading from the library, otherwise leave blank
    const nameVal = existingData ? existingData.name : '';
    const setsVal = existingData ? existingData.sets : '';
    const repsVal = existingData ? existingData.reps : '';
    const noteVal = existingData ? (existingData.note || '') : '';

    row.innerHTML = `
        <button class="builder-delete-btn" onclick="removeExerciseField(${builderExerciseCount})">✕</button>
        
        <label style="color: #e5c185; font-size: 0.85rem;">Exercise Name</label>
        <input type="text" class="exercise-note-input build-name" placeholder="e.g., Barbell Squat" value="${nameVal}" style="margin-bottom: 8px;">
        
        <div class="builder-input-group">
            <div>
                <label style="color: var(--text-secondary); font-size: 0.75rem;">Sets</label>
                <input type="number" class="exercise-note-input build-sets" placeholder="e.g., 3" value="${setsVal}" style="margin-bottom: 0;">
            </div>
            <div>
                <label style="color: var(--text-secondary); font-size: 0.75rem;">Target Reps / Time</label>
                <input type="text" class="exercise-note-input build-reps" placeholder="e.g., 10-12" value="${repsVal}" style="margin-bottom: 0;">
            </div>
        </div>
        
        <label style="color: var(--text-secondary); font-size: 0.75rem; margin-top: 8px; display: block;">Machine Note (Optional)</label>
        <input type="text" class="exercise-note-input build-note" placeholder="e.g., Pin 4, Seat 2" value="${noteVal}" style="margin-bottom: 0; margin-top: 4px;">
    `;
    
    container.appendChild(row);
}

function populateExerciseLibrary() {
    const select = document.getElementById('exercise-library-select');
    if (!select) return;

    const uniqueExercises = {};

    // Scan all routines to compile a unique list of exercises
    for (const [routineId, routineData] of Object.entries(WORKOUT_DEFINITIONS)) {
        if (routineData && routineData.exercises) {
            routineData.exercises.forEach(ex => {
                const key = ex.name.toLowerCase().trim();
                if (!uniqueExercises[key]) {
                    uniqueExercises[key] = ex;
                }
            });
        }
    }

    // Sort alphabetically
    const sortedExercises = Object.values(uniqueExercises).sort((a, b) => a.name.localeCompare(b.name));

    let html = `<option value="">-- Select saved exercise --</option>`;
    sortedExercises.forEach(ex => {
        const exString = JSON.stringify({ name: ex.name, sets: ex.sets, reps: ex.reps, note: ex.note });
        const escapedExString = exString.replace(/"/g, '&quot;');
        html += `<option value="${escapedExString}">${ex.name}</option>`;
    });

    select.innerHTML = html;
}

function addExerciseFromLibrary() {
    const select = document.getElementById('exercise-library-select');
    if (!select || !select.value) return;

    const exerciseData = JSON.parse(select.value);
    addExerciseField(exerciseData);
    
    select.value = ""; // Reset dropdown after adding
}

function removeExerciseField(id) {
    const row = document.getElementById(`builder-row-${id}`);
    if (row) row.remove();
}

function saveCustomRoutine() {
    const nameInput = document.getElementById('new-routine-name').value.trim();
    const colorInput = document.getElementById('new-routine-color').value;
    
    if (!nameInput) {
        alert("Please give your routine a name.");
        return;
    }

    const rows = document.querySelectorAll('.builder-exercise-row');
    if (rows.length === 0) {
        alert("Please add at least one exercise.");
        return;
    }

    const exercises = [];
    let isValid = true;

    // Loop through all active rows and extract the data
    rows.forEach((row, index) => {
        const name = row.querySelector('.build-name').value.trim();
        const sets = parseInt(row.querySelector('.build-sets').value) || 0;
        const reps = row.querySelector('.build-reps').value.trim();
        const note = row.querySelector('.build-note').value.trim();

        if (!name || sets <= 0 || !reps) {
            isValid = false;
        }

        exercises.push({
            id: `cex_${Date.now()}_${index}`, // Creates a unique ID so logs track perfectly
            name: name,
            sets: sets,
            reps: reps,
            note: note
        });
    });

    if (!isValid) {
        alert("Please fill out the Name, Sets, and Reps for all exercises.");
        return;
    }

    // Generate a computer-safe ID (e.g., "Pull Day" becomes "custom-pull-day")
    const routineId = 'custom-' + nameInput.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const newRoutine = {
        title: nameInput,
        focus: 'Custom Routine',
        color: colorInput, 
        exercises: exercises
    };

    // Save to LocalStorage
    const customRoutines = JSON.parse(localStorage.getItem('custom_routines') || '{}');
    customRoutines[routineId] = newRoutine;
    localStorage.setItem('custom_routines', JSON.stringify(customRoutines));

    alert(`"${nameInput}" has been saved successfully!`);
    
    // Reset Builder Form
    document.getElementById('new-routine-name').value = '';
    document.getElementById('exercise-builder-container').innerHTML = '';
    builderExerciseCount = 0;

    // Instantly load the new routine into the active app
    loadCustomRoutines();
    
    // Return to the main screen
    showPage('workout-page');
}

function loadCustomRoutines() {
    let customRoutines = JSON.parse(localStorage.getItem('custom_routines') || '{}');
    
    // 1. Force validate and rebuild base workouts if they are missing or corrupted
    const baseKeys = ['glutes-lowercore', 'upper-body', 'glute-detail'];
    // UPDATED: Now directly mapping to the new jewel-toned CSS classes
    const baseColors = ['color-gold', 'color-amethyst', 'color-sapphire'];
    let needsSave = false;

    baseKeys.forEach((key, index) => {
        // If missing entirely OR corrupted (missing title or exercises), force a complete rebuild
        if (!customRoutines[key] || !customRoutines[key].title || !customRoutines[key].exercises) {
            customRoutines[key] = {
                title: WORKOUT_NAMES[key] || WORKOUT_DEFINITIONS[key].title,
                focus: WORKOUT_DEFINITIONS[key].focus,
                color: baseColors[index],
                exercises: WORKOUT_DEFINITIONS[key].exercises
            };
            needsSave = true;
        } 
        // UPDATED: Also force an overwrite if it finds the old steel or copper tags in local storage
        else if (!customRoutines[key].color || customRoutines[key].color.startsWith('workout-') || customRoutines[key].color === key || customRoutines[key].color === 'color-steel' || customRoutines[key].color === 'color-copper') {
            customRoutines[key].color = baseColors[index];
            needsSave = true;
        }
    });

    if (needsSave) {
        localStorage.setItem('custom_routines', JSON.stringify(customRoutines));
    }

    const selectDropdown = document.getElementById('workout-type');
    if (selectDropdown) selectDropdown.innerHTML = `<option value="none">None (Rest / Recovery)</option>`;
    
    const managerList = document.getElementById('routine-manager-list');
    if (managerList) managerList.innerHTML = '';

    for (const [routineId, routineData] of Object.entries(customRoutines)) {
        // 2. Map back to global definitions so the app can read them
        WORKOUT_DEFINITIONS[routineId] = routineData;
        WORKOUT_NAMES[routineId] = routineData.title;

        // 3. Add to Schedule Setup Dropdown
        if (selectDropdown) {
            const opt = document.createElement('option');
            opt.value = routineId;
            opt.textContent = routineData.title;
            selectDropdown.appendChild(opt);
        }

        // 4. Render into Routine Manager List
        if (managerList) {
            managerList.innerHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 8px;">
                    <span style="font-size: 0.85rem; color: #FAF6F0;">${routineData.title}</span>
                    <div style="display: flex; gap: 8px;">
                        <button onclick="editSavedRoutine('${routineId}')" style="background: none; border: none; color: #e5c185; cursor: pointer; font-size: 0.75rem;">EDIT</button>
                        <button onclick="deleteSavedRoutine('${routineId}')" style="background: none; border: none; color: #ff6b6b; cursor: pointer; font-size: 0.75rem;">DEL</button>
                    </div>
                </div>
            `;
        }
    }
    
    updateTodaysFocus();
    populateExerciseLibrary();
}

function deleteSavedRoutine(routineId) {
    if (confirm("Are you sure you want to delete this routine? It will remain in past history, but cannot be scheduled again.")) {
        const customRoutines = JSON.parse(localStorage.getItem('custom_routines') || '{}');
        delete customRoutines[routineId];
        localStorage.setItem('custom_routines', JSON.stringify(customRoutines));
        loadCustomRoutines(); // Refresh UI
    }
}

function editSavedRoutine(routineId) {
    const customRoutines = JSON.parse(localStorage.getItem('custom_routines') || '{}');
    const routine = customRoutines[routineId];
    if (!routine) return;

    // Populate the top form
    document.getElementById('new-routine-name').value = routine.title;
    document.getElementById('new-routine-color').value = routine.color || routineId;

    // Clear existing builder rows and repopulate
    document.getElementById('exercise-builder-container').innerHTML = '';
    builderExerciseCount = 0;

    routine.exercises.forEach(ex => {
        addExerciseField();
        const row = document.getElementById(`builder-row-${builderExerciseCount}`);
        row.querySelector('.build-name').value = ex.name || '';
        row.querySelector('.build-sets').value = ex.sets || '';
        row.querySelector('.build-reps').value = ex.reps || '';
        row.querySelector('.build-note').value = ex.note || '';
    });
}

// ==========================================================================
// 9. COLOR TEST MODE
// ==========================================================================

function runColorTestMode() {
    const allColors = [
        'color-gold', 'color-steel', 'color-copper', 
        'color-silver', 'color-rosegold', 'color-titanium', 
        'color-amethyst', 'color-bronze', 'color-gunmetal', 
        'color-emerald', 'color-sapphire'
    ];
    
    let customRoutines = JSON.parse(localStorage.getItem('custom_routines') || '{}');
    let savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');
    let baseDate = new Date();
    
    let daysAdded = 0;
    let dayOffset = 0;

    // Map the 11 colors to the next 11 EMPTY days, skipping existing real workouts
    while (daysAdded < allColors.length) {
        let testDate = new Date(baseDate);
        testDate.setDate(baseDate.getDate() + dayOffset);
        const dateStr = getLocalDateString(testDate);

        if (!savedSchedules[dateStr] || !savedSchedules[dateStr].workoutType || savedSchedules[dateStr].workoutType === 'none') {
            const colorClass = allColors[daysAdded];
            const routineId = 'test-routine-' + colorClass;
            
            customRoutines[routineId] = {
                title: 'Test: ' + colorClass.replace('color-', '').toUpperCase(),
                focus: 'Color Render Test',
                color: colorClass,
                exercises: []
            };
            
            savedSchedules[dateStr] = {
                workoutType: routineId,
                loggedSets: {},
                exerciseUserNotes: {},
                exerciseDurations: {},
                totalDurationSecs: null
            };
            daysAdded++;
        }
        dayOffset++;
        
        // Failsafe to prevent infinite loops
        if (dayOffset > 365) break; 
    }
    
    localStorage.setItem('custom_routines', JSON.stringify(customRoutines));
    localStorage.setItem('user_schedule', JSON.stringify(savedSchedules));
    
    loadCustomRoutines();
    renderCalendar();
    
    alert("Color Test Mode Activated! Skipped over existing workouts.");
}

function removeColorTestMode() {
    let customRoutines = JSON.parse(localStorage.getItem('custom_routines') || '{}');
    let savedSchedules = JSON.parse(localStorage.getItem('user_schedule') || '{}');

    // 1. Wipe test routines from the calendar
    for (let dateKey in savedSchedules) {
        if (savedSchedules[dateKey].workoutType && savedSchedules[dateKey].workoutType.startsWith('test-routine-')) {
            delete savedSchedules[dateKey];
        }
    }

    // 2. Delete test routines from the builder manager
    for (let routineId in customRoutines) {
        if (routineId.startsWith('test-routine-')) {
            delete customRoutines[routineId];
        }
    }

    localStorage.setItem('custom_routines', JSON.stringify(customRoutines));
    localStorage.setItem('user_schedule', JSON.stringify(savedSchedules));

    loadCustomRoutines();
    renderCalendar();
    
    alert("Color Test Cleaned! Your real workouts were left untouched.");
}