# Life Changing Journey â€” Services Content & Links

Reference for all services shown in the **Expo mobile app**, where they appear, and every public URL / phone link used in the codebase.

**Source of truth (service copy):** `src/utils/staticData.js`  
**Last updated:** 19 May 2026

---

## Table of contents

1. [Main organisation contacts](#1-main-organisation-contacts)
2. [Services overview](#2-services-overview)
3. [Service 1 â€” Psychology Services](#3-service-1--psychology-services)
4. [Service 2 â€” Spiritual Interventions](#4-service-2--spiritual-interventions)
5. [Service 3 â€” Tshabalala Omhle Financial Group](#5-service-3--tshabalala-omhle-financial-group)
6. [Service 4 â€” Hypnotherapy & Life Coaching](#6-service-4--hypnotherapy--life-coaching)
7. [Service 5 â€” Tshabalala Omkhulu Consulting](#7-service-5--tshabalala-omkhulu-consulting)
8. [Service 6 â€” Nyezi Vuyani Foundation](#8-service-6--nyezi-vuyani-foundation)
9. [App navigation & screens](#9-app-navigation--screens)
10. [Social & Connect links](#10-social--connect-links)
11. [Membership & booking links](#11-membership--booking-links)
12. [Service images (app assets)](#12-service-images-app-assets)
13. [Logos & brand assets](#13-logos--brand-assets)
14. [Partner / service branding (no separate logo files)](#14-partner--service-branding-no-separate-logo-files)
15. [Unused & duplicate image files](#15-unused--duplicate-image-files)
16. [Contact form service options](#16-contact-form-service-options)
17. [Color schema (brand palette)](#17-color-schema-brand-palette)

---

## 1. Main organisation contacts

Used across Home, Contact, chatbot, and store listings.

| Channel | Link / value | Where used |
|---------|----------------|------------|
| **Website (primary)** | https://www.lifechangingjourney.co.za | `Constants.PUBLIC_SITE_URL` (production), Resources â€œWebsiteâ€ |
| **Website (alternate)** | https://lifechangingjourney.co.za | Spiritual/hypnotherapy service records, ResourcesScreen |
| **Email** | info@lifechangingjourney.co.za | ContactScreen, terms, App Store guide |
| **Phone (office)** | +27 31 035 0208 Â· `tel:+27310350208` | Contact, Home â€œCall Usâ€, LCJ services |
| **WhatsApp** | +27 65 846 0441 Â· https://wa.me/27658460441 | Home, Contact (some screens use `27310350208` for general WA â€” see note below) |
| **Location** | Durban, KwaZulu-Natal, South Africa | Contact, constants |
| **Membership web** | https://www.lifechangingjourney.co.za/plans | MembershipPackagesScreen â†’ `PUBLIC_SITE_URL/plans` |
| **Hours (chatbot)** | Monâ€“Fri 8:00 AM â€“ 5:00 PM | `geminiService.js` |

**Note â€” WhatsApp numbers in app:**

| Screen | WhatsApp URL |
|--------|----------------|
| HomeScreen, ContactScreen (primary CTA) | https://wa.me/27658460441 |
| ResourcesScreen | https://wa.me/27310350208 |

Align these with your official business line before store release.

**Note â€” `Constants.CONTACT` in `src/utils/constants.js` still lists `info@lifechangingjourneyapp.com` and `lifechangingjourneyapp.com`. Most UI uses `info@lifechangingjourney.co.za` and `lifechangingjourney.co.za` instead.

---

## 2. Services overview

| ID | Title | Category | Practitioner | Website |
|----|-------|----------|--------------|---------|
| 1 | Psychology Services | `mental_wellness` | Vuyani Nyezi | https://psychologistdurban.co.za |
| 2 | Spiritual Interventions | `spiritual_growth` | Life Changing Journey | https://lifechangingjourney.co.za |
| 3 | Tshabalala Omhle Financial Group | `financial_guidance` | Tshabalala Omhle Financial Group | https://tshabalalafinance.co.za |
| 4 | Hypnotherapy & Life Coaching | `hypnotherapy` | Life Changing Journey | https://lifechangingjourney.co.za |
| 5 | Tshabalala Omkhulu Consulting | `consulting` | Tshabalala Omkhulu | https://tshabalalaomkhulu.co.za |
| 6 | Nyezi Vuyani Foundation | `education` | Nyezi Vuyani Foundation | https://www.nyezivfoundation.co.za/ |

---

## 3. Service 1 â€” Psychology Services

| Field | Content |
|-------|---------|
| **Short description** | Professional psychological support & therapy |
| **Full description** | Comprehensive mental health support with Vuyani Nyezi, a counselling psychologist with 12+ years of experience. Individual counseling, therapy sessions, and psychological assessments to support your mental wellness journey. |
| **Practitioner** | Vuyani Nyezi â€” Counselling Psychologist |
| **Category** | `mental_wellness` |
| **App icon** | `medical-outline` |

### Features (in app)

- Individual Therapy Sessions  
- Psychological Assessments  
- Stress & Anxiety Management  
- Depression Support  
- Trauma Counseling  
- African Psychology Integration  
- Indigenous Knowledge Systems  
- Cultural Aspects of Counseling  

### Links

| Type | Value |
|------|--------|
| **Website** | https://psychologistdurban.co.za |
| **Mobile** | +27 67 280 3432 Â· `tel:+27672803432` |
| **Office** | +27 31 035 0208 Â· `tel:+27310350208` |

### App routes

| Route name | Screen file |
|------------|-------------|
| `MentalWellness` | `src/screens/services/MentalWellnessScreen.js` |
| `ServiceDetail` | Pass `{ service }` from list â€” `ServiceDetailScreen.js` |

### Gateway screen extra links

`MentalWellnessScreen` also links to https://lifechangingjourney.co.za (LCJ hub).

---

## 4. Service 2 â€” Spiritual Interventions

| Field | Content |
|-------|---------|
| **Short description** | Traditional spiritual healing & guidance |
| **Full description** | Traditional African spiritual interventions (izinkinga zemimoya) including spiritual cleansing, guidance, and Ubuntu-based healing practices rooted in our cultural heritage. |
| **Practitioner** | Life Changing Journey â€” Traditional Spiritual Practitioner |
| **Category** | `spiritual_growth` |
| **App icon** | `leaf-outline` |

### Features

- Ukugezwa Kwemimoya (Spiritual Cleansing)  
- Traditional Healing Ceremonies  
- Ancestral Communication  
- Spiritual Guidance & Direction  
- Ubuntu Philosophy Integration  
- Cultural Heritage Healing  

### Links

| Type | Value |
|------|--------|
| **Website** | https://lifechangingjourney.co.za |
| **Phone** | +27 31 035 0208 Â· `tel:+27310350208` |

### App routes

| Route name | Screen file |
|------------|-------------|
| `SpiritualGrowth` | `src/screens/services/SpiritualGrowthScreen.js` |
| `ServiceDetail` | `ServiceDetailScreen.js` |

### Gateway screen extra links

`SpiritualGrowthScreen` also opens https://tshabalalaomkhulu.co.za (integrated registrations).

---

## 5. Service 3 â€” Tshabalala Omhle Financial Group

| Field | Content |
|-------|---------|
| **Short description** | Comprehensive financial solutions & loans |
| **Full description** | Your trusted partner in achieving financial success and stability. A proudly Black-owned enterprise in Durban, South Africa, providing accessible, transparent, and effective financial solutions with NCR registration (NCRCP20083). |
| **Practitioner** | Tshabalala Omhle Financial Group â€” NCR Registered Credit Provider |
| **Category** | `financial_guidance` |
| **App icon** | `card-outline` |
| **Regulatory** | NCR registration **NCRCP20083** |

### Features

- Soft Loans - Quick, accessible funding  
- Personal Loans - Competitive rates  
- Business Financing for SMEs  
- Debt Consolidation Services  
- Credit Counseling & Guidance  
- NCR Registered (NCRCP20083)  
- Black-owned & Community-focused  
- Ethical Lending Practices  

### Links

| Type | Value |
|------|--------|
| **Website** | https://tshabalalafinance.co.za |
| **Phone** | +27 69 308 4723 Â· `tel:+27693084723` |

### App routes

| Route name | Screen file |
|------------|-------------|
| `FinancialGuidance` | `src/screens/services/FinancialGuidanceScreen.js` |
| `ServiceDetail` | `ServiceDetailScreen.js` |

---

## 6. Service 4 â€” Hypnotherapy & Life Coaching

| Field | Content |
|-------|---------|
| **Short description** | Transform your life through hypnosis |
| **Full description** | Professional hypnotherapy sessions and life coaching to overcome limiting beliefs, break bad habits, and unlock your full potential for personal transformation. |
| **Practitioner** | Life Changing Journey â€” Clinical Hypnotherapist & Life Coach |
| **Category** | `hypnotherapy` |
| **App icon** | `eye-outline` |

### Features

- Clinical Hypnotherapy Sessions  
- Life Coaching & Goal Setting  
- Habit Change Programs  
- Confidence Building  
- Stress Reduction Techniques  
- Personal Transformation Plans  

### Links

| Type | Value |
|------|--------|
| **Website** | https://lifechangingjourney.co.za |
| **Phone** | +27 31 035 0208 Â· `tel:+27310350208` |

### App routes

| Route name | Screen file |
|------------|-------------|
| `Hypnotherapy` | `src/screens/services/HypnotherapyScreen.js` |
| `ServiceDetail` | `ServiceDetailScreen.js` |

---

## 7. Service 5 â€” Tshabalala Omkhulu Consulting

| Field | Content |
|-------|---------|
| **Short description** | Integrated services & professional registrations |
| **Full description** | Comprehensive integrated services including professional registrations, business consulting, and one-stop service solutions. From fingerprint clearance to gambling licenses, we handle all your professional registration needs. |
| **Practitioner** | Tshabalala Omkhulu â€” Integrated Services Consultant |
| **Category** | `consulting` |
| **App icon** | `library-outline` |

### Features

- Fingerprints Criminal Clearance  
- Pre/Post Employment Screening  
- SACE Registration & Renewal  
- PSIRA Registrations  
- UBER/Bolt/InDrive Registration  
- SAIT Registration or Renewal  
- NCR Registrations  
- PDP Applications  
- Gambling License Applications  
- Traditional Wisdom Consultation  
- Business & Career Guidance  

### Links

| Type | Value |
|------|--------|
| **Website** | https://tshabalalaomkhulu.co.za |
| **Phone** | +27 69 308 4723 Â· `tel:+27693084723` |

### App routes

| Route name | Screen file |
|------------|-------------|
| `IntegratedServices` | `src/screens/services/IntegratedServicesScreen.js` |
| `ServiceDetail` | `ServiceDetailScreen.js` |

**Home quick action label:** â€œIntegrated Servicesâ€ â†’ route `IntegratedServices`

---

## 8. Service 6 â€” Nyezi Vuyani Foundation

| Field | Content |
|-------|---------|
| **Short description** | Educational support & rural community development |
| **Full description** | Non-profit organization driven by a passion for education and deep commitment to rural communities. Bridging the educational gap between urban and rural areas by providing financial assistance, mentorship, and career guidance to learners from disadvantaged backgrounds. |
| **Practitioner** | Nyezi Vuyani Foundation â€” Non-Profit Educational Organization |
| **Category** | `education` |
| **App icon** | `school-outline` |

### Features

- Educational Support for Rural Communities  
- Financial Assistance for Learners  
- High School to University Support  
- Mentorship & Career Guidance  
- Personal Development Opportunities  
- Community Development Programs  
- Bridging Urban-Rural Educational Gaps  
- Empowering Rural Youth  

### Links

| Type | Value |
|------|--------|
| **Website** | https://www.nyezivfoundation.co.za/ |
| **Phone** | +27 74 067 4650 Â· `tel:+27740674650` |

### App routes

| Route name | Screen file |
|------------|-------------|
| `ServiceDetail` | Listed on Home & Services tabs (no dedicated stack screen) |
| **Donations** | HomeScreen â†’ â€œSupport Nyezi Foundationâ€ (DonationScreen tab) |

---

## 9. App navigation & screens

### Bottom tabs (`TabNavigator`)

| Tab label | Route | Screen |
|-----------|-------|--------|
| Home | `Home` | `HomeScreen.js` |
| Services | `Services` | `ServicesScreen.js` |
| Booking | `Booking` | `BookingScreen.jsx` |
| Connect | `Connect` | `ResourcesScreen.js` (social hub) |
| Donate | `Donate` | `DonationScreen.js` |

### Stack routes for services (`MainNavigator`)

| Route | Title | Purpose |
|-------|-------|---------|
| `ServiceDetail` | Service Details | Full service page + image + call/website |
| `MentalWellness` | Mental Wellness | Psychology gateway |
| `SpiritualGrowth` | Spiritual Growth | Spiritual gateway |
| `FinancialGuidance` | Financial Guidance | Financial gateway |
| `Hypnotherapy` | Hypnotherapy | Hypnotherapy gateway |
| `IntegratedServices` | Integrated Services | Consulting gateway |
| `Contact` | Contact Us | Form + call/WhatsApp/email |
| `MembershipPackages` | Membership | Tiers + link to web checkout |

### Home quick actions (`staticData.quickActions`)

| Title | Stack route |
|-------|-------------|
| Psychology Services | `MentalWellness` |
| Financial Services | `FinancialGuidance` |
| Spiritual Growth | `SpiritualGrowth` |
| Hypnotherapy | `Hypnotherapy` |
| Integrated Services | `IntegratedServices` |
| Contact Us | `Contact` |

### Service card actions (Home & Services)

| User action | Behaviour |
|-------------|-----------|
| Tap card body | `navigation.navigate('ServiceDetail', { service })` |
| **Website** button | `Linking.openURL(service.website)` |
| **Call** button | `Linking.openURL('tel:' + service.phone)` |

---

## 10. Social & Connect links

From `ResourcesScreen.js` and `src/utils/constants.js`.

| Platform | URL |
|----------|-----|
| **Facebook** | https://www.facebook.com/share/1B7sqUfweq/ |
| **Instagram** | https://www.instagram.com/lifechanging_journey?igsh=ZjF5ZjBoZWU1NXQx |
| **YouTube** | https://www.youtube.com/@lifechangingjourney-h4j |
| **TikTok** | https://www.tiktok.com/@lifechangingjourney |
| **Website** | https://lifechangingjourney.co.za |
| **WhatsApp (Connect tab)** | https://wa.me/27310350208 |
| **LinkedIn** (constants only) | https://linkedin.com/company/lifechangingjourneyapp |

### Podcast / YouTube (Connect tab)

| Field | Value |
|-------|--------|
| **Show** | Life Changing Journey Podcast |
| **Host** | Vuyani Nyezi |
| **Channel** | https://www.youtube.com/@lifechangingjourney-h4j |
| **RSS channel ID** | `UC1ZDnejClU8G4J8gNwHoByQ` |
| **Handle** | `@lifechangingjourney-h4j` |

---

## 11. Membership & booking links

| Feature | Link / behaviour |
|---------|------------------|
| **Membership plans (web)** | `{PUBLIC_SITE_URL}/plans` â€” production: https://www.lifechangingjourney.co.za/plans |
| **Local dev membership** | http://localhost:3000/plans (when `__DEV__` and no env override) |
| **Override env** | `EXPO_PUBLIC_LCJ_WEB_URL` |
| **Booking (Calendly)** | `EXPO_PUBLIC_CALENDLY_EMBED_URL` â€” embedded in `BookingScreen.jsx` |
| **Calendly API** | https://api.calendly.com |
| **Booking success** | In-app `BookingSuccessScreen` |

### Membership tiers (ZAR, once-off)

| Tier | Children | Adults | Couples |
|------|----------|--------|---------|
| Silver | R100 | R100 | R100 |
| Gold | R199 | R299 | R499 |
| Platinum | R399 | R599 | R899 |

---

## 12. Service images (app assets)

Hero / banner photos on **Service Detail** (`ServiceDetailScreen.js` â†’ `getServiceImage`).  
All paths are relative to project root.

| Service ID | Service name | Image file | Full path |
|------------|--------------|------------|-----------|
| **1** | Psychology Services | `vuyani-nyezi-psychology.jpeg` | `assets/images/vuyani-nyezi-psychology.jpeg` |
| **2** | Spiritual Interventions | `life-changing-journey-spiritual.jpeg` | `assets/images/life-changing-journey-spiritual.jpeg` |
| **3** | Tshabalala Omhle Financial Group | `tshabalala-omkhulu-financial.jpeg` | `assets/images/tshabalala-omkhulu-financial.jpeg` |
| **4** | Hypnotherapy & Life Coaching | `life-changing-journey-hypnotherapy.jpeg` | `assets/images/life-changing-journey-hypnotherapy.jpeg` |
| **5** | Tshabalala Omkhulu Consulting | `life-changing-journey-integrated.jpeg` | `assets/images/life-changing-journey-integrated.jpeg` |
| **6** | Nyezi Vuyani Foundation | `nyezi-vuyani-foundation.jpeg` | `assets/images/nyezi-vuyani-foundation.jpeg` |

### Naming convention (recommended)

Use **kebab-case** and this pattern:

| Service | Suggested filename |
|---------|-------------------|
| Psychology | `vuyani-nyezi-psychology.jpeg` |
| Spiritual | `life-changing-journey-spiritual.jpeg` |
| Financial | `tshabalala-omkhulu-financial.jpeg` |
| Hypnotherapy | `life-changing-journey-hypnotherapy.jpeg` |
| Integrated / Consulting | `life-changing-journey-integrated.jpeg` |
| Foundation / Education | `nyezi-vuyani-foundation.jpeg` |

**Specs (from `assets/images/README.md`):** JPG or PNG, minimum **800Ã—600px**, professional, consistent branding.

### Code reference

```javascript
// src/screens/services/ServiceDetailScreen.js
const imageMap = {
  1: require('../../../assets/images/vuyani-nyezi-psychology.jpeg'),
  2: require('../../../assets/images/life-changing-journey-spiritual.jpeg'),
  3: require('../../../assets/images/tshabalala-omkhulu-financial.jpeg'),
  4: require('../../../assets/images/life-changing-journey-hypnotherapy.jpeg'),
  5: require('../../../assets/images/life-changing-journey-integrated.jpeg'),
  6: require('../../../assets/images/nyezi-vuyani-foundation.jpeg'),
}
```

---

## 13. Logos & brand assets

### Life Changing Journey â€” primary logo (tree)

The official LCJ mark is the **multicolour tree** on a dark background (teal trunk, pink/gold/green/maroon leaves, light-blue crescent base).

| File | Path | Used for |
|------|------|----------|
| **Main app icon / logo** | `assets/icon.png` | App icon (`app.json`), Home header, Home hero, Resources, splash animation, push notifications, legal HTML |
| **Copy (legal site)** | `docs/legal-assets/logo.png` | `docs/terms-and-policies.html` |
| **Duplicate in images/** | `assets/images/icon.png` | Larger variant (~384 KB); not referenced in `require()` â€” prefer `assets/icon.png` for builds |
| **Favicon (web)** | `assets/images/favicon.png` | Expo web (`app.json` â†’ `web.favicon`) |
| **Favicon (legal)** | `docs/legal-assets/favicon.png` | Terms HTML page tab icon |

**Store requirement:** `assets/icon.png` must be **1024Ã—1024 PNG**, no transparency, no rounded corners (Apple App Store).

### Splash & launch

| File | Path | Used for |
|------|------|----------|
| **Splash image** | `assets/images/splash-icon.png` | iOS splash (`app.json`), `expo-splash-screen` plugin |
| **Splash (root duplicate)** | `assets/splash-icon.png` | Same asset copied at repo root |
| **Splash video** | `assets/splash.mp4` | Optional video splash (`VideoSplash.js`) if enabled |
| **Custom splash component** | â€” | `src/components/common/CustomSplashScreen.js` uses `assets/icon.png` |

### Android adaptive icon (Play Store)

| Layer | File | Path |
|-------|------|------|
| Foreground | `android-icon-foreground.png` | `assets/images/android-icon-foreground.png` |
| Background | `android-icon-background.png` | `assets/images/android-icon-background.png` |
| Monochrome | `android-icon-monochrome.png` | `assets/images/android-icon-monochrome.png` |
| Adaptive (legacy) | `adaptive-icon.png` | `assets/images/adaptive-icon.png` and `assets/adaptive-icon.png` |

Configured in `app.json` â†’ `android.adaptiveIcon` with background colour `#E6F4FE`.

### Other in-app images

| File | Path | Used for |
|------|------|----------|
| **Chatbot avatar** | `chatbot.png` | `ChatbotFAB.js`, `ChatbotModal.js` |
| **Donation testimonials** | *(external URLs)* | `DonationScreen.js` â€” Unsplash placeholders, not local files |

### Auth screens (logo note)

`LoginScreen.js` and `RegisterScreen.js` use an **Ionicons `heart` icon** inside a coloured circle â€” **not** `icon.png`. Consider replacing with `assets/icon.png` for brand consistency.

### Membership web (`membership-web`)

| Asset | In repo? | Notes |
|-------|----------|--------|
| LCJ tree logo image | **No** | Nav uses text: â€œLife Changing **Journey**â€ (`AppNav.tsx`, `login-logo` CSS) |
| Favicon | **No** | Uses Next.js defaults under `membership-web/public/` (`next.svg`, etc.) â€” not LCJ branded |

**Recommendation:** Add `membership-web/public/logo.png` (LCJ tree) and `favicon.ico` from `assets/icon.png` / `favicon.png`.

### Legal / policies HTML

| File | Path |
|------|------|
| Logo | `docs/legal-assets/logo.png` |
| Favicon | `docs/legal-assets/favicon.png` |
| Page | `docs/terms-and-policies.html` |

### Brand colours

Full palette: [§17 — Color schema](#17-color-schema-brand-palette) (`src/styles/colors.js`, `membership-web` CSS, legal HTML).

---

## 14. Partner / service branding (no separate logo files)

The app does **not** ship separate PNG/SVG **logos** per partner. Each service uses:

1. **Hero photo** (table in [Â§12](#12-service-images-app-assets)) on Service Detail  
2. **Ionicons** on service cards (`medical-outline`, `leaf-outline`, `card-outline`, etc.)  
3. **Theme colours** per category in `ServiceCard.js` / `colors.js`

| Service | Partner / brand | Logo file in repo? | Visual in app |
|---------|-----------------|-------------------|---------------|
| Psychology | Vuyani Nyezi / psychologistdurban.co.za | No â€” use `vuyani-nyezi-psychology.jpeg` | Photo + mental wellness colours |
| Spiritual | Life Changing Journey | No â€” use `life-changing-journey-spiritual.jpeg` | Photo + spiritual colours |
| Financial | Tshabalala Omhle Financial Group (NCRCP20083) | No â€” use `tshabalala-omkhulu-financial.jpeg` | Photo + financial green theme |
| Hypnotherapy | Life Changing Journey | No â€” use `life-changing-journey-hypnotherapy.jpeg` | Photo + hypnotherapy purple theme |
| Consulting | Tshabalala Omkhulu | No â€” use `life-changing-journey-integrated.jpeg` | Photo + consulting theme |
| Foundation | Nyezi Vuyani Foundation | No â€” use `nyezi-vuyani-foundation.jpeg` | Photo + education theme |

### Social platform â€œlogosâ€

Connect tab and Home use **@expo/vector-icons** (Ionicons), not image files:

| Platform | Icon name | Colour |
|----------|-----------|--------|
| Facebook | `logo-facebook` | `#1877F2` |
| Instagram | `logo-instagram` | `#E1306C` |
| YouTube | `logo-youtube` | `#FF0000` |
| TikTok | `logo-tiktok` | `#000000` |
| WhatsApp | `logo-whatsapp` | `#25D366` |

### Website-only image names (reference)

These names appear on **lifechangingjourney.co.za** but are **not** the filenames used in the mobile app repo. Map or rename if you import website assets:

| Website / marketing name | Likely service | App filename to use |
|--------------------------|----------------|---------------------|
| `WhatsApp Image 2025-06-08 at 08.02.36_9d40617f.jpg` | Psychologist | `vuyani-nyezi-psychology.jpeg` |
| `WhatsApp Image 2025-06-08 at 08.02.36_9f5006b2.jpg` | Spiritual / izinkinga zemimoya | `life-changing-journey-spiritual.jpeg` |
| `Brown and Orange Simple Grow your Business Instagram Post.jpg` | Nyezi Foundation | `nyezi-vuyani-foundation.jpeg` |
| `WhatsApp Image 2025-06-02 at 09.49.36_e4a8751a.jpg` | Tshabalala Omkhulu Consulting | `life-changing-journey-integrated.jpeg` |
| Credit Provider / Financial block | Tshabalala Finance | `tshabalala-omkhulu-financial.jpeg` |
| `WhatsApp Image 2025-08-22 at 01.40.15.jpeg` | Site hero / general LCJ | Optional marketing only |
| `ORI.jpg` | Mission / spiritual | Optional marketing only |

---

## 15. Unused & duplicate image files

Files present on disk but **not** wired in `require()` or `app.json` (safe to archive or remove after review):

### Root `assets/` (WhatsApp imports â€” duplicates)

| File | Notes |
|------|--------|
| `WhatsApp Image 2025-09-23 at 12.06.40.jpeg` | Unreferenced |
| `WhatsApp Image 2025-09-23 at 12.06.41.jpeg` | Likely duplicate of foundation image |
| `WhatsApp Image 2025-09-23 at 12.06.41 (1).jpeg` | Unreferenced |
| `WhatsApp Image 2025-09-23 at 12.06.41 (2).jpeg` | Unreferenced |
| `WhatsApp Image 2025-09-23 at 12.06.41 (3).jpeg` | Duplicate in `assets/images/` |
| `WhatsApp Image 2025-09-23 at 12.06.42.jpeg` | Unreferenced |
| `WhatsApp Image 2025-09-23 at 12.06.42 (1).jpeg` | Duplicate in `assets/images/` |

### `assets/images/` (Expo template leftovers)

| File | Notes |
|------|--------|
| `partial-react-logo.png` | Expo starter â€” remove |
| `react-logo.png` | Expo starter â€” remove |
| `react-logo@2x.png` | Expo starter â€” remove |
| `react-logo@3x.png` | Expo starter â€” remove |

### Duplicates of active assets

| File | Active counterpart |
|------|-------------------|
| `assets/images/icon.png` | `assets/icon.png` |
| `assets/adaptive-icon.png` | `assets/images/adaptive-icon.png` |
| `assets/favicon.png` | `assets/images/favicon.png` (web uses images/) |

---

## 16. Contact form service options

`ContactScreen.js` â€” â€œService interestâ€ dropdown:

1. Psychology Services  
2. Spiritual Interventions  
3. Financial Guidance  
4. Hypnotherapy & Life Coaching  
5. Integrated Services  
6. Educational Support  
7. General Inquiry  

Submissions are stored in Firestore collection `contacts` via `submitContactForm`.

---

## 17. Color schema (brand palette)

Derived from the **LCJ tree logo** and implemented in:

| Platform | Source file |
|----------|-------------|
| **Expo mobile app** | `src/styles/colors.js` |
| **Membership web** | `membership-web/src/app/globals.css` (`:root` CSS variables) |
| **Legal HTML** | `docs/terms-and-policies.html` (inline `:root`) |
| **App config** | `app.json` (splash, Android adaptive icon background) |

### Logo → colour mapping

| Logo element | Role | Hex |
|--------------|------|-----|
| Tree trunk | Primary / brand dark | `#012630` |
| Pink / magenta leaves | Secondary | `#D81F62` |
| Gold / yellow leaves | Accent | `#E6A623` |
| Green leaves | Success / financial | `#3A7F3D` |
| Light green leaves | Olive accent | `#6A8C38` |
| Teal leaves & swoosh | Teal / info / mental wellness | `#0097A7` |
| Maroon / deep red leaves | Psychology accent | `#6B1636` |
| Light blue crescent (base) | *(marketing / gradients)* | ~`#0097A7` family |

### Core brand tokens (mobile — `Colors`)

| Token | Hex | RGB | Usage |
|-------|-----|-----|--------|
| `brandDark` / `primary` | `#012630` | 1, 38, 48 | Headers, primary buttons, text primary |
| `primaryDark` | `#011a22` | 1, 26, 34 | Dark mode background |
| `primaryLight` | `#023e4f` | 2, 62, 79 | Gradients, hover states |
| `primaryAlpha` | `rgba(1, 38, 48, 0.1)` | — | Subtle fills |
| `secondary` | `#D81F62` | 216, 31, 98 | CTAs, errors, hypnotherapy |
| `secondaryDark` | `#b01950` | 176, 25, 80 | Pressed / dark secondary |
| `secondaryLight` | `#e13d7a` | 225, 61, 122 | Gradients |
| `accent` | `#E6A623` | 230, 166, 35 | Highlights, warnings, spiritual |
| `accentDark` | `#c78a1d` | 199, 138, 29 | Warning dark |
| `accentLight` | `#f0b84c` | 240, 184, 76 | Gold highlights |
| `accentGreen` | `#3A7F3D` | 58, 127, 61 | Financial / success |
| `accentOlive` | `#6A8C38` | 106, 140, 56 | Secondary green |
| `brandTeal` | `#0097A7` | 0, 151, 167 | Info, mental wellness |
| `brandMaroon` | `#6B1636` | 107, 22, 54 | Psychology theme |

### Neutrals, surfaces & text

| Token | Hex | Usage |
|-------|-----|--------|
| `white` / `pure` | `#FFFFFF` | Cards, surfaces |
| `black` | `#000000` | Pure black (rare) |
| `background` | `#F9F9F9` | App screen background |
| `backgroundSecondary` | `#f7fafc` | Alternate sections |
| `surface` | `#FFFFFF` | Cards, modals |
| `surfaceSecondary` | `#edf2f7` | Nested surfaces |
| `lightGray` | `#f1f5f9` | Borders, dividers |
| `gray` | `#718096` | Icons, disabled |
| `darkGray` | `#2d3748` | Strong secondary UI |
| `charcoal` | `#1a202c` | Deep neutral |
| `textPrimary` | `#012630` | Body headings (brand) |
| `textSecondary` | `#58656D` | Secondary copy |
| `textLight` | `#8D979E` | Tertiary copy |
| `textMuted` | `#A0AEC0` | Hints, placeholders |
| `textOnPrimary` | `#FFFFFF` | Text on dark buttons |

### Status & semantic colours

| Role | Token | Hex |
|------|-------|-----|
| Success | `success` | `#3A7F3D` |
| Success dark | `successDark` | `#306834` |
| Warning | `warning` | `#E6A623` |
| Warning dark | `warningDark` | `#c78a1d` |
| Error | `error` | `#D81F62` |
| Error dark | `errorDark` | `#b01950` |
| Info | `info` | `#0097A7` |
| Info dark | `infoDark` | `#007a86` |

### Service category colours (app UI)

Used on **ServiceCard** gradients, category badges, and `Colors.services[category]`.

| Category | Service(s) | Primary | Light bg | Text on tint |
|----------|------------|---------|----------|--------------|
| `mental_wellness` | Psychology | `#0097A7` | `#e3f8fa` | `#00545e` |
| `spiritual_growth` | Spiritual | `#E6A623` | `#fdf6e8` | `#7c5914` |
| `financial_guidance` | Tshabalala Finance | `#3A7F3D` | `#e8f2e8` | `#1f441f` |
| `hypnotherapy` | Hypnotherapy | `#D81F62` | `#fce8ee` | `#8d1441` |
| `psychology` | *(theme alias)* | `#6B1636` | `#f8e8ec` | `#4a0e25` |
| `consulting` / `integrated_services` | Omkhulu Consulting | `#012630` | — | — |
| `education` | Nyezi Foundation | `#0097A7` | — | — |

**`Colors.services` map (single hex per category):**

```
mental_wellness      → #0097A7
spiritual_growth     → #E6A623
financial_guidance   → #3A7F3D
hypnotherapy         → #D81F62
psychology           → #6B1636
consulting           → #012630
integrated_services  → #012630
education            → #0097A7
```

### Membership tier colours (app)

From `SubscriptionScreen.jsx` tier badges:

| Tier | Background | Border / foreground |
|------|------------|---------------------|
| **Silver** | `rgba(113,128,150,0.15)` | `#718096` (gray) |
| **Gold** | `Colors.accent` + 22 alpha (`#E6A62322`) | `#E6A623` / `accentDark` |
| **Platinum** | `#5B21B633` | `#5B21B6` (purple — distinct from brand maroon) |

### Brand gradients (`Colors.gradients`)

| Name | Colours (left → right) |
|------|-------------------------|
| `primary` | `#012630` → `#023e4f` |
| `secondary` | `#D81F62` → `#e13d7a` |
| `spiritual` | `#E6A623` → `#f0b84c` |
| `wellness` | `#0097A7` → `#00b3c7` |
| `financial` | `#3A7F3D` → `#4a9e4d` |
| `psychology` | `#6B1636` → `#8d1441` |
| `hypnotherapy` | `#D81F62` → `#e13d7a` |
| `journey` | `#012630` → `#0097A7` → `#E6A623` |
| `transformation` | `#6B1636` → `#012630` → `#3A7F3D` |
| `multicolor` | `#012630` → `#D81F62` → `#E6A623` → `#3A7F3D` |

### Shadows (`Colors.shadow`)

| Level | Value |
|-------|--------|
| `light` | `rgba(1, 38, 48, 0.05)` |
| `medium` | `rgba(1, 38, 48, 0.1)` |
| `strong` | `rgba(1, 38, 48, 0.15)` |
| `primary` | `rgba(1, 38, 48, 0.2)` |

### Light / dark theme (`Theme` in `colors.js`)

| Token | Light | Dark |
|-------|-------|------|
| Background | `#F9F9F9` | `#011a22` |
| Surface | `#FFFFFF` | `#012630` |
| Primary | `#012630` | `#023e4f` |
| Secondary | `#D81F62` | `#e13d7a` |
| Accent | `#E6A623` | `#f0b84c` |
| Text | `#012630` | `#FFFFFF` |
| Border | `#f1f5f9` | `#2d3748` |

### Membership web CSS (`membership-web` — `:root`)

| Variable | Hex | Maps to |
|----------|-----|---------|
| `--background` | `#f9f9f9` | App `background` |
| `--foreground` | `#012630` | `textPrimary` / `primary` |
| `--brand` | `#012630` | Primary |
| `--brand-dark` | `#011a22` | `primaryDark` |
| `--secondary` | `#d81f62` | Secondary |
| `--secondary-dark` | `#b01950` | `secondaryDark` |
| `--accent` | `#e6a623` | Accent |
| `--teal` | `#0097a7` | `brandTeal` |
| `--green` | `#3a7f3d` | `accentGreen` |
| `--maroon` | `#6b1636` | `brandMaroon` |
| `--card` | `#ffffff` | `surface` |
| `--muted` | `#58656d` | `textSecondary` |
| `--border` | `#edf2f7` | Borders |
| `--success-bg` | `#ecfdf3` | Success surface |
| `--success-fg` | `#027a48` | Success text |
| `--shadow` | `0 8px 25px rgba(1, 38, 48, 0.08)` | Card elevation |

**Body background gradient (web):** pink tint top-right `rgba(216, 31, 98, 0.07)`, teal top-left `rgba(0, 151, 167, 0.09)`.

### Legal HTML (`docs/terms-and-policies.html`)

| CSS variable | Hex |
|--------------|-----|
| `--brand-dark` | `#012630` |
| `--brand-teal` | `#0097A7` |
| `--brand-pink` | `#D81F62` |
| `--brand-gold` | `#E6A623` |
| `--brand-green` | `#3A7F3D` |
| `--brand-maroon` | `#6B1636` |
| `--bg` | `#f4f8f9` |
| `--text` | `#1a2e35` |
| `--text-muted` | `#4a6570` |

Hero gradient: `#012630` → `#023e4f` → `#0097A7`.

### Platform-specific (store / OS)

| Item | Value | Config |
|------|-------|--------|
| Android adaptive icon background | `#E6F4FE` | `app.json` → `android.adaptiveIcon.backgroundColor` |
| iOS / splash light | `#ffffff` | `app.json` splash |
| iOS / splash dark | `#000000` | `app.json` splash dark |
| Expo web theme | `#012630` | `terms-and-policies.html` `theme-color` |

### Social icon colours (fixed — not brand palette)

| Platform | Hex |
|----------|-----|
| Facebook | `#1877F2` |
| Instagram | `#E1306C` |
| YouTube | `#FF0000` |
| TikTok | `#000000` |
| WhatsApp | `#25D366` |

### Quick copy — CSS / design tokens

```css
/* Primary brand */
--lcj-primary: #012630;
--lcj-primary-dark: #011a22;
--lcj-primary-light: #023e4f;

/* Logo leaves */
--lcj-secondary: #D81F62;
--lcj-accent: #E6A623;
--lcj-teal: #0097A7;
--lcj-green: #3A7F3D;
--lcj-maroon: #6B1636;
--lcj-olive: #6A8C38;

/* Surfaces */
--lcj-bg: #F9F9F9;
--lcj-surface: #FFFFFF;
--lcj-text: #012630;
--lcj-text-muted: #58656D;
```

```javascript
// React Native — import { Colors } from '../styles/colors'
Colors.primary      // #012630
Colors.secondary    // #D81F62
Colors.accent       // #E6A623
Colors.gradients.journey  // ['#012630', '#0097A7', '#E6A623']
```

---

## Quick copy — all external URLs

```
https://www.lifechangingjourney.co.za
https://lifechangingjourney.co.za
https://www.lifechangingjourney.co.za/plans
https://psychologistdurban.co.za
https://tshabalalafinance.co.za
https://tshabalalaomkhulu.co.za
https://www.nyezivfoundation.co.za/
https://www.facebook.com/share/1B7sqUfweq/
https://www.instagram.com/lifechanging_journey
https://www.youtube.com/@lifechangingjourney-h4j
https://www.tiktok.com/@lifechangingjourney
https://wa.me/27658460441
https://wa.me/27310350208
mailto:info@lifechangingjourney.co.za
tel:+27310350208
tel:+27672803432
tel:+27693084723
tel:+27740674650
```

---

## Maintenance checklist

- [ ] Unify WhatsApp links to one official number  
- [ ] Align `Constants.CONTACT` with `info@lifechangingjourney.co.za` / production domain  
- [ ] Add dedicated `Education` / Foundation stack screen if needed (currently ServiceDetail only)  
- [ ] Update this doc when `staticData.services` changes  
- [ ] Verify partner websites are live before each store release  
- [ ] Add LCJ logo + favicon to `membership-web/public/`  
- [ ] Use `icon.png` on Login/Register instead of heart placeholder  
- [ ] Archive unreferenced WhatsApp JPEGs in `assets/` root  
- [ ] Remove Expo `react-logo*.png` template files  

---

*© Life Changing Journey Organisation*
