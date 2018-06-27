/* eslint-env browser */
/* global $ */

async function getJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

answers = {
  "2": 0
}

function onSelectAnswer(questionId, answer) {
    answers[questionId] = answer
}

async function onTestDone() {
    const personality = await http.post('/api/compute-personality', answers)
}


async function main() {
  let availableTags = [
    'Utvecklare',
    'Kock',
    'Läkare',
    'Sjuksköterska',
    'Försäljare',
    'Designer',
  ];
  $('#category-input').autocomplete({
    source: availableTags,
  });

  let ocean = [[0], [0], [0], [0], [0]];

  let C = 'You are a person who are focused on the output and performing. When you perform something you want it to be perfect.You enjoy competition and excellent at a task.At times your high demand for yourself and others can be taxing on your relationships. ';
  let A = '<b>You have a great ability to relate to others and understand others.</b><br>This makes you ideal for jobs when you are working close to other people or are caring towards others.';
  let E = 'You are focused on social settings and are a natural centre of attention. You understand how to get your point across and find connection with others.You enjoy interacting with people in groups and have traits that might make you a great leader.At times your need for attention might make you seem self - centered and it is important to balance your needs with the needs of others. ';
  let O = 'You are a naturally curious person who stops at nothing to figure out the truth. Your need to explore the world has lead you on many adventures and has given you a great creative ability as well as the ability to focus on ideas.You are a creative person and will work best in organisations that value your creative output.Your need for change might make you question the status quo.This might make you unpopular in organisations with a stable hierarchical structure. ';
  let N = 'You are a psychogically stable person who can withstand any crisis. Your mental strength gives you the capacity to work in extremely challenging jobs, especially jobs that are psychologically challenging.Your strength might become a weakness if you fail to understand that not everyone is as fortune as you and you should try to show compassions for others who struggle more with mental health. ';

  let scores = [C, A, E, O, N];

  let oceanHeader = [
    'Conscientousness',
    'Agreeableness',
    'Extraversion',
    'Opennes to experience',
    'Emotional stability',
  ];
  let oceanImages = [
    '/img/conscientiousness.jpg',
    '/img/compassion2.jpg',
    '/img/extraversion.jpg',
    '/img/openness.jpg',
    '/img/stable.jpg',
  ];

  const test = await getJson('/data/items.json');
  let node = document.getElementById('question');
  node.innerHTML = test[0][0];
  node.setAttribute('data-value', [0] + test[0][1]);
  node.setAttribute('data-factor', [0] + test[0][2]);

  const values = await getJson('/data/values.json');
  for (let i = 0; i < values.length; i++) {
    const button = $(`<button id="${values[i][1]}" class="btn btn-light btn-lg" onclick="moveToTop(event)">`).text(values[i][0]);
    $('#valuebuttons').append(button);
  }

  let button = document.getElementsByClassName('button');
  let counter = 1;

  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', function(e) {
      console.log('we got the value ', e.target.dataset.value);
      console.log('the counter is ', counter);

      if (counter === 5) {
        console.log('reached the end!');
        document.getElementById('form').style = 'display:none;';
        document.getElementById('start').style = 'display:none';
        document.getElementById('title').innerHTML = 'Your most prominent personality trait is ';
        document.getElementById('title2').innerHTML = 'Jobs matching your personality';

        let highest = getValue(ocean);
        console.log('the value of highest ', highest);
        document.getElementById('pscore').innerHTML = scores[1];
        document.getElementById('pheader').innerHTML = oceanHeader[1];
        document.getElementById('pimage').src = oceanImages[1];

        $('#personality').fadeIn(2000, function() {});
        return;
      }

      let node = document.getElementById('question');

      console.log('the data value is ', test[counter][0]);
      console.log('the data value is ', test[counter][1]);
      console.log('the individual data values are ', test[counter][2]);

      $('#question')
        .hide()
        .html(test[counter * 4][0])
        .fadeIn('slow');

      node.setAttribute('data-value', [i] + test[counter][1]);

      for (i = 0; i < ocean.length; i++) {
        ocean[i][0] += test[counter][2][i] * e.target.dataset.value;
      }

      console.log('ocean is ', ocean);

      counter++;
    });
  }

  let start = document.getElementById('start');
  start.addEventListener('click', function(e) {
    $('#form').fadeIn('slow');
    start.style.display = 'none';
  });


  function getValue(array) {
    let x = [0, 0];
    for (let i = 0; i < array.length; i++) {
      if (array[i] > x[0]) {
        x = [array[i], i];
      }
    }
    return x;
  }

  // Animation complete
  $('#findjobs').click(function() {
    $('#annonsid').fadeIn(1000, function() {
      $('html, body').animate({scrollTop: $('#annonsid').offset().top}, 2000);
    });
  });

  function moveToTop(event) {
    console.log('we are moving this item to the top', event.target);
    const button = $(event.target);

    $('#ranking').append(button);

    if (document.getElementById('ranking').children.length === 11) {
      document.getElementById('ranking').style = 'display:none;';
      document.getElementById('valuebuttons').style = 'display:none';
      document.getElementById('valueh1').style = 'display:none';
      $('#valueresponse').fadeIn(2000, function() {
        document.getElementById('valueresponse').scrollIntoView();
      });
    }
  }
};

main();
