
const names = ['Alice', 'Bob', 'Charlie', 'Dana', 'Elvis', 'Fran', 'George', 'Hope'];
const names2 = ['Isaac', 'Jane'];
const names3 = [...names, "Kyle", ...names2];

const firstTraditional = names[0];

const [firstDestructure = 'Steve', secondDestructure, ...more] = names || [];

multiGreet(...names);
multiGreet();

function multiGreet(...items: string[]) {
  items.forEach(item => {
    console.log(friend`Hello, ${item}.`);
  });
}

function friend(strings: string[], ...substitutions: string[]) {
  if (!substitutions[0]) {
    substitutions[0] = 'Friend';
  }
  return processTaggedTemplate(strings, substitutions);
}

let doLogging = true;

function log(strings: string[], ...substitutions: string[]) {
  if (doLogging) {
    substitutions.forEach(sub => {
        console.log(`Logging: ${sub}`);
    });
  }
  processTaggedTemplate(strings, substitutions);
}

function throwOnSteve(strings: string[], ...substitutions: string[]) {
  if (substitutions[0] === 'Steve') {
    throw new Error('Not that guy!!!');
  }
  processTaggedTemplate(strings, substitutions);
}


function processTaggedTemplate(strings: string[], substitutions: string[]) {
  const result = [];
  substitutions.forEach((sub, index) => {
      result.push(strings[index], sub);
  });
  result.push(strings[strings.length -1]);
  return result.join('');
}
