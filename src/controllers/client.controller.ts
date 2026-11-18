import type { Request, Response } from "express";
import type { Client } from "../types/domain.js";
import { randomUUID } from "node:crypto";
import { wrapSuccessResponse } from "../types/api.js";
import type { createClientInput } from "../schemas/client.schema.js";

export function createClient(req: Request, res: Response){
    const dto = req.body as createClientInput
    const client:Client = {
        id: randomUUID(),
        ...dto,
        createdAt: new Date()
    }
    res.status(201).json(wrapSuccessResponse(client))
}