import * as AuthService from "../services/auth.service.js";
import { STATUS } from './../constants/constants.js';

export async function apiLogin(req, res) {
  try {
    const { email, password } = req.body;
    const authenticated = await AuthService.login(email, password);
    if (authenticated) {
      req.session.authenticated = true;
      res.json({
        message: "User was successfully authenticated.",
        status: STATUS.SUCCESS
      });
    } else {
      res.status(400).json({
        error: "Invalid Username or Password.",
        status: STATUS.FAILED
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAILED
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if(email && password ){
      const authenticated = await AuthService.login(email, password);
      if (authenticated) {
        req.session.authenticated = true;
        req.session.userEmail = email;
        res.redirect("products");
      } else {
        res.render("login", { error: "Invalid Username or Password." });
      }
    } else res.render("login");
  } catch (error) {
    res.render("login", { error: error.message });
  }
}

export async function apiLogout(req, res) {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.status(400).json({
          error: error.message,
          status: STATUS.FAILED
        });
      } else {
        res.json({
          message: "User was successfully logged out.",
          status: STATUS.SUCCESS
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAILED
    });
  }
}

export async function logout(req, res) {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.render("login", { error: error.message });
      } else res.render("login", { success: "You successfully logged out." });
    });
  } catch (error) {
    res.render("login", { error: error.message });
  }
}