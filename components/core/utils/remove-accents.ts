/**
 * Remove all accents, and return the new string without the accents
 *
 * @param {string} str String
 * @returns {string}
 */
function removeAccents(str: string): string {
  if ('function' === typeof str.normalize) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  } else {
    const accents = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    const accentsOut = 'AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
    const value = str.split('');
    value.forEach((letter, index) => {
      const i: number = accents.indexOf(letter);
      if (i !== -1) {
        value[index] = accentsOut[i];
      }
    });
    return value.join('');
  }
}

export {
  removeAccents,
};
