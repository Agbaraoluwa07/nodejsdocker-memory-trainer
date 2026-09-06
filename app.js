const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Trainer App</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f7f6; margin: 0; padding: 20px; color: #333; }
        .container { max-width: 750px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        h1 { color: #2c3e50; text-align: center; }
        textarea { width: 100%; height: 120px; padding: 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; margin-bottom: 15px; box-sizing: border-box; }
        button { background: #3498db; color: white; border: none; padding: 10px 18px; font-size: 15px; border-radius: 4px; cursor: pointer; margin-right: 5px; margin-bottom: 10px; }
        button:hover { background: #2980b9; }
        .mode-section { margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee; }
        .exercise-box { background: #ecf0f1; padding: 20px; border-radius: 6px; font-size: 18px; line-height: 1.8; margin-top: 15px; word-spacing: 2px; }
        input[type="text"] { padding: 6px; font-size: 16px; width: 120px; border: 1px solid #bdc3c7; border-radius: 3px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Memory Trainer</h1>
        <p>Paste a verse, quote, or text you want to memorize below:</p>
        <textarea id="sourceText" placeholder="Paste your text here...">For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.</textarea>
        
        <div>
            <button onclick="startMode('gaps')">1. Fill in the Gaps</button>
            <button onclick="startMode('scramble')">2. Arrange Words</button>
            <button onclick="startMode('firstLetters')">3. Complete Words (First Letters)</button>
        </div>

        <div class="mode-section" id="outputArea">
            <h3>Practice Area</h3>
            <p style="color: #7f8c8d;">Select a memory mode above to start practicing!</p>
        </div>
    </div>

    <script>
        function getWords() {
            const text = document.getElementById('sourceText').value.trim();
            if (!text) { alert('Please enter some text first!'); return []; }
            return text.split(/\\s+/);
        }

        function startMode(mode) {
            const words = getWords();
            if (words.length === 0) return;
            const output = document.getElementById('outputArea');

            if (mode === 'gaps') {
                let missingIdx = Math.floor(Math.random() * words.length);
                let html = '<h3>Fill in the Gaps</h3><p style="font-size:14px; color:#666;">Type the missing word:</p><div class="exercise-box">';
                
                html += words.map((w, i) => {
                    if (i === missingIdx) {
                        return \`<input type="text" id="userAns" data-correct="\${w.replace(/[^a-zA-Z]/g, '')}"> \`;
                    }
                    return w + ' ';
                }).join('');
                
                html += '</div><br><button onclick="checkGaps()">Check Answer</button>';
                html += '<p id="feedback" style="font-weight: bold; font-size: 16px;"></p>';
                output.innerHTML = html;
            } 
            else if (mode === 'scramble') {
                let shuffled = [...words].sort(() => Math.random() - 0.5);
                output.innerHTML = '<h3>Arrange the Words</h3><p style="font-size:14px; color:#666;">Try to mentally or structurally reconstruct the original order of these scrambled words:</p><div class="exercise-box">' + shuffled.join(' ') + '</div>';
            } 
            else if (mode === 'firstLetters') {
                let formatted = words.map(w => {
                    let clean = w.replace(/[^a-zA-Z]/g, '');
                    let punctuation = w.replace(/[a-zA-Z]/g, '');
                    if (clean.length === 0) return w;
                    return clean[0] + '_'.repeat(clean.length - 1) + punctuation;
                }).join(' ');
                
                output.innerHTML = '<h3>Complete the Words (First Letters)</h3><p style="font-size:14px; color:#666;">Use the first letter cues to recall the text:</p><div class="exercise-box">' + formatted + '</div>';
            }
        }

        function checkGaps() {
            const input = document.getElementById('userAns');
            const feedback = document.getElementById('feedback');
            if (!input) return;
            
            let userVal = input.value.trim().toLowerCase();
            let correctVal = input.getAttribute('data-correct').toLowerCase();
            
            if (userVal === correctVal) {
                feedback.style.color = '#27ae60';
                feedback.innerText = 'Correct! Great memory!';
            } else {
                feedback.style.color = '#c0392b';
                feedback.innerText = 'Incorrect. The correct word was: ' + correctVal;
            }
        }
    </script>
</body>
</html>
`;

app.get('/', (req, res) => {
    res.send(htmlTemplate);
});

app.listen(PORT, () => {
    console.log(\`Memory Trainer app running on port \${PORT}\`);
});