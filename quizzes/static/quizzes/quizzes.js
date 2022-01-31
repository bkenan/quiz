const modalBtns = [...document.getElementsByClassName('modal-button')]
const modalBody = document.getElementById('modal-body')
const startBtn = document.getElementById('start-button')
const url = window.location.href

modalBtns.forEach(modalBtn => modalBtn.addEventListener('click', () => {
    const pk = modalBtn.getAttribute('data-pk')
    const questions = modalBtn.getAttribute('data-questions')
    const time = modalBtn.getAttribute('data-time')
    const score = modalBtn.getAttribute('data-score')
    const difficulty = modalBtn.getAttribute('data-difficulty')

    modalBody.innerHTML = `
         <div class="text-muted">
         <ul>
            <ul><b>Number of questions:</b> ${questions}</ul>
            <ul><b>Time:</b> ${time} minutes</ul>
            <ul><b>Score required to pass:</b> ${score}%</ul>
            <ul><b>Difficulty:</b> ${difficulty}</ul>
         </ul>
         </div>
    `
    startBtn.addEventListener('click', () => {
        window.location.href = url + pk
    })
}))

