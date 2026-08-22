"use client";
import {useCallback,useEffect,useState} from "react";
import CurrencySelector from "./components/CurrencySelector";
import CountrySelector from "./components/CountrySelector";
import TrailMapViewer from "./components/TrailMapViewer";
import FestivalCalendar from "./components/FestivalCalendar";
import DigitalPermitPass from "./components/DigitalPermitPass";
import WantokConcierge from "./components/WantokConcierge";
import TokPisinPhrasebook from "./components/TokPisinPhrasebook";
import ZambianPhrasebook from "./components/ZambianPhrasebook";
import ProviderRegistrationModal from "./components/ProviderRegistrationModal";
import TouristMembershipHub from "./components/TouristMembershipHub";
import ProviderRedemptionTerminal from "./components/ProviderRedemptionTerminal";
import ZambiaInteractiveMap from "./components/ZambiaInteractiveMap";
import { CountryIntroBanner } from "./components/CountryIntroBanner";
import { SecurityAdvisory } from "./components/SecurityAdvisory";
import { Footer } from "./components/Footer";
import { PassLanding } from "./components/PassLanding";
import { PartnerLanding } from "./components/PartnerLanding";
import { AboutPage } from "./components/AboutPage";
import { AiChatModal, FloatingConciergeWidget } from "./components/AiChatModal";
import { ZamRoamLogo, ZamRoamHeroBanner, ZamRoamTrustRibbon } from "./components/ZamRoamEmblem";
import {CurrencyCode, formatPrice} from "../db/currency";
import {PNG_TRAIL_PACKS, ZAMBIA_TRAIL_PACKS} from "../db/trailPacks";
import {PNG_FESTIVALS, ZAMBIA_FESTIVALS} from "../db/festivals";
import type {CountrySettings} from "../db/countries";

type Viewer={signedIn:true;displayName:string;email:string;signOutPath:string}|{signedIn:false;signInPath:string};
type Category={slug:string;name:string;icon:string};
type Listing={id:number;slug:string;name:string;summary:string;imageUrl:string;tag:string;currency:string;basePrice:number;memberPrice:number|null;rating:number;reviewCount:number;destination:string;province:string;categoryName:string;providerName:string;sourceUrl:string|null};
type Catalogue={country?:{id:number;code:string;name:string;currencyCode:string;currencySymbol:string};categories:Category[];listings:Listing[];meta:{count:number}};
type PublicReview={id:number;overallRating:number;valueRating:number|null;serviceRating:number|null;safetyRating:number|null;accessibilityRating:number|null;title:string;body:string;travelType:string|null;dateOfExperience:string|null;verificationType:string;providerResponse:string|null;providerRespondedAt:string|null;createdAt:string;author:string};
type MyReview={id:number;listingId:number;listingName:string;imageUrl:string;overallRating:number;title:string;body:string;verificationType:string;moderationStatus:string;moderationReason:string|null;createdAt:string};
type Booking={id:number;reference:string;status:string;currency:string;subtotal:number;total:number;startDate:string;endDate:string;guestCount:number;contactName:string;contactMobile:string|null;holdExpiresAt:string|null;isTestData:number;createdAt:string;listingId:number;listingName:string;quantity:number;unitPrice:number;imageUrl:string;destination:string;paymentStatus:string|null;paymentProvider:string|null};
type Profile={id:number;email:string;fullName:string|null;preferredName:string|null;mobile:string|null;country:string;preferredLanguage:string;role:string;status:string};
type Audit={action:string;entityType:string;details:string;createdAt:string};
type SavedItem=Listing&{id:number;listingId:number;note:string|null;createdAt:string};
type Wishlist={id:number;name:string;privacy:string;shareCode:string|null;items:SavedItem[]};
type TripItem={id:number;listingId:number|null;title:string;itemType:string;scheduledDate:string;startTime:string|null;endTime:string|null;cost:number;bookingReference:string|null;notes:string|null;position:number;imageUrl:string|null;destination:string|null};
type Trip={id:number;name:string;destination:string;startDate:string;endDate:string;travellerCount:number;budget:number;interests:string|null;notes:string|null;shareCode:string|null;status:string;items:TripItem[];collaborators:{id:number;email:string;role:string;status:string}[]};
type Benefit={id:number;code:string;name:string;description:string;usageLimit:number|null};
type Plan={id:number;code:string;name:string;audience:string;billingPeriod:string;price:number;currency:string;description:string;isComplimentary:number;benefits:Benefit[]};
type MembershipData={plans:Plan[];subscription:null|{id:number;memberNumber:string;status:string;startDate:string;expiryDate:string|null;autoRenew:number;cancelAtPeriodEnd:number;planId:number;planName:string;planCode:string};points:number;history:{token:string;status:string;redeemedAt:string|null;createdAt:string;benefitName:string}[];memberName:string};

