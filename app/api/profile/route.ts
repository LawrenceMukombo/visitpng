import {getVisitPngUser} from "../../auth";
import {getAccountAudit,getOrCreateAccount,updateAccount} from "../../../db/accounts";
export async function GET(){const identity=await getVisitPngUser();if(!identity)return Response.json({error:"Please sign in"},{status:401});try{return Response.json({profile:await getOrCreateAccount(identity),audit:await getAccountAudit(identity)})}catch(error){console.error("profile_get_error",error);return Response.json({error:"Profile not available right now"},{status:503})}}
export async function PATCH(request:Request){const identity=await getVisitPngUser();if(!identity)return Response.json({error:"Please sign in"},{status:401});try{const body=await request.json() as Record<string,unknown>;const clean=(key:string,max:number)=>typeof body[key]==="string"?(body[key] as string).trim().slice(0,max):"";const preferredLanguage=clean("preferredLanguage",40)||"English";const profile=await updateAccount(identity,{preferredName:clean("preferredName",80),mobile:clean("mobile",30),country:clean("country",80)||"Papua New Guinea",preferredLanguage});return Response.json({profile})}catch(error){console.error("profile_patch_error",error);return Response.json({error:"Profile update failed"},{status:400})}}



