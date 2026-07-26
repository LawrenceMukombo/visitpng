import {getCatalogue} from "../../../db/catalogue";
export async function GET(request:Request){try{const url=new URL(request.url);const data=await getCatalogue(url.searchParams.get("q")??"",url.searchParams.get("category")??"all");return Response.json(data,{headers:{"Cache-Control":"public, max-age=60"}})}catch(error){console.error("catalogue_error",error);return Response.json({error:"Catalogue data is not available right now."},{status:503})}}



