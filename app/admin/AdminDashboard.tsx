"use client";
import {useEffect,useState,useRef,useCallback} from "react";
import Link from "next/link";
import SmartLocationCascade, {CascadeSelection} from "../components/SmartLocationCascade";
import AdminProviderVetting from "../components/AdminProviderVetting";
import AdminMembershipConsole from "../components/AdminMembershipConsole";
import AdminOperationsConsole from "../components/AdminOperationsConsole";
import type { ProviderApplicationRecord } from "../../db/providers";
import {ZAMBIA_REGIONS, ZAMBIA_PROVINCES} from "../../db/zambiaGeography";
import {ZAMBIAN_LANGUAGE_ZONES, ZambianLanguageZone} from "../../db/zambianLanguages";

type Choice={id:number;name:string;displayOrder?:number;contactName?:string;contactEmail?:string;contactPhone?:string;physicalAddress?:string;sourceUrl?:string;licenseNumber?:string};
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
  currency?:string;
  countryId?:number;
  basePrice:number;
  memberPrice:number|null;
  publicationStatus:string;
  destinationId:number;
  destination:string;
  district?:string|null;
  provinceId:number;
  province:string;
  provinceRegion:string;
  categoryId:number;
  category:string;
  providerId:number;
  provider:string;
  lastReviewedAt:string|null;
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
  countryId:2 as number|undefined,
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
  contactName:"",
  contactEmail:"",
  contactPhone:"",
  physicalAddress:"",
  sourceUrl:"",
  licenseNumber:""
};

