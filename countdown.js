// Eleman referansları
const inputSeconds = document.getElementById('secondsInput');
const startBtn     = document.getElementById('startBtn');
const resetBtn     = document.getElementById('resetBtn');
const display      = document.getElementById('display');
const progressBar  = document.getElementById('progressBar');

let timerId     = null;
let timeLeft    = 0;
let initialTime = 0;

// Her saniye çalışan sayaç
function tick() {
  if (timeLeft <= 0) {
    clearInterval(timerId);
    timerId = null;

    // Pulse'u durdurup bombayı patlat
    display.innerHTML = `<span class="bomb">💥</span>`;
    display.classList.remove('urgent','warning');
    startBtn.disabled = false;
    progressBar.style.width = '100%';
    return;
  }

  timeLeft--;
  display.innerHTML = `<span class="number">${timeLeft}</span> s`;
  display.classList.toggle('warning', timeLeft <= 5);
  display.classList.toggle('urgent', timeLeft > 5 && timeLeft <= 10);

  const percent = ((initialTime - timeLeft) / initialTime) * 100;
  progressBar.style.width = percent + '%';
}

// Başlat butonu
startBtn.addEventListener('click', () => {
  const val = parseInt(inputSeconds.value, 10);
  if (isNaN(val) || val <= 0) {
    alert('Lütfen geçerli bir pozitif sayı gir.');
    return;
  }
  if (timerId !== null) return;

  initialTime = val;
  timeLeft    = val;
  display.innerHTML = `<span class="number">${timeLeft}</span> s`;
  startBtn.disabled = true;
  progressBar.style.width = '0%';

  timerId = setInterval(tick, 1000);
});

// Sıfırla butonu
resetBtn.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  timeLeft = 0;
  initialTime = 0;
  display.innerHTML = '--';
  display.classList.remove('urgent','warning');
  progressBar.style.width = '0%';
  inputSeconds.value = '';
  startBtn.disabled = false;
});
