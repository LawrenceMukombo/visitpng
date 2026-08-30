import fs from 'node:fs/promises';
import path from 'node:path';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const ROOT = 'C:/visitzambia';
const OUT = path.join(ROOT, 'ZamRoam_App_Overview.pptx');
const BUILD = path.join(ROOT, '.codex-ppt-build');
const C = { ink:'#232231', teal:'#1B6960', teal2:'#418F8A', orange:'#E77522', gold:'#EFB00D', ivory:'#FAF7F2', white:'#FFFFFF', gray:'#85848A', pale:'#EDEDED', mint:'#A2CECA' };

async function bytes(rel){ const b=await fs.readFile(path.join(ROOT,rel)); return b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength); }
function rect(slide, name, x,y,w,h, fill, line='none') { return slide.shapes.add({geometry:'rect',name,position:{left:x,top:y,width:w,height:h},fill,line:{style:'solid',fill:line,width:line==='none'?0:1}}); }
function txt(slide,name,text,x,y,w,h,size=24,color=C.ink,bold=false,align='left'){
  const s=slide.shapes.add({geometry:'textbox',name,position:{left:x,top:y,width:w,height:h},fill:'none',line:{style:'solid',fill:'none',width:0}});
  s.text=text; s.text.style={fontSize:size,color,bold,alignment:align,typeface:'Arial'}; return s;
}
function footer(slide,n){ txt(slide,`footer-${n}`,String(n).padStart(2,'0'),1190,670,45,20,14,C.gray,true,'right'); }
function title(slide,text,n,eyebrow='ZAMROAM PLATFORM'){ txt(slide,`eyebrow-${n}`,eyebrow,42,34,430,24,15,C.teal,true); txt(slide,`title-${n}`,text,42,68,1196,82,46,C.ink,true); footer(slide,n); }
async function img(slide,rel,alt,pos,fit='cover',crop){ return slide.images.add({blob:await bytes(rel),contentType:rel.endsWith('.png')?'image/png':'image/jpeg',alt,fit,position:pos,...(crop?{crop}:{} )}); }
function note(slide,lines){ slide.speakerNotes.textFrame.setText([...lines,'[Sources]','Local application source and repository assets: C:/visitzambia']); }
function bodyBlock(slide,x,y,w,heading,body,accent=C.teal){ rect(slide,`accent-${heading}`,x,y,8,150,accent); txt(slide,`h-${heading}`,heading,x+24,y,w-24,38,27,C.ink,true); txt(slide,`b-${heading}`,body,x+24,y+50,w-24,100,21,C.gray,false); }

const deck=Presentation.create({slideSize:{width:1280,height:720}});

// 1 — cover image field (Codex Grid slide 08 silhouette)
{
 const s=deck.slides.add(); s.background.fill=C.ivory;
 txt(s,'cover-kicker','ZAMBIA TOURISM, CONNECTED',42,42,570,26,16,C.teal,true);
 txt(s,'cover-title','ZamRoam',42,125,560,90,70,C.ink,true);
 txt(s,'cover-subtitle','Discover Zambia.\nPlan with confidence.\nExperience more.',42,238,545,190,38,C.teal,true);
 txt(s,'cover-body','A single digital platform for visitors, tourism businesses, communities and destination stakeholders.',42,478,550,105,23,C.gray,false);
 await img(s,'public/branding/zamroam_hero_banner.jpg','ZamRoam Zambia tourism brand banner',{left:658,top:42,width:580,height:588},'cover',{left:0,top:0,right:0.46,bottom:0.28});
 footer(s,1); note(s,['Open with the platform promise: one place to discover, prepare, book and participate in Zambia tourism.']);
}

// 2 — ecosystem overview
{
 const s=deck.slides.add(); s.background.fill=C.white; title(s,'One app supports the whole tourism journey',2);
 txt(s,'s2-intro','ZamRoam connects inspiration, practical travel support and trusted participation in one responsive experience.',42,158,1196,52,23,C.gray,false);
 const items=[
  ['Explore','Places, stays, experiences, categories and destination search','ZamRoam_Icons_Pack/33_travel_guide.png'],
  ['Prepare','Maps, safety guidance, local phrases, permits and offline trails','ZamRoam_Icons_Pack/01_passport.png'],
  ['Plan & transact','Saved lists, collaborative trips, bookings, reviews and member benefits','ZamRoam_Icons_Pack/03_boarding_pass.png'],
  ['Operate','Provider registration, vetting, redemptions, content management and audit trails','ZamRoam_Icons_Pack/07_credit_card.png']
 ];
 for(let i=0;i<4;i++){ const x=42+(i%2)*612, y=245+Math.floor(i/2)*185; rect(s,`s2-panel-${i}`,x,y,574,155,i===0?C.ivory:C.pale); await img(s,items[i][2],items[i][0],{left:x+22,top:y+33,width:86,height:86},'contain'); txt(s,`s2-h-${i}`,items[i][0],x+132,y+28,410,34,27,C.ink,true); txt(s,`s2-b-${i}`,items[i][1],x+132,y+72,410,66,20,C.gray,false); }
 note(s,['The product is intentionally multi-sided: it serves travellers while giving tourism operators and administrators the tools to keep the ecosystem useful and trusted.']);
}

