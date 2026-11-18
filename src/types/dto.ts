import type { createDealInput } from "../schemas/deal.schema.js";
import type { Deal, DealStage } from "./domain.js";
export type UpdateDealDto = Partial<createDealInput>
export type DealSummary = Pick<Deal, 'id' | 'title' | 'budget' | 'stage'>
export const stageLabels: Record<DealStage, string> = {
    "NEW": "Новый лид",
    "CONTACT": "Первичный контакт",
    "PROPOSAL": "Комерческое предложение",
    "NEGOTIATION": "Переговоры",
    "WON": "Сделка выйграна",
    "LOST": "Сделка проиграна"
}
export function getStageLabel(stage: DealStage):string{
    return stageLabels[stage]
}
export function toDealSummary(deal:Deal):DealSummary{
    return {
        id: deal.id,
        title: deal.title,
        budget: deal.budget,
        stage: deal.stage
    }
}