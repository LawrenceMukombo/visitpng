import {getVisitPngUser} from "../../../auth";
import {saveAdminDestination,saveAdminProvince} from "../../../../db/admin";

export const dynamic="force-dynamic";

function reply(error:unknown){
  if(error instanceof Error&&error.message==="ADMIN_REQUIRED")return Response.json({error:"Administrator access is required."},{status:403});
  return Response.json({error:error instanceof Error?error.message:"The information could not be saved."},{status:400});
}

export async function POST(request:Request){
  const identity=await getVisitPngUser();
  if(!identity)return Response.json({error:"Please sign in."},{status:401});
  try{
    const body=await request.json();
    const type=body.type||"destination";
    if(type==="province"){
      return Response.json(await saveAdminProvince(identity,body));
    } else {
      return Response.json(await saveAdminDestination(identity,body));
    }
  }catch(error){
    return reply(error);
  }
}

export async function PATCH(request:Request){
  return POST(request);
}
