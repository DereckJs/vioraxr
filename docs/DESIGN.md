# VioraXR Design Context

## Design Direction
VioraXR uses a restrained medical XR interface: dark clinical surfaces, precise spacing, real brand assets, and code-native controls. The interface should feel like a serious clinical visualization platform, not a marketing landing page or a generic dashboard template.

## Palette
- Background: `#050b17`, `#071526`, `#03101f`
- Surface: `#071426`, `#0a1a2f`, `#10233a`
- Border: `rgba(145, 231, 255, 0.14)`
- Primary text: `#f8fbff`
- Muted text: `#9eb8ca`
- Clinical cyan: `#00d4ff`
- Medical blue: `#1f8fff`
- Controlled violet: `#6d3df5`
- Success: `#24cf8e`
- Warning: `#ffb725`
- Critical: `#ff4dbe`

Use cyan and blue as the primary accents. Violet is allowed in small amounts for XR depth and secondary actions. Avoid excessive neon glow, pure black, pure white, beige, and one-note purple gradients.

## Typography
Use Poppins from WebFontLoader for the product shell. Use strong sans-serif hierarchy:
- Display headings: heavy, tight line height, controlled size.
- Body text: readable, max width around 65 characters.
- Labels: small uppercase with positive tracking only for system labels and table headers.
- Numeric dashboard values: tabular feel through weight and consistent sizing.

## Assets
Canonical public asset names:
- `public/assets/vioraxr/logo-horizontal.png`
- `public/assets/vioraxr/logo-square.png`
- `public/assets/vioraxr/isotipo.png`
- `public/assets/vioraxr/hero-medico.png`
- `public/assets/vioraxr/hero-paciente.png`
- `public/assets/vioraxr/portal-paciente.png`
- `public/assets/vioraxr/wallpaper-login.png`
- `public/assets/vioraxr/watermark.png`

Use the horizontal logo for headers and the isotipo for compact marks. If source images have transparent padding, crop visually with CSS object-fit, max dimensions, or wrapper sizing; do not overwrite original assets destructively.

## Layout Rules
- Keep the app shell centered with a max width around 1360 to 1500px.
- Use CSS Grid for dashboards and responsive collapse.
- Cards are allowed only as functional panels, tables, repeated studies, status summaries, and viewer tools.
- Avoid nested cards.
- Header areas should be compact, especially on portals.
- Desktop first, with basic mobile/tablet single-column fallback.
- Use `100dvh` or scrollable containers carefully because the legacy app uses global hidden overflow.

## Component Rules
- Buttons need hover, focus, and active feedback.
- Tables should be scannable and compact, with clear status chips.
- Do not add visible navigation items that do not work.
- Keep viewer controls code-native and preserve all existing handlers.
- Use Material UI v4 components and existing icon packages. Do not add dependencies for this rework.

## Viewer Shell
The DICOM viewport is the product core. Branding may change chrome, top bar, drawer colors, surface borders, typography, and logo display. Do not alter DICOM rendering internals, measurement logic, MPR logic, file loading, Redux data flow, or image processing.