// 3 — discovery
{
 const s=deck.slides.add(); s.background.fill=C.ivory; title(s,'Discovery starts with Zambia',3,'VISITOR EXPERIENCE');
 await img(s,'public/branding/zamroam_hero_banner.jpg','ZamRoam banner showing Zambia travel experiences',{left:42,top:175,width:560,height:440},'cover',{left:0,top:0,right:0,bottom:0.34});
 bodyBlock(s,650,185,550,'Destination-led search','Find places and stays by name, province, destination or experience category.');
 bodyBlock(s,650,365,550,'Rich local context','Move beyond listings into ceremonies, landmarks, safari trails and practical destination knowledge.',C.orange);
 txt(s,'s3-callout','The result is a guide to the country, not just a storefront.',650,565,540,54,25,C.teal,true);
 note(s,['The main Explore experience is Zambia-specific, with Victoria Falls, South Luangwa and local categories embedded in the product copy and data model.']);
}

// 4 — confidence tools
{
 const s=deck.slides.add(); s.background.fill=C.white; title(s,'Preparation stays useful beyond connectivity',4,'SMART TRAVEL SUPPORT');
 const items=[
  ['Interactive map','Select destinations visually and return directly to relevant places.','ZamRoam_Icons_Pack/33_travel_guide.png'],
  ['Safari AI','Get conversational help and move useful ideas into trip planning.','ZamRoam_Icons_Pack/02_visa.png'],
  ['SafeTravel','Surface practical security guidance within the same journey.','ZamRoam_Icons_Pack/04_travel_insurance.png'],
  ['Offline-ready tools','Carry phrase support, permits and downloadable trail packs into the field.','ZamRoam_Icons_Pack/01_passport.png']
 ];
 for(let i=0;i<4;i++){ const x=42+(i%2)*612, y=175+Math.floor(i/2)*220; await img(s,items[i][2],items[i][0],{left:x,top:y,width:82,height:82},'contain'); txt(s,`s4-h-${i}`,items[i][0],x+110,y,455,38,27,C.ink,true); txt(s,`s4-b-${i}`,items[i][1],x+110,y+52,455,85,21,C.gray,false); rect(s,`s4-rule-${i}`,x,y+165,555,2,i===3?C.orange:C.mint); }
 note(s,['Emphasize the practical layer: the app helps users navigate, communicate, understand risk and carry essential information beyond reliable mobile coverage.']);
}

// 5 — culture
{
 const s=deck.slides.add(); s.background.fill=C.ivory; title(s,'Culture is presented as a living part of the journey',5,'CEREMONIES & LOCAL KNOWLEDGE');
 await img(s,'public/ceremonies/kuomboka_flotilla_aerial.jpg','Kuomboka flotilla viewed from above',{left:42,top:170,width:580,height:285},'cover');
 await img(s,'public/ceremonies/likumbi_lya_mize_makishi.jpg','Likumbi Lya Mize Makishi ceremony',{left:650,top:170,width:270,height:285},'cover');
 await img(s,'public/ceremonies/ncwala_ngoni_warriors.jpg','Ncwala Ngoni warriors',{left:948,top:170,width:290,height:285},'cover');
 txt(s,'s5-body','A dedicated ceremony calendar brings together verified dates, cultural etiquette and access information. Local phrase support adds pronunciation, literal meaning and respectful-use notes.',42,490,820,115,23,C.ink,false);
 txt(s,'s5-quote','Tourism becomes easier to navigate—and more respectful to participate in.',900,490,338,120,25,C.teal,true);
 note(s,['The ceremony and language modules frame culture as context for responsible participation, not simply as a gallery of attractions.']);
}