export default function VisitPngApp({viewer}:{viewer:Viewer}){
  const[countryCode,setCountryCode]=useState<string>("ZMB");
  const[countrySettings,setCountrySettings]=useState<CountrySettings|null>(null);
  const[data,setData]=useState<Catalogue|null>(null);
  const[error,setError]=useState("");
  const[loading,setLoading]=useState(true);
  const[q,setQ]=useState("");
  const[searchOpen,setSearchOpen]=useState(false);
  const[category,setCategory]=useState("all");
  const[selected,setSelected]=useState<Listing|null>(null);
  const[saveListing,setSaveListing]=useState<Listing|null>(null);
  const[bookingListing,setBookingListing]=useState<Listing|null>(null);
  const[reviewListing,setReviewListing]=useState<Listing|null>(null);
  const[tab,setTab]=useState<"Explore"|"Bookings"|"Reviews"|"Saved"|"Trips"|"Membership"|"Profile">("Explore");
  const[currency,setCurrency]=useState<CurrencyCode>("ZMW");
  const[exploreMode,setExploreMode]=useState<"places"|"map"|"wantok"|"phrasebook"|"security"|"festivals"|"permits"|"trails">("places");
  const[showProviderModal,setShowProviderModal]=useState(false);
  const[showRedemptionTerminal,setShowRedemptionTerminal]=useState(false);
  const[showPassModal,setShowPassModal]=useState(false);
  const[showPartnerModal,setShowPartnerModal]=useState(false);
  const[showAboutModal,setShowAboutModal]=useState(false);
  const[showAiChatModal,setShowAiChatModal]=useState(false);

  useEffect(()=>{
    if(new URLSearchParams(window.location.search).has("wishlist"))setTab("Saved");
    try{
      setCountryCode("ZMB");
      const savedCurr=localStorage.getItem("zamroam_currency")as CurrencyCode|null;
      if(savedCurr&&["ZMW","USD","EUR","GBP","AUD","JPY"].includes(savedCurr)) {
        setCurrency(savedCurr);
      } else {
        setCurrency("ZMW");
        try{localStorage.setItem("zamroam_currency","ZMW")}catch{}
      }
    }catch{}
  },[]);

  const[debouncedQ,setDebouncedQ]=useState(q);

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setDebouncedQ(q);
    },250);
    return()=>clearTimeout(timer);
  },[q]);

  const handleCountryChange=(newCountry:string)=>{
    const normalized=newCountry.toUpperCase();
    setCountryCode(normalized);
    try{localStorage.setItem("visit_country",normalized)}catch{}
    setCurrency("ZMW" as CurrencyCode);
    try{localStorage.setItem("zamroam_currency","ZMW")}catch{}
  };

  const handleCurrencyChange=(newCurr:CurrencyCode)=>{
    setCurrency(newCurr);
    try{localStorage.setItem("zamroam_currency",newCurr)}catch{}
  };

  const load=useCallback(async(signal?:AbortSignal)=>{
    setError("");
    try{
      const [catRes, countryRes] = await Promise.all([
        fetch(`/api/catalogue?q=${encodeURIComponent(debouncedQ)}&category=${encodeURIComponent(category)}&country=ZMB`,{signal}),
        fetch(`/api/countries?code=ZMB`,{signal})
      ]);
      if(!catRes.ok)throw new Error();
      const payload:Catalogue=await catRes.json();
      setData(payload);

      if(countryRes.ok){
        const cData=await countryRes.json();
        if(cData.country?.settings)setCountrySettings(cData.country.settings);
      }
    }catch(err){
      if(signal?.aborted)return;
      setError("Catalogue items could not be loaded. Check your connection or try again.");
    }finally{
      setLoading(false);
    }
  },[category,debouncedQ]);

  useEffect(()=>{
    const ctrl=new AbortController();
    load(ctrl.signal);
    return()=>ctrl.abort();
  },[load]);

  const heroEyebrow = countrySettings?.heroEyebrow || "THE REAL AFRICA";
  const heroTitle = countrySettings?.heroTitle ? (
    <span style={{whiteSpace:"pre-line"}}>{countrySettings.heroTitle}</span>
  ) : (
    <>Discover the wonders<br/>of Zambia.</>
  );
  const heroSubtitle = countrySettings?.heroSubtitle || "Experience the majestic Victoria Falls, world-class walking safaris in South Luangwa, and legendary African hospitality.";

  const isZambia = countryCode === "ZMB";
  const activeFestivals = ZAMBIA_FESTIVALS;
  const activeTrails = ZAMBIA_TRAIL_PACKS;

  const switcherNav = (
    <div className="exploreModeSwitcher">
      <button className={exploreMode==="places"?"active":""} onClick={()=>setExploreMode("places")}>🌴 Places & Stays</button>
      <button className={exploreMode==="map"?"active":""} onClick={()=>setExploreMode("map")}>🗺️ Interactive Map</button>
      <button className={exploreMode==="wantok"?"active":""} onClick={()=>setExploreMode("wantok")}>{isZambia ? "🦁 Safari AI" : "🤖 Wantok AI"}</button>
      <button className={exploreMode==="security"?"active":""} onClick={()=>setExploreMode("security")}>🛡️ SafeTravel</button>
      <button className={exploreMode==="phrasebook"?"active":""} onClick={()=>setExploreMode("phrasebook")}>{isZambia ? "🗣️ Local Phrases" : "🗣️ Tok Pisin"}</button>
      <button className={exploreMode==="festivals"?"active":""} onClick={()=>setExploreMode("festivals")}>{isZambia ? `🎭 Ceremonies (${activeFestivals.length})` : `🎭 Festivals (${activeFestivals.length})`}</button>
      <button className={exploreMode==="permits"?"active":""} onClick={()=>setExploreMode("permits")}>{isZambia ? "🎫 Park Permits" : "🎫 Permits"}</button>
      <button className={exploreMode==="trails"?"active":""} onClick={()=>setExploreMode("trails")}>{isZambia ? `🗺️ Safari Trails (${activeTrails.length})` : `🗺️ Trails (${activeTrails.length})`}</button>
      <button className="partnerRegisterPill" onClick={()=>setShowProviderModal(true)}>🤝 Partner / Register Service</button>
    </div>
  );

  return <main className="app">
    <Header viewer={viewer} profile={()=>setTab("Profile")} currency={currency} onCurrencyChange={handleCurrencyChange} countryCode={countryCode} onCountryChange={handleCountryChange}/>
    {tab==="Explore"?<>
      <section className="hero">
        <p className="eyebrow lime">{heroEyebrow}</p>
        <h1>{heroTitle}</h1>
        <p>{heroSubtitle}</p>
        <div className="search">
          <label htmlFor="catalogue-search">Where do you want to go in {countryCode === "ZMB" ? "Zambia" : "PNG"}?</label>
          <div>
            <span>⌕</span>
            <input id="catalogue-search" value={q} onFocus={()=>setSearchOpen(true)} onBlur={()=>setTimeout(()=>setSearchOpen(false),150)} onChange={e=>{setQ(e.target.value);setSearchOpen(true)}} placeholder={countryCode === "ZMB" ? "Search Livingstone, Victoria Falls, South Luangwa or Stays" : "Search places, provinces or experiences"} autoComplete="off"/>
            <button aria-label="Clear search" onClick={()=>{setQ("");setSearchOpen(false)}}>×</button>
          </div>
          {searchOpen&&q.trim()&&data&&<div className="suggestions" role="listbox" aria-label="Search suggestions">
            {data.listings.slice(0,5).map(place=><button key={place.id} role="option" onMouseDown={e=>e.preventDefault()} onClick={()=>{setQ(place.name);setSearchOpen(false)}}><strong>{place.name}</strong><span>{place.destination} · {place.province}</span></button>)}
            {!loading&&data.listings.length===0&&<p>No matching suggestions yet</p>}
          </div>}
          <nav>
            <button className={category==="all"&&exploreMode==="places"?"selectedFilter":""} onClick={()=>{setCategory("all");setExploreMode("places")}}>All places</button>
            <button className={exploreMode==="map"?"selectedFilter":""} onClick={()=>setExploreMode("map")}>🗺️ Interactive Map</button>
            <button className={exploreMode==="wantok"?"selectedFilter":""} onClick={()=>setExploreMode("wantok")}>{isZambia ? "🦁 Safari AI" : "🤖 Wantok AI"}</button>
            <button className={exploreMode==="security"?"selectedFilter":""} onClick={()=>setExploreMode("security")}>🛡️ SafeTravel</button>
            <button className={exploreMode==="phrasebook"?"selectedFilter":""} onClick={()=>setExploreMode("phrasebook")}>{isZambia ? "🗣️ Local Phrases" : "🗣️ Tok Pisin"}</button>
            <button className={exploreMode==="festivals"?"selectedFilter":""} onClick={()=>setExploreMode("festivals")}>{isZambia ? "🎭 Ceremonies" : "🎭 Festivals"}</button>
            <button className={exploreMode==="permits"?"selectedFilter":""} onClick={()=>setExploreMode("permits")}>{isZambia ? "🎫 Park Permits" : "🎫 Permits"}</button>
            <button className={exploreMode==="trails"?"selectedFilter":""} onClick={()=>setExploreMode("trails")}>{isZambia ? "🗺️ Safari Trails" : "🗺️ Trails"}</button>
          </nav>
        </div>
      </section>

      {exploreMode==="places"?<section className="content">
        {switcherNav}
        <ZamRoamHeroBanner
          onSelectCategory={(slug)=>setCategory(slug)}
          onOpenMap={()=>setExploreMode("map")}
          onOpenPass={()=>setShowPassModal(true)}
        />
        <CountryIntroBanner countryCode={countryCode}/>
        <div className="cats">
          {data?.categories.map(c=><button key={c.slug} className={category===c.slug?"active":""} onClick={()=>setCategory(category===c.slug?"all":c.slug)}><span>{c.icon}</span>{c.name}</button>)}
        </div>
        <div className="title">
          <div><p className="eyebrow">PLACES TO EXPLORE IN {countryCode === "ZMB" ? "ZAMBIA" : "PAPUA NEW GUINEA"}</p><h2>{q?`Results for “${q}”`:"Discover something remarkable"}</h2></div>
          {data&&<span className="resultCount">{data.meta.count} found</span>}
        </div>
        {(!data && loading)?<Loading/>:(!data && error)?<ErrorState message={error} retry={()=>load()}/>:data&&data.listings.length?<div className="cards">
          {data.listings.map(p=><Card key={p.id} listing={p} currency={currency} open={setSelected} save={()=>viewer.signedIn?setSaveListing(p):setTab("Profile")}/>)}
        </div>:<Empty clear={()=>{setQ("");setCategory("all")}}/>}
        <ModuleStatus openReviews={()=>setTab("Reviews")}/>
      </section>:exploreMode==="map"?<section className="content mapContentSection">
        {switcherNav}
        <div style={{ marginTop: "16px" }}>
          <ZambiaInteractiveMap onSelectDestination={(slug)=>{setQ(slug.replace(/-/g," "));setExploreMode("places");window.scrollTo({ top: 400, behavior: "smooth" });}}/>
        </div>
      </section>:exploreMode==="wantok"?<section className="content wantokContentSection">
        {switcherNav}
        <WantokConcierge currency={currency} countryCode={countryCode} onOpenTrips={()=>setTab("Trips")}/>
      </section>:exploreMode==="security"?<section className="content securityContentSection">
        {switcherNav}
        <SecurityAdvisory countryCode={countryCode}/>
      </section>:exploreMode==="phrasebook"?<section className="content phrasebookContentSection">
        {switcherNav}
        {isZambia ? <ZambianPhrasebook/> : <TokPisinPhrasebook/>}
      </section>:exploreMode==="festivals"?<section className="content festivalContentSection">
        {switcherNav}
        <div className="title">
          <div><p className="eyebrow lime">{isZambia ? "TRADITIONAL CEREMONIES & ROYAL PAGEANTS" : "ANNUAL SINGSING & CULTURAL SHOWS"}</p><h2>{isZambia ? "Zambia Cultural Ceremony Calendar" : "Cultural Festival Calendar"}</h2></div>
          <span className="resultCount">{activeFestivals.length} {isZambia ? "royal ceremonies" : "major festivals"}</span>
        </div>
        <p className="trailsIntro">
          {isZambia
            ? "Explore verified dates for Kuomboka, Nc'wala, Likumbi Lya Mize, cultural etiquette, and access passes."
            : "Explore verified schedules, tribe traditions, photography etiquette, and reserve official festival entry passes with 100% offline access."}
        </p>
        <FestivalCalendar currency={currency} countryCode={countryCode}/>
      </section>:exploreMode==="permits"?<section className="content permitsContentSection">
        {switcherNav}
        <DigitalPermitPass currency={currency} countryCode={countryCode}/>
      </section>:<section className="content trailsContentSection">
        {switcherNav}
        <div className="title">
          <div><p className="eyebrow lime">{isZambia ? "SAFARI & WILDERNESS TRAILS" : "WILDERNESS & ADVENTURE MAPS"}</p><h2>{isZambia ? "Safari Walking & River Trail Packs" : "Expedition & Trail Packs"}</h2></div>
          <span className="resultCount">{activeTrails.length} ready</span>
        </div>
        <p className="trailsIntro">
          {isZambia
            ? "Download topographic trail packs, Luangwa walking safari maps, and Victoria Falls GPX waypoints to explore safely."
            : "Download topographic trail packs, elevation profiles, campsite waypoints, and GPX coordinates to navigate safely in Papua New Guinea without cellular reception."}
        </p>
        <div className="trailPacksGrid">
          {activeTrails.map(trail=><TrailMapViewer key={trail.id} trail={trail}/>)}
        </div>
      </section>}
    </>:tab==="Bookings"?<BookingsScreen viewer={viewer} currency={currency}/>:tab==="Reviews"?<ReviewsScreen viewer={viewer}/>:tab==="Saved"?<SavedScreen viewer={viewer}/>:tab==="Trips"?<TripsScreen viewer={viewer} currency={currency}/>:tab==="Membership"?<TouristMembershipHub countryCode={countryCode} viewer={viewer} currency={currency} onOpenRedemptionTerminal={()=>setShowRedemptionTerminal(true)}/>:<ProfileScreen viewer={viewer}/>}
    <Footer
      countryCode={countryCode}
      brandName={countryCode === "ZMB" ? "ZamRoam" : "VisitPNG"}
      tagline={countryCode === "ZMB" ? "Roam Zambia. Experience More." : "The Land of a Million Journeys"}
      legalOwner="Lamton Investments Ltd"
      onOpenPass={() => setShowPassModal(true)}
      onOpenPartnerRegistration={() => setShowPartnerModal(true)}
      onOpenAbout={() => setShowAboutModal(true)}
      onSelectCategory={(slug) => {
        setTab("Explore");
        setExploreMode("places");
        setCategory(slug);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onOpenDeals={() => {
        setTab("Membership");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onOpenDestinations={() => {
        setTab("Explore");
        setExploreMode("places");
        setCategory("all");
        setQ("");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onOpenMap={() => {
        setTab("Explore");
        setExploreMode("map");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onOpenMembershipHub={() => {
        setTab("Membership");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    />
    <Bottom tab={tab} setTab={setTab}/>
    {selected&&<Details listing={selected} currency={currency} close={()=>setSelected(null)} book={()=>{setSelected(null);viewer.signedIn?setBookingListing(selected):setTab("Profile")}} review={()=>{setSelected(null);viewer.signedIn?setReviewListing(selected):setTab("Profile")}}/>}
    {reviewListing&&viewer.signedIn&&<ReviewSheet listing={reviewListing} close={()=>setReviewListing(null)} done={()=>{setReviewListing(null);setTab("Reviews")}}/>}
    {bookingListing&&viewer.signedIn&&<BookingSheet listing={bookingListing} currency={currency} close={()=>setBookingListing(null)} openBookings={()=>{setBookingListing(null);setTab("Bookings")}}/>}
    {saveListing&&viewer.signedIn&&<SaveSheet listing={saveListing} close={()=>setSaveListing(null)}/>}
    {showProviderModal&&<ProviderRegistrationModal countryCode={countryCode} onClose={()=>setShowProviderModal(false)}/>}
    {showRedemptionTerminal&&<ProviderRedemptionTerminal countryCode={countryCode} onClose={()=>setShowRedemptionTerminal(false)} currency={currency}/>}
    {showPassModal&&<div className="overlay" onClick={()=>setShowPassModal(false)}><div className="sheet" style={{maxWidth:"1100px",width:"95vw",maxHeight:"90vh",overflowY:"auto",padding:0}} onClick={e=>e.stopPropagation()}><PassLanding countryCode={countryCode} currency={currency} onClose={()=>setShowPassModal(false)}/></div></div>}
    {showPartnerModal&&<div className="overlay" onClick={()=>setShowPartnerModal(false)}><div className="sheet" style={{maxWidth:"1100px",width:"95vw",maxHeight:"90vh",overflowY:"auto",padding:0}} onClick={e=>e.stopPropagation()}><PartnerLanding countryCode={countryCode} currency={currency} onOpenRegister={()=>{setShowPartnerModal(false);setShowProviderModal(true);}} onClose={()=>setShowPartnerModal(false)}/></div></div>}
    {showAboutModal&&<div className="overlay" onClick={()=>setShowAboutModal(false)}><div className="sheet" style={{maxWidth:"900px",width:"95vw",maxHeight:"90vh",overflowY:"auto",padding:0}} onClick={e=>e.stopPropagation()}><AboutPage countryCode={countryCode} onClose={()=>setShowAboutModal(false)}/></div></div>}
    <FloatingConciergeWidget onOpenAiChat={()=>setShowAiChatModal(true)}/>
    <AiChatModal
      isOpen={showAiChatModal}
      onClose={()=>setShowAiChatModal(false)}
      countryCode={countryCode}
      brandName={countryCode === "ZMB" ? "ZamRoam" : "VisitPNG"}
      supportPhone="+260 573 506 598"
    />
  </main>;
}

function Header({viewer,profile,currency,onCurrencyChange,countryCode}:{viewer:Viewer;profile:()=>void;currency:CurrencyCode;onCurrencyChange:(c:CurrencyCode)=>void;countryCode:string;onCountryChange?:(c:string)=>void}){
  const initials=viewer.signedIn?viewer.displayName.split(/\s|@/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase():"GU";
  return <header>
    <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center" }}>
      <ZamRoamLogo size="small" showTagline={false} />
    </button>
    {viewer.signedIn&&<div className="headerWelcome"><small>Welcome</small><strong>{viewer.displayName}</strong></div>}
    <nav>
      <span className="destinationPill">🇿🇲 Zambia</span>
      <CurrencySelector currentCurrency={currency} onChange={onCurrencyChange}/>
      {viewer.signedIn?<button className="avatar" onClick={profile}>{initials}</button>:<a className="signInMini" href={viewer.signInPath}>Sign in</a>}
    </nav>
  </header>;
}

function ProfileScreen({viewer}:{viewer:Viewer}){
  if(!viewer.signedIn)return <section className="accountGuest">
    <div className="accountMark">🇿🇲</div>
    <p className="eyebrow">YOUR ACCOUNT</p>
    <h1>Your journeys, in one secure place.</h1>
    <p>Sign in to create your traveller profile. Use your Visit Zambia account to keep your journeys and safari plans together.</p>
    <a href={viewer.signInPath}>Sign in to Visit Zambia</a>
    <small>You can still browse places without signing in.</small>
  </section>;
  return <AccountForm viewer={viewer}/>;
}

function MembershipScreen({viewer,currency}:{viewer:Viewer;currency:CurrencyCode}){
  const[data,setData]=useState<MembershipData|null>(null);
  const[status,setStatus]=useState("Loading membership…");
  const load=useCallback(()=>{
    if(!viewer.signedIn)return;
    fetch("/api/membership")
      .then(r=>{if(!r.ok)throw new Error();return r.json()})
      .then(x=>{setData(x);setStatus("")})
      .catch(()=>setStatus("Membership could not be loaded."));
  },[viewer]);
  useEffect(()=>load(),[load]);
  const testPay=async(id:number)=>{
    setStatus("Trying the practice payment…");
    const r=await fetch("/api/bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"testMembership",subscriptionId:id})});
    const x=await r.json();
    if(r.ok){
      setStatus("Practice payment finished. No real money was charged.");
      load();
    } else setStatus(x.error||"The practice payment did not work.");
  };
  const act=async(body:Record<string,unknown>)=>{
    setStatus("Saving…");
    const r=await fetch("/api/membership",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    const x=await r.json();
    if(r.ok){setData(x);setStatus("Membership saved.")}else setStatus(x.error||"Membership update failed.");
  };
  if(!viewer.signedIn)return <section className="accountGuest"><div className="accountMark">★</div><p className="eyebrow">MEMBERSHIP</p><h1>More access. More PNG.</h1><p>Sign in to compare plans, manage your membership card and track reward points.</p><a href={viewer.signInPath}>Sign in to view membership</a></section>;
  const currentPlan=data?.plans.find(p=>p.id===data.subscription?.planId);
  const usable=data?.subscription&&["active","complimentary"].includes(data.subscription.status);
  return <section className="saved membershipPage">
    <p className="eyebrow">MEMBERSHIP & LOYALTY</p>
    <h1>Belong to every journey.</h1>
    <p>Choose the membership that suits you. Practice payments never charge real money.</p>
    {status&&<p className="formStatus" aria-live="polite">{status}</p>}
    {data?.subscription&&<article className="memberCard">
      <div className="memberCardTop"><span>VISIT PNG</span><b>{data.subscription.status.replaceAll("_"," ")}</b></div>
      <p>MEMBER</p>
      <h2>{data.memberName}</h2>
      <strong>{data.subscription.memberNumber}</strong>
      <div className="memberCardBottom"><span>{data.subscription.planName}</span><span>{data.subscription.expiryDate?`Valid to ${new Date(data.subscription.expiryDate).toLocaleDateString()}`:"No expiry"}</span></div>
      <div className="memberCode" aria-label={`Membership member code ${data.subscription.memberNumber}`}><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
    </article>}
    <div className="loyaltySummary">
      <div><small>Reward balance</small><strong>{data?.points??0}</strong><span>points</span></div>
      <p>Earn more points through eligible bookings, renewals, trips and reviews.</p>
    </div>
    <div className="plans">
      <div className="title"><div><p className="eyebrow">MEMBERSHIP OPTIONS</p><h2>Choose your membership</h2></div></div>
      {data?.plans.map(plan=><article className={`planCard ${data.subscription?.planId===plan.id?"current":""}`} key={plan.id}>
        <header><div><small>{plan.audience} · {plan.billingPeriod}</small><h2>{plan.name}</h2></div><strong>{plan.price?formatPrice(plan.price, currency):"Free"}<small>{plan.price?`/${plan.billingPeriod}`:""}</small></strong></header>
        <p>{plan.description}</p>
        <ul>{plan.benefits.map(b=><li key={b.id}><span>✓</span><div><b>{b.name}</b><small>{b.description}</small></div></li>)}</ul>
        <button disabled={data.subscription?.planId===plan.id&&data.subscription.status!=="cancelled"} onClick={()=>confirm(plan.price?"Choose this membership? It will wait for a practice payment, and no real money will be taken.":"Start this free membership?")&&act({action:"select",planId:plan.id})}>{data.subscription?.planId===plan.id?"Current plan":plan.price?"Select plan":"Activate free plan"}</button>
      </article>)}
    </div>
    {data?.subscription&&<section className="benefitsPanel">
      <div className="title"><div><p className="eyebrow">CURRENT BENEFITS</p><h2>{usable?"Ready when you are":"Choose a membership first"}</h2></div></div>
      {data.subscription.status==="payment_due"&&<aside className="membershipNotice"><b>Practice payment needed</b><p>Your plan choice is saved. Try the practice payment below. No real money is charged.</p><button onClick={()=>data.subscription&&testPay(data.subscription.id)}>Try practice payment</button></aside>}
      <div className="benefitGrid">{currentPlan?.benefits.map(b=><article key={b.id}><b>{b.name}</b><p>{b.description}</p><button disabled={!usable} onClick={()=>act({action:"benefit",benefitId:b.id})}>Use this benefit</button></article>)}</div>
      {data.history.length>0&&<div className="tokenHistory"><h3>Benefits used</h3>{data.history.map(x=><div key={x.token}><span>{x.benefitName}</span><code>{x.token}</code><small>{x.status}</small></div>)}</div>}
      <button className="cancelMembership" onClick={()=>confirm("Cancel this membership?")&&act({action:"cancel"})}>Cancel membership</button>
    </section>}
  </section>;
}

function TripsScreen({viewer,currency}:{viewer:Viewer;currency:CurrencyCode}){
  const[trips,setTrips]=useState<Trip[]>([]);
  const[active,setActive]=useState(0);
  const[status,setStatus]=useState("Loading trips…");
  const[form,setForm]=useState({name:"",destination:"",startDate:"",endDate:"",travellerCount:"1",budget:"",interests:""});
  const[item,setItem]=useState({title:"",itemType:"activity",scheduledDate:"",startTime:"",endTime:"",cost:"",bookingReference:"",notes:""});
  const load=useCallback(()=>{
    if(!viewer.signedIn)return;
    fetch("/api/trips")
      .then(r=>{if(!r.ok)throw new Error();return r.json()})
      .then(x=>{setTrips(x.trips||[]);setStatus("")})
      .catch(()=>setStatus("Trips could not be loaded."));
  },[viewer]);
  useEffect(()=>load(),[load]);
  const mutate=async(method:string,body:Record<string,unknown>)=>{
    setStatus("Saving…");
    const r=await fetch("/api/trips",{method,headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    const x=await r.json();
    if(r.ok){setTrips(x.trips);setStatus("Trip saved.")}else setStatus(x.error||"Trip update failed.");
  };
  if(!viewer.signedIn)return <section className="accountGuest"><div className="accountMark">▣</div><p className="eyebrow">YOUR TRIPS</p><h1>Turn inspiration into a journey.</h1><p>Sign in to build day-by-day itineraries, budgets and shared travel plans.</p><a href={viewer.signInPath}>Sign in to plan a trip</a></section>;
  const current=trips.find(t=>t.id===active)||trips[0];
  const dates=current?Array.from({length:Math.min(60,Math.max(1,Math.floor((new Date(current.endDate).getTime()-new Date(current.startDate).getTime())/86400000)+1))},(_,i)=>new Date(new Date(current.startDate+"T00:00:00").getTime()+i*86400000).toISOString().slice(0,10)):[];
  const spent=current?.items.reduce((n,x)=>n+x.cost,0)||0;
  const download=()=>{
    if(!current)return;
    const blob=new Blob([JSON.stringify({generatedAt:new Date().toISOString(),trip:current},null,2)],{type:"application/json"});
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download=`${current.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-saved-trip.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const hasConflict=(dayItems:TripItem[],i:TripItem)=>{
    const st=i.startTime;
    const et=i.endTime;
    if(!st||!et)return false;
    return dayItems.some(o=>o.id!==i.id&&o.startTime&&o.endTime&&((st>=o.startTime&&st<o.endTime)||(et>o.startTime&&et<=o.endTime)));
  };
  return <section className="saved tripsPage">
    <p className="eyebrow">TRIP PLANNER</p>
    <h1>Plan the whole journey.</h1>
    <p>Create a trip, shape each day, track estimated costs and bring others into the plan.</p>
    <form className="tripCreate" onSubmit={e=>{e.preventDefault();mutate("POST",{action:"create",...form});setForm({name:"",destination:"",startDate:"",endDate:"",travellerCount:"1",budget:"",interests:""})}}>
      <input required placeholder="Trip name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
      <input required placeholder="Destination" value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})}/>
      <label>Starts<input required type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})}/></label>
      <label>Ends<input required type="date" min={form.startDate} value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/></label>
      <input type="number" min="1" aria-label="Travellers" placeholder="Travellers" value={form.travellerCount} onChange={e=>setForm({...form,travellerCount:e.target.value})}/>
      <input type="number" min="0" aria-label="Budget in kina" placeholder="Budget (K)" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}/>
      <input className="wide" placeholder="Interests, comma separated" value={form.interests} onChange={e=>setForm({...form,interests:e.target.value})}/>
      <button className="wide">Create trip</button>
    </form>
    {status&&<p className="formStatus" aria-live="polite">{status}</p>}
    {trips.length>0&&<div className="tripTabs">{trips.map(t=><button key={t.id} className={current?.id===t.id?"active":""} onClick={()=>setActive(t.id)}><strong>{t.name}</strong><small>{t.startDate} → {t.endDate}</small></button>)}</div>}
    {current?<><div className="tripHero">
      <p className="eyebrow">{current.status.toUpperCase()} · {current.destination}</p>
      <h2>{current.name}</h2>
      <div className="tripStats"><span><b>{current.travellerCount}</b> travellers</span><span><b>{current.items.length}</b> plans</span><span><b>{formatPrice(spent, currency)}</b> of {formatPrice(current.budget, currency)}</span></div>
      <progress value={spent} max={Math.max(current.budget,spent,1)}/>
      <div className="tripTools">
        <button onClick={()=>{const value=prompt("Update trip budget (K)",String(current.budget));if(value!==null)mutate("PATCH",{tripId:current.id,budget:Number(value)})}}>Budget</button>
        <button onClick={()=>{const email=prompt("Travel companion email");if(email){const role=prompt("Role: view, comment, suggest or edit","view")||"view";mutate("POST",{action:"invite",tripId:current.id,email,role})}}}>Invite</button>
        <button onClick={download}>Save trip copy</button>
        <button onClick={()=>confirm("Delete this trip?")&&mutate("DELETE",{tripId:current.id})}>Delete</button>
      </div>
      {current.collaborators.length>0&&<p className="collaborators">Travelling with {current.collaborators.map(c=>`${c.email} (${c.role})`).join(", ")}</p>}
    </div>
    <form className="itemCreate" onSubmit={e=>{e.preventDefault();mutate("POST",{action:"addItem",tripId:current.id,...item});setItem({...item,title:"",cost:"",bookingReference:"",notes:""})}}>
      <h2>Add to the itinerary</h2>
      <input required placeholder="Activity, meal, transport or free time" value={item.title} onChange={e=>setItem({...item,title:e.target.value})}/>
      <select value={item.itemType} onChange={e=>setItem({...item,itemType:e.target.value})}><option value="activity">Activity</option><option value="accommodation">Accommodation</option><option value="transport">Transport</option><option value="meal">Meal</option><option value="free_time">Free time</option><option value="personal">Personal</option></select>
      <input required type="date" min={current.startDate} max={current.endDate} value={item.scheduledDate} onChange={e=>setItem({...item,scheduledDate:e.target.value})}/>
      <input aria-label="Start time" type="time" value={item.startTime} onChange={e=>setItem({...item,startTime:e.target.value})}/>
      <input aria-label="End time" type="time" value={item.endTime} onChange={e=>setItem({...item,endTime:e.target.value})}/>
      <input type="number" min="0" placeholder="Estimated cost (K)" value={item.cost} onChange={e=>setItem({...item,cost:e.target.value})}/>
      <input placeholder="Booking reference" value={item.bookingReference} onChange={e=>setItem({...item,bookingReference:e.target.value})}/>
      <input className="wide" placeholder="Notes (optional)" value={item.notes} onChange={e=>setItem({...item,notes:e.target.value})}/>
      <button className="wide">Add to itinerary</button>
    </form>
    <div className="itinerary">
      {dates.map((date,dIdx)=>{
        const dayItems=current.items.filter(x=>x.scheduledDate===date);
        return <section key={date} className="itineraryDay">
          <header><b>Day {dIdx+1} · {new Date(date+"T00:00:00").toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})}</b><small>{dayItems.length} planned</small></header>
          {dayItems.length?<div className="planList">
            {dayItems.map(p=>{
              const conflict=hasConflict(dayItems,p);
              return <article key={p.id} className={`planItem ${conflict?"conflict":""}`}>
                <time>{p.startTime||"Anytime"}</time>
                <div>
                  <h3>{p.title}</h3>
                  {p.endTime&&<small>Until {p.endTime}</small>}
                  {p.cost>0&&<small>{formatPrice(p.cost, currency)}</small>}
                  {p.bookingReference&&<small>Ref: {p.bookingReference}</small>}
                  {p.notes&&<p>{p.notes}</p>}
                  {conflict&&<em>Schedule conflict</em>}
                </div>
                <div className="planActions"><button onClick={()=>mutate("DELETE",{itemId:p.id})}>Delete</button></div>
              </article>;
            })}
          </div>:<p className="freeDay">No activities scheduled yet.</p>}
        </section>;
      })}
    </div></>:<div className="empty compact"><h2>No trips planned yet</h2><p>Create your first trip above to begin planning.</p></div>}
  </section>;
}

function SavedScreen({viewer}:{viewer:Viewer}){
  const[lists,setLists]=useState<Wishlist[]>([]);
  const[active,setActive]=useState(0);
  const[status,setStatus]=useState("Loading wishlists…");
  const[newListName,setNewListName]=useState("");
  const[trips,setTrips]=useState<Trip[]>([]);
  const load=useCallback(()=>{
    if(!viewer.signedIn){
      try{
        const cached=localStorage.getItem("visitpng-wishlists");
        if(cached)setLists(JSON.parse(cached));
      }catch{}
      return;
    }
    fetch("/api/wishlists")
      .then(r=>{if(!r.ok)throw new Error();return r.json()})
      .then(x=>{
        setLists(x.wishlists||[]);
        localStorage.setItem("visitpng-wishlists",JSON.stringify(x.wishlists||[]));
        setStatus("");
      })
      .catch(()=>{
        try{
          const cached=localStorage.getItem("visitpng-wishlists");
          if(cached)setLists(JSON.parse(cached));
        }catch{}
        setStatus("Wishlists loaded from offline cache.");
      });
    fetch("/api/trips").then(r=>r.json()).then(x=>setTrips(x.trips||[])).catch(()=>{});
  },[viewer]);
  useEffect(()=>load(),[load]);
  const mutate=async(method:string,body:Record<string,unknown>)=>{
    setStatus("Saving…");
    const r=await fetch("/api/wishlists",{method,headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
    const x=await r.json();
    if(r.ok){
      setLists(x.wishlists);
      localStorage.setItem("visitpng-wishlists",JSON.stringify(x.wishlists));
      setStatus("Wishlist saved.");
    } else setStatus(x.error||"Wishlist update failed.");
  };
  const addToTrip=async(item:SavedItem)=>{
    if(!trips.length){
      alert("Please create a trip first in the Trips tab.");
      return;
    }
    const trip=trips[0];
    const r=await fetch("/api/trips",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"addItem",tripId:trip.id,listingId:item.listingId,title:item.name,scheduledDate:trip.startDate,cost:item.memberPrice??item.basePrice})});
    if(r.ok)setStatus(`Added ${item.name} to ${trip.name}.`);
    else setStatus("Could not add to trip.");
  };
  const copyShare=(code:string|null)=>{
    if(!code)return;
    const url=`${window.location.origin}?wishlist=${code}`;
    navigator.clipboard.writeText(url);
    setStatus("Share link copied to clipboard.");
  };
  if(!viewer.signedIn)return <section className="accountGuest"><div className="accountMark">♡</div><p className="eyebrow">YOUR SAVED PLACES</p><h1>Keep track of where you want to go.</h1><p>Sign in to save places across multiple wishlists, take notes and share with travel companions.</p><a href={viewer.signInPath}>Sign in to view saved</a></section>;
  const current=lists.find(l=>l.id===active)||lists[0];
  return <section className="saved">
    <p className="eyebrow">SAVED PLACES</p>
    <h1>Your PNG wishlists.</h1>
    <p>Organise places into custom wishlists, add travel notes and move places between lists.</p>
    <form className="newList" onSubmit={e=>{e.preventDefault();if(newListName.trim()){mutate("POST",{action:"create",name:newListName.trim()});setNewListName("")}}}>
      <input placeholder="New wishlist name" value={newListName} onChange={e=>setNewListName(e.target.value)}/>
      <button type="submit">Create list</button>
    </form>
    {status&&<p className="formStatus" aria-live="polite">{status}</p>}
    {lists.length>0&&<div className="listTabs">{lists.map(l=><button key={l.id} className={current?.id===l.id?"active":""} onClick={()=>setActive(l.id)}><span>{l.name}</span> <b>{l.items.length}</b></button>)}</div>}
    {current&&<div className="wishlistTools">
      <div><strong>{current.name}</strong><small>{current.privacy==="private"?"Private list":current.privacy==="link"?"Shared via link":"Public list"}</small></div>
      <select value={current.privacy} onChange={e=>mutate("PATCH",{wishlistId:current.id,privacy:e.target.value})}>
        <option value="private">Private</option>
        <option value="link">Link sharing</option>
        <option value="public">Public</option>
      </select>
      {current.shareCode&&<button onClick={()=>copyShare(current.shareCode)}>Copy share link</button>}
      {lists.length>1&&<button onClick={()=>confirm("Delete this wishlist?")&&mutate("DELETE",{wishlistId:current.id})}>Delete list</button>}
    </div>}
    {current&&current.items.length>0?<div className="savedCards">
      {current.items.map(item=><article className="savedCard" key={item.id}>
        <div className="savedThumb" style={{backgroundImage:`url(${item.imageUrl})`}}/>
        <div>
          <small>{item.categoryName} · {item.destination}</small>
          <h2>{item.name}</h2>
          <p>{item.summary}</p>
          {item.note&&<p><em>Note: {item.note}</em></p>}
          <div className="savedActions">
            <button onClick={()=>addToTrip(item)}>Add to trip</button>
            <button onClick={()=>{const note=prompt("Add a note",item.note||"");if(note!==null)mutate("PATCH",{itemId:item.id,note})}}>Add a note</button>
            {lists.length>1&&<select aria-label={`Move ${item.name}`} value={current.id} onChange={e=>mutate("PATCH",{itemId:item.id,wishlistId:Number(e.target.value)})}>
              {lists.map(l=><option value={l.id} key={l.id}>{l.name}</option>)}
            </select>}
            <button onClick={()=>mutate("DELETE",{itemId:item.id})}>Remove</button>
          </div>
        </div>
      </article>)}
    </div>:<div className="empty compact"><h2>No places saved yet</h2><p>Tap the heart on any listing to add it here.</p></div>}
  </section>;
}

function SaveSheet({listing,close}:{listing:Listing;close:()=>void}){
  const[lists,setLists]=useState<Wishlist[]>([]);
  const[status,setStatus]=useState("Loading your wishlists…");
  useEffect(()=>{
    fetch("/api/wishlists").then(r=>r.json()).then(x=>{setLists(x.wishlists||[]);setStatus("")}).catch(()=>setStatus("Wishlists unavailable."));
  },[]);
  const save=async(id:number)=>{
    setStatus("Saving…");
    const r=await fetch("/api/wishlists",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"add",wishlistId:id,listingId:listing.id})});
    if(r.ok){
      const x=await r.json();
      localStorage.setItem("visitpng-wishlists",JSON.stringify(x.wishlists));
      setStatus("Saved to your wishlist.");
      setTimeout(close,600);
    } else setStatus("Could not save this place.");
  };
  return <div className="overlay" onClick={close}>
    <article className="sheet saveSheet" onClick={e=>e.stopPropagation()}>
      <button className="close" onClick={close}>×</button>
      <p className="eyebrow">SAVE FOR LATER</p>
      <h2>{listing.name}</h2>
      <p>Choose a wishlist.</p>
      {lists.map(l=><button className="chooseList" key={l.id} onClick={()=>save(l.id)}><span>{l.name}</span><b>{l.items.length} saved</b></button>)}
      {status&&<p className="formStatus" aria-live="polite">{status}</p>}
    </article>
  </div>;
}

function AccountForm({viewer}:{viewer:Extract<Viewer,{signedIn:true}>}){
  const[profile,setProfile]=useState<Profile|null>(null);
  const[audit,setAudit]=useState<Audit[]>([]);
  const[status,setStatus]=useState("Loading your account…");
  useEffect(()=>{
    fetch("/api/profile").then(r=>{if(!r.ok)throw new Error();return r.json()}).then(x=>{setProfile(x.profile);setAudit(x.audit);setStatus("")}).catch(()=>setStatus("We could not open your account."));
  },[]);
  const save=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!profile)return;
    setStatus("Saving…");
    const r=await fetch("/api/profile",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(profile)});
    if(r.ok){
      const x=await r.json();
      setProfile(x.profile);
      setStatus("Profile saved.");
    } else setStatus("Profile update failed.");
  };
  return <section className="profilePage">
    <div className="profileHero">
      <span>{viewer.displayName[0]?.toUpperCase()}</span>
      <div>
        <p className="eyebrow lime">YOUR TRAVELLER ACCOUNT</p>
        <h1>{profile?.preferredName||viewer.displayName}</h1>
        <p>{viewer.email}</p>
      </div>
    </div>
    {profile?<form onSubmit={save}>
      <div className="accountState"><span>● Active</span><span>{profile.role}</span></div>
      <label>Preferred name<input value={profile.preferredName??""} onChange={e=>setProfile({...profile,preferredName:e.target.value})}/></label>
      <label>Mobile number<input value={profile.mobile??""} onChange={e=>setProfile({...profile,mobile:e.target.value})} inputMode="tel"/></label>
      <label>Country of residence<input value={profile.country} onChange={e=>setProfile({...profile,country:e.target.value})}/></label>
      <label>Preferred language<select value={profile.preferredLanguage} onChange={e=>setProfile({...profile,preferredLanguage:e.target.value})}><option>English</option><option>Tok Pisin</option><option>Hiri Motu</option></select></label>
      <button type="submit">Save profile</button>
      {status&&<p className="formStatus" aria-live="polite">{status}</p>}
    </form>:<div className="accountLoading">{status}</div>}
    <div className="securityCard">
      <p className="eyebrow">SECURITY & ACCESS</p>
      <h2>Your account is protected</h2>
      <p>Your sign-in is protected and your password is safely locked.</p>
      <a href={viewer.signOutPath}>Sign out</a>
    </div>
    {audit.length>0&&<div className="audit">
      <p className="eyebrow">RECENT ACTIVITY</p>
      {audit.map((a,i)=><div key={i}><span>{a.action.replaceAll("_"," ")}</span><time>{new Date(a.createdAt).toLocaleString()}</time></div>)}
    </div>}
  </section>;
}

function Card({listing:p,open,save,currency}:{listing:Listing;open:(p:Listing)=>void;save:()=>void;currency:CurrencyCode}){
  const [collapsed, setCollapsed] = useState(false);

  return <article className={`card ${collapsed ? "cardCollapsed" : ""}`} onClick={()=>open(p)}>
    <div className="pic" style={{backgroundImage:`url(${p.imageUrl})`}}>
      <span>{p.tag}</span>
      <div style={{position:"absolute",top:"10px",right:"10px",display:"flex",gap:"6px",zIndex:2}}>
        <button
          type="button"
          aria-label={collapsed ? `Expand ${p.name}` : `Collapse ${p.name}`}
          style={{background:"rgba(0,0,0,0.55)",color:"#fff",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",fontSize:"12px",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}
          onClick={e=>{e.stopPropagation(); setCollapsed(!collapsed);}}
          title={collapsed ? "Expand description" : "Collapse card"}
        >
          {collapsed ? "▼" : "▲"}
        </button>
        <button aria-label={`Save ${p.name}`} onClick={e=>{e.stopPropagation();save()}}>♡</button>
      </div>
    </div>
    <div className="cardBody">
      <div className="meta"><span>{p.categoryName} · {p.destination}</span><b>★ {p.rating}</b></div>
      <h3>{p.name}</h3>
      {!collapsed && <p>{p.summary}</p>}
      <footer>
        <div>
          <small>Sample member price</small>
          <strong>{formatPrice(p.memberPrice??p.basePrice, currency)}</strong>{" "}
          {p.memberPrice&&<del>{formatPrice(p.basePrice, currency)}</del>}
        </div>
        <em>{collapsed ? "Tap for full details" : "Sample listing"}</em>
      </footer>
    </div>
  </article>;
}

function BookingSheet({listing,close,openBookings,currency}:{listing:Listing;close:()=>void;openBookings:()=>void;currency:CurrencyCode}){
  const today=new Date().toISOString().slice(0,10);
  const tomorrow=new Date(Date.now()+86400000).toISOString().slice(0,10);
  const[form,setForm]=useState({startDate:today,endDate:tomorrow,guestCount:"1",contactName:"",contactMobile:""});
  const[status,setStatus]=useState("");
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    setStatus("Checking available places…");
    const r=await fetch("/api/bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"create",listingId:listing.id,...form})});
    const x=await r.json();
    if(r.ok){
      setStatus(`Held for 15 minutes. Reference ${x.reference}.`);
      setTimeout(openBookings,900);
    } else setStatus(x.error||"Booking could not be held.");
  };
  return <div className="overlay" onClick={close}>
    <article className="sheet bookingSheet" onClick={e=>e.stopPropagation()}>
      <button className="close" onClick={close}>×</button>
      <p className="eyebrow">BOOK YOUR VISIT</p>
      <h2>{listing.name}</h2>
      <aside className="testGateway">
        <b>Practice payment only</b>
        <p>This sample listing uses a practice payment. We do not ask for card details, and no real money is charged.</p>
      </aside>
      <form onSubmit={submit}>
        <label>Arrival / activity date<input required type="date" min={today} value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value,endDate:e.target.value>=form.endDate?new Date(new Date(e.target.value+"T00:00:00Z").getTime()+86400000).toISOString().slice(0,10):form.endDate})}/></label>
        <label>Departure / end date<input required type="date" min={new Date(new Date(form.startDate+"T00:00:00Z").getTime()+86400000).toISOString().slice(0,10)} value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})}/></label>
        <label>Guests<input required type="number" min="1" max="12" value={form.guestCount} onChange={e=>setForm({...form,guestCount:e.target.value})}/></label>
        <label>Contact name<input required maxLength={100} value={form.contactName} onChange={e=>setForm({...form,contactName:e.target.value})}/></label>
        <label>Mobile (optional)<input inputMode="tel" maxLength={30} value={form.contactMobile} onChange={e=>setForm({...form,contactMobile:e.target.value})}/></label>
        <div className="bookingEstimate"><span>Seeded rate, per day</span><strong>{formatPrice(listing.memberPrice??listing.basePrice, currency)}</strong></div>
        <button>Check availability & hold</button>
      </form>
      {status&&<p className="formStatus" aria-live="polite">{status}</p>}
    </article>
  </div>;
}

function BookingsScreen({viewer,currency}:{viewer:Viewer;currency:CurrencyCode}){
  const[bookings,setBookings]=useState<Booking[]>([]);
  const[status,setStatus]=useState("Loading bookings…");
  const load=useCallback(()=>{
    if(!viewer.signedIn)return;
    fetch("/api/bookings")
      .then(r=>{if(!r.ok)throw new Error();return r.json()})
      .then(x=>{setBookings(x.bookings||[]);setStatus("")})
      .catch(()=>setStatus("Bookings could not be loaded."));
  },[viewer]);
  useEffect(()=>load(),[load]);
  const act=async(action:string,bookingId:number)=>{
    setStatus("Updating booking…");
    const r=await fetch("/api/bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action,bookingId})});
    const x=await r.json();
    if(r.ok){
      setBookings(x.bookings);
      setStatus(action==="testConfirm"?"Practice payment finished. Your booking is confirmed, and no real money was charged.":"Booking cancelled.");
    } else setStatus(x.error||"Booking update failed.");
  };
  if(!viewer.signedIn)return <section className="accountGuest"><div className="accountMark">▤</div><p className="eyebrow">YOUR BOOKINGS</p><h1>Your reservations, safely together.</h1><p>Sign in to hold dated inventory and manage booking confirmations.</p><a href={viewer.signInPath}>Sign in to view bookings</a></section>;
  return <section className="saved bookingsPage">
    <p className="eyebrow">YOUR BOOKINGS & PAYMENTS</p>
    <h1>Your travel bookings.</h1>
    <p>Practice payments confirm your bookings without real charges.</p>
    {status&&<p className="formStatus" aria-live="polite">{status}</p>}
    {bookings.length?<div className="bookingList">
      {bookings.map(b=><article className="bookingCard" key={b.id}>
        <div className="bookingThumb" style={{backgroundImage:`url(${b.imageUrl})`}}/>
        <div>
          <header><span className={`status ${b.status}`}>{b.status}</span><small>Ref: {b.reference}</small></header>
          <h2>{b.listingName}</h2>
          <p>⌖ {b.destination} · {b.startDate} to {b.endDate}</p>
          <div className="bookingFinancials">
            <span>{b.guestCount} guests</span>
            <strong>{formatPrice(b.total, currency)}</strong>
          </div>
          <div className="bookingActions">
            {b.status==="held"&&<button onClick={()=>act("testConfirm",b.id)}>Confirm practice payment</button>}
            {b.status==="held"&&<button className="cancelBtn" onClick={()=>act("cancel",b.id)}>Cancel hold</button>}
          </div>
        </div>
      </article>)}
    </div>:<div className="empty compact"><h2>No bookings yet</h2><p>Find a place and click “Check dates & book” to hold a sample booking.</p></div>}
  </section>;
}

function Stars({value}:{value:number}){
  return <span className="stars" aria-label={`${value} out of 5 stars`}>
    {[1,2,3,4,5].map(n=><i key={n} className={n<=Math.round(value)?"star filled":"star"}>★</i>)}
  </span>;
}

function ReviewSummary({listingId}:{listingId:number}){
  const[data,setData]=useState<{count:number;averageRating:number;verifiedCount:number;aspects:{safety:number|null;service:number|null;value:number|null;accessibility:number|null};reviews:PublicReview[]}|null>(null);
  const[status,setStatus]=useState("Loading reviews…");
  useEffect(()=>{
    fetch(`/api/reviews?listingId=${listingId}`)
      .then(r=>{if(!r.ok)throw new Error();return r.json()})
      .then(x=>{setData(x);setStatus("")})
      .catch(()=>setStatus("Reviews could not be loaded."));
  },[listingId]);
  if(status)return <div className="reviewSummary loading"><small>{status}</small></div>;
  if(!data||data.count===0)return <div className="reviewSummary empty"><small>No traveller reviews yet. Be the first to share an honest review.</small></div>;
  return <div className="reviewSummary">
    <div className="ratingOverview">
      <div className="ratingBig"><strong>{data.averageRating.toFixed(1)}</strong><Stars value={data.averageRating}/><small>{data.count} {data.count===1?"review":"reviews"} · {data.verifiedCount} verified</small></div>
      <div className="aspects">
        {data.aspects.safety!==null&&<div><span>Safety</span><b>★ {data.aspects.safety.toFixed(1)}</b></div>}
        {data.aspects.service!==null&&<div><span>Service</span><b>★ {data.aspects.service.toFixed(1)}</b></div>}
        {data.aspects.value!==null&&<div><span>Value</span><b>★ {data.aspects.value.toFixed(1)}</b></div>}
        {data.aspects.accessibility!==null&&<div><span>Accessibility</span><b>★ {data.aspects.accessibility.toFixed(1)}</b></div>}
      </div>
    </div>
    <div className="publicReviews">
      {data.reviews.map(r=><article className="reviewCard" key={r.id}>
        <header>
          <div><strong>{r.author}</strong><small>{new Date(r.createdAt).toLocaleDateString()}</small></div>
          <span className={`badge ${r.verificationType}`}>{r.verificationType==="verified_booking"?"✓ Verified booking":"Unverified visit"}</span>
        </header>
        <Stars value={r.overallRating}/>
        <h4>{r.title}</h4>
        <p>{r.body}</p>
        {r.providerResponse&&<div className="providerResponse"><b>Business reply ({r.providerRespondedAt?new Date(r.providerRespondedAt).toLocaleDateString():"Recently"})</b><p>{r.providerResponse}</p></div>}
      </article>)}
    </div>
  </div>;
}

function ReviewSheet({listing,close,done}:{listing:Listing;close:()=>void;done:()=>void}){
  const[form,setForm]=useState({overallRating:5,valueRating:"5",serviceRating:"5",safetyRating:"5",accessibilityRating:"5",title:"",body:"",travelType:"solo",dateOfExperience:new Date().toISOString().slice(0,10)});
  const[status,setStatus]=useState("");
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    setStatus("Submitting review…");
    const r=await fetch("/api/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({listingId:listing.id,overallRating:Number(form.overallRating),valueRating:Number(form.valueRating),serviceRating:Number(form.serviceRating),safetyRating:Number(form.safetyRating),accessibilityRating:Number(form.accessibilityRating),title:form.title,body:form.body,travelType:form.travelType,dateOfExperience:form.dateOfExperience})});
    const x=await r.json();
    if(r.ok){
      setStatus("Thank you! Your review was submitted.");
      setTimeout(done,800);
    } else setStatus(x.error||"Could not submit review.");
  };
  return <div className="overlay" onClick={close}>
    <article className="sheet reviewSheet" onClick={e=>e.stopPropagation()}>
      <button className="close" onClick={close}>×</button>
      <p className="eyebrow">SHARE YOUR EXPERIENCE</p>
      <h2>Write a review for {listing.name}</h2>
      <aside className="reviewPolicy">
        <b>Fair review checks</b>
        <p>Honest negative feedback is welcome. We check for personal information, spam and offensive words before publishing.</p>
      </aside>
      <form onSubmit={submit}>
        <label>Overall rating (1-5)<input type="range" min="1" max="5" value={form.overallRating} onChange={e=>setForm({...form,overallRating:Number(e.target.value)})}/><strong>{form.overallRating} stars</strong></label>
        <div className="ratingGrid">
          <label>Value<select value={form.valueRating} onChange={e=>setForm({...form,valueRating:e.target.value})}><option value="5">5 - Excellent</option><option value="4">4 - Good</option><option value="3">3 - Fair</option><option value="2">2 - Poor</option><option value="1">1 - Terrible</option></select></label>
          <label>Service<select value={form.serviceRating} onChange={e=>setForm({...form,serviceRating:e.target.value})}><option value="5">5 - Excellent</option><option value="4">4 - Good</option><option value="3">3 - Fair</option><option value="2">2 - Poor</option><option value="1">1 - Terrible</option></select></label>
          <label>Safety<select value={form.safetyRating} onChange={e=>setForm({...form,safetyRating:e.target.value})}><option value="5">5 - Excellent</option><option value="4">4 - Good</option><option value="3">3 - Fair</option><option value="2">2 - Poor</option><option value="1">1 - Terrible</option></select></label>
          <label>Accessibility<select value={form.accessibilityRating} onChange={e=>setForm({...form,accessibilityRating:e.target.value})}><option value="5">5 - Excellent</option><option value="4">4 - Good</option><option value="3">3 - Fair</option><option value="2">2 - Poor</option><option value="1">1 - Terrible</option></select></label>
        </div>
        <label>Review title<input required minLength={3} maxLength={100} value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></label>
        <label>Your experience<textarea required minLength={10} maxLength={1500} rows={5} value={form.body} onChange={e=>setForm({...form,body:e.target.value})}/></label>
        <div className="reviewMeta">
          <label>Travel type<select value={form.travelType} onChange={e=>setForm({...form,travelType:e.target.value})}><option value="solo">Solo</option><option value="couple">Couple</option><option value="family">Family</option><option value="friends">Friends</option><option value="business">Business</option></select></label>
          <label>Date of experience<input type="date" max={new Date().toISOString().slice(0,10)} value={form.dateOfExperience} onChange={e=>setForm({...form,dateOfExperience:e.target.value})}/></label>
        </div>
        <button>Submit honest review</button>
      </form>
      {status&&<p className="formStatus" aria-live="polite">{status}</p>}
    </article>
  </div>;
}

function ReviewsScreen({viewer}:{viewer:Viewer}){
  const[reviews,setReviews]=useState<MyReview[]>([]);
  const[status,setStatus]=useState("Loading your reviews…");
  const load=useCallback(()=>{
    if(!viewer.signedIn)return;
    fetch("/api/reviews")
      .then(r=>{if(!r.ok)throw new Error();return r.json()})
      .then(x=>{setReviews(x.reviews||[]);setStatus("")})
      .catch(()=>setStatus("Reviews could not be loaded."));
  },[viewer]);
  useEffect(()=>load(),[load]);
  const remove=async(id:number)=>{
    const r=await fetch("/api/reviews",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({reviewId:id})});
    const x=await r.json();
    if(r.ok){
      setReviews(x.reviews);
      setStatus("Review removed.");
    } else setStatus(x.error||"Review could not be removed.");
  };
  if(!viewer.signedIn)return <section className="accountGuest"><div className="accountMark">★</div><p className="eyebrow">YOUR REVIEWS</p><h1>Share trusted traveller insight.</h1><p>Sign in to share reviews and see their progress.</p><a href={viewer.signInPath}>Sign in to review</a></section>;
  return <section className="saved reviewsPage">
    <p className="eyebrow">YOUR REVIEWS & REPUTATION</p>
    <h1>Your traveller reviews.</h1>
    <p>Shared reviews appear on place pages. If a review needs checking, you will see why while it stays private.</p>
    <aside className="reviewPolicy">
      <b>Fair review checks</b>
      <p>Honest negative feedback is welcome. We only check for abuse, private details, unwanted advertising, dishonesty and unrelated content.</p>
    </aside>
    {status&&<p className="formStatus" aria-live="polite">{status}</p>}
    {reviews.length?<div className="myReviews">
      {reviews.map(r=><article key={r.id}>
        <div className="reviewThumb" style={{backgroundImage:`url(${r.imageUrl})`}}/>
        <div>
          <header><span className={`moderation ${r.moderationStatus}`}>{r.moderationStatus}</span><em>{r.verificationType==="verified_booking"?"✓ Verified booking":"Unverified visit"}</em></header>
          <small>{r.listingName}</small>
          <Stars value={r.overallRating}/>
          <h2>{r.title}</h2>
          <p>{r.body}</p>
          {r.moderationReason&&<aside><b>Why this needs checking</b><p>{r.moderationReason}</p></aside>}
          <button className="removeReview" onClick={()=>confirm("Remove this review?")&&remove(r.id)}>Remove review</button>
        </div>
      </article>)}
    </div>:<div className="empty compact"><h2>No reviews yet</h2><p>Open a listing and choose “Write a review” to share your experience.</p></div>}
  </section>;
}

function Details({listing:p,close,book,review,currency}:{listing:Listing;close:()=>void;book:()=>void;review:()=>void;currency:CurrencyCode}){
  return <div className="overlay" onClick={close}>
    <article className="sheet" onClick={e=>e.stopPropagation()}>
      <button className="close" onClick={close}>×</button>
      <div className="detailPic" style={{backgroundImage:`url(${p.imageUrl})`}}><span>{p.tag}</span></div>
      <div className="details">
        <em>PLACE DETAILS · SAMPLE LISTING</em>
        <h2>{p.name}</h2>
        <b>⌖ {p.destination}, {p.province} · ★ {p.rating} ({p.reviewCount})</b>
        <p>{p.summary}</p>
        <div className="record">
          <span>Business</span><strong>{p.providerName}</strong>
          <span>Category</span><strong>{p.categoryName}</strong>
          <span>Place code</span><strong>{p.slug}</strong>
        </div>
        <ReviewSummary listingId={p.id}/>
        {p.sourceUrl&&<a href={p.sourceUrl} target="_blank" rel="noreferrer">Visit the business website ↗</a>}
        <footer>
          <div><small>Sample price</small><strong>{formatPrice(p.memberPrice??p.basePrice, currency)}</strong></div>
          <div className="detailActions">
            <button className="secondary" onClick={review}>Write a review</button>
            <button onClick={book}>Check dates & book</button>
          </div>
        </footer>
      </div>
    </article>
  </div>;
}

function Loading(){return <div className="loading">{[1,2,3].map(x=><div key={x}><span/><i/><i/></div>)}</div>}
function ErrorState({message,retry}:{message:string;retry:()=>void}){return <div className="empty"><h2>Places are unavailable</h2><p>{message}</p><button onClick={retry}>Try again</button></div>}
function Empty({clear}:{clear:()=>void}){return <div className="empty"><h2>No exact matches</h2><p>Try another destination, province or category.</p><button onClick={clear}>Clear filters</button></div>}
function ModuleStatus({openReviews}:{openReviews:()=>void}){return <aside className="member module"><div><p className="eyebrow lime">YOUR REVIEWS & REPUTATION</p><h2>Share the journey honestly</h2><p>Rate real experiences, see confirmed-visit badges and follow each review clearly.</p><button onClick={openReviews}>Manage reviews</button></div><strong>07</strong></aside>}

function Bottom({tab,setTab}:{tab:string;setTab:(t:"Explore"|"Bookings"|"Saved"|"Trips"|"Profile")=>void}){
  return <nav className="bottom">
    <button className={tab==="Explore"?"active":""} onClick={()=>setTab("Explore")}><span>⌂</span>Explore</button>
    <button className={tab==="Bookings"?"active":""} onClick={()=>setTab("Bookings")}><span>▤</span>Bookings</button>
    <button className={tab==="Saved"?"active":""} onClick={()=>setTab("Saved")}><span>♡</span>Saved</button>
    <button className={tab==="Trips"?"active":""} onClick={()=>setTab("Trips")}><span>▣</span>Trips</button>
    <button className={tab==="Profile"?"active":""} onClick={()=>setTab("Profile")}><span>○</span>Profile</button>
  </nav>;
}
