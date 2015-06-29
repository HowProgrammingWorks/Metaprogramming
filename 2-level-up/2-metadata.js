var test = {
  counters: { success:0, error:0, wrong:0 },
  tasks: [
    { interval:'5s', get:'http://127.0.0.1/api/method1.json', expect:'OK', save:'file1.json' },
    { interval:'8s', get:'http://127.0.0.1/api/method2.json', put:'http://127.0.0.1/api/method4.json', save:'file2.json' },
    { interval:'7s', get:'http://127.0.0.1/api/method3.json', expect:'Done', post:'http://127.0.0.1/api/method5.json' },
    { interval:'4s', load:'file1.json', expect:'OK', put:'http://127.0.0.1/api/method6.json' },
    { interval:'9s', load:'file2.json', post:'http://127.0.0.1/api/method7.json', save:'file1.json' },
    { interval:'3s', load:'file1.json', save:'file3.json' },
  ],
  error: function(err, request) {
    console.log('Error');
  },
  success: function(err, request) {
    test.counters.success++;
  }
};
