# Visit PNG colour system

`app/theme.css` is the single source of truth. Product CSS uses semantic tokens; raw colour values are restricted to that file and self-contained brand assets such as the favicon.

## Approved primitives

| Token | Value | Role |
|---|---:|---|
| Deep teal | `#1B6960` | Brand anchors, navigation, trust and selected states |
| Action orange | `#E77522` | Primary actions and focus indication |
| Logo orange | `#DE7739` | Identity marks only |
| Secondary teal | `#418F8A` | Secondary information and borders |
| Soft mint | `#A2CECA` | Selected and supportive surfaces |
| Premium gold | `#EFB00D` | Premium membership and restrained highlights |
| Warm ivory | `#FAF7F2` | Default page surface |
| White | `#FFFFFF` | Cards and text on dark surfaces |
| Charcoal | `#232231` | Primary text |
| Grey | `#85848A` | Secondary text |

Derived shades are limited: dark teal and orange are interactive variants; teal, mint, orange and ivory washes are low-emphasis surfaces; the neutral border separates content; danger and warning pairs are semantic accessibility colours, not new brand colours.

## Component recipes

- Header: deep teal with white text; logo orange only in the identity mark.
- Primary button: action orange with charcoal text; focus uses an orange 3px outline with offset.
- Secondary button: deep teal with white text. Disabled controls retain text labels.
- Cards and forms: white on warm ivory, charcoal headings, grey supporting copy, neutral borders.
- Selected filters: soft mint with deep teal text and secondary-teal border. Selection is also communicated by shape and weight.
- Premium: deep teal surface and premium gold accent. Gold is not used for normal actions.
- Status: success uses teal, warning and danger use semantic pairs, and every state requires a text or icon label.

Maps use deep teal for default markers, action orange for selection, and gold for premium listings. Charts use deep teal, action orange, secondary teal, gold, then logo orange; all series require labels or patterns. Email uses ivory pages, white cards, charcoal copy, teal headings and orange CTAs. Print uses white, charcoal and grey. The current release uses the verified high-contrast light theme across system preferences; a future dark mode theme must pass the same semantic contrast checks before activation.

Do use semantic variables and verify focus, hover, disabled, empty, loading, success, warning and error states. Do not add raw colours to feature CSS, use logo orange as a CTA, use gold for standard emphasis, or encode meaning by colour alone.
