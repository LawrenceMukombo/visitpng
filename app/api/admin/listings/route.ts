import {getVisitPngUser} from "../../../auth";
import {getAdminCatalogue,saveAdminListing,deleteAdminListing} from "../../../../db/admin";

function reply(error:unknown){
  if(error instanceof Error&&error.message==="ADMIN_REQUIRED")return Response.json({error:"Administrator access is required."},{status:403});
  return Response.json({error:error instanceof Error?error.message:"The information could not be saved."},{status:400});
}

export async function GET(){
  const identity=await getVisitPngUser();
  if(!identity)return Response.json({error:"Please sign in."},{status:401});
  try{
    return Response.json(await getAdminCatalogue(identity));
  }catch(error){
    return reply(error);
  }
}

export async function POST(request:Request){
  const identity=await getVisitPngUser();
  if(!identity)return Response.json({error:"Please sign in."},{status:401});
  try{
    return Response.json(await saveAdminListing(identity,await request.json()));
  }catch(error){
    return reply(error);
  }
}

export async function PATCH(request:Request){
  return POST(request);
}

export async function DELETE(request:Request){
  const identity=await getVisitPngUser();
  if(!identity)return Response.json({error:"Please sign in."},{status:401});
  try{
    const body=await request.json();
    const id=Number(body.id);
    if(!id)return Response.json({error:"Listing ID is required."},{status:400});
    return Response.json(await deleteAdminListing(identity,id));
  }catch(error){
    return reply(error);
  }
}
