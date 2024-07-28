const { decrypt } = require('../services/jwt.service');
const { getUserById } = require('../services/user.service');
const ApiError = require('../utils/ApiError');

const auth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    console.log('req.headers.authorization', req.headers.authorization);
    if (!token) {
      return next(new ApiError('You are not logged in! Please log in to get access.', 401));
    }
    // console.log(token, process.env.JWT_SECRET)

    const decoded = decrypt({ token });

    // return organizationMemberTable and userProfile Table
    // let org;
    let currentUser;
    if (decoded.sub) {
      // currentUser = await UserProfile.findById(decoded.userId);
      currentUser = await getUserById(decoded.sub);
    }
    console.log({ token, decoded });
    if (!currentUser) {
      return next(new ApiError('The user belonging to this token no longer exist.', 401));
      // return next(throw  Error('The user belonging to this token no longer exist.', 401));
    }

    // 4) Check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //     return next(
    //         new AppError(
    //             'User recently changed password! Please log in again.',
    //             401
    //         )
    //     )
    // }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = { ...currentUser._doc };

    next();
  } catch (error) {
    console.log(error);
    return next(new ApiError(`${error}`, 400));
  }
};

module.exports = auth;
