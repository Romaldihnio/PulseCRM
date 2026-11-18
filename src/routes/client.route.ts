import { Router } from "express";
import { createClient } from "../controllers/client.controller.js";

export const clientRoutes = Router()
clientRoutes.post('/', createClient)