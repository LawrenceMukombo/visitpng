"use client";
import {useEffect,useState,useRef} from "react";
import Link from "next/link";
import SmartLocationCascade, {CascadeSelection} from "../components/SmartLocationCascade";
import {PNG_REGIONS, PNG_PROVINCES} from "../../db/pngGeography";

type Choice={id:number;name:string;displayOrder?:number;sourceUrl?:string;licenseNumber?:string};
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

const blankCategory={
  id:0,
  name:"",
  slug:"",
  displayOrder:10
};

const blankProvider={
  id:0,
  name:"",
  slug:"",
  sourceUrl:"",
  licenseNumber:""
};

export default function AdminDashboard({viewer}:{viewer:{name:string;email:string;signOut:string}}){
  const [data,setData]=useState<Data|null>(null);
  const [listingForm,setListingForm]=useState({...blankListing});
  const [destForm,setDestForm]=useState({...blankDestination});
  const [provForm,setProvForm]=useState({...blankProvince});
  const [categoryForm,setCategoryForm]=useState({...blankCategory});
  const [providerForm,setProviderForm]=useState({...blankProvider});

  const [status,setStatus]=useState("Loading information…");
  const [section,setSection]=useState<"places"|"locations"|"provinces"|"hierarchy"|"categories"|"api"|"activity">("places");
  const [search,setSearch]=useState("");
  const [categoryFilter,setCategoryFilter]=useState<string>("all");
  const [apiPreview,setApiPreview]=useState<string>("Click 'Test API' below to see live JSON response.");
  const [apiLoading,setApiLoading]=useState(false);
  const [uploadingImage,setUploadingImage]=useState(false);
  const [expandedRegion,setExpandedRegion]=useState<string>("Southern");

  const placeFileInputRef=useRef<HTMLInputElement|null>(null);
  const destFileInputRef=useRef<HTMLInputElement|null>(null);

  const load=()=>fetch("/api/admin/listings").then(async r=>{
    const x=await r.json();
    if(!r.ok)throw new Error(x.error);
    setData(x);
    setStatus("");
  }).catch(e=>setStatus(e.message||"The administration page is unavailable."));

  useEffect(()=>{load()},[]);

  // Direct File Upload Handler
  const handleFileUpload = async (file: File, target: "listing" | "destination") => {
    if (!file) return;
    setUploadingImage(true);
    setStatus("Uploading picture from your device…");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });

      const json = await res.json();
      if (res.ok && json.url) {
        if (target === "listing") {
          setListingForm(prev => ({ ...prev, imageUrl: json.url }));
        } else {
          setDestForm(prev => ({ ...prev, coverImageUrl: json.url }));
        }
        setStatus(`Picture "${file.name}" uploaded successfully.`);
      } else {
        setStatus(json.error || "Image upload failed.");
      }
    } catch (err) {
      setStatus(`Image upload failed: ${String(err)}`);
    } finally {
      setUploadingImage(false);
    }
  };

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

  const deleteListing=async(id:number,name:string)=>{
    if(!window.confirm(`Are you sure you want to delete place "${name}"? This action cannot be undone.`)) return;
    setStatus("Deleting place…");
    const r=await fetch("/api/admin/listings",{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id})
    });
    const x=await r.json();
    if(r.ok){
      setData(x);
      if(listingForm.id===id) setListingForm({...blankListing});
      setStatus(`Place "${name}" deleted.`);
    } else {
      setStatus(x.error||"Could not delete place.");
    }
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

  const deleteDestination=async(id:number,name:string)=>{
    if(!window.confirm(`Are you sure you want to delete destination "${name}"?`)) return;
    setStatus("Deleting destination…");
    const r=await fetch("/api/admin/geography",{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({type:"destination",id})
    });
    const x=await r.json();
    if(r.ok){
      setData(x);
      if(destForm.id===id) setDestForm({...blankDestination});
      setStatus(`Destination "${name}" deleted.`);
    } else {
      setStatus(x.error||"Could not delete destination.");
    }
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

  const deleteProvince=async(id:number,name:string)=>{
    if(!window.confirm(`Are you sure you want to delete province "${name}"?`)) return;
    setStatus("Deleting province…");
    const r=await fetch("/api/admin/geography",{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({type:"province",id})
    });
    const x=await r.json();
    if(r.ok){
      setData(x);
      if(provForm.id===id) setProvForm({...blankProvince});
      setStatus(`Province "${name}" deleted.`);
    } else {
      setStatus(x.error||"Could not delete province.");
    }
  };

  const saveListing=async(e:React.FormEvent)=>{
    e.preventDefault();
    setStatus("Saving facility / place…");
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
    setStatus("Saving location / destination…");
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

  const saveCategory=async(e:React.FormEvent)=>{
    e.preventDefault();
    setStatus("Saving category…");
    const r=await fetch("/api/admin/geography",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({type:"category",...categoryForm})
    });
    const x=await r.json();
    if(r.ok){
      setData(x);
      setCategoryForm({...blankCategory});
      setStatus("Category saved successfully.");
    } else {
      setStatus(x.error||"Category could not be saved.");
    }
  };

  const saveProvider=async(e:React.FormEvent)=>{
    e.preventDefault();
    setStatus("Saving provider / business…");
    const r=await fetch("/api/admin/geography",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({type:"provider",...providerForm})
    });
    const x=await r.json();
    if(r.ok){
      setData(x);
      setProviderForm({...blankProvider});
      setStatus("Provider saved successfully.");
    } else {
      setStatus(x.error||"Provider could not be saved.");
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
    const matchesSearch = !q||x.name.toLowerCase().includes(q)||x.destination.toLowerCase().includes(q)||(x.district&&x.district.toLowerCase().includes(q))||x.province.toLowerCase().includes(q);
    const matchesCat = categoryFilter==="all" || x.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesCat;
  });

  const filteredDestinations=data.destinations.filter(x=>{
    const q=search.toLowerCase();
    return !q||x.name.toLowerCase().includes(q)||(x.district&&x.district.toLowerCase().includes(q))||x.provinceName.toLowerCase().includes(q);
  });

  return <main className="adminShell">
    <header className="adminHeader">
      <Link href="/" className="adminBrand">
        <b>V</b>
        <span>VISIT PNG<br/><small>Administration Control Center</small></span>
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
      <button className={section==="categories"?"active":""} onClick={()=>setSection("categories")}>Categories & Providers</button>
      <button className={section==="api"?"active":""} onClick={()=>setSection("api")}>API Explorer</button>
      <button className={section==="activity"?"active":""} onClick={()=>setSection("activity")}>Recent changes</button>
      <Link href="/">View app</Link>
    </nav>

    {status&&<div className="adminBanner"><p className="adminStatus" aria-live="polite">{status}</p></div>}

    {section==="places"&&(
      <div className="adminGrid">
        <section className="adminEditor">
          <p className="eyebrow">{listingForm.id?"UPDATE FACILITY / PLACE":"ADD FACILITY / PLACE"}</p>
          <h1>{listingForm.id?`Edit ${listingForm.name}`:"Add a place, stay, tour or experience"}</h1>
          <form onSubmit={saveListing}>
            <label>Place / Experience Name
              <input required placeholder="e.g. Walindi Plantation Resort, Kokoda Trek" value={listingForm.name} onChange={e=>setListingForm({...listingForm,name:e.target.value,slug:listingForm.id?listingForm.slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,"-")})}/>
            </label>
            <label>Short web address (slug)
              <input required value={listingForm.slug} onChange={e=>setListingForm({...listingForm,slug:e.target.value})}/>
            </label>
            <label>Description / Overview
              <textarea required rows={3} placeholder="Highlights, authentic details, amenities..." value={listingForm.summary} onChange={e=>setListingForm({...listingForm,summary:e.target.value})}/>
            </label>
            
            {/* Unified Smart Cascade Location Selector */}
            <div className="adminSectionBox">
              <p className="adminSectionBoxTitle">⚡ Location Assignment (Region › Province › District › Destination)</p>
              <SmartLocationCascade
                destinations={data.destinations}
                provinces={data.provinces}
                selectedDestinationId={listingForm.destinationId}
                onSelect={handleCascadeSelectForFacility}
                mode="destination-picker"
              />
            </div>

            <label>Photo URL / Image Address
              <div className="inputWithAction">
                <input placeholder="https://... or upload below" value={listingForm.imageUrl} onChange={e=>setListingForm({...listingForm,imageUrl:e.target.value})}/>
                <input
                  type="file"
                  accept="image/*"
                  ref={placeFileInputRef}
                  style={{display:"none"}}
                  onChange={e=>e.target.files?.[0]&&handleFileUpload(e.target.files[0],"listing")}
                />
                <button
                  type="button"
                  className="uploadPictureBtn"
                  disabled={uploadingImage}
                  onClick={()=>placeFileInputRef.current?.click()}
                >
                  📷 {uploadingImage?"Uploading...":"Upload Picture"}
                </button>
              </div>
            </label>

            {listingForm.imageUrl&&(
              <div className="adminPhotoPreview" style={{backgroundImage:`url(${listingForm.imageUrl})`}}>
                <span>Live photo preview</span>
              </div>
            )}

            <div className="adminFields">
              <label>Photo Credit / Source
                <input placeholder="e.g. PNG Tourism Promotion Authority / Unsplash" value={listingForm.photoCredit||""} onChange={e=>setListingForm({...listingForm,photoCredit:e.target.value})}/>
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
                <input value={listingForm.tag} placeholder="e.g. Eco-resort, Historic trek, Marine dive" onChange={e=>setListingForm({...listingForm,tag:e.target.value})}/>
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
              <button type="submit">{listingForm.id?"Save Changes":"Create Place"}</button>
              {listingForm.id?(
                <>
                  <button type="button" className="dangerBtn" onClick={()=>deleteListing(listingForm.id,listingForm.name)}>Delete place</button>
                  <button type="button" className="secondary" onClick={()=>setListingForm({...blankListing})}>Cancel editing</button>
                </>
              ):null}
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
              <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} className="adminFilterSelect">
                <option value="all">All Categories</option>
                <option value="stay">Stays & Resorts</option>
                <option value="nature">Nature & Wildlife</option>
                <option value="culture">Culture & Arts</option>
                <option value="adventure">Adventures & Treks</option>
                <option value="marine">Diving & Marine</option>
              </select>
              <input placeholder="Search places..." value={search} onChange={e=>setSearch(e.target.value)}/>
              <button onClick={()=>setListingForm({...blankListing})}>+ Add place</button>
            </div>
          </header>
          <div>
            {filteredListings.map(x=>(
              <article key={x.id}>
                <div className="adminThumb" style={{backgroundImage:`url(${x.imageUrl})`}}/>
                <div>
                  <div className="articleTopBar">
                    <span className={`adminBadge ${x.publicationStatus}`}>{x.publicationStatus}</span>
                    <small>{x.category} · <b>{x.destination}</b> ({x.province}{x.district?` · ${x.district}`:""})</small>
                  </div>
                  <h3>{x.name}</h3>
                  <p>{x.summary}</p>
                  <div className="priceRow">
                    <strong>PGK {x.basePrice}</strong>
                    {x.memberPrice?<span className="memberPriceBadge">Member: PGK {x.memberPrice}</span>:null}
                  </div>
                  {x.deepLinkUrl&&(
                    <div className="adminDeepLinkMeta">
                      <span>Original Link: </span>
                      <a href={x.deepLinkUrl} target="_blank" rel="noreferrer">{x.deepLinkUrl} ↗</a>
                    </div>
                  )}
                  <div className="rowActions">
                    <button onClick={()=>editListing(x)}>Edit place</button>
                    <button className="deleteSmallBtn" onClick={()=>deleteListing(x.id,x.name)}>Delete</button>
                  </div>
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
              <input required placeholder="e.g. Kokoda Track, Tufi, Sogeri, Walindi" value={destForm.name} onChange={e=>setDestForm({...destForm,name:e.target.value,slug:destForm.id?destForm.slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,"-")})}/>
            </label>
            <label>Short web address (slug)
              <input required value={destForm.slug} onChange={e=>setDestForm({...destForm,slug:e.target.value})}/>
            </label>

            {/* UNIFIED Smart Cascade for Location Creator (No duplicate inputs!) */}
            <div className="adminSectionBox">
              <p className="adminSectionBoxTitle">⚡ Assign Region, Province & District</p>
              <SmartLocationCascade
                destinations={data.destinations}
                provinces={data.provinces}
                selectedProvinceId={destForm.provinceId}
                selectedDistrict={destForm.district}
                onSelect={handleCascadeSelectForDestination}
                mode="location-manager"
              />
            </div>

            <label>Summary / Geographical description
              <textarea required rows={3} placeholder="Key geographic landscape, access points, attractions..." value={destForm.summary} onChange={e=>setDestForm({...destForm,summary:e.target.value})}/>
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
              <div className="inputWithAction">
                <input placeholder="https://... or upload below" value={destForm.coverImageUrl} onChange={e=>setDestForm({...destForm,coverImageUrl:e.target.value})}/>
                <input
                  type="file"
                  accept="image/*"
                  ref={destFileInputRef}
                  style={{display:"none"}}
                  onChange={e=>e.target.files?.[0]&&handleFileUpload(e.target.files[0],"destination")}
                />
                <button
                  type="button"
                  className="uploadPictureBtn"
                  disabled={uploadingImage}
                  onClick={()=>destFileInputRef.current?.click()}
                >
                  📷 {uploadingImage?"Uploading...":"Upload Picture"}
                </button>
              </div>
            </label>

            {destForm.coverImageUrl&&(
              <div className="adminPhotoPreview" style={{backgroundImage:`url(${destForm.coverImageUrl})`}}>
                <span>Cover photo preview</span>
              </div>
            )}

            <label>Official Site / Information URL
              <input placeholder="https://papuanewguinea.travel/..." value={destForm.sourceUrl} onChange={e=>setDestForm({...destForm,sourceUrl:e.target.value})}/>
            </label>
            
            <div className="adminActions">
              <button type="submit">{destForm.id?"Save Changes":"Create Location"}</button>
              {destForm.id?(
                <>
                  <button type="button" className="dangerBtn" onClick={()=>deleteDestination(destForm.id,destForm.name)}>Delete location</button>
                  <button type="button" className="secondary" onClick={()=>setDestForm({...blankDestination})}>Cancel editing</button>
                </>
              ):null}
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
              <button onClick={()=>setDestForm({...blankDestination})}>+ Add location</button>
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
                  <div className="rowActions">
                    <button onClick={()=>editDestination(d)}>Edit location</button>
                    <button className="deleteSmallBtn" onClick={()=>deleteDestination(d.id,d.name)}>Delete</button>
                  </div>
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
            <label>Province Code (e.g. ORO, CP, NCD, ENB, MOR)
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
              <button type="submit">{provForm.id?"Save Province":"Create Province"}</button>
              {provForm.id?(
                <>
                  <button type="button" className="dangerBtn" onClick={()=>deleteProvince(provForm.id,provForm.name)}>Delete province</button>
                  <button type="button" className="secondary" onClick={()=>setProvForm({...blankProvince})}>Cancel editing</button>
                </>
              ):null}
            </div>
          </form>
        </section>

        <section className="adminList">
          <header>
            <div>
              <p className="eyebrow">PAPUA NEW GUINEA PROVINCES</p>
              <h2>{data.provinces.length} provinces configured</h2>
            </div>
            <button onClick={()=>setProvForm({...blankProvince})}>+ Add province</button>
          </header>
          <div className="provinceGrid">
            {data.provinces.map(p=>(
              <div key={p.id} className="provinceCard">
                <div>
                  <span className="provBadge">{p.code}</span>
                  <b>{p.name}</b>
                  <small>{p.region} Region</small>
                </div>
                <div className="rowActions">
                  <button onClick={()=>editProvince(p)}>Edit</button>
                  <button className="deleteSmallBtn" onClick={()=>deleteProvince(p.id,p.name)}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )}

    {section==="hierarchy"&&(
      <section className="adminHierarchySection">
        <p className="eyebrow">PAPUA NEW GUINEA GEOGRAPHY EXPLORER</p>
        <h1>Smart Cascade Location Tree (4 Regions · 22 Provinces · 96+ Districts)</h1>
        <p>Explore the complete administrative and tourism geographic hierarchy of Papua New Guinea:</p>

        <div className="hierarchyRegionTabs">
          {PNG_REGIONS.map(r=>(
            <button
              key={r.name}
              className={expandedRegion===r.name?"active":""}
              onClick={()=>setExpandedRegion(r.name)}
            >
              <b>{r.label}</b>
              <small>{PNG_PROVINCES.filter(p=>p.region===r.name).length} Provinces · {PNG_PROVINCES.filter(p=>p.region===r.name).reduce((acc,p)=>acc+p.districts.length,0)} Districts</small>
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
                  <small>Provincial Capital: <b>{prov.capital}</b> · Region: {prov.region} · {prov.districts.length} Districts</small>
                </div>
              </header>

              <div className="hierarchyDistrictsGrid">
                {prov.districts.map((dist,dIdx)=>(
                  <div key={dIdx} className="hierarchyDistrictBox">
                    <div className="distBoxHeader">
                      <strong>📍 {dist.name}</strong>
                      <span className={`distCatBadge ${dist.category}`}>{dist.category}</span>
                    </div>
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

    {section==="categories"&&(
      <div className="adminGrid">
        <section className="adminEditor">
          <p className="eyebrow">MANAGE CATEGORIES</p>
          <h1>{categoryForm.id?`Edit Category`:"Add new category"}</h1>
          <form onSubmit={saveCategory}>
            <label>Category Name
              <input required placeholder="e.g. Eco-Resort, Cultural Tour" value={categoryForm.name} onChange={e=>setCategoryForm({...categoryForm,name:e.target.value,slug:categoryForm.id?categoryForm.slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,"-")})}/>
            </label>
            <label>Slug
              <input required value={categoryForm.slug} onChange={e=>setCategoryForm({...categoryForm,slug:e.target.value})}/>
            </label>
            <label>Display Order
              <input type="number" value={categoryForm.displayOrder} onChange={e=>setCategoryForm({...categoryForm,displayOrder:Number(e.target.value)})}/>
            </label>
            <div className="adminActions">
              <button type="submit">Save Category</button>
              {categoryForm.id?<button type="button" className="secondary" onClick={()=>setCategoryForm({...blankCategory})}>Cancel</button>:null}
            </div>
          </form>

          <hr style={{margin:"24px 0",border:"0",borderTop:"1px solid var(--border-default)"}}/>

          <p className="eyebrow">MANAGE PROVIDERS & BUSINESSES</p>
          <h1>{providerForm.id?`Edit Provider`:"Add business provider"}</h1>
          <form onSubmit={saveProvider}>
            <label>Business / Operator Trading Name
              <input required placeholder="e.g. Walindi Diving, Tufi Resort, Kokoda Track Authority" value={providerForm.name} onChange={e=>setProviderForm({...providerForm,name:e.target.value,slug:providerForm.id?providerForm.slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,"-")})}/>
            </label>
            <label>Slug
              <input required value={providerForm.slug} onChange={e=>setProviderForm({...providerForm,slug:e.target.value})}/>
            </label>
            <label>Website / Source URL
              <input placeholder="https://..." value={providerForm.sourceUrl} onChange={e=>setProviderForm({...providerForm,sourceUrl:e.target.value})}/>
            </label>
            <label>Tourism License / Permit Number
              <input placeholder="e.g. PNGTPA-2026-084" value={providerForm.licenseNumber} onChange={e=>setProviderForm({...providerForm,licenseNumber:e.target.value})}/>
            </label>
            <div className="adminActions">
              <button type="submit">Save Provider</button>
              {providerForm.id?<button type="button" className="secondary" onClick={()=>setProviderForm({...blankProvider})}>Cancel</button>:null}
            </div>
          </form>
        </section>

        <section className="adminList">
          <header>
            <div>
              <p className="eyebrow">CATEGORIES & OPERATORS</p>
              <h2>{data.categories.length} categories · {data.providers.length} providers</h2>
            </div>
          </header>

          <div style={{marginBottom:"24px"}}>
            <h3>Active Categories</h3>
            <div className="provinceGrid">
              {data.categories.map(c=>(
                <div key={c.id} className="provinceCard">
                  <div>
                    <b>{c.name}</b>
                    <small>Order: {c.displayOrder}</small>
                  </div>
                  <button onClick={()=>setCategoryForm({id:c.id,name:c.name,slug:c.name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),displayOrder:c.displayOrder||10})}>Edit</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3>Registered Tourism Operators</h3>
            <div className="provinceGrid">
              {data.providers.map(p=>(
                <div key={p.id} className="provinceCard">
                  <div>
                    <b>{p.name}</b>
                    {p.licenseNumber?<small>License: {p.licenseNumber}</small>:null}
                    {p.sourceUrl?<small><a href={p.sourceUrl} target="_blank" rel="noreferrer">Website ↗</a></small>:null}
                  </div>
                  <button onClick={()=>setProviderForm({id:p.id,name:p.name,slug:p.name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),sourceUrl:p.sourceUrl||"",licenseNumber:p.licenseNumber||""})}>Edit</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
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
        <p className="eyebrow">RECENT CHANGES & AUDIT TRAIL</p>
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
