# ⚡ SatoshiQuest Zambia

> **Gamified Bitcoin education for Zambia — Learn in English & Bemba, Earn Sats**

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2014-black)](https://nextjs.org)
[![Bitcoin](https://img.shields.io/badge/Bitcoin-Lightning-F7931A)](https://lightning.network)
[![Language](https://img.shields.io/badge/Languages-English%20%2B%20Bemba%20%2B%20Nyanja-green)](/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

SatoshiQuest is a mobile-first Progressive Web App (PWA) that teaches Bitcoin and Lightning Network concepts through gamified lessons and quizzes — built specifically for the Zambian context, with local examples, local language, and local community integration.

---

## 🎯 Features

- **5 Learning Modules** covering Bitcoin basics, Lightning Network, self-custody, transactions, and savings
- **15 Lessons** with rich educational content in **English, Bemba (Icibemba) and Nyanja (Chinyanja)**
- **Quiz system** with instant feedback and explanation for each answer
- **XP + Level progression** (10 levels, from Satoshi Seedling to Zambian Bitcoin Legend)
- **Sats rewards** for completing quizzes (simulated — real Lightning integration ready)
- **Streak tracking** — daily learning rewards
- **Leaderboard** with community rankings
- **PWA** — installable on Android, works offline (partial)
- **No account required** — all progress stored locally
- **Zero cost** to use

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS + custom CSS animations |
| State Management | Zustand with localStorage persistence |
| Fonts | Syne (display) + Space Grotesk (body) |
| Lightning (future) | BTCPay Server / OpenNode API |
| Deployment | Vercel (recommended) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/satoshi-quest-zambia
cd satoshi-quest-zambia

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## 📚 Module Overview

| # | Module | Language | Lessons | Sats Reward |
|---|---|---|---|---|
| 1 | What is Bitcoin? (Bitcoin Nshi?) | EN + BEM | 2 | 42 sats |
| 2 | The Lightning Network (Network ya Lightning) | EN + BEM | 1 | 21 sats |
| 3 | Your Own Keys (Ifungulo Lyako) | EN + BEM | 1 | 34 sats |
| 4 | Sending & Receiving (Ukutuma na Ukupokelela) | EN + BEM | 1 | 50 sats |
| 5 | Saving in Bitcoin (Ukusunga mu Bitcoin) | EN + BEM | 1 | 50 sats |

---

## 🔌 Lightning Integration (Roadmap)

The app is architected to plug in real Lightning rewards:

```typescript
// Future: src/lib/lightning.ts
// BTCPay Server API integration
const rewardSats = async (userId: string, amount: number) => {
  const invoice = await btcpay.createInvoice({ amount, currency: 'SATS' });
  return invoice.checkoutLink;
};
```

**Planned integrations:**
- BTCPay Server (self-hosted)
- OpenNode API
- Strike API
- LNURL-pay protocol

---

## 🌍 Zambia Bitcoin Community

This project connects with and supports:

| Organization | Focus |
|---|---|
| [Bitcoin Zambia](https://github.com/Bitcoin-Zambia) | Education + community |
| [BitDevs Zambia](https://github.com/Bitcoin-Zambia/bitdevs-zambia) | Developer community |
| Bitcoin for HER | Women empowerment |
| Bitcoin for aliyense | Youth + workshops |
| Bantu Bitcoin Podcast | Bemba-language education |
| BitTeens Program | Youth + schools |

---

## 💰 Grant Opportunities

This project is eligible for the following Bitcoin grants:

| Funder | Type | Amount | Apply |
|---|---|---|---|
| **HRF Bitcoin Dev Fund** | Open source, Global South | BTC grants | [hrf.org](https://hrf.org/devfund) |
| **Btrust** (Jack Dorsey) | Africa-first projects | Project grants | [btrust.tech](https://btrust.tech) |
| **Bitcoin for Fairness** | Zambia-active org | In-kind + funding | [bitcoinforfairness.org](https://bitcoinforfairness.org) |
| **Africa Bitcoin Lightning Capital** | Lightning startups | 0.5–5 BTC | [bitcoinlightning.africa](https://bitcoinlightning.africa) |
| **OpenSats** | Open source Bitcoin | Grants | [opensats.org](https://opensats.org) |

**Grant application tips:**
1. Deploy a live demo on Vercel
2. Record a 2-minute demo video
3. Document your Zambian community connections
4. Show lesson completion metrics once users join

---

## 🗺️ Roadmap

### Phase 1 — MVP (Current)
- [x] 5 modules, 15 lessons
- [x] English + Bemba
- [x] XP, levels, streaks
- [x] Quiz system with explanations
- [x] Leaderboard (simulated)
- [x] PWA installable

### Phase 2 — Community
- [ ] Real Lightning sats rewards (BTCPay Server)
- [ ] Teacher dashboard (for BitTeens, Bitcoin for HER)
- [ ] User accounts with sync
- [ ] More modules (10 total)
- [ ] Nyanja language support
- [ ] Tonga language support

### Phase 3 — Scale
- [ ] SMS-based quiz mode (feature phones)
- [ ] School integration package
- [ ] Community leaderboard (real data)
- [ ] Admin panel for community orgs
- [ ] Analytics dashboard for grant reporting

---

## 🤝 Contributing

Contributions welcome! Especially:
- **Bemba translations** — native speakers wanted
- **More lessons** — follow the `src/data/lessons.ts` schema
- **New modules** — DeFi risks, Bitcoin mining, LNURL, etc.
- **Lightning integration** — BTCPay Server, OpenNode

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License — free to use, modify, and distribute.

Built with ❤️ in Lusaka, Zambia 🇿🇲

---

## 👤 Author

**Simeon Mwale** — CS Student & Freelance Developer  
St. Eugene University, Lusaka, Zambia  
GitHub: [github.com/Simeon-Mwale](https://github.com/Simeon-Mwale)  
Fiverr: [@simeonmwale334](https://fiverr.com/simeonmwale334)  

*"Bitcoin education for every Zambian — from Lusaka to Lundazi."*
