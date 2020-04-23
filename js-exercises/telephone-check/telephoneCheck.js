function telephoneCheck(phoneNumber) {
  const phoneNumberRegex = /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/;
  return phoneNumberRegex.test(phoneNumber);
}

export { telephoneCheck };
