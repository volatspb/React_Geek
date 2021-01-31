const botAnswers = [
  'Вы очень настойчивы',
  'Кто Вы?',
  'Хватит!!!',
  'Нет!!!',
  'ля ля ля',
  'Я в нирване!!!',
  'Стоп!',
  'Нуууу нееет!',
  ];
  
  export default () => botAnswers[Math.floor(botAnswers.length * Math.random())];