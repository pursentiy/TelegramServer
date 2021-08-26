const DomainsWhitelist = process.env.ALLOW_DOMAINS.split(",");
const BlockListIp = process.env.BLOCK_LIST.split(",");

const CheckIfDomainAllowed = (requestDomain) => {
  return DomainsWhitelist.indexOf(requestDomain) !== -1;
};

const CheckIfIpBlocked = (requestIp) => {
  return BlockListIp.indexOf(requestIp) === -1;
};

module.exports = { CheckIfDomainAllowed, CheckIfIpBlocked };