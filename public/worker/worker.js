// worker.js
self.onmessage = (event) => {
    const message = event.data;
    console.log('Received message:', message);
  
    // 模拟一些耗时的计算
    const result = doSomeHeavyCalculation(message);
  
    self.postMessage(result);
  };
  
  function doSomeHeavyCalculation(input) {
    let result = 0;
    for (let i = 0; i < input; i++) {
      result += i;
    }
    return result;
  }