"use client";
import {useState} from "react";
import {TOK_PISIN_PHRASEBOOK, VILLAGE_ETIQUETTE_RULES, TokPisinPhrase} from "../../db/phrasebook";

export default function TokPisinPhrasebook() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioNotice, setAudioNotice] = useState<string>("");

  const handleSpeak = (phrase: TokPisinPhrase) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.tokPisin);
      utterance.rate = 0.85; // Slightly slower for clear pronunciation
      utterance.pitch = 1.0;
      utterance.lang = "en-PG"; // Or general fallback
      utterance.onstart = () => setPlayingId(phrase.id);
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
      setAudioNotice(`🔊 Pronouncing: "${phrase.tokPisin}"`);
      setTimeout(() => setAudioNotice(""), 2500);
    } else {
      setAudioNotice(`Phonetic: [${phrase.phonetic}]`);
      setTimeout(() => setAudioNotice(""), 3000);
    }
  };

  const categories = [
    { id: "all", label: "All Phrases" },
    { id: "greetings", label: "👋 Greetings & Respect" },
    { id: "market", label: "🛒 Market & Trade" },
    { id: "trekking", label: "🥾 Trekking & Directions" },
    { id: "emergency", label: "🚨 Health & Emergency" },
    { id: "custom", label: "🏛️ Custom & Village Protocol" }
  ];

  const filtered = TOK_PISIN_PHRASEBOOK.filter(p => {
    const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery = !q ||
      p.tokPisin.toLowerCase().includes(q) ||
      p.english.toLowerCase().includes(q) ||
      p.phonetic.toLowerCase().includes(q) ||
      p.culturalNote.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });

  return (
    <div className="phrasebookSection">
      <div className="phrasebookHero">
        <div>
          <p className="eyebrow lime">LANGUAGE & LOCAL KINSHIP</p>
          <h2>Tok Pisin Audio Phrasebook & Village Etiquette</h2>
          <p>
            Learn essential phrases in Tok Pisin (Papua New Guinea lingua franca) with audio pronunciation and cultural context for respectful village visits.
          </p>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="phraseSearchAndFilter">
        <div className="phraseSearchBox">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search phrase in English or Tok Pisin (e.g. hello, bilum, doctor)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clearSearchBtn" onClick={() => setSearchQuery("")}>×</button>
          )}
        </div>

        <div className="phraseCategoryPills">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={selectedCategory === cat.id ? "active" : ""}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {audioNotice && (
        <div className="audioStatusNotice" role="status" aria-live="polite">
          {audioNotice}
        </div>
      )}

      {/* Phrases Grid */}
      <div className="phrasesListGrid">
        {filtered.map(phrase => (
          <article key={phrase.id} className="phraseCard">
            <div className="phraseCardHeader">
              <span className="phraseCategoryBadge">{phrase.categoryLabel}</span>
              <button
                type="button"
                className={`audioPlayBtn ${playingId === phrase.id ? "playing" : ""}`}
                aria-label={`Listen to pronunciation of ${phrase.tokPisin}`}
                onClick={() => handleSpeak(phrase)}
              >
                {playingId === phrase.id ? "🔊 Playing…" : "🔈 Listen"}
              </button>
            </div>

            <h3 className="phraseTokPisin">{phrase.tokPisin}</h3>
            <p className="phrasePhonetic">Pronunciation: <i>[{phrase.phonetic}]</i></p>
            <p className="phraseEnglish">Meaning: <b>{phrase.english}</b></p>

            <div className="phraseCulturalNote">
              <small>💡 Cultural Etiquette:</small>
              <p>{phrase.culturalNote}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Village Etiquette Rules Guide */}
      <div className="villageEtiquetteSection">
        <div className="etiquetteHeader">
          <p className="eyebrow lime">CULTURAL PROTOCOL</p>
          <h3>Visiting Customary Villages & Clan Lands</h3>
          <p>Core cultural guidelines to ensure positive interactions across Papua New Guinea.</p>
        </div>

        <div className="etiquetteRulesGrid">
          {VILLAGE_ETIQUETTE_RULES.map((rule, idx) => (
            <article key={idx} className="etiquetteRuleCard">
              <h4>{idx + 1}. {rule.title}</h4>
              <p>{rule.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
