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
  const admin=await requireAdministrator(identity);
  await ensureCatalogue();
  const listings=await env.DB.prepare(`SELECT l.id,l.slug,l.name,l.summary,l.image_url AS imageUrl,l.photo_credit AS photoCredit,l.deep_link_url AS deepLinkUrl,l.tag,l.base_price AS basePrice,l.member_price AS memberPrice,l.publication_status AS publicationStatus,l.verification_status AS verificationStatus,l.last_reviewed_at AS lastReviewedAt,d.id AS destinationId,d.name AS destination,d.district AS district,pv.id AS provinceId,pv.name AS province,c.id AS categoryId,c.name AS category,p.id AS providerId,p.trading_name AS provider,p.source_url AS providerSourceUrl FROM listings l JOIN destinations d ON d.id=l.destination_id JOIN provinces pv ON pv.id=d.province_id JOIN categories c ON c.id=l.category_id JOIN providers p ON p.id=l.provider_id ORDER BY l.name`).all();
  const destinations=await env.DB.prepare(`SELECT d.id,d.province_id AS provinceId,d.district,d.slug,d.name,d.summary,d.latitude,d.longitude,d.cover_image_url AS coverImageUrl,d.source_url AS sourceUrl,pv.name AS provinceName,pv.code AS provinceCode,pv.region AS provinceRegion FROM destinations d JOIN provinces pv ON pv.id=d.province_id ORDER BY pv.name,d.name`).all();
  const provinces=await env.DB.prepare("SELECT id,code,name,region FROM provinces ORDER BY region,name").all();
  const categories=await env.DB.prepare("SELECT id,name,display_order AS displayOrder FROM categories WHERE is_active=1 ORDER BY display_order").all();
  const providers=await env.DB.prepare("SELECT id,trading_name AS name,source_url AS sourceUrl,license_number AS licenseNumber FROM providers ORDER BY trading_name").all();
  const activity=await env.DB.prepare("SELECT actor_email AS actorEmail,action,entity_type AS entityType,entity_id AS entityId,details,created_at AS createdAt FROM audit_logs WHERE entity_type IN ('listing','destination','province','category','provider') ORDER BY created_at DESC LIMIT 50").all();
  return{admin,listings:listings.results,destinations:destinations.results,provinces:provinces.results,categories:categories.results,providers:providers.results,activity:activity.results};
}

const text=(value:unknown,max:number)=>String(value||"").trim().slice(0,max);

export async function saveAdminListing(identity:VisitPngUser,input:Record<string,unknown>){
  const admin=await requireAdministrator(identity);
  await ensureCatalogue();
  const id=Number(input.id||0),now=new Date().toISOString();
  const values={
    name:text(input.name,120),
    summary:text(input.summary,1000),
    imageUrl:text(input.imageUrl,1000),
    photoCredit:text(input.photoCredit,200)||null,
    deepLinkUrl:text(input.deepLinkUrl,1000)||null,
    tag:text(input.tag,80),
    slug:text(input.slug,120).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),
    basePrice:Math.max(0,Number(input.basePrice)||0),
    memberPrice:input.memberPrice===""||input.memberPrice==null?null:Math.max(0,Number(input.memberPrice)||0),
    destinationId:Number(input.destinationId),
    categoryId:Number(input.categoryId),
    providerId:Number(input.providerId),
    publicationStatus:["draft","published","hidden"].includes(String(input.publicationStatus))?String(input.publicationStatus):"draft"
  };
  if(!values.name||!values.summary||!values.slug||!values.destinationId||!values.categoryId||!values.providerId)throw new Error("Complete all required fields");
  if(id){
    await env.DB.prepare(`UPDATE listings SET name=?,summary=?,image_url=?,photo_credit=?,deep_link_url=?,tag=?,slug=?,base_price=?,member_price=?,destination_id=?,category_id=?,provider_id=?,publication_status=?,verification_status='administrator_reviewed',last_reviewed_at=? WHERE id=?`).bind(values.name,values.summary,values.imageUrl,values.photoCredit,values.deepLinkUrl,values.tag,values.slug,values.basePrice,values.memberPrice,values.destinationId,values.categoryId,values.providerId,values.publicationStatus,now,id).run();
  } else {
    await env.DB.prepare(`INSERT INTO listings (provider_id,destination_id,category_id,slug,name,summary,image_url,photo_credit,deep_link_url,tag,base_price,member_price,publication_status,verification_status,is_test_data,last_reviewed_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'administrator_reviewed',0,?)`).bind(values.providerId,values.destinationId,values.categoryId,values.slug,values.name,values.summary,values.imageUrl,values.photoCredit,values.deepLinkUrl,values.tag,values.basePrice,values.memberPrice,values.publicationStatus,now).run();
  }
  const saved=await env.DB.prepare("SELECT id FROM listings WHERE slug=?").bind(values.slug).first<{id:number}>();
  await env.DB.prepare("INSERT INTO audit_logs (user_id,actor_email,action,entity_type,entity_id,details,created_at) VALUES (?,?,?,?,?,?,?)").bind(admin.id,identity.email,id?"listing_updated":"listing_created","listing",String(saved?.id||id),JSON.stringify({name:values.name,status:values.publicationStatus}),now).run();
  return getAdminCatalogue(identity);
}

