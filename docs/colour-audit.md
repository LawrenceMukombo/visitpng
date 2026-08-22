# Colour audit

Audited the implemented catalogue, search, filters, cards, details and booking sheets, saved/empty/loading states, membership, navigation, sign-in, profile, security, audit history, favicon and responsive/print modes.

The former green/lime/cream palette and starter blue favicon were retired. Implemented UI styling now resolves through `app/theme.css`. Listing photography is external content and is intentionally not recoloured.

Provider, admin, maps, analytics, payments, notifications and email screens do not yet exist. Their semantic contracts are documented in the design-system guide so future modules do not introduce local palettes.

Regression criteria: no legacy literals in feature CSS; primary actions, active navigation and focus remain distinguishable without colour alone; loading, empty, disabled, success and security states retain labels; mobile and wider layouts retain structure; dark preference and print use semantic remapping.
