---
name: Tonnendeckel
description: The screen is the bin's lid. An ink-and-white native shell where colour belongs only to waste destinations.
colors:
  ink: "#111111"
  paper: "#FFFFFF"
  muted: "#5C5F63"
  rule: "#E3E3E3"
  danger: "#B3261E"
  ink-dark: "#F2F2F2"
  paper-dark: "#0B0B0C"
  muted-dark: "#A4A7AB"
  rule-dark: "#2A2B2E"
  danger-dark: "#F2B8B5"
  field-fill: "#F1F1F2"
  field-fill-dark: "#1C1D1F"
  sheet-rule: "#D6D6D6"
  wertstoff-flood: "#F2C200"
  wertstoff-lid: "#D4A900"
  papier-flood: "#1E5AA8"
  papier-lid: "#174A8C"
  bio-flood: "#7A4B2A"
  bio-lid: "#633C21"
  rest-flood: "#4A4F55"
  rest-lid: "#3A3E43"
  glass-white-flood: "#E4EAEC"
  glass-white-lid: "#C9D3D7"
  glass-green-flood: "#2E7D4F"
  glass-green-lid: "#246640"
  glass-brown-flood: "#8A5A2B"
  glass-brown-lid: "#714821"
  outside-flood: "#25282C"
  outside-lid: "#17191C"
typography:
  display:
    fontFamily: "SF Pro (iOS), Roboto (Android), system-ui"
    fontSize: "52px"
    fontWeight: 800
    lineHeight: "56px"
    letterSpacing: "-1px"
  display-stacked:
    fontFamily: "SF Pro (iOS), Roboto (Android), system-ui"
    fontSize: "36px"
    fontWeight: 800
    lineHeight: "40px"
    letterSpacing: "-0.6px"
  headline:
    fontFamily: "SF Pro (iOS), Roboto (Android), system-ui"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: "34px"
    letterSpacing: "-0.4px"
  title:
    fontFamily: "SF Pro (iOS), Roboto (Android), system-ui"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "26px"
  body:
    fontFamily: "SF Pro (iOS), Roboto (Android), system-ui"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: "24px"
  label:
    fontFamily: "SF Pro (iOS), Roboto (Android), system-ui"
    fontSize: "17px"
    fontWeight: 600
  caption:
    fontFamily: "SF Pro (iOS), Roboto (Android), system-ui"
    fontSize: "15px"
    fontWeight: 400
rounded:
  hinge: "6px"
  chip: "7px"
  field: "12px"
  sheet: "16px"
  pill: "26px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  gutter: "20px"
  flood-gutter: "24px"
  section: "32px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "52px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "52px"
  button-destructive:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    typography: "{typography.label}"
    padding: "0"
    height: "52px"
  button-on-flood:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.bio-flood}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "52px"
  chip-lid:
    backgroundColor: "{colors.wertstoff-flood}"
    rounded: "{rounded.chip}"
    size: "28px"
  chip-depends:
    backgroundColor: "transparent"
    rounded: "{rounded.chip}"
    size: "28px"
  row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "10px 0"
    height: "52px"
  search-field:
    backgroundColor: "{colors.field-fill}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "0 12px"
    height: "44px"
  step-sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sheet}"
    padding: "0 16px"
  lid-strip:
    backgroundColor: "{colors.bio-lid}"
    textColor: "{colors.paper}"
    height: "56px"
    padding: "0 8px"
---

# Design System: Tonnendeckel

## Overview

**Creative North Star: "The Screen Is the Lid"**

Every answer turns the phone into the lid of the right bin: the whole screen floods in the destination's lid colour, capped by a darker lid strip with a hinge notch, with the German bin name set huge so the person can match screen to lid in the courtyard. Everything that is not an answer stays out of the way: a neutral ink-and-white native shell with system type, native tabs and plain hairline lists.

The system is deliberately two-state. The shell is quiet and colourless; the flood is loud and monochrome. Colour carries meaning (which bin) and nothing else, so it never decorates. Doubt states (confirm, no rule, unsure) stay in the neutral shell rather than borrowing a flood, because a flood is a promise about a bin.

