const display = document.getElementById('display');
const OP_SYM  = { '+': '+', '-': '−', '*': '×', '/': '÷' };

let firstOperand   = null;
let secondOperand  = null;
let currentOperator = null;

// ── History ──────────────────────────────────────────────────────────────────
const HIST_KEY = 'calc_history';
let history = JSON.parse(localStorage.getItem(HIST_KEY) || '[]');

function renderHistory() {
  const list = document.getElementById('history-list');
  if (!list) return;
  if (history.length === 0) {
    list.innerHTML = '<li class="history-empty">No calculations yet</li>';
    return;
  }
  list.innerHTML = history.map(h => `
    <li class="history-item" data-result="${h.result}">
      <span class="history-expr">${h.expr}</span>
      <span class="history-result">${h.result}</span>
    </li>`).join('');
  list.querySelectorAll('.history-item').forEach(item => {
    item.addEventListener('click', () => {
      firstOperand    = parseFloat(item.dataset.result);
      secondOperand   = null;
      currentOperator = null;
      display.value   = firstOperand;
    });
  });
}

function pushHistory(expr, result) {
  history.unshift({ expr, result });
  if (history.length > 30) history.pop();
  localStorage.setItem(HIST_KEY, JSON.stringify(history));
  renderHistory();
}

document.getElementById('clear-history-btn').addEventListener('click', () => {
  history = [];
  localStorage.removeItem(HIST_KEY);
  renderHistory();
});

renderHistory();

// ── Calculator ────────────────────────────────────────────────────────────────
function calculateResult() {
  if (firstOperand === null || secondOperand === null || currentOperator === null) return;
  let result;
  switch (currentOperator) {
    case '+': result = firstOperand + secondOperand; break;
    case '-': result = firstOperand - secondOperand; break;
    case '*': result = firstOperand * secondOperand; break;
    case '/': result = firstOperand / secondOperand; break;
    default: return;
  }
  const expr = `${firstOperand} ${OP_SYM[currentOperator]} ${secondOperand}`;
  result = parseFloat(result.toPrecision(12));
  pushHistory(expr, result);
  display.value   = result;
  firstOperand    = result;
  secondOperand   = null;
  currentOperator = null;
}

function appendNumber(number) {
  if (currentOperator === null) {
    firstOperand  = firstOperand  !== null ? parseFloat(`${firstOperand}${number}`)  : number;
    display.value = firstOperand;
  } else {
    secondOperand = secondOperand !== null ? parseFloat(`${secondOperand}${number}`) : number;
    display.value = secondOperand;
  }
}

function setOperator(operator) {
  if (firstOperand !== null && secondOperand !== null) calculateResult();
  currentOperator = operator;
}

function clearDisplay() {
  firstOperand    = null;
  secondOperand   = null;
  currentOperator = null;
  display.value   = '';
}

function appendDecimal() {
  if (currentOperator === null) {
    firstOperand  = firstOperand  !== null ? `${firstOperand}.`  : '0.';
    display.value = firstOperand;
  } else {
    secondOperand = secondOperand !== null ? `${secondOperand}.` : '0.';
    display.value = secondOperand;
  }
}
