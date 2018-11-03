const interestingThings = ['The Sun', 'The Moon', 'The Stars'];

const result = wowify(...interestingThings);

document.getElementById('result').innerHTML = result.join('<br/>');