export default function AdminDashboard({viewer}:{viewer:{name:string;email:string;signOut:string}}){
  const [data,setData]=useState<Data|null>(null);
  const selectedCountry = "ZMB";
  const [listingForm,setListingForm]=useState({...blankListing});
  const [destForm,setDestForm]=useState({...blankDestination});
  const [provForm,setProvForm]=useState({...blankProvince});
  const [categoryForm,setCategoryForm]=useState({...blankCategory});
  const [providerForm,setProviderForm]=useState({...blankProvider});

  const [status,setStatus]=useState("Loading information…");
  const [section,setSection]=useState<"places"|"locations"|"provinces"|"hierarchy"|"languages"|"membership_ecosystem"|"providers_vetting"|"operations"|"categories"|"api"|"activity">("places");
  const [providerApps,setProviderApps]=useState<ProviderApplicationRecord[]>([]);
  const [membershipData,setMembershipData]=useState<Parameters<typeof AdminMembershipConsole>[0]["data"]>(null);
  const [search,setSearch]=useState("");
  const [categoryFilter,setCategoryFilter]=useState<string>("all");
  const [apiPreview,setApiPreview]=useState<string>("Click 'Test API' below to see live JSON response.");
  const [apiLoading,setApiLoading]=useState(false);
  const [uploadingImage,setUploadingImage]=useState(false);
  const [expandedRegion,setExpandedRegion]=useState<string>("Southern & Lusaka");
  const [expandedCardIds,setExpandedCardIds]=useState<Set<number>>(new Set());
  const [allExpanded,setAllExpanded]=useState(false);

  // Zambian Languages & Phrasebook Admin CRUD State
  const [languageZones, setLanguageZones] = useState<ZambianLanguageZone[]>(ZAMBIAN_LANGUAGE_ZONES);
  const [selectedAdminLangZone, setSelectedAdminLangZone] = useState<string>("bemba");
  const [phraseForm, setPhraseForm] = useState<{
    id: string;
    category: "greetings" | "safari" | "market" | "navigation" | "emergency" | "culture";
    english: string;
    localText: string;
    phonetic: string;
    syllables: string;
    literalMeaning: string;
    culturalNote: string;
  }>({
    id: "",
    category: "greetings",
    english: "",
    localText: "",
    phonetic: "",
    syllables: "",
    literalMeaning: "",
    culturalNote: ""
  });
  const [districtFilterSearch, setDistrictFilterSearch] = useState<string>("");

  const placeFileInputRef=useRef<HTMLInputElement|null>(null);
  const destFileInputRef=useRef<HTMLInputElement|null>(null);
  const csvFileInputRef=useRef<HTMLInputElement|null>(null);

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setStatus("⏳ Uploading and processing phrasebook CSV...");
      const text = await file.text();
      const res = await fetch("/api/admin/languages/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvText: text })
      });
      const json = await res.json();
      if (json.success && json.zones) {
        setLanguageZones([...json.zones]);
        setStatus(`🎉 ${json.message}`);
        setTimeout(() => setStatus(""), 6000);
      } else {
        setStatus(`✕ Upload failed: ${json.error}`);
      }
    } catch {
      setStatus("✕ Failed to upload CSV file.");
    } finally {
      if (csvFileInputRef.current) csvFileInputRef.current.value = "";
    }
  };

  const toggleCardExpansion=(id:number)=>{
    setExpandedCardIds(prev=>{
      const next=new Set(prev);
      if(next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleExpandAll=()=>{
    if(allExpanded){
      setExpandedCardIds(new Set());
      setAllExpanded(false);
    }else{
      setExpandedCardIds(new Set(data?.listings.map(l=>l.id)||[]));
      setAllExpanded(true);
    }
  };

  const load=useCallback((countryFilter = selectedCountry)=>{
    const url = countryFilter && countryFilter !== "all" ? `/api/admin/listings?country=${countryFilter}` : "/api/admin/listings?country=ZMB";
    fetch(url).then(async r=>{
      const x=await r.json();
      if(!r.ok)throw new Error(x.error);
      setData(x);
      setStatus("");
    }).catch(e=>setStatus(e.message||"The administration page is unavailable."));

    fetch("/api/admin/providers").then(async r=>{
      const x=await r.json();
      if(r.ok && x.applications) setProviderApps(x.applications);
    }).catch(()=>{});

    fetch("/api/admin/membership").then(async r=>{
      const x=await r.json();
      if(r.ok) setMembershipData(x);
    }).catch(()=>{});
  },[selectedCountry]);

  useEffect(()=>{load(selectedCountry)},[load,selectedCountry]);

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
      countryId:x.countryId,
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
    const targetCountryId = listingForm.countryId || (selectedCountry === "ZMB" ? 2 : selectedCountry === "PNG" ? 1 : undefined);
    const r=await fetch("/api/admin/listings",{
      method:listingForm.id?"PATCH":"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        ...listingForm,
        countryId: targetCountryId
      })
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
    const targetCountryId = (selectedCountry === "ZMB" ? 2 : selectedCountry === "PNG" ? 1 : undefined);
    const r=await fetch("/api/admin/geography",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        type:"destination",
        countryId: targetCountryId,
        ...destForm
      })
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

  if(!data){
    return (
      <main className="adminShell">
        <div className="adminAccess" style={{maxWidth:"480px",margin:"60px auto",padding:"32px",background:"#fff",borderRadius:"16px",boxShadow:"0 8px 30px rgba(0,0,0,0.08)",textAlign:"center"}}>
          <div className="adminLogo" style={{fontSize:"36px",marginBottom:"12px"}}>🇿🇲</div>
          <h1 style={{fontSize:"22px",fontWeight:800,color:"#0A4D3C",marginBottom:"8px"}}>ZAMROAM ADMINISTRATION</h1>
          <p style={{color:"#555",fontSize:"14px",lineHeight:"1.6",marginBottom:"20px"}}>{status}</p>
          <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
            <button
              type="button"
              onClick={() => load(selectedCountry)}
              style={{padding:"10px 18px",background:"#D96B27",color:"#fff",border:"none",borderRadius:"8px",fontWeight:700,cursor:"pointer"}}
            >
              🔄 Retry Loading
            </button>
            <Link
              href="/"
              style={{padding:"10px 18px",background:"#f1f5f9",color:"#334155",borderRadius:"8px",fontWeight:600,textDecoration:"none",display:"inline-block"}}
            >
              Return to ZamRoam
            </Link>
            <a
              href={viewer.signOut}
              style={{padding:"10px 18px",background:"#fee2e2",color:"#dc2626",borderRadius:"8px",fontWeight:600,textDecoration:"none",display:"inline-block"}}
            >
              Sign Out & Re-login
            </a>
          </div>
        </div>
      </main>
    );
  }

  const listingsList = data.listings || [];
  const destinationsList = data.destinations || [];

  const filteredListings = listingsList.filter(x=>{
    const q=search.toLowerCase();
    const matchesSearch = !q||x.name.toLowerCase().includes(q)||x.destination.toLowerCase().includes(q)||(x.district&&x.district.toLowerCase().includes(q))||x.province.toLowerCase().includes(q);
    const matchesCat = categoryFilter==="all" || x.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesCat;
  });

  const filteredDestinations = destinationsList.filter(x=>{
    const q=search.toLowerCase();
    return !q||x.name.toLowerCase().includes(q)||(x.district&&x.district.toLowerCase().includes(q))||x.provinceName.toLowerCase().includes(q);
  });

  return <main className="adminShell">
    <header className="adminHeader">
      <Link href="/" className="adminBrand">
        <b>🇿🇲</b>
        <span>
          ZAMROAM / VISIT ZAMBIA
          <br/>
          <small>Administration Control Center (Lamton Investments Ltd)</small>
        </span>
      </Link>
      <div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
        <span className="destinationPill" style={{background:"rgba(255,255,255,0.15)",color:"var(--text-on-dark)",padding:"5px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:700}}>
          🇿🇲 Zambia Tourism Portal
        </span>
        <span>{viewer.name} ({viewer.email})</span>
        <a href={viewer.signOut}>Sign out</a>
      </div>
    </header>

    <nav className="adminNav">
      <button className={section==="places"?"active":""} onClick={()=>setSection("places")}>Facilities & Places</button>
      <button className={section==="locations"?"active":""} onClick={()=>setSection("locations")}>Locations & Districts</button>
      <button className={section==="provinces"?"active":""} onClick={()=>setSection("provinces")}>Provinces</button>
      <button className={section==="hierarchy"?"active":""} onClick={()=>setSection("hierarchy")}>Smart Cascade Hierarchy (116 Districts)</button>
      <button className={section==="languages"?"active":""} onClick={()=>setSection("languages")}>🗣️ Languages & Phrasebook</button>
      <button className={section==="membership_ecosystem"?"active":""} onClick={()=>setSection("membership_ecosystem")}>
        👑 Memberships & Partner Ecosystem
      </button>
      <button className={section==="providers_vetting"?"active":""} onClick={()=>setSection("providers_vetting")}>
        🏢 Provider Vetting (Anti-Scam) {providerApps.filter(a=>a.status==="pending_review").length ? `(${providerApps.filter(a=>a.status==="pending_review").length} New)` : ""}
      </button>
      <button className={section==="operations"?"active":""} onClick={()=>setSection("operations")}>
        📊 Bookings, Reviews & Disputes
      </button>
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
            <label>Target Country Portal
              <select
                value="ZMB"
                disabled
              >
                <option value="ZMB">🇿🇲 Zambia (ZamRoam / Visit Zambia)</option>
              </select>
            </label>

            <label>Place / Experience Name
              <input required placeholder={selectedCountry === "ZMB" || listingForm.countryId === 2 ? "e.g. Royal Livingstone Hotel, South Luangwa Safari Camp" : "e.g. Walindi Plantation Resort, Kokoda Trek"} value={listingForm.name} onChange={e=>setListingForm({...listingForm,name:e.target.value,slug:listingForm.id?listingForm.slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,"-")})}/>
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
                countryCode={listingForm.countryId === 2 || selectedCountry === "ZMB" ? "ZMB" : "PNG"}
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
                <input placeholder="e.g. Zambia Tourism Agency / TPA / Unsplash" value={listingForm.photoCredit||""} onChange={e=>setListingForm({...listingForm,photoCredit:e.target.value})}/>
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
                <input value={listingForm.tag} placeholder="e.g. Safari camp, Luxury stay, Historic trek" onChange={e=>setListingForm({...listingForm,tag:e.target.value})}/>
              </label>
              <label>Standard price (ZMW)
                <input type="number" min="0" value={listingForm.basePrice} onChange={e=>setListingForm({...listingForm,basePrice:Number(e.target.value)})}/>
              </label>
              <label>Member price (ZMW)
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
              <p className="eyebrow">FACILITIES & EXPERIENCES (ZAMBIA)</p>
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
              <button type="button" className="secondary" onClick={toggleExpandAll}>
                {allExpanded ? "⤡ Collapse All" : "⤢ Expand All"}
              </button>
              <button onClick={()=>setListingForm({...blankListing})}>+ Add place</button>
            </div>
          </header>
          <div>
            {filteredListings.map(x=>{
              const itemCurrency = x.currency || "ZMW";
              const isExpanded = expandedCardIds.has(x.id);
              return (
                <article key={x.id} className={`adminListingCard ${isExpanded ? "expanded" : "collapsed"}`}>
                  <div className="adminThumb" style={{backgroundImage:`url(${x.imageUrl})`}}/>
                  <div>
                    <div className="articleTopBar">
                      <span className={`adminBadge ${x.publicationStatus}`}>{x.publicationStatus}</span>
                      <small>{x.category} · <b>{x.destination}</b> ({x.province}{x.district?` · ${x.district}`:""})</small>
                      <button
                        type="button"
                        className="collapseToggleBtn"
                        style={{marginLeft:"auto",background:"var(--surface-subtle)",border:"1px solid var(--border-default)",borderRadius:"6px",padding:"3px 8px",fontSize:"11px",fontWeight:700,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"4px",color:"var(--brand-deep-teal)"}}
                        onClick={()=>toggleCardExpansion(x.id)}
                        title={isExpanded ? "Collapse card details" : "Expand card details"}
                      >
                        {isExpanded ? "▲ Less" : "▼ Details"}
                      </button>
                    </div>

                    <h3>{x.name}</h3>

                    <div className="priceRow">
                      <strong>{itemCurrency} {x.basePrice}</strong>
                      {x.memberPrice?<span className="memberPriceBadge">Member: {itemCurrency} {x.memberPrice}</span>:null}
                      {x.tag && <span style={{fontSize:"11px",background:"var(--surface-subtle)",padding:"2px 6px",borderRadius:"4px",color:"var(--text-secondary)",marginLeft:"6px"}}>🏷️ {x.tag}</span>}
                    </div>

                    {isExpanded ? (
                      <div className="expandedCardBody" style={{marginTop:"8px",paddingTop:"8px",borderTop:"1px dashed var(--border-default)"}}>
                        <p style={{margin:"0 0 8px",fontSize:"13px",color:"var(--text-secondary)",lineHeight:1.5}}>{x.summary}</p>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:"6px",fontSize:"11px",marginBottom:"8px",background:"var(--surface-subtle)",padding:"8px 12px",borderRadius:"6px"}}>
                          <div><strong>Provider:</strong> {x.provider || "Direct"}</div>
                          <div><strong>Slug:</strong> <code>{x.slug}</code></div>
                          <div><strong>Region:</strong> {x.provinceRegion}</div>
                          {x.photoCredit && <div><strong>Photo Credit:</strong> {x.photoCredit}</div>}
                        </div>
                        {x.deepLinkUrl&&(
                          <div className="adminDeepLinkMeta" style={{margin:"4px 0 8px",fontSize:"11px"}}>
                            <span>Original Link: </span>
                            <a href={x.deepLinkUrl} target="_blank" rel="noreferrer" style={{color:"var(--brand-deep-teal)",fontWeight:700}}>{x.deepLinkUrl} ↗</a>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p style={{margin:"0 0 8px",fontSize:"12px",color:"var(--text-secondary)",lineHeight:1.4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"650px"}}>
                        {x.summary}
                      </p>
                    )}

                    <div className="rowActions">
                      <button onClick={()=>editListing(x)}>Edit place</button>
                      <button className="deleteSmallBtn" onClick={()=>deleteListing(x.id,x.name)}>Delete</button>
                    </div>
                  </div>
                </article>
              );
            })}
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
                countryCode="ZMB"
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
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"12px",marginBottom:"12px"}}>
          <div>
            <p className="eyebrow" style={{color:"#C86428",fontWeight:800}}>COMPLETE ZAMBIA GEOGRAPHY REGISTRY</p>
            <h1 style={{margin:"4px 0"}}>Smart Cascade Location Tree (5 Regions · 10 Provinces · 116 Districts)</h1>
            <p style={{color:"var(--text-secondary)",fontSize:"13px",margin:0}}>
              Showing all 116 official administrative districts across the 10 provinces of Zambia with provincial capitals and tourism hotspots:
            </p>
          </div>
          <div style={{minWidth:"260px"}}>
            <input
              type="search"
              placeholder="🔍 Search all 116 districts or capitals..."
              value={districtFilterSearch}
              onChange={(e)=>setDistrictFilterSearch(e.target.value)}
              style={{
                width:"100%",
                padding:"8px 12px",
                borderRadius:"8px",
                border:"1px solid var(--border-default)",
                background:"var(--surface-card)",
                fontSize:"12px"
              }}
            />
          </div>
        </div>

        <div className="hierarchyRegionTabs">
          {ZAMBIA_REGIONS.map(r=>(
            <button
              key={r.name}
              className={expandedRegion===r.name?"active":""}
              onClick={()=>setExpandedRegion(r.name)}
            >
              <b>{r.label}</b>
              <small>
                {ZAMBIA_PROVINCES.filter(p=>p.region===r.name).length} Provinces · {ZAMBIA_PROVINCES.filter(p=>p.region===r.name).reduce((acc,p)=>acc+p.districts.length,0)} Districts
              </small>
            </button>
          ))}
        </div>

        <div className="hierarchyProvinceList">
          {ZAMBIA_PROVINCES.filter(p=>districtFilterSearch ? true : p.region===expandedRegion).map(prov=>{
            const filteredDistricts = prov.districts.filter(d =>
              !districtFilterSearch ||
              d.name.toLowerCase().includes(districtFilterSearch.toLowerCase()) ||
              prov.name.toLowerCase().includes(districtFilterSearch.toLowerCase()) ||
              prov.capital.toLowerCase().includes(districtFilterSearch.toLowerCase()) ||
              d.keyDestinations.some(k => k.toLowerCase().includes(districtFilterSearch.toLowerCase()))
            );

            if (districtFilterSearch && filteredDistricts.length === 0) return null;

            return (
              <article key={prov.code} className="hierarchyProvinceCard" style={{marginBottom:"20px"}}>
                <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px",paddingBottom:"10px",borderBottom:"1px solid var(--border-default)"}}>
                  <div>
                    <span className="provBadge" style={{marginRight:"8px"}}>{prov.code}</span>
                    <h2 style={{display:"inline",fontSize:"18px"}}>{prov.name}</h2>
                    <div style={{fontSize:"11px",color:"var(--text-secondary)",marginTop:"3px"}}>
                      Provincial Capital: <strong style={{color:"#0A4D3C"}}>{prov.capital}</strong> · Region: {prov.region} · <strong>{prov.districts.length} Official Districts</strong>
                    </div>
                  </div>
                  <span style={{fontSize:"11px",background:"rgba(10,77,60,0.1)",color:"#0A4D3C",padding:"4px 8px",borderRadius:"6px",fontWeight:700}}>
                    {filteredDistricts.length} Districts Displayed
                  </span>
                </header>

                <div className="hierarchyDistrictsGrid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:"12px",marginTop:"12px"}}>
                  {filteredDistricts.map((dist,dIdx)=>(
                    <div key={dIdx} className="hierarchyDistrictBox" style={{background:"var(--surface-card)",border:"1px solid var(--border-default)",borderRadius:"8px",padding:"10px 12px"}}>
                      <div className="distBoxHeader" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
                        <strong style={{fontSize:"13px",color:"var(--text-primary)"}}>📍 {dist.name}</strong>
                        <span className={`distCatBadge ${dist.category}`} style={{fontSize:"9px",textTransform:"uppercase",padding:"2px 6px",borderRadius:"4px",fontWeight:700}}>
                          {dist.category}
                        </span>
                      </div>
                      <ul style={{margin:0,paddingLeft:"14px",fontSize:"11px",color:"var(--text-secondary)",lineHeight:"1.4"}}>
                        {dist.keyDestinations.map((dest,kIdx)=>(
                          <li key={kIdx} style={{marginBottom:"2px"}}>• {dest}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    )}

    {section==="languages"&&(
      <div className="adminGrid">
        <section className="adminEditor">
          <p className="eyebrow" style={{color:"#C86428",fontWeight:800}}>ZAMBIAN PHRASEBOOK & DIALECT MANAGEMENT</p>
          <h1>{phraseForm.id ? "Edit Phrase" : "Add New Zambian Phrase"}</h1>
          <form onSubmit={async (e) => {
            e.preventDefault();
            try {
              const res = await fetch("/api/admin/languages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ zoneCode: selectedAdminLangZone, phrase: phraseForm })
              });
              const json = await res.json();
              if (json.success && json.zones) {
                setLanguageZones([...json.zones]);
                setPhraseForm({ id: "", category: "greetings", english: "", localText: "", phonetic: "", syllables: "", literalMeaning: "", culturalNote: "" });
                setStatus(`✓ Phrase "${phraseForm.localText}" saved successfully.`);
                setTimeout(() => setStatus(""), 4000);
              } else {
                setStatus(`✕ Error: ${json.error}`);
              }
            } catch {
              setStatus(`✕ Failed to save phrase.`);
            }
          }}>
            <label>Target Language Zone
              <select
                value={selectedAdminLangZone}
                onChange={(e) => {
                  setSelectedAdminLangZone(e.target.value);
                  setPhraseForm({ id: "", category: "greetings", english: "", localText: "", phonetic: "", syllables: "", literalMeaning: "", culturalNote: "" });
                }}
              >
                {languageZones.map((z) => (
                  <option key={z.code} value={z.code}>
                    {z.name} ({z.nativeName}) — {z.primaryProvinces.join(", ")}
                  </option>
                ))}
              </select>
            </label>

            <label>Category
              <select
                value={phraseForm.category}
                onChange={(e) => setPhraseForm({ ...phraseForm, category: e.target.value as "greetings" | "safari" | "market" | "navigation" | "emergency" | "culture" })}
              >
                <option value="greetings">👋 Essential Greetings</option>
                <option value="safari">🦁 Safari & Wildlife</option>
                <option value="market">🛍️ Market & Dining</option>
                <option value="navigation">🧭 Directions & Travel</option>
                <option value="emergency">🚨 Emergency & Help</option>
                <option value="culture">👑 Cultural Respect & Royal Protocols</option>
              </select>
            </label>

            <label>English Meaning
              <input
                required
                placeholder="e.g. Good morning / How are you?"
                value={phraseForm.english}
                onChange={(e) => setPhraseForm({ ...phraseForm, english: e.target.value })}
              />
            </label>

            <label>Local Zambian Text
              <input
                required
                placeholder="e.g. Mwashibukeni / Mulibwanji"
                value={phraseForm.localText}
                onChange={(e) => setPhraseForm({ ...phraseForm, localText: e.target.value })}
              />
            </label>

            <div className="adminFields">
              <label>Phonetic Pronunciation
                <input
                  placeholder="e.g. mwah-shee-boo-KEH-nee"
                  value={phraseForm.phonetic}
                  onChange={(e) => setPhraseForm({ ...phraseForm, phonetic: e.target.value })}
                />
              </label>
              <label>Syllable Breakdown
                <input
                  placeholder="e.g. Mwa-shi-bu-ke-ni"
                  value={phraseForm.syllables}
                  onChange={(e) => setPhraseForm({ ...phraseForm, syllables: e.target.value })}
                />
              </label>
            </div>

            <label>Literal Translation / Meaning
              <input
                placeholder="e.g. Have you awoken well?"
                value={phraseForm.literalMeaning}
                onChange={(e) => setPhraseForm({ ...phraseForm, literalMeaning: e.target.value })}
              />
            </label>

            <label>Cultural Etiquette Note
              <textarea
                rows={2}
                placeholder="e.g. Clapping hands gently twice or slight bow indicates deep respect."
                value={phraseForm.culturalNote}
                onChange={(e) => setPhraseForm({ ...phraseForm, culturalNote: e.target.value })}
              />
            </label>

            <div className="adminActions" style={{marginTop:"10px"}}>
              <button type="submit">
                {phraseForm.id ? "Update Phrase" : "Add Phrase to Dictionary"}
              </button>
              {phraseForm.id && (
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setPhraseForm({ id: "", category: "greetings", english: "", localText: "", phonetic: "", syllables: "", literalMeaning: "", culturalNote: "" })}
                >
                  Cancel
                </button>
              )}
              {phraseForm.localText && (
                <button
                  type="button"
                  style={{background:"#0A4D3C",color:"#fff"}}
                  onClick={() => {
                    if (typeof window !== "undefined" && "speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                      const u = new SpeechSynthesisUtterance(phraseForm.localText);
                      u.rate = 0.85;
                      window.speechSynthesis.speak(u);
                    }
                  }}
                >
                  🔊 Test Audio
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="adminList">
          {(() => {
            const currentZone = languageZones.find((z) => z.code === selectedAdminLangZone) || languageZones[0];
            return (
              <div>
                <header style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"10px"}}>
                  <div>
                    <p className="eyebrow" style={{color:"#0A4D3C",fontWeight:800}}>{currentZone.name.toUpperCase()} DICTIONARY</p>
                    <h2>{currentZone.phrases.length} Phrases Configured in {currentZone.name}</h2>
                    <p style={{fontSize:"11px",color:"var(--text-secondary)",margin:"2px 0 0"}}>
                      Spoken across: {currentZone.primaryProvinces.join(", ")} · Speakers: {currentZone.speakerCount}
                    </p>
                  </div>
                  <div style={{display:"flex",gap:"6px",flexWrap:"wrap",alignItems:"center"}}>
                    <input
                      ref={csvFileInputRef}
                      type="file"
                      accept=".csv,text/csv"
                      style={{display:"none"}}
                      onChange={handleCsvUpload}
                    />
                    <a
                      href="/templates/zamroam_languages_template.csv"
                      download="zamroam_languages_template.csv"
                      style={{
                        background:"var(--surface-subtle)",
                        border:"1px solid var(--border-default)",
                        color:"var(--text-primary)",
                        padding:"6px 10px",
                        borderRadius:"6px",
                        fontSize:"11px",
                        fontWeight:600,
                        textDecoration:"none",
                        display:"inline-flex",
                        alignItems:"center",
                        gap:"4px"
                      }}
                    >
                      📥 Download CSV Template
                    </a>
                    <button
                      type="button"
                      onClick={() => csvFileInputRef.current?.click()}
                      style={{
                        background:"#C86428",
                        color:"#fff",
                        border:"none",
                        padding:"6px 12px",
                        borderRadius:"6px",
                        fontSize:"11px",
                        fontWeight:700,
                        cursor:"pointer"
                      }}
                    >
                      📤 Upload CSV / Bulk Import
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhraseForm({ id: "", category: "greetings", english: "", localText: "", phonetic: "", syllables: "", literalMeaning: "", culturalNote: "" })}
                      style={{background:"#0A4D3C",color:"#fff",border:"none",padding:"6px 12px",borderRadius:"6px",fontSize:"11px",fontWeight:700,cursor:"pointer"}}
                    >
                      + Add New Phrase
                    </button>
                  </div>
                </header>

                <div style={{display:"grid",gap:"10px",marginTop:"14px"}}>
                  {currentZone.phrases.map((phrase) => (
                    <div
                      key={phrase.id}
                      style={{
                        background:"var(--surface-card)",
                        border:"1px solid var(--border-default)",
                        borderRadius:"10px",
                        padding:"12px 14px",
                        boxShadow:"0 2px 5px rgba(0,0,0,0.04)",
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"flex-start",
                        gap:"12px"
                      }}
                    >
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                          <span style={{fontSize:"9px",background:"rgba(200,100,40,0.15)",color:"#C86428",padding:"2px 6px",borderRadius:"4px",fontWeight:800,textTransform:"uppercase"}}>
                            {phrase.category}
                          </span>
                          <strong style={{fontSize:"14px",color:"#0A4D3C"}}>{phrase.localText}</strong>
                          <span style={{fontSize:"11px",color:"var(--text-secondary)",fontStyle:"italic"}}>
                            [{phrase.phonetic}]
                          </span>
                        </div>
                        <div style={{fontSize:"12px",color:"var(--text-primary)",fontWeight:600,marginBottom:"3px"}}>
                          🇬🇧 {phrase.english}
                        </div>
                        {phrase.literalMeaning && (
                          <div style={{fontSize:"11px",color:"var(--text-secondary)",marginBottom:"2px"}}>
                            <em>Literal: &quot;{phrase.literalMeaning}&quot;</em> · Syllables: <code>{phrase.syllables}</code>
                          </div>
                        )}
                        {phrase.culturalNote && (
                          <div style={{fontSize:"10px",color:"var(--text-secondary)",background:"rgba(10,77,60,0.04)",padding:"4px 8px",borderRadius:"6px",marginTop:"4px"}}>
                            💡 <strong>Etiquette:</strong> {phrase.culturalNote}
                          </div>
                        )}
                      </div>

                      <div style={{display:"flex",flexDirection:"column",gap:"4px",flexShrink:0}}>
                        <button
                          type="button"
                          onClick={() => {
                            if (typeof window !== "undefined" && "speechSynthesis" in window) {
                              window.speechSynthesis.cancel();
                              const u = new SpeechSynthesisUtterance(phrase.localText);
                              u.rate = 0.85;
                              window.speechSynthesis.speak(u);
                            }
                          }}
                          style={{padding:"4px 8px",fontSize:"10px",background:"var(--surface-subtle)",border:"1px solid var(--border-default)",borderRadius:"4px",cursor:"pointer"}}
                        >
                          🔊 Listen
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPhraseForm({
                              id: phrase.id,
                              category: phrase.category,
                              english: phrase.english,
                              localText: phrase.localText,
                              phonetic: phrase.phonetic,
                              syllables: phrase.syllables || "",
                              literalMeaning: phrase.literalMeaning || "",
                              culturalNote: phrase.culturalNote || ""
                            });
                          }}
                          style={{padding:"4px 8px",fontSize:"10px",background:"#0A4D3C",color:"#fff",border:"none",borderRadius:"4px",cursor:"pointer",fontWeight:700}}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!confirm(`Delete phrase "${phrase.localText}"?`)) return;
                            try {
                              const res = await fetch(`/api/admin/languages?zoneCode=${selectedAdminLangZone}&phraseId=${phrase.id}`, {
                                method: "DELETE"
                              });
                              const json = await res.json();
                              if (json.success && json.zones) {
                                setLanguageZones([...json.zones]);
                                setStatus(`✓ Deleted phrase "${phrase.localText}".`);
                                setTimeout(() => setStatus(""), 3500);
                              }
                            } catch {
                              setStatus("✕ Failed to delete phrase.");
                            }
                          }}
                          style={{padding:"4px 8px",fontSize:"10px",background:"rgba(220,53,69,0.1)",color:"#dc3545",border:"1px solid #dc3545",borderRadius:"4px",cursor:"pointer"}}
                        >
                          ✕ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </section>
      </div>
    )}

    {section==="categories"&&(
      <div className="adminGrid">
        <section className="adminEditor">
          <p className="eyebrow">MANAGE CATEGORIES</p>
          <h1>{categoryForm.id?`Edit Category`:"Add new category"}</h1>
          <form onSubmit={saveCategory}>
            <label>Category Name
              <input required placeholder="e.g. Walking Safari, Waterfalls Expedition, Bush Camp" value={categoryForm.name} onChange={e=>setCategoryForm({...categoryForm,name:e.target.value,slug:categoryForm.id?categoryForm.slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,"-")})}/>
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
              <input required placeholder="e.g. Wilderness Safaris Zambia, Chiawa Safaris, Proflight Zambia, Robin Pope Safaris" value={providerForm.name} onChange={e=>setProviderForm({...providerForm,name:e.target.value,slug:providerForm.id?providerForm.slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,"-")})}/>
            </label>
            <label>Short Identifier (Slug)
              <input required value={providerForm.slug} onChange={e=>setProviderForm({...providerForm,slug:e.target.value})}/>
            </label>
            <div className="adminFields">
              <label>Contact Person / Manager Name
                <input placeholder="e.g. Grant Cumings, Linda Mwape" value={providerForm.contactName||""} onChange={e=>setProviderForm({...providerForm,contactName:e.target.value})}/>
              </label>
              <label>Phone / WhatsApp Number
                <input placeholder="e.g. +260 97 712 3456" value={providerForm.contactPhone||""} onChange={e=>setProviderForm({...providerForm,contactPhone:e.target.value})}/>
              </label>
            </div>
            <div className="adminFields">
              <label>Official Email Address
                <input type="email" placeholder="e.g. info@chiawa.com" value={providerForm.contactEmail||""} onChange={e=>setProviderForm({...providerForm,contactEmail:e.target.value})}/>
              </label>
              <label>Tourism License / ZTA Number
                <input placeholder="e.g. ZTA-2026-084" value={providerForm.licenseNumber||""} onChange={e=>setProviderForm({...providerForm,licenseNumber:e.target.value})}/>
              </label>
            </div>
            <label>Physical Address / Office Location
              <input placeholder="e.g. Plot 42, Safari Way, Kabulonga, Lusaka" value={providerForm.physicalAddress||""} onChange={e=>setProviderForm({...providerForm,physicalAddress:e.target.value})}/>
            </label>
            <label>Official Website / Source URL
              <input placeholder="https://..." value={providerForm.sourceUrl||""} onChange={e=>setProviderForm({...providerForm,sourceUrl:e.target.value})}/>
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
            <div className="provinceGrid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
              {data.providers.map(p=>(
                <div key={p.id} className="provinceCard" style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px", padding: "14px" }}>
                  <div style={{ width: "100%" }}>
                    <b style={{ fontSize: "15px", color: "var(--brand-deep-teal)" }}>{p.name}</b>
                    {p.contactName && <small style={{ display: "block", color: "var(--text-primary)", fontWeight: 600, marginTop: "2px" }}>👤 {p.contactName}</small>}
                    {p.contactPhone && <small style={{ display: "block", color: "var(--text-secondary)" }}>📞 {p.contactPhone}</small>}
                    {p.contactEmail && <small style={{ display: "block", color: "var(--text-secondary)" }}>✉️ {p.contactEmail}</small>}
                    {p.physicalAddress && <small style={{ display: "block", color: "var(--text-secondary)" }}>📍 {p.physicalAddress}</small>}
                    {p.licenseNumber && <small style={{ display: "block", color: "var(--brand-deep-teal)", fontWeight: 700 }}>📋 License: {p.licenseNumber}</small>}
                    {p.sourceUrl && <small style={{ display: "block", marginTop: "4px" }}><a href={p.sourceUrl} target="_blank" rel="noreferrer" style={{ color: "var(--action-primary)", fontWeight: 700 }}>Website ↗</a></small>}
                  </div>
                  <button
                    style={{ alignSelf: "flex-end", marginTop: "4px" }}
                    onClick={()=>setProviderForm({
                      id:p.id,
                      name:p.name,
                      slug:p.name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),
                      contactName:p.contactName||"",
                      contactEmail:p.contactEmail||"",
                      contactPhone:p.contactPhone||"",
                      physicalAddress:p.physicalAddress||"",
                      sourceUrl:p.sourceUrl||"",
                      licenseNumber:p.licenseNumber||""
                    })}
                  >
                    Edit Provider
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )}

    {section==="membership_ecosystem"&&(
      <AdminMembershipConsole
        data={membershipData}
        onRefresh={load}
      />
    )}

    {section==="providers_vetting"&&(
      <AdminProviderVetting
        applications={providerApps}
        onRefresh={()=>{
          fetch("/api/admin/providers").then(async r=>{
            const x=await r.json();
            if(r.ok && x.applications) setProviderApps(x.applications);
          }).catch(()=>{});
          load();
        }}
      />
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

    {section==="operations"&&(
      <section className="adminHierarchySection" style={{ maxWidth: "1400px", margin: "24px auto", padding: "26px" }}>
        <p className="eyebrow">ENTERPRISE PLATFORM OPERATIONS & RESOLUTION</p>
        <h1 style={{ margin: "6px 0 18px", fontSize: "26px" }}>Customer Bookings, Reviews & Dispute Center</h1>
        <AdminOperationsConsole />
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