Evidence: Android phone build, finish-reviewed and shipped (light, dark, 200% font scale). iOS rendering (SF Symbols, NativeTabs, SF Pro) is implemented but **unverified** on device.

**Key Characteristics:**
- Neutral shell in ink and white, with true dark-mode counterparts.
- Colour appears only as destination lid colours: full floods, stacked bands, and small lid chips.
- System type at platform text-style sizes, scaling with Dynamic Type / font scale.
- Pill buttons, hairline rows, no shadows.
- One signature motion: the flood rises once from the bottom.

## Colors

A colourless shell and a fixed set of lid colours, each a pair: the flood and a darker lid tone.

### Primary
- **Lid Floods** (the `*-flood` tokens): the full-screen result background, one per destination: Wertstoff yellow, Papier blue, Bio brown, Rest graphite, glass white/green/brown, and the near-black "outside" (Wertstoffhof / special collection). Which destinations a city has, and their mapping, come from city data; the swatch set itself lives in the theme.
- **Lid Tones** (the `*-lid` tokens): one step darker than each flood. Used only for the lid strip, the hinge notch, the seam between stacked bands, and the top cap of a lid chip.
- **On-flood text**: ink on Wertstoff yellow and glass white; paper on every other flood. The status bar follows the same choice.

### Neutral
- **Ink** (`ink`): all shell text, primary button fill, selected tab and radio check.
- **Paper** (`paper`): shell background, tab bar, the step sheet on a flood.
- **Muted Graphite** (`muted`): secondary text, unselected tabs, row chevrons, the dashed "depends" chip.
- **Hairline Grey** (`rule`): row dividers, tab indicator.
- **Signal Red** (`danger`): the destructive text button only.
- Dark mode swaps to the `*-dark` set (`ink-dark` text on `paper-dark`). Floods do not change in dark mode.

### Named Rules
**The Colour Is a Bin Rule.** Outside a flood, the only colour on screen is a lid chip. No brand accent, no green leaf, no tinted cards, no coloured icons in the shell.

**The Lid Pair Rule.** Every destination colour ships as a pair (flood + darker lid). A new destination is not added without both.

## Typography

**Display Font:** SF Pro on iOS, Roboto on Android (the platform system face)
**Body Font:** same

**Character:** Native and unbranded on purpose; the voice comes from scale and weight contrast on the flood, not from a typeface. All sizes scale with Dynamic Type / Android font scale; layout must survive 200%.

### Hierarchy
- **Display** (800, 52/56, -1 tracking): the German destination name on a single-part flood. Hyphenation enabled on Android so long compounds break.
- **Display Stacked** (800, 36/40, -0.6): the German name inside a stacked band.
- **Headline** (700, 28/34, -0.4): screen titles in the shell (Title component, announced as header).
- **Title** (600, 20/26): the translation line under the German name.
- **Body** (400, 17/24): rows, steps, "what goes in" line, search input.
- **Label** (600, 17): buttons, lid-strip title, the item name above the German name (at 85% opacity).
- **Caption** (400 or 600, 15): row secondary lines, dates, city in the lid strip, feedback prompt.

### Named Rules
**The One Huge Word Rule.** Only the German destination name is set at display size, and only on a flood. Shell screens top out at the 28px headline.

## Layout

Single-column phone layout. Shell screens use a 20px side gutter; flood bands use 24px. Vertical rhythm comes from gaps of 4/8/12/16/24/32 (24-32 between shell sections, 28 between neutral-result blocks). Touch targets are at least 44px; rows and buttons are 52px tall. Primary actions sit in a footer at the thumb (bottom of the screen, above the safe-area inset), never at the top. Navigation is the platform's native tab bar (Camera, Search, History, Settings); results are full-screen over it.

## Elevation & Depth