// 6 — journey workflow (Codex Grid slide 18 rhythm)
{
 const s=deck.slides.add(); s.background.fill=C.white; title(s,'The journey continues from inspiration to action',6,'CONNECTED TRIP FLOW');
 rect(s,'s6-line',84,535,1112,3,C.teal);
 const steps=[
  ['01','Discover','Search destinations, listings and experiences.'],['02','Organise','Save favourites and build collaborative trips.'],['03','Book & carry','Create bookings, hold references, access permits and member benefits.']
 ];
 for(let i=0;i<3;i++){ const x=42+i*411; rect(s,`s6-panel-${i}`,x,170,374,330,i===1?C.ivory:C.pale); txt(s,`s6-num-${i}`,steps[i][0],x+28,198,80,45,28,C.orange,true); txt(s,`s6-h-${i}`,steps[i][1],x+28,260,310,50,31,C.ink,true); txt(s,`s6-b-${i}`,steps[i][2],x+28,330,310,105,22,C.gray,false); rect(s,`s6-dot-${i}`,x+32,525,18,18,C.orange); txt(s,`s6-label-${i}`,steps[i][1],x+28,570,310,38,24,C.teal,true); }
 note(s,['Saved items, shared trip planning, bookings, permits and memberships turn discovery into an ongoing relationship rather than a one-time browse.']);
}

// 7 — partners
{
 const s=deck.slides.add(); s.background.fill=C.ivory; title(s,'Operators participate through a trusted layer',7,'PARTNER ECOSYSTEM');
 await img(s,'public/branding/zamroam_lion_compass.jpg','ZamRoam lion compass identity',{left:42,top:190,width:500,height:250},'cover',{left:0.06,top:0.12,right:0.06,bottom:0.2});
 txt(s,'s7-big','A marketplace is only as strong as the operators behind it.',42,455,500,100,30,C.teal,true);
 const items=[['Register','Businesses submit identity, contact and tourism licence information.'],['Verify & publish','Administrators vet providers and manage listings, categories and content.'],['Serve & redeem','Operators handle member redemptions while operations teams manage bookings, reviews and disputes.']];
 for(let i=0;i<3;i++){ const y=180+i*145; txt(s,`s7-n-${i}`,String(i+1).padStart(2,'0'),620,y,55,35,23,C.orange,true); txt(s,`s7-h-${i}`,items[i][0],700,y,470,35,27,C.ink,true); txt(s,`s7-b-${i}`,items[i][1],700,y+45,470,74,20,C.gray,false); }
 note(s,['The partner and admin surfaces include provider applications, licence fields, vetting, publishing, redemption, audit history and customer-operations tooling.']);
}

// 8 — close
{
 const s=deck.slides.add(); s.background.fill=C.teal;
 txt(s,'s8-kicker','BUILT FOR THE NEXT STAGE OF ZAMBIA TOURISM',42,52,750,30,16,C.mint,true);
 txt(s,'s8-title','One platform.\nMore confident journeys.\nMore visible local value.',42,145,760,255,53,C.white,true);
 txt(s,'s8-body','ZamRoam brings visitors, operators, culture and destination intelligence into a single scalable experience—ready to demonstrate, partner, pilot and grow.',42,455,760,118,24,C.white,false);
 await img(s,'public/branding/zamroam_hero_banner.jpg','ZamRoam Zambia tourism brand banner',{left:880,top:115,width:335,height:435},'cover',{left:0.42,top:0,right:0,bottom:0.28});
 txt(s,'s8-tech','Responsive web app · Next.js 16 · React 19 · Drizzle data layer',42,635,900,25,17,C.mint,true);
 footer(s,8); note(s,['Close by inviting the audience to experience the product, explore partnership opportunities or identify a pilot use case.','Technical foundation verified from package.json and the local data layer.']);
}

await fs.mkdir(BUILD,{recursive:true});
for (const [i,s] of deck.slides.items.entries()){
 const png=await deck.export({slide:s,format:'png',scale:1}); await fs.writeFile(path.join(BUILD,`slide-${i+1}.png`),new Uint8Array(await png.arrayBuffer()));
 const layout=await s.export({format:'layout'}); await fs.writeFile(path.join(BUILD,`slide-${i+1}.layout.json`),await layout.text());
}
const montage=await deck.export({format:'webp',montage:true,scale:1}); await fs.writeFile(path.join(BUILD,'montage.webp'),new Uint8Array(await montage.arrayBuffer()));
const pptx=await PresentationFile.exportPptx(deck); await pptx.save(OUT);
console.log(OUT);
