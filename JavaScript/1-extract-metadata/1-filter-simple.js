'use strict';

// Dataset

const names = [
  'Marcus Aurelius Antoninus Augustus',
  'Darth Vader',
  'Victor Michailovich Glushkov',
  'Gottfried Wilhelm von Leibniz',
  'Mao Zedong',
  'Vladimir Sergeevich Soloviov',
  'Ibn Arabi',
  'Lev Nikolayevich Tolstoy',
  'Muammar Muhammad Abu Minyar al-Gaddafi',
  'Rene Descartes',
  'Fyodor Mikhailovich Dostoyevsky',
  'Benedito de Espinosa',
];

// Filter mixed with conditions

const filter = names => {
  const result = [];
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    if (
      name.length >= 10 && name.length <= 200 &&
      name.indexOf('Mich') > -1 &&
      name.indexOf('V') === 0 &&
      name.slice(-2) === 'ov' &&
      !(
        name.length >= 50 && name.length <= 65 &&
        name.indexOf('Abu') > -1 &&
        name.indexOf('Lev') === 0 &&
        name.slice(-3) === 'iov'
      )
    ) result.push(name);
  }
  return result;
};

// Usage

const result = filter(names);
console.dir({ names });
console.dir({ result });
