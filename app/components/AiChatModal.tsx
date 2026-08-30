"use client";

import React, { useState, useRef, useEffect } from "react";

export interface AiChatMessage {
  id: string;
  sender: "user" | "ai" | "system";
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void }[];
  whatsappPrompt?: boolean;
}

interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryCode?: string;
  brandName?: string;
  supportPhone?: string;
}

const WHATSAPP_PHONE = "6753214188";
const WHATSAPP_DISPLAY = "+675 321 4188";

// Rich text message formatter for AI responses
function FormattedAiText({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} style={{ height: "4px" }} />;
        }

        // Bullet point line
        if (trimmed.startsWith("•") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const content = trimmed.replace(/^[•\-\*]\s*/, "");
          return (
            <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", paddingLeft: "4px" }}>
              <span style={{ color: "rgba(249, 115, 22, 1)", fontSize: "14px", lineHeight: "1.2" }}>▸</span>
              <span style={{ flex: 1, fontSize: "13px", lineHeight: "1.5" }}>
                {renderFormattedInline(content)}
              </span>
            </div>
          );
        }

        // Numbered item
        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", paddingLeft: "4px" }}>
              <span style={{ color: "rgba(251, 191, 36, 1)", fontWeight: "bold", fontSize: "12px" }}>
                {trimmed.match(/^\d+\./)?.[0]}
              </span>
              <span style={{ flex: 1, fontSize: "13px", lineHeight: "1.5" }}>
                {renderFormattedInline(trimmed.replace(/^\d+\.\s*/, ""))}
              </span>
            </div>
          );
        }

        // Heading line
        if (trimmed.startsWith("### ") || (trimmed.startsWith("**") && trimmed.endsWith("**") && !trimmed.slice(2, -2).includes("**"))) {
          const content = trimmed.replace(/^###\s*/, "").replace(/^\*\*/, "").replace(/\*\*$/, "");
          return (
            <div key={idx} style={{ fontWeight: 800, color: "rgba(251, 191, 36, 1)", fontSize: "13.5px", marginTop: "4px" }}>
              {content}
            </div>
          );
        }

        return (
          <div key={idx} style={{ fontSize: "13px", lineHeight: "1.5" }}>
            {renderFormattedInline(trimmed)}
          </div>
        );
      })}
    </div>
  );
}

function renderFormattedInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return (
        <strong key={i} style={{ color: "rgba(251, 191, 36, 1)", fontWeight: 700 }}>
          {inner}
        </strong>
      );
    }
    return part;
  });
}

