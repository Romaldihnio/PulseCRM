import type { Request, Response } from "express";
import type{ DealSummary } from "../types/dto.js";
import { getStageLabel, toDealSummary} from "../types/dto.js";
import type { Deal } from "../types/domain.js";
import { randomUUID } from "node:crypto";
import { wrapSuccessResponse } from "../types/api.js";
import type { createDealInput } from "../schemas/deal.schema.js";

export function createDeal(req: Request, res: Response){
    const dto = req.body as createDealInput
    const deal:Deal = {
        id: randomUUID(),
        ...dto,
        createdAt: new Date(),
        closedAt: null
    }
    const summary: DealSummary = toDealSummary(deal)
    console.log(`[deals] Сделка создана "${summary.title}" - этап "${getStageLabel(summary.stage)}"`)
    res.status(201).json(wrapSuccessResponse(deal))
}