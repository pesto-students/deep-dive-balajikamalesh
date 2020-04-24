function updateInventory(currentInventory, newInventory) {
  let updatedInventory = {};
  let alphabetSort = (array1, array2) => array1[1].charCodeAt(0) - array2[1].charCodeAt(0);

  currentInventory.forEach((element) => {
    updatedInventory[element[1]] = element[0];
  })

  newInventory.forEach((element) => {
    if(updatedInventory[element[1]])
       updatedInventory[element[1]] += element[0];
     else
       updatedInventory[element[1]] = element[0];
  }) 

  let updatedInvArray = Object.keys(updatedInventory).map((key) => Array.from([updatedInventory[key],key]));

  let sortedUpdatedInvArray =  updatedInvArray.sort(alphabetSort);

  return sortedUpdatedInvArray;
}

export {
  updateInventory,
};
