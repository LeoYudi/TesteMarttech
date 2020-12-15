module.exports = {
  hasEmpty: (array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === undefined || array[i] === null)
        return true;
    }
    return false;
  },
}