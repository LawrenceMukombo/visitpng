"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import SmartLocationCascade, {CascadeSelection} from "../components/SmartLocationCascade";
import {PNG_REGIONS, PNG_PROVINCES} from "../../db/pngGeography";

type Choice={id:number;name:string;sourceUrl?:string};
type Province={id:number;code:string;name:string;region:string};
type Destination={id:number;provinceId:number;district:string|null;slug:string;name:string;summary:string;latitude:number|null;longitude:number|null;coverImageUrl:string|null;sourceUrl:string|null;provinceName:string;provinceCode:string;provinceRegion:string};
type Listing={
  id:number;
  slug:string;
  name:string;
  summary:string;
  imageUrl:string;
  photoCredit?:string|null;
  deepLinkUrl?:string|null;
  tag:string;
  basePrice:number;
  memberPrice:number|null;
  publicationStatus:string;
  destinationId:number;
  destination:string;
  district?:string|null;
  provinceId:number;
  province:string;
  categoryId:number;
  category:string;
  providerId:number;
  provider:string;
};

type Data={
  admin:{preferredName:string|null;email:string};
  listings:Listing[];
  destinations:Destination[];
  provinces:Province[];
  categories:Choice[];
  providers:Choice[];
  activity:{actorEmail:string;action:string;entityType?:string;entityId:string;details?:string;createdAt:string}[];
};

const blankListing={
  id:0,
  name:"",
  slug:"",
  summary:"",
  imageUrl:"",
  photoCredit:"",
  deepLinkUrl:"",
  tag:"",
  basePrice:0,
  memberPrice:"" as string|number,
  destinationId:0,
  categoryId:0,
  providerId:0,
  publicationStatus:"draft"
};

const blankDestination={
  id:0,
  provinceId:0,
  district:"",
  name:"",
  slug:"",
  summary:"",
  latitude:"",
  longitude:"",
  coverImageUrl:"",
  sourceUrl:""
};

const blankProvince={
  id:0,
  code:"",
  name:"",
  region:"Southern"
};

