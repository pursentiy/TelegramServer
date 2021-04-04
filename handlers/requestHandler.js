const DomainsWhitelist = process.env.ALLOW_DOMAINS.split(",");
const BlocklistIp = process.env.BLOCK_LIST.split(",");

const CheckIfDomainAllowed = (requestDomain) => {
  let isDomainAllowed = DomainsWhitelist.indexOf(requestDomain) !== -1;

  if (isDomainAllowed) {
    return true;
  }
  return false;
};

const CheckIfIpBlocked = (requestIp) => {
  let isIpBLocked = BlocklistIp.indexOf(requestIp) === -1;

  if (isIpBLocked) {
    return true;
  }
  return false;
};

module.exports = { CheckIfDomainAllowed, CheckIfIpBlocked };