import * as Constants from './../constants/constants.js';

export async function getCurrentUser(req, res) {
    try {
        res.json({
            message: 'Authorized token', 
            user: req.user
        });
    } catch (error) {
      res.status(500).json({
          error: error.message,
          status: Constants.STATUS.FAILED
      });
    }
  }