import { VALID_TOKEN, STATUS } from './../constants/constants.js';

export async function getCurrentUser(req, res) {
    try {
        res.json({
            message: VALID_TOKEN, 
            user: req.user
        });
    } catch (error) {
      res.status(500).json({
          error: error.message,
          status: STATUS.FAILED
      });
    }
  }