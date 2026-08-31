# 🎨 Mudra

> **India, in open source.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Assets: CC BY 4.0](https://img.shields.io/badge/Assets-CC%20BY%204.0-green.svg)](./docs/ASSET_LICENSE.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![First Timer Friendly](https://img.shields.io/badge/first--timer-friendly-orange.svg)](./CONTRIBUTING.md)

---

**Mudra** is an open-source, community-driven collection of authentic Indian cultural visual assets — SVGs, PNGs, and structured metadata — built by developers, for developers.

Starting with **Kerala**, Mudra aims to represent India's diverse cultures as reusable, developer-friendly digital assets.

Every asset in Mudra includes:

- A clean, scalable **SVG** (or PNG)
- Structured **metadata** (name, region, category, description, cultural context, licensing)
- Automated **validation** to ensure quality and consistency

No more searching Google, Pinterest, or random repositories for a culturally accurate Indian asset.

**Find it. Use it. Contribute it.**

---

## 🌱 Add Your First Asset in 5 Minutes

Mudra is built for first-time contributors. Here's how:

### 1. Fork and clone

```bash
git clone https://github.com/YOUR_USERNAME/mudra.git
cd mudra
```

### 2. Create your asset folder

Follow the structure:

```text
assets/<country>/<region>/<category>/<asset-name>/
```

Example:

```bash
mkdir -p assets/india/kerala/music/chenda
```

### 3. Add your files

```text
assets/india/kerala/music/chenda/
├── chenda.svg        # Your SVG (24×24 viewBox)
└── metadata.json     # Cultural metadata
```

### 4. Validate

```bash
npm run validate
```

### 5. Open a Pull Request

That's it. Your contribution becomes part of India's open-source visual language.

📖 **Full guide:** [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📁 Repository Structure

```text
mudra/
├── assets/
│   └── india/
│       └── kerala/
│           ├── architecture/
│           ├── art/
│           ├── clothing/
│           ├── craft/
│           ├── festival/
│           ├── food/
│           ├── instrument/
│           ├── music/
│           ├── object/
│           ├── pattern/
│           ├── performing-art/
│           ├── symbol/
│           ├── tradition/
│           └── transport/
│
├── docs/
│   ├── ASSET_GUIDELINES.md      # How to create assets
│   ├── ASSET_LICENSE.md         # Licensing explained
│   └── schemas/
│       └── metadata.schema.json # Metadata JSON Schema
│
├── scripts/
│   ├── validate-assets.mjs      # Validates all assets
│   ├── validate-svg.mjs         # Validates SVG files
│   └── validate-metadata.mjs    # Validates metadata.json
│
├── packages/                    # Future: npm packages
├── tests/                       # Test fixtures
│
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
└── package.json
```

---

## 🗂️ Current Categories

Each region has these asset categories:

| Category | Description |
|----------|-------------|
| `architecture` | Temples, buildings, landmarks |
| `art` | Paintings, murals, visual art |
| `clothing` | Traditional garments and textiles |
| `craft` | Handmade objects, pottery, weaving |
| `festival` | Festival visuals and elements |
| `food` | Regional dishes and ingredients |
| `instrument` | Musical instruments |
| `music` | Musical elements and notation |
| `object` | Everyday cultural objects |
| `pattern` | Traditional patterns and motifs |
| `performing-art` | Dance, theatre, performance |
| `symbol` | Cultural and regional symbols |
| `tradition` | Traditions and ceremonies |
| `transport` | Traditional and modern transport |

---

## ✅ Validation

Every asset is automatically validated when you run:

```bash
npm run validate
```

This checks:

- **SVG quality** — valid SVG, viewBox present, no embedded images or scripts
- **Metadata correctness** — valid JSON, all required fields, correct categories and formats
- **Directory structure** — kebab-case naming at every level

Individual validators:

```bash
npm run validate:svg        # Validate specific SVG files
npm run validate:metadata   # Validate specific metadata files
```

CI runs these checks automatically on every Pull Request.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [CONTRIBUTING.md](./CONTRIBUTING.md) | How to contribute (beginner-friendly) |
| [ASSET_GUIDELINES.md](./docs/ASSET_GUIDELINES.md) | Asset creation standards |
| [ASSET_LICENSE.md](./docs/ASSET_LICENSE.md) | Licensing explained (CC BY 4.0) |
| [Metadata Schema](./docs/schemas/metadata.schema.json) | JSON Schema for metadata |
| [Code of Conduct](./CODE_OF_CONDUCT.md) | Community standards |

---

## 🤝 Contributing

We welcome contributions from everyone — especially first-time open-source contributors.

You can contribute by:

- 🎨 Creating a new cultural SVG asset
- 🧹 Improving or optimizing an existing SVG
- 📚 Adding or improving cultural metadata
- 🌍 Adding regional or local-language names
- 📖 Improving documentation
- 🐛 Reporting issues
- 💡 Suggesting new cultural assets
- 🛠️ Improving validation tooling

**No design experience required. No React knowledge needed.**

If you can follow the guidelines and submit a useful contribution, you can contribute.

📖 **Start here:** [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 🎯 Project Vision

Mudra aims to become the **largest and most developer-friendly open-source collection of Indian cultural digital assets**.

The long-term goal:

> **Make Indian culture easy to represent digitally.**

Currently focused on **Kerala**, with plans to expand across all Indian states and regions.

---

## 📜 License

| Component | License |
|-----------|---------|
| Code, tooling, documentation | [MIT](./LICENSE) |
| Cultural assets (SVGs, metadata) | [CC BY 4.0](./docs/ASSET_LICENSE.md) |

---

## ❤️ Support

If Mudra is useful to you:

- ⭐ Star the repository
- 🐛 Report issues
- 💡 Suggest improvements
- 🎨 Contribute an asset
- 📢 Share with other developers

---

**Built with ❤️ for India's digital future.**