export async function deleteAdminListing(identity:VisitPngUser,id:number){
  const admin=await requireAdministrator(identity);
  await ensureCatalogue();
  const existing=await env.DB.prepare("SELECT id,name,slug FROM listings WHERE id=?").bind(id).first<{id:number;name:string;slug:string}>();
  if(!existing)throw new Error("Place / listing not found");
  
  await env.DB.prepare("DELETE FROM listings WHERE id=?").bind(id).run();
  const now=new Date().toISOString();
  await env.DB.prepare("INSERT INTO audit_logs (user_id,actor_email,action,entity_type,entity_id,details,created_at) VALUES (?,?,?,?,?,?,?)").bind(admin.id,identity.email,"listing_deleted","listing",String(id),JSON.stringify({name:existing.name,slug:existing.slug}),now).run();
  return getAdminCatalogue(identity);
}

export async function saveAdminDestination(identity:VisitPngUser,input:Record<string,unknown>){
  const admin=await requireAdministrator(identity);
  await ensureCatalogue();
  const id=Number(input.id||0),now=new Date().toISOString();
  const name=text(input.name,120);
  const slug=text(input.slug||name,120).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const summary=text(input.summary,1000);
  const provinceId=Number(input.provinceId);
  const district=text(input.district,100)||null;
  const latitude=input.latitude===""||input.latitude==null?null:Number(input.latitude);
  const longitude=input.longitude===""||input.longitude==null?null:Number(input.longitude);
  const coverImageUrl=text(input.coverImageUrl,1000)||null;
  const sourceUrl=text(input.sourceUrl,1000)||null;

  if(!name||!slug||!summary||!provinceId)throw new Error("Location name, slug, province, and summary are required");

  if(id){
    await env.DB.prepare(`UPDATE destinations SET province_id=?,district=?,slug=?,name=?,summary=?,latitude=?,longitude=?,cover_image_url=?,source_url=? WHERE id=?`).bind(provinceId,district,slug,name,summary,latitude,longitude,coverImageUrl,sourceUrl,id).run();
  } else {
    await env.DB.prepare(`INSERT INTO destinations (province_id,district,slug,name,summary,latitude,longitude,cover_image_url,source_url,is_test_data) VALUES (?,?,?,?,?,?,?,?,?,0)`).bind(provinceId,district,slug,name,summary,latitude,longitude,coverImageUrl,sourceUrl).run();
  }
  const saved=await env.DB.prepare("SELECT id FROM destinations WHERE slug=?").bind(slug).first<{id:number}>();
  await env.DB.prepare("INSERT INTO audit_logs (user_id,actor_email,action,entity_type,entity_id,details,created_at) VALUES (?,?,?,?,?,?,?)").bind(admin.id,identity.email,id?"destination_updated":"destination_created","destination",String(saved?.id||id),JSON.stringify({name,district,provinceId}),now).run();
  return getAdminCatalogue(identity);
}

export async function deleteAdminDestination(identity:VisitPngUser,id:number){
  const admin=await requireAdministrator(identity);
  await ensureCatalogue();
  const existing=await env.DB.prepare("SELECT id,name,slug FROM destinations WHERE id=?").bind(id).first<{id:number;name:string;slug:string}>();
  if(!existing)throw new Error("Location / destination not found");

  const facilityCount=await env.DB.prepare("SELECT COUNT(*) AS total FROM listings WHERE destination_id=?").bind(id).first<{total:number}>();
  if(facilityCount && facilityCount.total > 0){
    throw new Error(`Cannot delete destination "${existing.name}" because ${facilityCount.total} place(s) are assigned to it. Reassign or delete those places first.`);
  }

  await env.DB.prepare("DELETE FROM destinations WHERE id=?").bind(id).run();
  const now=new Date().toISOString();
  await env.DB.prepare("INSERT INTO audit_logs (user_id,actor_email,action,entity_type,entity_id,details,created_at) VALUES (?,?,?,?,?,?,?)").bind(admin.id,identity.email,"destination_deleted","destination",String(id),JSON.stringify({name:existing.name,slug:existing.slug}),now).run();
  return getAdminCatalogue(identity);
}

