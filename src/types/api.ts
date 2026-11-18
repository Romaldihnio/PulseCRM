import { timestamp } from "drizzle-orm/gel-core";

export type apiResponse<TData> = apiSuccessResponse<TData> | apiErrorResponse
export interface apiErrorResponse{
    data: null;
    error: string;
    meta: apiResponseMeta
}
export interface apiSuccessResponse<TData>{
    data: TData;
    error: null;
    meta: apiResponseMeta
}
export interface paginatedList<TItem> {
  item: TItem[];
  total: number;
  page: number;
  limit: number;
}
export interface apiResponseMeta{
  timeStamp: string
}
export function wrapSuccessResponse<T>(data: T):apiSuccessResponse<T>{
    return{
        data,
        error:null,
        meta: {timeStamp: new Date().toISOString()}
    }
}
export interface HasId{
    id: string
}
export function findById<T extends HasId>(items: T[], targetId: string): T | undefined{
    return items.find((item) => item.id === targetId)
}
export interface FieldIssue{
    field: string,
    message: string
}
export type appErrorCode = "Validation error" | "Not found" | "Conflict" | "Internal error"
export function wrapErrorResponse(message:string, options:{code?:appErrorCode; issues?: FieldIssue[]} = {}):apiErrorResponse
{
   return {
    data:null,
    error:message,
    meta:{
        timeStamp: new Date().toISOString(),
        ...(options.code ? {code:options.code} : {}),
        ...(options.issues && options.issues.length > 0 ? {issues: options.issues}:{})
   }
}
}