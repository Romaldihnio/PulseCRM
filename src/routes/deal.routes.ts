import { Router } from "express";
import { createDeal } from "../controllers/deal.controller.js";

export const dealRoutes = Router()
dealRoutes.post('/', createDeal)