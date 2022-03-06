var $start = document.getElementById('start')
var $game = document.getElementById('game')
var $result = document.getElementById('result')
var $time = document.getElementById('time')
var $timeHeader = document.getElementById('time-header')
var $resultHeader = document.getElementById('result-header')
var score = 0
var isGameStarted = false
var $gameTime = document.getElementById('game-time')

var colors = ['red', 'blue', 'green', 'yellow', 'purple', '#6667AB']

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)


function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
    isGameStarted = true
    $start.classList.add('hide')
    $game.style.background = '#fff'
    var interval = setInterval(function () {
        var time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        }else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    var time = parseInt($gameTime.value)
    $time.textContent = time.toFixed(1)
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    $start.classList.remove('hide')
    $game.innerHTML = ''
    $game.style.background = '#acacac'
    $timeHeader.classList.add('hide')
    $resultHeader.classList.remove('hide')
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}



function renderBox() {
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    var randomColorIndex = getRandom(0, colors.length)
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.background = colors[randomColorIndex]
    box.style.cursor = 'pointer'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}