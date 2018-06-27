/* eslint-env browser */
/* global $, getJson, postJson */

function getAnswers () {
  const answers = {}
  const questionIds = $('.question').get().map(el => el.id)
  for (const id of questionIds) {
    const weight = $(`.answer [name="${id}"]:checked`).val()
    answers[id] = weight ? parseFloat(weight) : undefined
  }
  return answers
}

$('#getPersonality').click(async () => {
  const answers = getAnswers()
  for (const id in answers) {
    if (answers[id] === undefined) {
      alert('Please answer all questions.')
      return
    }
  }
  const data = await postJson('/api/compute-personality', answers)
  if (data.error) {
    console.log(data)
    alert('Error')
    return
  }
  window.location.href = '/my-personality'
})

async function renderQuestions () {
  const questions = await getJson('/api/questions')

  for (const id in questions) {
    $('#questions').append(`
        <div class="question" id="${id}">
          <div class="description">${questions[id]}</div>
          <div class="answer">
            <label>
              Very inaccurate
              <input type="radio" name="${id}" value="-1">
            </label>
            <label>
              Moderately inaccurate
              <input type="radio" name="${id}" value="-0.5">
            </label>
            <label>
              Neither accurate nor inaccurate
              <input type="radio" name="${id}" value="0">
            </label>
            <label>
              Moderately accurate
              <input type="radio" name="${id}" value="0.5">
            </label>
            <label>
              Very accurate
              <input type="radio" name="${id}" value="1">
            </label>
          </div>
        </div>
      `)
  }
}

renderQuestions()
