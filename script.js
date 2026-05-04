// ═══════════════════════════════════════════
//  ALGOQUEST — Terminal Coding Puzzle Game
//  Type the correct code to solve each level!
// ═══════════════════════════════════════════

const input = document.getElementById('user-input');
const output = document.getElementById('output');

let currentLevel = 1;

// ── Level definitions ───────────────────────
const levels = [
    {
        id: 1,
        title: "LEVEL 1: The Logic Gate",
        prompt: "Fix the function to return 'true' when both inputs are equal.\nHint: Use a strict comparison operator on a and b.",
        answers: ["a === b", "a===b", "b === a", "b===a"],
        success: "✔ CORRECT! Strict equality (===) checks both value AND type.",
        next: "Initializing Level 2..."
    },
    {
        id: 2,
        title: "LEVEL 2: The Loop Breaker",
        prompt: "Write a for loop that counts from 0 to 4.\nHint: for (let i = 0; ...)",
        answers: [
            "for (let i = 0; i < 5; i++)",
            "for (let i = 0; i <= 4; i++)",
            "for(let i=0;i<5;i++)",
            "for(let i=0;i<=4;i++)",
            "for (let i = 0; i < 5; i++) {}",
            "for (let i = 0; i <= 4; i++) {}"
        ],
        success: "✔ CORRECT! Loops let you repeat code efficiently.",
        next: "Initializing Level 3..."
    },
    {
        id: 3,
        title: "LEVEL 3: The Array Architect",
        prompt: "Create an array with the elements 1, 2, 3.\nHint: Use square brackets.",
        answers: ["[1, 2, 3]", "[1,2,3]"],
        success: "✔ CORRECT! Arrays store ordered collections of data.",
        next: "Initializing Level 4..."
    },
    {
        id: 4,
        title: "LEVEL 4: The Function Factory",
        prompt: "Write an arrow function that takes x and returns x * 2.\nHint: Use => arrow syntax.",
        answers: [
            "x => x * 2",
            "(x) => x * 2",
            "x => x*2",
            "(x) => x*2",
            "(x) => { return x * 2; }",
            "(x) => { return x * 2 }",
            "x => { return x * 2; }",
            "x => { return x * 2 }"
        ],
        success: "✔ CORRECT! Arrow functions are concise and powerful.",
        next: "Initializing Level 5..."
    },
    {
        id: 5,
        title: "LEVEL 5: The Null Guard",
        prompt: "How do you check if a variable 'data' is null or undefined?\nHint: Use the equality operator that treats null and undefined as equal.",
        answers: ["data == null", "data==null", "null == data", "null==data"],
        success: "✔ CORRECT! Loose equality (==) treats null and undefined as the same.",
        next: ">> FINAL TRANSMISSION INCOMING..."
    }
];

// ── Input listener ──────────────────────────
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val === '') return;
        processCommand(val);
        input.value = '';
    }
});

// ── Print text to the terminal ──────────────
function printToTerminal(text, className = '') {
    const p = document.createElement('p');
    p.textContent = `> ${text}`;
    if (className) p.classList.add(className);
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
}

// ── Print with a typewriter delay effect ────
function printDelayed(text, className = '', delayMs = 400) {
    return new Promise((resolve) => {
        setTimeout(() => {
            printToTerminal(text, className);
            resolve();
        }, delayMs);
    });
}

// ── Show the current level prompt ───────────
function showLevel(level) {
    const lvl = levels.find(l => l.id === level);
    if (!lvl) {
        // All levels beaten!
        showVictory();
        return;
    }

    printToTerminal('--------------------------------------------------');
    printToTerminal(lvl.title, 'system');
    // Split multi-line prompts
    lvl.prompt.split('\n').forEach(line => {
        printToTerminal(line);
    });
}

// ── Process the user's command ──────────────
function processCommand(cmd) {
    printToTerminal(cmd);

    // Handle special commands
    if (cmd.toLowerCase() === 'help') {
        printToTerminal('Available commands:', 'system');
        printToTerminal('  help    — Show this help message');
        printToTerminal('  clear   — Clear the terminal');
        printToTerminal('  reset   — Restart from Level 1');
        printToTerminal('  level   — Show current level info');
        return;
    }

    if (cmd.toLowerCase() === 'clear') {
        output.innerHTML = '';
        printToTerminal('Terminal cleared.', 'system');
        return;
    }

    if (cmd.toLowerCase() === 'reset') {
        output.innerHTML = '';
        currentLevel = 1;
        printToTerminal('>> SYSTEM REBOOTED...', 'system');
        printToTerminal('>> WELCOME BACK, AGENT.', 'system');
        showLevel(currentLevel);
        return;
    }

    if (cmd.toLowerCase() === 'level') {
        printToTerminal(`Current level: ${currentLevel}`, 'system');
        showLevel(currentLevel);
        return;
    }

    // ── Check answer against current level ──
    const lvl = levels.find(l => l.id === currentLevel);
    if (!lvl) {
        printToTerminal('All levels complete! Type "reset" to play again.', 'success');
        return;
    }

    if (lvl.answers.includes(cmd)) {
        // Correct!
        printToTerminal(lvl.success, 'success');
        currentLevel++;

        if (currentLevel > levels.length) {
            // Beat the game!
            showVictory();
        } else {
            printToTerminal(lvl.next, 'system');
            setTimeout(() => {
                showLevel(currentLevel);
            }, 800);
        }
    } else {
        // Wrong answer
        printToTerminal('✘ INCORRECT. Try again, Agent.', 'error');
        printToTerminal('Type "help" for available commands.', 'system');
    }
}

// ── Victory screen ──────────────────────────
async function showVictory() {
    printToTerminal('=================================================', 'success');
    await printDelayed('>> TRANSMISSION RECEIVED', 'system', 500);
    await printDelayed('>> AGENT STATUS: VERIFIED', 'system', 500);
    await printDelayed('', '', 300);
    await printDelayed('██████  MISSION COMPLETE  ██████', 'success', 600);
    await printDelayed('', '', 200);
    await printDelayed('You have proven your knowledge of JavaScript.', 'success', 400);
    await printDelayed('AlgoQuest Division welcomes you.', 'success', 400);
    await printDelayed('', '', 200);
    await printDelayed('Type "reset" to run the mission again.', 'system', 300);
    printToTerminal('=================================================', 'success');
}

// ── Initialize on page load ─────────────────
showLevel(currentLevel);