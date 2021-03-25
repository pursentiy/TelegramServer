const whitelist = ['::ffff:91.188.184.205', 'http://127.0.1.1:5500/gosuslugi.html'];

module.exports = {
  CheckIfIpAllowed(requestIp) {
    let isDomainAllowed = whitelist.indexOf(requestIp) !== -1;

    if (isDomainAllowed) {
      return true;
    }
    return false;
  }
};