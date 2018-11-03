namespace HowUnicodeAndForOfWork {

const names = ['Alice', 'Bob', 'Charlie', 'Dana', 'Elvis', 'Fran', 'George', 'Hope'];

names.forEach(item => {
    console.log(item);
});

for (let item in names) {
  console.log(names[item]);
}

for (let item of names) {
  console.log(item);
}

const instrument = "🎸";

for (var i = 0; i < instrument.length; i+=1) {
  console.log(instrument[i]);
}

for (let item of instrument) {
  console.log(item);
}


}
