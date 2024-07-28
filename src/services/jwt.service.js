const jwt = require('jsonwebtoken');

const encrypt = ({ userId, organizationMemberId = '', employeeInfo = '', expires }) => {
  console.log({ userId, organizationMemberId, employeeInfo });
  const token = jwt.sign({ userId, organizationMemberId, employeeInfo }, process.env.JWT_SECRET, {
    expiresIn: expires || '90d',
  });

  return token;
};

const decrypt = ({ token }) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded;
};

const encryptEmailToken = ({ email, userId, expire = '24h' }) => {
  const token = jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: expire,
  });
  return token;
};
module.exports = {
  encrypt,
  decrypt,
  encryptEmailToken,
};