Flat. There are no shadows anywhere in the shell or on floods. Depth is told by tone: the darker lid strip caps the flood, the hinge notch hangs from it, and stacked bands are separated by a 10px seam in the next band's lid tone. The white step sheet sits on the flood by contrast alone.

### Named Rules
**The Tone Not Shadow Rule.** Separation comes from a darker lid tone or a hairline, never from a drop shadow.

## Shapes

Pills for actions (radius = half of the 52px height). Softly squared containers: 12px for the search field, 16px for the step sheet. Lid chips are squares with radius one quarter of their size and a top cap one fifth of their size in the lid tone, so even a 22px chip reads as a little bin lid. The hinge notch is a 76x10 tab with 6px bottom corners. Lists are full-bleed hairline rows with no card containers.

## Components

### Buttons
- **Shape:** full pill (26px), 52px tall, 22px side padding, 1.5px border, optional 20px leading icon or chip with 8px gap.
- **Primary:** ink fill, paper label.
- **Secondary:** transparent with a 1.5px ink outline, ink label. The default for doubt-state actions.
- **Destructive:** bare red text, left-aligned, no padding or outline.
- **On flood:** inverse of the flood (fill = on-flood colour, label = flood colour). One per flood, at the bottom.
- **States:** pressed 75% opacity; disabled 40%.

### Chips
- **Lid chip:** 28px default (22px inside buttons), flood fill, lid-tone top cap and hairline edge.
- **Depends chip:** same square, empty, 1.5px dashed muted border, for items whose bin depends on a condition.

### Lists / Rows
- **Style:** 52px minimum, 10px vertical padding, 12px gaps, hairline bottom rule. Leading chip optional.
- **Navigation row:** 16px muted chevron. **Radio row:** 20px ink check when selected, radio accessibility role. Pressed 60% opacity.

### Inputs / Fields
- **Search field:** filled `field-fill` (dark `field-fill-dark`), 12px radius, 44px tall, leading search icon, 17px text. No border, no focus glow; the system caret marks focus.

### Navigation
- **Tabs:** platform native tabs (NativeTabs) on paper, ink selected label and icon, muted unselected, rule-grey indicator.
- **Icons:** SF Symbols on iOS; Material icon font on Android with font scaling disabled so icons hold their size at large text. Outline variants for feedback thumbs.

### Flood (signature)
The result screen. A lid strip (lid tone, 56px under the status-bar inset) holds back, title and city in on-flood colour; the hinge notch hangs centred below it. The band carries item name, German name (display), translation (title), one "what goes in" line, then 1-3 numbered steps on a white sheet (16px radius, #D6D6D6 hairlines between steps). Multi-part items stack one band per part, each in its own flood, separated by lid-tone seams; steps go inline on the band. The page background takes the last band's flood so the footer CTA sits on it. The flood rises from the bottom once (460ms, exponential ease-out) with a light haptic; under Reduce Motion it fades in (180ms).

### Neutral result
Confirm / no-rule / unsure states: paper screen, close button top-left, headline, muted sub, rows with lid chips, secondary buttons in a bottom footer.

## Do's and Don'ts

### Do:
- **Do** flood the full screen in the destination's lid colour for every confident answer, with the lid strip and hinge notch on top.
- **Do** set the German destination name as the largest thing on screen (800, 52/56), with the translation beneath it.
- **Do** keep the shell ink and white with system type, native tabs and hairline rows.
- **Do** use a lid chip (or the dashed depends chip) wherever a destination appears in a list.
- **Do** place the primary action as a pill at the bottom of the screen.
- **Do** honour Reduce Motion, Dynamic Type up to 200%, and 44px touch targets.

### Don't:
- **Don't** use colour in the shell for anything except lid chips: no brand accent, no green-leaf eco cues.
- **Don't** show a destination as a white card with a small coloured bin icon; the answer is the flood.
- **Don't** use drop shadows; separate with lid tone or hairlines.
- **Don't** put a flood on a doubt state (confirm, no rule, unsure); those stay neutral.
- **Don't** animate the flood more than once per result (a crossfade under Reduce Motion).
