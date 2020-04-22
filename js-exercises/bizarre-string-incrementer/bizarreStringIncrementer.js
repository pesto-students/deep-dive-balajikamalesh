// Start your implementation here
function bizarreStringIncrementer(bizarreString) {
    let lastNumberPattern = /(\d*$)/; //match last whole number
    return bizarreString.replace(lastNumberPattern, (match) => {
        const length = match.length;
        let incrementedValue = Number(match) + 1;
        return incrementedValue.toString().padStart(length, "0");
    }) 
}

export {
  bizarreStringIncrementer,
}