export function AiChatModal({
  isOpen,
  onClose,
  countryCode = "PNG",
  brandName = "VisitPNG",
  supportPhone = "+675 321 4188"
}: AiChatModalProps) {
  const [messages, setMessages] = useState<AiChatMessage[]>(() => [
    {
      id: "welcome-1",
      sender: "ai",
      text: `Halo Olgeta! 👋 I am the **${brandName} AI Travel & Cultural Concierge** for Papua New Guinea (${countryCode}).\n\nAsk me anything about:\n• **Kokoda Track**: 96km historic trek, KTA permits, fitness & porters\n• **Cultural Shows**: Goroka Show, Mount Hagen Sing-Sing, Rabaul Mask & Baining Fire Dance\n• **Alpine Summits**: Mount Wilhelm (4,509m) climb logistics\n• **Coral Reefs**: Kimbe Bay & Milne Bay Coral Triangle scuba diving\n• **Passes & Support**: Instant assistance on WhatsApp (${supportPhone})`,
      timestamp: "Just now"
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [msgCounter, setMsgCounter] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  if (!isOpen) return null;

  const quickPrompts = [
    "🥾 How do I prepare for the Kokoda Track?",
    "♨ When is the Goroka Cultural Show?",
    "🤿 Best season for Kimbe Bay Diving?",
    "⛰️ How do I climb Mount Wilhelm (4,509m)?",
    "📅 Plan a 7-Day PNG Itinerary"
  ];

  const generateAiReply = (query: string): { reply: string; showWhatsApp?: boolean } => {
    const q = query.toLowerCase();

    if (q.includes("whatsapp") || q.includes("human") || q.includes("agent") || q.includes("phone") || q.includes("contact") || q.includes("call")) {
      return {
        reply: `You can reach our dedicated VisitPNG 24/7 Concierge team directly on WhatsApp / Phone at **${WHATSAPP_DISPLAY}** or email **info@visitpng.com**.\n\nClick the button below to start a direct consultation!`,
        showWhatsApp: true
      };
    }

    if (q.includes("kokoda") || q.includes("track") || q.includes("owers") || q.includes("kta") || q.includes("fuzz")) {
      return {
        reply: `🥾 **Kokoda Track 96km Pilgrimage (Central & Oro Provinces)**:\n• **Overview**: 8-to-10 day mountain pilgrimage between Owers' Corner and Kokoda Station across the Owen Stanley Range.\n• **Mandatory Clearance**: Official Kokoda Track Authority (KTA) Trekker Permit (K 650).\n• **Best Season**: Dry trekking window from April to October (Anzac Day in April is peak).\n• **Fitness**: High cardiovascular endurance required; always hire an accredited local carrier/porter to support landowner communities.`,
        showWhatsApp: true
      };
    }

    if (q.includes("goroka") || q.includes("asaro") || q.includes("mudmen") || q.includes("sing-sing") || q.includes("show")) {
      return {
        reply: `♨ **Goroka Cultural Show (Eastern Highlands Province)**:\n• **When**: Annual PNG Independence weekend (Mid-September).\n• **Highlight**: Over 100 highland and coastal tribes performing simultaneous sing-sings in authentic bilas feathers, face-paint, and Kundu drums.\n• **Iconic Group**: The mystical Asaro Mudmen with heavy clay masks and bamboo finger spears.\n• **Access**: General arena passes (K 100) or VIP Photographers packages (K 350).`,
        showWhatsApp: true
      };
    }

    if (q.includes("hagen") || q.includes("melpa") || q.includes("wahgi")) {
      return {
        reply: `👑 **Mount Hagen Cultural Show (Western Highlands)**:\n• **When**: Mid-August annually at Rabiamul grounds.\n• **Highlight**: Flamboyant Melpa warrior sing-sings, giant Bird of Paradise feather headdresses, and shell trade currency traditions.\n• **Stays**: Rondon Ridge Lodge, Highlander Hotel.`,
        showWhatsApp: true
      };
    }

    if (q.includes("wilhelm") || q.includes("summit") || q.includes("climb") || q.includes("mountain") || q.includes("simbu")) {
      return {
        reply: `⛰️ **Mount Wilhelm Alpine Expedition (Simbu / Chimbu Province)**:\n• **Elevation**: 4,509 meters (14,793 ft) — the highest peak in Papua New Guinea.\n• **Basecamp**: Keglsugl village at 2,800m elevation.\n• **Trek Route**: Ascent via glacial tarns Lake Piunde and Lake Aunde; summit push begins at 1:00 AM.\n• **Climb Permit**: CEPA / Simbu Provincial Conservation Pass (K 220).`,
        showWhatsApp: true
      };
    }

    if (q.includes("kimbe") || q.includes("dive") || q.includes("scuba") || q.includes("coral") || q.includes("walindi") || q.includes("rabaul") || q.includes("tufi")) {
      return {
        reply: `🤿 **Coral Triangle Scuba Diving & Marine Sanctuaries**:\n• **Kimbe Bay (West New Britain)**: Over 860 reef fish species, emerald seamounts, and Walindi Plantation Resort.\n• **Tufi Fjords (Oro Province)**: Volcanic calderas plunging into coral drop-offs with hammerhead sharks.\n• **Milne Bay & Tawali**: World-famous muck diving, manta rays, and Kenu war canoe regattas.\n• **Rabaul (East New Britain)**: WWII warship and aircraft wrecks alongside active Mount Tavurvur volcano views.`,
        showWhatsApp: true
      };
    }

    if (q.includes("sepik") || q.includes("crocodile") || q.includes("tambaran") || q.includes("river")) {
      return {
        reply: `🐊 **Sepik River Cultural Expedition (East Sepik Province)**:\n• **Highlights**: Grand Sepik River canoe journeys, towering Haus Tambaran sacred spirit houses, and master woodcarvers.\n• **August Special**: Sepik River Crocodile Festival in Ambunti celebrating the sacred river crocodile bond.`,
        showWhatsApp: true
      };
    }

    if (q.includes("itinerary") || q.includes("plan") || q.includes("7 day") || q.includes("days")) {
      return {
        reply: `🧭 **Recommended 7-Day Papua New Guinea Highlights Itinerary**:\n• **Day 1**: Arrive Port Moresby (POM) → National Museum & Nature Park → Sunset at Ela Beach.\n• **Day 2**: Fly to Mount Hagen → Melpa village sing-sing & coffee plantation tour.\n• **Day 3**: Scenic highland drive to Goroka → Asaro Mudmen performance → J.K. McCarthy Museum.\n• **Day 4**: Fly to Hoskins (Kimbe Bay) → Check-in to Walindi Resort → Afternoon reef snorkel.\n• **Day 5**: 2-Tank scuba dive on Inglis Shoal & Bradford Seamount.\n• **Day 6**: Hot springs trek & Bird of Paradise canopy walk in West New Britain.\n• **Day 7**: Morning flight back to Port Moresby for international connection.\n\nWould you like our Wantok AI Concierge to customize this for your dates?`,
        showWhatsApp: true
      };
    }

    if (q.includes("pass") || q.includes("membership") || q.includes("discount") || q.includes("rates") || q.includes("price")) {
      return {
        reply: `🎟️ **VisitPNG Pass & Membership Privileges**:\n• Unlock up to 20% off verified eco-lodges, dive operators, Kokoda expeditions, and cultural show VIP passes across all 22 provinces.\n• Dynamic QR pass is saved directly on your mobile device for offline verification in remote areas!`,
        showWhatsApp: true
      };
    }

    return {
      reply: `Papua New Guinea is an extraordinary destination across 22 provinces, 4 regions, and over 800 indigenous cultures!\n\nWhether you are looking for:\n1. **Kokoda Track & Mount Wilhelm Treks**\n2. **Goroka, Mount Hagen & Rabaul Sing-Sing Festivals**\n3. **Kimbe Bay, Tufi & Milne Bay Coral Reef Diving**\n4. **Sepik River Spirit Houses & Crocodile Culture**\n5. **Direct assistance on WhatsApp (${WHATSAPP_DISPLAY})**\n\nFeel free to ask a specific question, or chat directly with our team!`,
      showWhatsApp: true
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const msgId = `user-msg-${msgCounter}`;
    const userMsg: AiChatMessage = {
      id: msgId,
      sender: "user",
      text: query,
      timestamp: "Just now"
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setMsgCounter(prev => prev + 1);
    setIsTyping(true);

    setTimeout(() => {
      const { reply, showWhatsApp } = generateAiReply(query);
      const aiMsg: AiChatMessage = {
        id: `ai-msg-${msgCounter + 1}`,
        sender: "ai",
        text: reply,
        timestamp: "Just now",
        whatsappPrompt: showWhatsApp
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      setMsgCounter(prev => prev + 1);
    }, 600);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(3, 47, 43, 0.82)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: "16px"
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "540px",
          height: "640px",
          maxHeight: "90vh",
          background: "#0D2B27",
          border: "1.5px solid rgba(234, 88, 12, 0.45)",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)",
          color: "#ffffff",
          fontFamily: "Ubuntu, sans-serif"
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "16px 20px",
            background: "linear-gradient(135deg, #103630 0%, #164E44 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#EA580C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                boxShadow: "0 0 12px rgba(234, 88, 12, 0.5)"
              }}
            >
              🧠
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#ffffff" }}>
                Wantok AI Concierge
              </h3>
              <span style={{ fontSize: "11px", color: "#FDBA74", display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E" }} />
                Online · Papua New Guinea Travel Intelligence
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#ffffff",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ✕
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div
          style={{
            padding: "8px 16px",
            background: "rgba(0,0,0,0.2)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            overflowX: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            gap: "6px"
          }}
        >
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#E2E8F0",
                borderRadius: "16px",
                padding: "4px 10px",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Messages Scroll Area */}
        <div
          style={{
            flex: 1,
            padding: "16px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}
        >
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === "user" ? "flex-end" : "flex-start"
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  padding: "12px 16px",
                  borderRadius: msg.sender === "user" ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                  background: msg.sender === "user" ? "linear-gradient(135deg, #EA580C 0%, #F97316 100%)" : "rgba(255,255,255,0.08)",
                  border: msg.sender === "user" ? "none" : "1px solid rgba(255,255,255,0.1)",
                  color: "#ffffff"
                }}
              >
                {msg.sender === "ai" ? (
                  <FormattedAiText text={msg.text} />
                ) : (
                  <div style={{ fontSize: "13.5px", lineHeight: 1.4 }}>{msg.text}</div>
                )}

                {msg.whatsappPrompt && (
                  <div style={{ marginTop: "10px", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "8px" }}>
                    <a
                      href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hello VisitPNG Team, I need travel assistance.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "#25D366",
                        color: "#ffffff",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 700,
                        textDecoration: "none"
                      }}
                    >
                      💬 Chat with Human Specialist on WhatsApp
                    </a>
                  </div>
                )}
              </div>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "4px", marginInline: "6px" }}>
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#FDBA74", fontSize: "12px", padding: "8px" }}>
              <span className="typingDot">●</span>
              <span className="typingDot">●</span>
              <span className="typingDot">●</span>
              <span>Wantok AI is thinking…</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          style={{
            padding: "12px 16px",
            background: "rgba(0,0,0,0.3)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            gap: "8px"
          }}
        >
          <input
            type="text"
            placeholder="Ask about Kokoda, Goroka Show, diving, permits…"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#ffffff",
              fontSize: "13px",
              outline: "none"
            }}
          />
          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "0 18px",
              fontSize: "13.5px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Send ➜
          </button>
        </form>
      </div>
    </div>
  );
}

export function FloatingConciergeWidget({ onOpenAiChat }: { onOpenAiChat: () => void }) {
  return (
    <div style={{ position: "fixed", bottom: "76px", right: "20px", zIndex: 999 }}>
      <button
        type="button"
        onClick={onOpenAiChat}
        aria-label="Open Wantok AI Concierge"
        style={{
          background: "linear-gradient(135deg, #EA580C 0%, #F97316 100%)",
          color: "#ffffff",
          border: "2px solid rgba(255,255,255,0.4)",
          borderRadius: "99px",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: 800,
          fontSize: "13px",
          boxShadow: "0 8px 24px rgba(234, 88, 12, 0.45)",
          cursor: "pointer"
        }}
      >
        <span style={{ fontSize: "16px" }}>🤖</span>
        <span>Wantok AI</span>
      </button>
    </div>
  );
}

