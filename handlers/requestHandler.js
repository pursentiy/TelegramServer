const domainsWhitelist = ['::ffff:91.188.184.205', 'http://xn--80abcmf3a5bhl.xn--80adxhks', 'http://xn----7sbabecvamq0bub2bdth3a8t.xn--p1ai', 'http://xn--80akefa4brg6c3b.xn--p1ai', 'http://127.0.0.1:5500'];
const blocklistIp = [''];

var CheckIfDomainAllowed = (requestDomain) => {
  let isDomainAllowed = domainsWhitelist.indexOf(requestDomain) !== -1;

  if (isDomainAllowed) {
    return true;
  }
  return false;
};

var CheckIfIpBlocked = (requestIp) => {
  let isIpBLocked = blocklistIp.indexOf(requestIp) === -1;

  if (isIpBLocked) {
    return true;
  }
  return false;
};

module.exports = {CheckIfDomainAllowed, CheckIfIpBlocked};