export async function saveAdminProvince(identity:VisitPngUser,input:Record<string,unknown>){
  const admin=await requireAdministrator(identity);
  await ensureCatalogue();
  const id=Number(input.id||0),now=new Date().toISOString();
  const code=text(input.code,10).toUpperCase().replace(/[^A-Z0-9]/g,"");
  const name=text(input.name,100);
  const region=text(input.region,50);

  if(!code||!name||!region)throw new Error("Province code, name, and region are required");

  if(id){
    await env.DB.prepare(`UPDATE provinces SET code=?,name=?,region=? WHERE id=?`).bind(code,name,region,id).run();
  } else {
    await env.DB.prepare(`INSERT INTO provinces (code,name,region) VALUES (?,?,?)`).bind(code,name,region).run();
  }
  const saved=await env.DB.prepare("SELECT id FROM provinces WHERE code=?").bind(code).first<{id:number}>();
  await env.DB.prepare("INSERT INTO audit_logs (user_id,actor_email,action,entity_type,entity_id,details,created_at) VALUES (?,?,?,?,?,?,?)").bind(admin.id,identity.email,id?"province_updated":"province_created","province",String(saved?.id||id),JSON.stringify({code,name,region}),now).run();
  return getAdminCatalogue(identity);
}

export async function deleteAdminProvince(identity:VisitPngUser,id:number){
  const admin=await requireAdministrator(identity);
  await ensureCatalogue();
  const existing=await env.DB.prepare("SELECT id,code,name FROM provinces WHERE id=?").bind(id).first<{id:number;code:string;name:string}>();
  if(!existing)throw new Error("Province not found");

  const destCount=await env.DB.prepare("SELECT COUNT(*) AS total FROM destinations WHERE province_id=?").bind(id).first<{total:number}>();
  if(destCount && destCount.total > 0){
    throw new Error(`Cannot delete province "${existing.name}" because ${destCount.total} destination(s) are registered under it.`);
  }

  await env.DB.prepare("DELETE FROM provinces WHERE id=?").bind(id).run();
  const now=new Date().toISOString();
  await env.DB.prepare("INSERT INTO audit_logs (user_id,actor_email,action,entity_type,entity_id,details,created_at) VALUES (?,?,?,?,?,?,?)").bind(admin.id,identity.email,"province_deleted","province",String(id),JSON.stringify({code:existing.code,name:existing.name}),now).run();
  return getAdminCatalogue(identity);
}

export async function saveAdminCategory(identity:VisitPngUser,input:Record<string,unknown>){
  const admin=await requireAdministrator(identity);
  await ensureCatalogue();
  const id=Number(input.id||0),now=new Date().toISOString();
  const name=text(input.name,80);
  const slug=text(input.slug||name,80).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const displayOrder=Number(input.displayOrder)||10;

  if(!name||!slug)throw new Error("Category name is required");

  if(id){
    await env.DB.prepare("UPDATE categories SET name=?,slug=?,display_order=? WHERE id=?").bind(name,slug,displayOrder,id).run();
  } else {
    await env.DB.prepare("INSERT INTO categories (name,slug,display_order,is_active) VALUES (?,?,?,1)").bind(name,slug,displayOrder).run();
  }
  await env.DB.prepare("INSERT INTO audit_logs (user_id,actor_email,action,entity_type,entity_id,details,created_at) VALUES (?,?,?,?,?,?,?)").bind(admin.id,identity.email,id?"category_updated":"category_created","category",String(id||slug),JSON.stringify({name,slug}),now).run();
  return getAdminCatalogue(identity);
}

export async function saveAdminProvider(identity:VisitPngUser,input:Record<string,unknown>){
  const admin=await requireAdministrator(identity);
  await ensureCatalogue();
  const id=Number(input.id||0),now=new Date().toISOString();
  const name=text(input.name,120);
  const slug=text(input.slug||name,120).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const sourceUrl=text(input.sourceUrl,1000)||null;
  const licenseNumber=text(input.licenseNumber,80)||null;

  if(!name||!slug)throw new Error("Provider trading name is required");

  if(id){
    await env.DB.prepare("UPDATE providers SET trading_name=?,legal_name=?,slug=?,source_url=?,license_number=? WHERE id=?").bind(name,name,slug,sourceUrl,licenseNumber,id).run();
  } else {
    await env.DB.prepare("INSERT INTO providers (trading_name,legal_name,slug,source_url,license_number) VALUES (?,?,?,?,?)").bind(name,name,slug,sourceUrl,licenseNumber).run();
  }
  await env.DB.prepare("INSERT INTO audit_logs (user_id,actor_email,action,entity_type,entity_id,details,created_at) VALUES (?,?,?,?,?,?,?)").bind(admin.id,identity.email,id?"provider_updated":"provider_created","provider",String(id||slug),JSON.stringify({name,sourceUrl}),now).run();
  return getAdminCatalogue(identity);
}
