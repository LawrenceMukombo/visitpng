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

const WHATSAPP_PHONE = "260573506598";
const WHATSAPP_DISPLAY = "+260 573 506 598";

// Rich text message formatter for AI responses
function FormattedAiText({ text }: { text: string }) {
  // Split into lines
  const lines = text.split("\n");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} style={{ height: "4px" }} />;
        }

        // Bullet point line (starts with • or - or *)
        if (trimmed.startsWith("•") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const content = trimmed.replace(/^[•\-\*]\s*/, "");
          return (
            <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", paddingLeft: "4px" }}>
              <span style={{ color: "rgba(37, 211, 102, 1)", fontSize: "14px", lineHeight: "1.2" }}>▸</span>
              <span style={{ flex: 1, fontSize: "13px", lineHeight: "1.5" }}>
                {renderFormattedInline(content)}
              </span>
            </div>
          );
        }

        // Numbered item (e.g. "1. Victoria Falls")
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

        // Header or regular line
        return (
          <div key={idx} style={{ fontSize: "13.5px", lineHeight: "1.5" }}>
            {renderFormattedInline(line)}
          </div>
        );
      })}
    </div>
  );
}

// Parses inline bold **text** and highlights
function renderFormattedInline(text: string): React.ReactNode {
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
  countryCode = "ZMB",
  brandName = "ZamRoam",
  supportPhone = "+260 573 506 598"
}: AiChatModalProps) {
  const [messages, setMessages] = useState<AiChatMessage[]>(() => [
    {
      id: "welcome-1",
      sender: "ai",
      text: `Mwapoleni! 👋 I am the **${brandName} AI Safari & Cultural Concierge** for ${countryCode === "ZMB" ? "Zambia" : "PNG"}.\n\nAsk me anything about:\n• **Traditional Ceremonies**: Kuomboka, Nc'wala, Likumbi Lya Mize, Umutomboko\n• **National Parks**: South Luangwa walking safaris, Lower Zambezi canoe trails, Kafue\n• **Wonders**: Victoria Falls & Livingstone adventure bookings\n• **Passes & Support**: Instant assistance on WhatsApp (${supportPhone})`,
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
    "👑 When is the Kuomboka Ceremony?",
    "🦁 Best time for South Luangwa Walking Safaris?",
    "🌊 Victoria Falls Devil's Pool & Activities",
    "📅 Plan a 5-Day Zambia Safari Itinerary",
    "💬 Talk to Human Concierge on WhatsApp"
  ];

  const generateAiReply = (query: string): { reply: string; showWhatsApp?: boolean } => {
    const q = query.toLowerCase();

    if (q.includes("whatsapp") || q.includes("human") || q.includes("agent") || q.includes("phone") || q.includes("contact") || q.includes("call")) {
      return {
        reply: `You can reach our dedicated ZamRoam 24/7 Concierge team directly on WhatsApp at **${WHATSAPP_DISPLAY}** or email **info@zamroam.com**.\n\nClick the button below to start a live WhatsApp chat!`,
        showWhatsApp: true
      };
    }

    if (q.includes("kuomboka") || q.includes("litunga") || q.includes("nalikwanda") || q.includes("mongu") || q.includes("barotse")) {
      return {
        reply: `👑 **Kuomboka Traditional Ceremony (Western Province / Barotseland)**:\n• **Royal Host**: His Majesty The Litunga & the Barotse Royal Establishment.\n• **When**: Annually between March & April when the Zambezi River floods the plains.\n• **Experience**: The Litunga moves from the summer palace in Lealui to Limulunga in the 100-oarsmen Nalikwanda barge accompanied by the booming Royal Maoma drums.\n• **Dress Code**: Traditional Siziba (men) & Musisi (women).\n• **Access**: Public attendance is free; VIP grandstand tickets start from ZMW 1,800.`,
        showWhatsApp: true
      };
    }

    if (q.includes("nc'wala") || q.includes("ncwala") || q.includes("mpezeni") || q.includes("ngoni") || q.includes("chipata")) {
      return {
        reply: `🛡️ **Nc'wala Traditional Ceremony (Eastern Province / Chipata)**:\n• **Royal Host**: Paramount Chief Mpezeni of the Ngoni people.\n• **When**: Last Saturday of February at Mutenguleni arena.\n• **Highlight**: Thousands of warrior impis in leopard skins dancing the thunderous Ingoma dance, followed by the tasting of the fresh harvest maize.\n• **Nearby**: Combine your trip with a walking safari in South Luangwa National Park!`,
        showWhatsApp: true
      };
    }

    if (q.includes("likumbi") || q.includes("mize") || q.includes("makishi") || q.includes("zambezi") || q.includes("luvale")) {
      return {
        reply: `🎭 **Likumbi Lya Mize Cultural Festival (North-Western Province)**:\n• **UNESCO Masterpiece**: Inscribed by UNESCO as a Masterpiece of Oral and Intangible Heritage.\n• **When**: Last week of August at Mize Palace across the Zambezi River.\n• **Highlight**: Over 50 sacred Makishi masked spirit dancers (Kayipu, Mwana Pwevo, Chizaluke) celebrating the Mukanda initiation rites.`,
        showWhatsApp: true
      };
    }

    if (q.includes("victoria falls") || q.includes("livingstone") || q.includes("mosi") || q.includes("devil")) {
      return {
        reply: `🌊 **Victoria Falls & Livingstone (Southern Province)**:\n• **Status**: UNESCO World Heritage Wonder (Mosi-oa-Tunya — "The Smoke that Thunders").\n• **Top Highlights**: Devil's Pool swim on Livingstone Island (Aug–Jan), Helicopter Flight of Angels, Zambezi sunset cruises, and white-water rafting in Batoka Gorge.\n• **Getting There**: Fly into Harry Mwaanga Nkumbula International Airport (LVI) or 6 hours drive from Lusaka.`,
        showWhatsApp: true
      };
    }

    if (q.includes("south luangwa") || q.includes("luangwa") || q.includes("walking") || q.includes("leopard") || q.includes("mfuwe")) {
      return {
        reply: `🦁 **South Luangwa National Park & Mfuwe**:\n• **Reputation**: The undisputed birthplace of the African Walking Safari and Africa's top leopard destination.\n• **Best Time to Visit**: Dry season from June to October for exceptional game concentration along the Luangwa river lagoons.\n• **Experiences**: Morning bush walks led by armed scouts, nocturnal spotlight drives, and luxury tented camps.`,
        showWhatsApp: true
      };
    }

    if (q.includes("itinerary") || q.includes("plan") || q.includes("5 day") || q.includes("7 day") || q.includes("days")) {
      return {
        reply: `🧭 **Recommended 5-Day Classic Zambia Highlights Itinerary**:\n• **Day 1**: Arrive in Lusaka (LUN) → Connect to Livingstone → Sunset cruise on the upper Zambezi River.\n• **Day 2**: Guided Victoria Falls rainforest walk + Helicopter Flight of Angels + High tea at Royal Livingstone.\n• **Day 3**: Fly to Mfuwe (South Luangwa) → Check-in to river lodge → Afternoon sunset game drive.\n• **Day 4**: Dawn walking safari with master guide + Evening spotlight leopard drive along Luangwa lagoons.\n• **Day 5**: Morning birding & photography safari → Return flight to Lusaka for international connection.\n\nWould you like our concierge to customize this for your dates?`,
        showWhatsApp: true
      };
    }

    if (q.includes("lower zambezi") || q.includes("canoe") || q.includes("tiger fish")) {
      return {
        reply: `🛶 **Lower Zambezi National Park**:\n• **Highlights**: Multi-day canoe safaris drifting past elephant herds, catch-and-release tiger fishing, and luxury riverfront lodges.\n• **Access**: 30-minute charter flight from Lusaka or 3-hour transfer via Chirundu / Royal airstrip.`,
        showWhatsApp: true
      };
    }

    if (q.includes("pass") || q.includes("membership") || q.includes("discount") || q.includes("rates") || q.includes("price")) {
      return {
        reply: `🎟️ **ZamRoam Pass & Membership Privileges**:\n• Unlock up to 25% off verified safari lodges, Victoria Falls helicopter tours, car rentals, and ceremony VIP grandstand seating across Zambia.\n• Digital QR Pass is stored directly in your wallet for instant offline verification!`,
        showWhatsApp: true
      };
    }

    return {
      reply: `Zambia is an extraordinary destination with 10 peaceful provinces, 20 national parks, and over 60 traditional ceremonies!\n\nWhether you are looking for:\n1. **Victoria Falls & Livingstone Adventures**\n2. **South Luangwa & Lower Zambezi Safaris**\n3. **Kuomboka & Royal Traditional Ceremonies**\n4. **Lake Tanganyika & Bangweulu Wetlands**\n5. **Direct assistance on WhatsApp (${WHATSAPP_DISPLAY})**\n\nFeel free to ask a specific question, or chat with our team on WhatsApp!`,
      showWhatsApp: true
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const nextId = msgCounter + 1;
    const userMsg: AiChatMessage = {
      id: `user-msg-${nextId}`,
      sender: "user",
      text,
      timestamp: "Today"
    };

    setMsgCounter(nextId + 1);
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const { reply, showWhatsApp } = generateAiReply(text);
      const aiMsg: AiChatMessage = {
        id: `ai-msg-${nextId + 1}`,
        sender: "ai",
        text: reply,
        timestamp: "Today",
        whatsappPrompt: showWhatsApp
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const openWhatsApp = (customText?: string) => {
    const text = encodeURIComponent(
      customText || "Hello ZamRoam Concierge! I would like assistance planning my trip and ceremony visits in Zambia."
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, "_blank");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(6px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "linear-gradient(180deg, rgba(16, 44, 44, 1) 0%, rgba(8, 26, 26, 1) 100%)",
          color: "var(--brand-white)",
          borderRadius: "20px",
          maxWidth: "520px",
          width: "100%",
          height: "82vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          overflow: "hidden",
          fontFamily: "Ubuntu, sans-serif"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div
          style={{
            padding: "16px 20px",
            background: "rgba(6, 20, 20, 0.95)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(37, 211, 102, 1) 0%, rgba(16, 185, 129, 1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)"
              }}
            >
              🦁
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "var(--brand-white)" }}>
                  {brandName} AI Concierge
                </h3>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "rgba(37, 211, 102, 1)",
                    boxShadow: "0 0 8px rgba(37, 211, 102, 1)"
                  }}
                />
              </div>
              <p style={{ margin: "2px 0 0", fontSize: "11px", color: "rgba(255, 255, 255, 0.7)" }}>
                Instant Safari & Ceremony Assistant · 24/7
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              type="button"
              onClick={() => openWhatsApp()}
              style={{
                background: "rgba(37, 211, 102, 0.2)",
                border: "1px solid rgba(37, 211, 102, 0.5)",
                color: "rgba(37, 211, 102, 1)",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <span>💬 WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                color: "var(--brand-white)",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* WhatsApp Banner */}
        <div
          style={{
            background: "linear-gradient(90deg, rgba(18, 140, 126, 0.25) 0%, rgba(37, 211, 102, 0.25) 100%)",
            padding: "8px 16px",
            borderBottom: "1px solid rgba(37, 211, 102, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "12px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255, 255, 255, 0.9)" }}>
            <span style={{ fontSize: "14px" }}>📱</span>
            <span>
              Official Support: <strong>{WHATSAPP_DISPLAY}</strong>
            </span>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(37, 211, 102, 1)",
              fontWeight: 800,
              textDecoration: "underline",
              cursor: "pointer"
            }}
          >
            Chat Live →
          </a>
        </div>

        {/* Chat Messages Body */}
        <div
          style={{
            flex: 1,
            padding: "16px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}
        >
          {messages.map((m) => {
            const isAi = m.sender === "ai";
            return (
              <div
                key={m.id}
                style={{
                  alignSelf: isAi ? "flex-start" : "flex-end",
                  maxWidth: "88%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isAi ? "flex-start" : "flex-end"
                }}
              >
                <div
                  style={{
                    background: isAi ? "rgba(255, 255, 255, 0.08)" : "rgba(37, 211, 102, 0.95)",
                    color: isAi ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 1)",
                    borderRadius: isAi ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                    padding: "12px 16px",
                    fontSize: "13.5px",
                    lineHeight: 1.55,
                    border: isAi ? "1px solid rgba(255, 255, 255, 0.12)" : "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  {isAi ? <FormattedAiText text={m.text} /> : m.text}

                  {/* WhatsApp escalation button within message */}
                  {m.whatsappPrompt && (
                    <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid rgba(255, 255, 255, 0.15)" }}>
                      <button
                        type="button"
                        onClick={() => openWhatsApp(`Hello! I am inquiring regarding: ${m.text.slice(0, 60)}...`)}
                        style={{
                          background: "rgba(37, 211, 102, 1)",
                          color: "rgba(0, 0, 0, 1)",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 800,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                      >
                        <span>💬 Chat on WhatsApp ({WHATSAPP_DISPLAY})</span>
                      </button>
                    </div>
                  )}
                </div>
                <span style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.45)", marginTop: "4px", padding: "0 4px" }}>
                  {m.timestamp}
                </span>
              </div>
            );
          })}

          {isTyping && (
            <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", background: "rgba(255,255,255,0.06)", borderRadius: "16px 16px 16px 4px" }}>
              <span style={{ fontSize: "12px", color: "rgba(37, 211, 102, 1)" }}>🦁 ZamRoam AI is formulating response...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div
          style={{
            padding: "8px 14px",
            background: "rgba(0, 0, 0, 0.3)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            whiteSpace: "nowrap"
          }}
        >
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(prompt)}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "rgba(255, 255, 255, 0.85)",
                padding: "5px 11px",
                borderRadius: "14px",
                fontSize: "11px",
                cursor: "pointer",
                flexShrink: 0
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{
            padding: "12px 16px",
            background: "rgba(6, 20, 20, 0.95)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about Victoria Falls, Kuomboka, safaris, passes..."
            style={{
              flex: 1,
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "var(--brand-white)",
              borderRadius: "12px",
              padding: "10px 14px",
              fontSize: "13px",
              outline: "none"
            }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            style={{
              background: inputValue.trim()
                ? "linear-gradient(135deg, rgba(37, 211, 102, 1) 0%, rgba(16, 185, 129, 1) 100%)"
                : "rgba(255, 255, 255, 0.1)",
              color: inputValue.trim() ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 0.4)",
              border: "none",
              borderRadius: "12px",
              padding: "10px 16px",
              fontWeight: 800,
              fontSize: "13px",
              cursor: inputValue.trim() ? "pointer" : "default"
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

// Floating Quick Action Widget on screen
export function FloatingConciergeWidget({ onOpenAiChat }: { onOpenAiChat: () => void }) {
  const openWhatsApp = () => {
    const text = encodeURIComponent("Hello ZamRoam team! I need assistance with Zambia travel and safari bookings.");
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, "_blank");
  };

  return (
    <aside
      aria-label="Concierge and WhatsApp support"
      style={{
        position: "fixed",
        bottom: "84px",
        right: "16px",
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "flex-end"
      }}
    >
      {/* WhatsApp Quick Button */}
      <button
        type="button"
        onClick={openWhatsApp}
        title="Chat on WhatsApp (+260 573 506 598)"
        style={{
          background: "linear-gradient(135deg, rgba(37, 211, 102, 1) 0%, rgba(18, 140, 126, 1) 100%)",
          color: "rgba(255, 255, 255, 1)",
          border: "none",
          borderRadius: "28px",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: 800,
          fontSize: "12.5px",
          boxShadow: "0 6px 18px rgba(37, 211, 102, 0.45)",
          cursor: "pointer",
          transition: "transform 0.15s ease",
          fontFamily: "Ubuntu, sans-serif"
        }}
      >
        <span style={{ fontSize: "16px" }}>💬</span>
        <span>WhatsApp Support</span>
      </button>

      {/* AI Safari Concierge Button */}
      <button
        type="button"
        onClick={onOpenAiChat}
        title="Ask ZamRoam AI Safari Concierge"
        style={{
          background: "linear-gradient(135deg, rgba(16, 52, 52, 1) 0%, rgba(6, 24, 24, 1) 100%)",
          color: "var(--brand-white)",
          border: "1.5px solid rgba(37, 211, 102, 0.7)",
          borderRadius: "28px",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: 800,
          fontSize: "12.5px",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.45)",
          cursor: "pointer",
          transition: "transform 0.15s ease",
          fontFamily: "Ubuntu, sans-serif"
        }}
      >
        <span style={{ fontSize: "16px" }}>🦁</span>
        <span>Ask Safari AI</span>
      </button>
    </aside>
  );
}
