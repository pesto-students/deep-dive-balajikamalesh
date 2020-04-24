const sequentialPromise = promises => {
    let promise = promises[0]();
    for (let i = 1; i < promises.length; i++)
        promise = promise.then(promises[i]);
  
    return new Promise((resolve) => resolve(promise));
  };
  
  export { sequentialPromise };
  