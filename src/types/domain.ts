export type DealStage = "NEW" | "CONTACT" | "PROPOSAL"| "NEGOTIATION" | "WON" | "LOST";
export type UserRole = "admin" | "manager";
export type ClientStatus = "lead" | "active" | "lost"
export interface BaseEntity {
  id: string;
  createdAt: Date;
}
export interface User extends BaseEntity{
    email: string,
    passwordHash: string,
    role: UserRole,
    firstName: string,
    lastName: string 
}
export interface Client extends BaseEntity {
  name: string;
  company: string;
  email: string;
  phone: string,
  status: ClientStatus;
  managerId: string
}
export interface Deal extends BaseEntity{
    title: string;
    budget: number;
    stage: DealStage;
    clientId: string;
    managerId: string,
    closedAt: Date | null
};
export function updateDealStage(deal: Deal, stage: DealStage):Deal{
    return{...deal, stage}
}