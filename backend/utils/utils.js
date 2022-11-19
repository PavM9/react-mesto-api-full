function validateUrl(url) {
  const regex = /https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+(?:\.[a-zA-Z0-9-]+)$/i;
  if (regex.test(url)) {
    return url;
  }
  throw new Error('Введен некорректный url');
}

module.exports = { validateUrl };
