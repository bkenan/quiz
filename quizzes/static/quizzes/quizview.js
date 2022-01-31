const url = window.location.href
const quizBox = document.getElementById('quiz-box')
const quizForm = document.getElementById('quiz-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')
const scoreBox = document.getElementById('score-box')
const resultBox = document.getElementById('result-box')
let data

//designing the question and answer views based on the object entries
$.ajax({
    type: 'GET',
    url: `${url}data`,
    success: function (response) {
        data = response.data
        data.forEach(el => {
            for (const [question, answers] of Object.entries(el)) {
                quizBox.innerHTML += `
              <hr>
              <div class="mb-2">
              <b>${question}</b>
              </div>
              `
                answers.forEach(answer => {
                    quizBox.innerHTML += `
                    <div>
                        <input type="radio" class="answer" id="${question}-${answer}" name="${question}" value="${answer}">
                        <label for="${question}">${answer}</label>
                    </div>
                    `

                })
            }
        });
    },
})

//Sending data after submitting the answers
const sendData = () => {
    const elements = [...document.getElementsByClassName('answer')]
    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value
    elements.forEach(el => {
        if (el.checked) {
            data[el.name] = el.value
        } else {
            if (!data[el.name]) {
                data[el.name] = null
            }
        }
    })

    //constructing the messages based on the results
    //using add methods to display the messages dynamically
    $.ajax({
        type: 'POST',
        url: `${url}save/`,
        data: data,
        success: function (response) {
            const results = response.results
            quizForm.classList.add('no-view')

            scoreBox.innerHTML = `${response.passed ? 'Passed the quiz!' : 'Failed the quiz!'}Your score is ${response.score.toFixed(0)}%`

            results.forEach(res => {
                const resDiv = document.createElement("div")
                for (const [question, resp] of Object.entries(res)) {
                    resDiv.innerHTML += question
                    const cls = ['p-3', 'm-3', 'h3']
                    resDiv.classList.add(...cls)

                    if (resp == 'No answer') {
                        resDiv.innerHTML += ' |  No answer'
                        resDiv.classList.add('bg-secondary')
                    }
                    else {
                        const answer = resp['user_answer']
                        const correct = resp['correct_answer']
                        if (answer == correct) {
                            resDiv.classList.add('bg-success')
                            resDiv.innerHTML += ` | Answered correctly: ${answer}`
                        } else {
                            resDiv.classList.add('bg-danger')
                            resDiv.innerHTML += ` | Correct answer: ${correct}`
                            resDiv.innerHTML += ` | Your answer: ${answer}`
                        }
                    }
                }
                resultBox.append(resDiv)
            })
        },
    })
}

//preventing the browser's default behavior
quizForm.addEventListener('submit', e => {
    e.preventDefault()
    sendData()
})