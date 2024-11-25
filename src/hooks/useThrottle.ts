function useThrottle(func: any, delay: number = 3000) {
  let invokedTime: number;
  let timer: number;
  return function (...args: any) {
    if (!invokedTime) {
      func(...args);
      invokedTime = Date.now();
    } else {
      //
      clearTimeout(timer);
      timer = setTimeout(() => {
        // delay시간보다 function 처음 호출한시간이 지났으면은 다시 function을 호출한다
        if (Date.now() - invokedTime >= delay) {
          func(...args);
          invokedTime = Date.now();
        }
      }, delay);
    }
  };
}

export default useThrottle;