export default function AdminDashboard({viewer}:{viewer:{name:string;email:string;signOut:string}}){
  const [data,setData]=useState<Data|null>(null);
  const [listingForm,setListingForm]=useState({...blankListing});
  const [destForm,setDestForm]=useState({...blankDestination});
  const [provForm,setProvForm]=useState({...blankProvince});
  const [status,setStatus]=useState("Loading information…");
  const [section,setSection]=useState<"places"|"locations"|"provinces"|"hierarchy"|"api"|"activity">("places");
  const [search,setSearch]=useState("");
  const [apiPreview,setApiPreview]=useState<string>("Click 'Test API' below to see live JSON response.");
  const [apiLoading,setApiLoading]=useState(false);
  const [expandedRegion,setExpandedRegion]=useState<string>("Southern");

  const load=()=>fetch("/api/admin/listings").then(async r=>{
    const x=await r.json();
    if(!r.ok)throw new Error(x.error);
    setData(x);
    setStatus("");
  }).catch(e=>setStatus(e.message||"The administration page is unavailable."));

  useEffect(()=>{load()},[]);

  const editListing=(x:Listing)=>{
    setListingForm({
      id:x.id,
      name:x.name,
      slug:x.slug,
      summary:x.summary,
      imageUrl:x.imageUrl,
      photoCredit:x.photoCredit||"",
      deepLinkUrl:x.deepLinkUrl||"",
      tag:x.tag,
      basePrice:x.basePrice,
      memberPrice:x.memberPrice??"",
      destinationId:x.destinationId,
      categoryId:x.categoryId,
      providerId:x.providerId,
      publicationStatus:x.publicationStatus
    });
    setSection("places");
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const editDestination=(d:Destination)=>{
    setDestForm({
      id:d.id,
      provinceId:d.provinceId,
      district:d.district||"",
      name:d.name,
      slug:d.slug,
      summary:d.summary,
      latitude:d.latitude!=null?String(d.latitude):"",
      longitude:d.longitude!=null?String(d.longitude):"",
      coverImageUrl:d.coverImageUrl||"",
      sourceUrl:d.sourceUrl||""
    });
    setSection("locations");
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const editProvince=(p:Province)=>{
    setProvForm({
      id:p.id,
      code:p.code,
      name:p.name,
      region:p.region
    });
    setSection("provinces");
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const saveListing=async(e:React.FormEvent)=>{
    e.preventDefault();
    setStatus("Saving facility/listing…");
    const r=await fetch("/api/admin/listings",{
      method:listingForm.id?"PATCH":"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(listingForm)
    });
    const x=await r.json();
    if(r.ok){
      setData(x);
      setListingForm({...blankListing});
      setStatus("Facility / place saved successfully.");
    } else {
      setStatus(x.error||"Information could not be saved.");
    }
  };

  const saveDestination=async(e:React.FormEvent)=>{
    e.preventDefault();
    setStatus("Saving location/destination…");
    const r=await fetch("/api/admin/geography",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({type:"destination",...destForm})
    });
    const x=await r.json();
    if(r.ok){
      setData(x);
      setDestForm({...blankDestination});
      setStatus("Location / destination saved successfully.");
    } else {
      setStatus(x.error||"Location could not be saved.");
    }
  };

  const saveProvince=async(e:React.FormEvent)=>{
    e.preventDefault();
    setStatus("Saving province…");
    const r=await fetch("/api/admin/geography",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({type:"province",...provForm})
    });
    const x=await r.json();
    if(r.ok){
      setData(x);
      setProvForm({...blankProvince});
      setStatus("Province saved successfully.");
    } else {
      setStatus(x.error||"Province could not be saved.");
    }
  };

  const handleCascadeSelectForFacility=(sel:CascadeSelection)=>{
    if(sel.destinationId){
      setListingForm(prev=>({...prev,destinationId:sel.destinationId||0}));
    }
  };

  const handleCascadeSelectForDestination=(sel:CascadeSelection)=>{
    if(sel.provinceId){
      setDestForm(prev=>({
        ...prev,
        provinceId:sel.provinceId||prev.provinceId,
        district:sel.district||prev.district
      }));
    }
  };

  const testEndpoint=async(endpoint:string)=>{
    setApiLoading(true);
    setApiPreview(`Fetching ${endpoint}…`);
    try {
      const res=await fetch(endpoint);
      const json=await res.json();
      setApiPreview(JSON.stringify(json,null,2));
    } catch(err) {
      setApiPreview(`Error fetching endpoint: ${String(err)}`);
    } finally {
      setApiLoading(false);
    }
  };

  if(!data)return <main className="adminShell"><div className="adminAccess"><div className="adminLogo">V</div><h1>Visit PNG administration</h1><p>{status}</p><Link href="/">Return to Visit PNG</Link></div></main>;

  const filteredListings=data.listings.filter(x=>{
    const q=search.toLowerCase();
    return !q||x.name.toLowerCase().includes(q)||x.destination.toLowerCase().includes(q)||(x.district&&x.district.toLowerCase().includes(q))||x.province.toLowerCase().includes(q);
  });

  const filteredDestinations=data.destinations.filter(x=>{
    const q=search.toLowerCase();
    return !q||x.name.toLowerCase().includes(q)||(x.district&&x.district.toLowerCase().includes(q))||x.provinceName.toLowerCase().includes(q);
  });

  return <main className="adminShell">
    <header className="adminHeader">
      <Link href="/" className="adminBrand">
        <b>V</b>
        <span>VISIT PNG<br/><small>Administration</small></span>
      </Link>
      <div>
        <span>{viewer.name} ({viewer.email})</span>
        <a href={viewer.signOut}>Sign out</a>
      </div>
    </header>

    <nav className="adminNav">
      <button className={section==="places"?"active":""} onClick={()=>setSection("places")}>Facilities & Places</button>
      <button className={section==="locations"?"active":""} onClick={()=>setSection("locations")}>Locations & Districts</button>
      <button className={section==="provinces"?"active":""} onClick={()=>setSection("provinces")}>Provinces</button>
      <button className={section==="hierarchy"?"active":""} onClick={()=>setSection("hierarchy")}>Smart Cascade Hierarchy</button>
      <button className={section==="api"?"active":""} onClick={()=>setSection("api")}>API Explorer</button>
      <button className={section==="activity"?"active":""} onClick={()=>setSection("activity")}>Recent changes</button>
      <Link href="/">View app</Link>
    </nav>

    {status&&<div className="adminBanner"><p className="adminStatus" aria-live="polite">{status}</p></div>}

    {section==="places"&&(
      <div className="adminGrid">
        <section className="adminEditor">
          <p className="eyebrow">{listingForm.id?"UPDATE FACILITY / PLACE":"ADD FACILITY / PLACE"}</p>
          <h1>{listingForm.id?`Edit ${listingForm.name}`:"Add a place or experience"}</h1>
          <form onSubmit={saveListing}>
            <label>Name
              <input required value={listingForm.name} onChange={e=>setListingForm({...listingForm,name:e.target.value,slug:listingForm.id?listingForm.slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,"-")})}/>
            </label>
            <label>Short web address (slug)
              <input required value={listingForm.slug} onChange={e=>setListingForm({...listingForm,slug:e.target.value})}/>
            </label>
            <label>Description / Overview
              <textarea required rows={3} value={listingForm.summary} onChange={e=>setListingForm({...listingForm,summary:e.target.value})}/>
            </label>
            
            {/* Smart Cascade Location Selector */}
            <div className="adminSectionBox">
              <p className="adminSectionBoxTitle">⚡ Smart Location Cascade (Region › Province › District › Destination)</p>
              <SmartLocationCascade
                destinations={data.destinations}
                provinces={data.provinces}
                selectedDestinationId={listingForm.destinationId}
                onSelect={handleCascadeSelectForFacility}
                mode="destination-picker"
              />
            </div>

            <label>Photo URL / Image address
              <input placeholder="https://..." value={listingForm.imageUrl} onChange={e=>setListingForm({...listingForm,imageUrl:e.target.value})}/>
            </label>
            {listingForm.imageUrl&&(
              <div className="adminPhotoPreview" style={{backgroundImage:`url(${listingForm.imageUrl})`}}>
                <span>Photo preview</span>
              </div>
            )}

            <div className="adminFields">
              <label>Photo Credit / Photographer
                <input placeholder="e.g. Unsplash / PNG TPA" value={listingForm.photoCredit||""} onChange={e=>setListingForm({...listingForm,photoCredit:e.target.value})}/>
              </label>
              <label>Original Site Deep Link URL
                <div className="inputWithAction">
                  <input placeholder="https://provider.com/tour" value={listingForm.deepLinkUrl||""} onChange={e=>setListingForm({...listingForm,deepLinkUrl:e.target.value})}/>
                  {listingForm.deepLinkUrl?<a href={listingForm.deepLinkUrl} target="_blank" rel="noreferrer" className="deepLinkBtn" title="Test deep link">↗</a>:null}
                </div>
              </label>
            </div>

            <div className="adminFields">
              <label>Label / Badge
                <input value={listingForm.tag} placeholder="e.g. Historic trek" onChange={e=>setListingForm({...listingForm,tag:e.target.value})}/>
              </label>
              <label>Standard price (PGK)
                <input type="number" min="0" value={listingForm.basePrice} onChange={e=>setListingForm({...listingForm,basePrice:Number(e.target.value)})}/>
              </label>
              <label>Member price (PGK)
                <input type="number" min="0" value={listingForm.memberPrice} onChange={e=>setListingForm({...listingForm,memberPrice:e.target.value})}/>
              </label>
              <label>Category
                <select required value={listingForm.categoryId} onChange={e=>setListingForm({...listingForm,categoryId:Number(e.target.value)})}>
                  <option value="0">Choose Category</option>
                  {data.categories.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}
                </select>
              </label>
              <label>Provider / Business
                <select required value={listingForm.providerId} onChange={e=>setListingForm({...listingForm,providerId:Number(e.target.value)})}>
                  <option value="0">Choose Provider</option>
                  {data.providers.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}
                </select>
              </label>
            </div>

            <label>Visibility
              <select value={listingForm.publicationStatus} onChange={e=>setListingForm({...listingForm,publicationStatus:e.target.value})}>
                <option value="draft">Draft — staff only</option>
                <option value="published">Published — visible in app</option>
                <option value="hidden">Hidden</option>
              </select>
            </label>

            <div className="adminActions">
              <button type="submit">Save information</button>
              {listingForm.id?<button type="button" className="secondary" onClick={()=>setListingForm({...blankListing})}>Cancel editing</button>:null}
            </div>
          </form>
        </section>

        <section className="adminList">
          <header>
            <div>
              <p className="eyebrow">FACILITIES & EXPERIENCES</p>
              <h2>{data.listings.length} places registered</h2>
            </div>
            <div className="adminListTools">
              <input placeholder="Filter places..." value={search} onChange={e=>setSearch(e.target.value)}/>
              <button onClick={()=>setListingForm({...blankListing})}>+ Add new place</button>
            </div>
          </header>
          <div>
            {filteredListings.map(x=>(
              <article key={x.id}>
                <div className="adminThumb" style={{backgroundImage:`url(${x.imageUrl})`}}/>
                <div>
                  <span className={`adminBadge ${x.publicationStatus}`}>{x.publicationStatus}</span>
                  <small>{x.category} · <b>{x.destination}</b> ({x.province}{x.district?` / ${x.district}`:""})</small>
                  <h3>{x.name}</h3>
                  <p>{x.summary}</p>
                  {x.deepLinkUrl&&(
                    <div className="adminDeepLinkMeta">
                      <span>Original Link: </span>
                      <a href={x.deepLinkUrl} target="_blank" rel="noreferrer">{x.deepLinkUrl} ↗</a>
                    </div>
                  )}
                  <button onClick={()=>editListing(x)}>Edit information</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    )}

    {section==="locations"&&(
      <div className="adminGrid">
        <section className="adminEditor">
          <p className="eyebrow">{destForm.id?"UPDATE LOCATION":"ADD NEW LOCATION / DESTINATION"}</p>
          <h1>{destForm.id?`Edit ${destForm.name}`:"Add location or destination"}</h1>
          <form onSubmit={saveDestination}>
            <label>Location / Destination Name
              <input required placeholder="e.g. Kokoda Track, Tufi, Sogeri" value={destForm.name} onChange={e=>setDestForm({...destForm,name:e.target.value,slug:destForm.id?destForm.slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,"-")})}/>
            </label>
            <label>Short web address (slug)
              <input required value={destForm.slug} onChange={e=>setDestForm({...destForm,slug:e.target.value})}/>
            </label>

            {/* Smart Cascade for Location Creator */}
            <div className="adminSectionBox">
              <p className="adminSectionBoxTitle">⚡ Smart Cascade: Pick Region & Province</p>
              <SmartLocationCascade
                destinations={data.destinations}
                provinces={data.provinces}
                onSelect={handleCascadeSelectForDestination}
                mode="location-manager"
              />
            </div>

            <label>Province
              <select required value={destForm.provinceId} onChange={e=>setDestForm({...destForm,provinceId:Number(e.target.value)})}>
                <option value="0">Choose Province</option>
                {data.provinces.map(p=><option key={p.id} value={p.id}>{p.name} ({p.region} Region)</option>)}
              </select>
            </label>
            <label>District / Area (optional)
              <input placeholder="e.g. Sohe District / Kairuku-Hiri" value={destForm.district} onChange={e=>setDestForm({...destForm,district:e.target.value})}/>
            </label>
            <label>Summary / Geographical description
              <textarea required rows={3} value={destForm.summary} onChange={e=>setDestForm({...destForm,summary:e.target.value})}/>
            </label>
            <div className="adminFields">
              <label>Latitude
                <input placeholder="-8.8783" value={destForm.latitude} onChange={e=>setDestForm({...destForm,latitude:e.target.value})}/>
              </label>
              <label>Longitude
                <input placeholder="147.7372" value={destForm.longitude} onChange={e=>setDestForm({...destForm,longitude:e.target.value})}/>
              </label>
            </div>
            <label>Cover Photo URL
              <input placeholder="https://..." value={destForm.coverImageUrl} onChange={e=>setDestForm({...destForm,coverImageUrl:e.target.value})}/>
            </label>
            <label>Official Site / Information URL
              <input placeholder="https://papuanewguinea.travel/..." value={destForm.sourceUrl} onChange={e=>setDestForm({...destForm,sourceUrl:e.target.value})}/>
            </label>
            <div className="adminActions">
              <button type="submit">Save location</button>
              {destForm.id?<button type="button" className="secondary" onClick={()=>setDestForm({...blankDestination})}>Cancel editing</button>:null}
            </div>
          </form>
        </section>

        <section className="adminList">
          <header>
            <div>
              <p className="eyebrow">LOCATIONS & DISTRICTS</p>
              <h2>{data.destinations.length} destinations registered</h2>
            </div>
            <div className="adminListTools">
              <input placeholder="Filter locations..." value={search} onChange={e=>setSearch(e.target.value)}/>
              <button onClick={()=>setDestForm({...blankDestination})}>+ Add new location</button>
            </div>
          </header>
          <div>
            {filteredDestinations.map(d=>(
              <article key={d.id}>
                <div className="adminThumb" style={{backgroundImage:d.coverImageUrl?`url(${d.coverImageUrl})`:"none"}}/>
                <div>
                  <small><b>{d.provinceName}</b> ({d.provinceRegion} Region){d.district?` · District: ${d.district}`:""}</small>
                  <h3>{d.name}</h3>
                  <p>{d.summary}</p>
                  {d.latitude&&d.longitude?(<small>Coordinates: {d.latitude}, {d.longitude}</small>):null}
                  {d.sourceUrl?(
                    <div className="adminDeepLinkMeta">
                      <a href={d.sourceUrl} target="_blank" rel="noreferrer">Official website link ↗</a>
                    </div>
                  ):null}
                  <button onClick={()=>editDestination(d)}>Edit location</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    )}

    {section==="provinces"&&(
      <div className="adminGrid">
        <section className="adminEditor">
          <p className="eyebrow">{provForm.id?"UPDATE PROVINCE":"ADD NEW PROVINCE"}</p>
          <h1>{provForm.id?`Edit ${provForm.name}`:"Add a province"}</h1>
          <form onSubmit={saveProvince}>
            <label>Province Code (e.g. ORO, CP, NCD)
              <input required maxLength={10} value={provForm.code} onChange={e=>setProvForm({...provForm,code:e.target.value.toUpperCase()})}/>
            </label>
            <label>Province Name
              <input required placeholder="e.g. Oro (Northern) Province" value={provForm.name} onChange={e=>setProvForm({...provForm,name:e.target.value})}/>
            </label>
            <label>Region
              <select required value={provForm.region} onChange={e=>setProvForm({...provForm,region:e.target.value})}>
                <option value="Southern">Southern (Papua)</option>
                <option value="Momase">Momase</option>
                <option value="Highlands">Highlands</option>
                <option value="Islands">Islands</option>
              </select>
            </label>
            <div className="adminActions">
              <button type="submit">Save province</button>
              {provForm.id?<button type="button" className="secondary" onClick={()=>setProvForm({...blankProvince})}>Cancel editing</button>:null}
            </div>
          </form>
        </section>

        <section className="adminList">
          <header>
            <div>
              <p className="eyebrow">PAPUA NEW GUINEA PROVINCES</p>
              <h2>{data.provinces.length} provinces configured</h2>
            </div>
            <button onClick={()=>setProvForm({...blankProvince})}>+ Add new province</button>
          </header>
          <div className="provinceGrid">
            {data.provinces.map(p=>(
              <div key={p.id} className="provinceCard">
                <div>
                  <span className="provBadge">{p.code}</span>
                  <b>{p.name}</b>
                  <small>{p.region} Region</small>
                </div>
                <button onClick={()=>editProvince(p)}>Edit</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    )}

    {section==="hierarchy"&&(
      <section className="adminHierarchySection">
        <p className="eyebrow">PAPUA NEW GUINEA GEOGRAPHY EXPLORER</p>
        <h1>Smart Cascade Location Tree (4 Regions · 22 Provinces · Districts)</h1>
        <p>Explore the complete administrative and tourism geographic hierarchy of Papua New Guinea:</p>

        <div className="hierarchyRegionTabs">
          {PNG_REGIONS.map(r=>(
            <button
              key={r.name}
              className={expandedRegion===r.name?"active":""}
              onClick={()=>setExpandedRegion(r.name)}
            >
              <b>{r.label}</b>
              <small>{PNG_PROVINCES.filter(p=>p.region===r.name).length} Provinces</small>
            </button>
          ))}
        </div>

        <div className="hierarchyProvinceList">
          {PNG_PROVINCES.filter(p=>p.region===expandedRegion).map(prov=>(
            <article key={prov.code} className="hierarchyProvinceCard">
              <header>
                <div>
                  <span className="provBadge">{prov.code}</span>
                  <h2>{prov.name}</h2>
                  <small>Provincial Capital: <b>{prov.capital}</b> · Region: {prov.region}</small>
                </div>
              </header>

              <div className="hierarchyDistrictsGrid">
                {prov.districts.map((dist,dIdx)=>(
                  <div key={dIdx} className="hierarchyDistrictBox">
                    <strong>📍 {dist.name}</strong>
                    <ul>
                      {dist.keyDestinations.map((dest,kIdx)=>(
                        <li key={kIdx}>• {dest}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    )}

    {section==="api"&&(
      <section className="adminApiSection">
        <p className="eyebrow">VISIT PNG API & DATA INTEGRATION</p>
        <h1>Pull Facility and Location Information via API</h1>
        <p>You can integrate Visit PNG location and facility data directly into your external portals, mobile apps, or backend pipelines using these REST endpoints:</p>

        <div className="apiEndpointsGrid">
          <div className="apiCard">
            <span className="methodGet">GET</span>
            <code>/api/locations</code>
            <p>Pulls all provinces, districts, and locations/destinations with coordinate data, facility counts, and full cascade hierarchy.</p>
            <div className="apiParams">
              <small>Parameters: <code>?q=kokoda</code>, <code>?province=ORO</code>, <code>?region=Southern</code>, <code>?format=smart</code></small>
            </div>
            <button onClick={()=>testEndpoint("/api/locations")}>Test /api/locations ⚡</button>
          </div>

          <div className="apiCard">
            <span className="methodGet">GET</span>
            <code>/api/facilities</code>
            <p>Pulls all verified & published places, tours, stays, pricing, photos, and original deep links.</p>
            <div className="apiParams">
              <small>Parameters: <code>?q=trail</code>, <code>?category=tours</code>, <code>?destination=kokoda</code></small>
            </div>
            <button onClick={()=>testEndpoint("/api/facilities")}>Test /api/facilities ⚡</button>
          </div>
        </div>

        <div className="apiOutputViewer">
          <h3>Live API Response Preview {apiLoading?"(Loading...)":""}</h3>
          <pre>{apiPreview}</pre>
        </div>
      </section>
    )}

    {section==="activity"&&(
      <section className="adminActivity">
        <p className="eyebrow">RECENT CHANGES</p>
        <h1>Who changed what</h1>
        {data.activity.length?data.activity.map((x,i)=>(
          <article key={i}>
            <b>{x.action.replaceAll("_"," ")}</b>
            <span>{x.entityType||"place"} {x.entityId}</span>
            <span>{x.actorEmail}</span>
            <time>{new Date(x.createdAt).toLocaleString()}</time>
          </article>
        )):<p>No changes have been recorded yet.</p>}
      </section>
    )}
  </main>;
}
