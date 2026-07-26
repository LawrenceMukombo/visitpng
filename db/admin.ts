import type {VisitPngUser} from "../app/auth";
import {env} from "./runtime";
import {ensureCatalogue} from "./catalogue";
import {ensureAccounts,getOrCreateAccount} from "./accounts";

export async function requireAdministrator(identity:VisitPngUser){
  await ensureAccounts();
  const account=await getOrCreateAccount(identity);
  const allowed=(process.env.ADMIN_EMAIL||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean);
  if(allowed.includes(identity.email.toLowerCase())&&account.role!=="administrator"){
    await env.DB.prepare("UPDATE users SET role='administrator',updated_at=? WHERE id=?").bind(new Date().toISOString(),account.id).run();
    account.role="administrator";
  }
  if(account.role!=="administrator"||account.status!=="active")throw new Error("ADMIN_REQUIRED");
  return account;
}

export async function getAdminCatalogue(identity:VisitPngUser){
  const admin=await requireAdministrator(identity);await ensureCatalogue();
  const listings=await env.DB.prepare(`SELECT l.id,l.slug,l.name,l.summary,l.image_url AS imageUrl,l.tag,l.base_price AS basePrice,l.member_price AS memberPrice,l.publication_status AS publicationStatus,l.verification_status AS verificationStatus,l.last_reviewed_at AS lastReviewedAt,d.id AS destinationId,d.name AS destination,c.id AS categoryId,c.name AS category,p.id AS providerId,p.trading_name AS provider FROM listings l JOIN destinations d ON d.id=l.destination_id JOIN categories c ON c.id=l.category_id JOIN providers p ON p.id=l.provider_id ORDER BY l.name`).all();
  const destinations=await env.DB.prepare("SELECT id,name FROM destinations ORDER BY name").all();
  const categories=await env.DB.prepare("SELECT id,name FROM categories WHERE is_active=1 ORDER BY display_order").all();
  const providers=await env.DB.prepare("SELECT id,trading_name AS name FROM providers ORDER BY trading_name").all();
  const activity=await env.DB.prepare("SELECT actor_email AS actorEmail,action,entity_id AS entityId,created_at AS createdAt FROM audit_logs WHERE entity_type='listing' ORDER BY created_at DESC LIMIT 20").all();
  return{admin,listings:listings.results,destinations:destinations.results,categories:categories.results,providers:providers.results,activity:activity.results};
}

const text=(value:unknown,max:number)=>String(value||"").trim().slice(0,max);
export async function saveAdminListing(identity:VisitPngUser,input:Record<string,unknown>){
  const admin=await requireAdministrator(identity);await ensureCatalogue();
  const id=Number(input.id||0),now=new Date().toISOString();
  const values={name:text(input.name,120),summary:text(input.summary,1000),imageUrl:text(input.imageUrl,1000),tag:text(input.tag,80),slug:text(input.slug,120).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),basePrice:Math.max(0,Number(input.basePrice)||0),memberPrice:input.memberPrice===""||input.memberPrice==null?null:Math.max(0,Number(input.memberPrice)||0),destinationId:Number(input.destinationId),categoryId:Number(input.categoryId),providerId:Number(input.providerId),publicationStatus:["draft","published","hidden"].includes(String(input.publicationStatus))?String(input.publicationStatus):"draft"};
  if(!values.name||!values.summary||!values.slug||!values.destinationId||!values.categoryId||!values.providerId)throw new Error("Complete all required fields");
  if(id){await env.DB.prepare(`UPDATE listings SET name=?,summary=?,image_url=?,tag=?,slug=?,base_price=?,member_price=?,destination_id=?,category_id=?,provider_id=?,publication_status=?,verification_status='administrator_reviewed',last_reviewed_at=? WHERE id=?`).bind(values.name,values.summary,values.imageUrl,values.tag,values.slug,values.basePrice,values.memberPrice,values.destinationId,values.categoryId,values.providerId,values.publicationStatus,now,id).run();}
  else{await env.DB.prepare(`INSERT INTO listings (provider_id,destination_id,category_id,slug,name,summary,image_url,tag,base_price,member_price,publication_status,verification_status,is_test_data,last_reviewed_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,'administrator_reviewed',0,?)`).bind(values.providerId,values.destinationId,values.categoryId,values.slug,values.name,values.summary,values.imageUrl,values.tag,values.basePrice,values.memberPrice,values.publicationStatus,now).run();}
  const saved=await env.DB.prepare("SELECT id FROM listings WHERE slug=?").bind(values.slug).first<{id:number}>();
  await env.DB.prepare("INSERT INTO audit_logs (user_id,actor_email,action,entity_type,entity_id,details,created_at) VALUES (?,?,?,?,?,?,?)").bind(admin.id,identity.email,id?"listing_updated":"listing_created","listing",String(saved?.id||id),JSON.stringify({name:values.name,status:values.publicationStatus}),now).run();
  return getAdminCatalogue(identity);
}
