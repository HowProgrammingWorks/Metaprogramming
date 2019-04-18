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

// Metadata

const conditions = {
  length: [10, 200],
  contains: 'Mich',
  starts: 'V',
  ends: 'ov',
  not: {
    length: [50, 65],
    contains: 'Abu',
    starts: 'Lev',
    ends: 'iov'
  }
};

// Metaprogramming

const filter = (names, conditions) => {
  const operations = {};
  const check = (s, conditions) => {
    let valid = true;
    for (const key in conditions) {
      valid = valid && operations[key](s, conditions[key]);
    }
    return valid;
  };
  Object.assign(operations, {
    length: (s, v) => s.length >= v[0] && s.length <= v[1],
    contains: (s, v) => s.includes(v),
    starts: (s, v) => s.startsWith(v),
    ends: (s, v) => s.endsWith(v),
    not: (s, v) => !check(s, v),
  });
  return names.filter(s => check(s, conditions));
};

// Usage

const result = filter(names, conditions);
console.dir({ names });
console.dir({ result });
