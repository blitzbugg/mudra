# Contributing to Mudra

Thank you for wanting to contribute to **Mudra**! ❤️

Mudra is an open-source collection of Indian and regional cultural visual assets, built by the community for developers.

You do **not** need to be an experienced open-source developer to contribute.

If this is your first GitHub contribution, you're in the right place.

---

## 🌱 Ways You Can Contribute

There are many ways to contribute to Mudra:

* 🎨 Create a new cultural SVG asset
* 🧹 Improve or optimize an existing SVG
* 📚 Add or improve cultural metadata
* 🌍 Add regional or local-language names
* 📖 Improve documentation
* 🐛 Report an issue
* 💡 Suggest a new cultural asset
* 🛠️ Improve validation or developer tooling
* 🧪 Add tests
* 💻 Improve the Mudra packages or website

You don't have to be a designer.

You don't have to know React.

You don't have to be an SVG expert.

**If you can follow the guidelines and submit a useful contribution, you can contribute.**

---

# 🚀 Your First Contribution

If this is your first-ever open-source contribution, follow these steps.

## 1. Find an issue

Go to the repository's Issues tab and look for issues labelled:

* `good first issue`
* `first contribution`
* `help wanted`

Start with an issue that interests you.

If an issue asks for a specific asset, **comment on the issue before starting** so other contributors know you're working on it.

---

## 2. Fork the repository

Click **Fork** at the top of the Mudra GitHub repository.

This creates your own copy of Mudra.

---

## 3. Clone your fork

Clone your fork to your computer:

```bash
git clone https://github.com/YOUR_USERNAME/mudra.git
cd mudra
```

---

## 4. Create a branch

Create a branch for your contribution.

Use a descriptive name:

```bash
git checkout -b feat/add-chenda
```

Examples:

```text
feat/add-kathakali
feat/add-pookalam
docs/improve-contributing
fix/chenda-metadata
```

Avoid generic branch names such as:

```text
test
new
changes
my-branch
```

---

## 5. Create your contribution

Follow the instructions in:

`docs/ASSET_GUIDELINES.md`

For a new asset, you will normally add:

```text
asset-name/
├── asset.svg
└── metadata.json
```

Example:

```text
assets/
└── india/
    └── kerala/
        └── music/
            └── chenda/
                ├── chenda.svg
                └── metadata.json
```

---

# 🎨 Creating Cultural Assets

Before creating an asset, research what it represents.

Your contribution should aim to be:

* culturally respectful
* recognizable
* factually accurate
* technically valid
* appropriately licensed

You may use tools such as:

* Figma
* Illustrator
* Inkscape
* SVG editors
* AI-assisted design tools
* hand-written SVG

**Tools are not important. The final contribution is.**

If AI was used during creation, you are still responsible for reviewing, cleaning, and validating the final asset.

Never submit an AI-generated SVG without checking it.

---

# 📚 Cultural Accuracy

Mudra represents real communities, traditions, objects, art forms, foods, clothing, festivals, and symbols.

Please research before contributing.

Where appropriate, include reliable references in `metadata.json`.

Good sources may include:

* museums
* government cultural organizations
* universities
* established cultural institutions
* academic publications
* reputable educational resources
* official festival or organization websites

Avoid relying solely on:

* AI-generated information
* unsourced social-media posts
* random image searches
* copied descriptions

When you are uncertain about a cultural detail, **ask in the issue or open a discussion instead of guessing.**

---

# 📦 Asset Structure

Every cultural asset should follow this structure:

```text
assets/
└── <country>/
    └── <region>/
        └── <category>/
            └── <asset-name>/
                ├── <asset-name>.svg
                └── metadata.json
```

Example:

```text
assets/
└── india/
    └── kerala/
        └── music/
            └── chenda/
                ├── chenda.svg
                └── metadata.json
```

---

# 🏷️ Naming Rules

Use lowercase `kebab-case`.

Good:

```text
chenda.svg
kerala-sadhya.svg
nilavilakku.svg
kasavu-saree.svg
```

Bad:

```text
Chenda.svg
Chenda_Final.svg
chenda_final_final.svg
mySvg.svg
asset123.svg
```

---

# 🔐 Licensing

Only submit assets that you are legally allowed to contribute.

You may submit:

### Original work

Artwork created by you.

Set:

```json
"source": "original"
```

### Compatible existing work

Artwork whose license permits redistribution under the project's licensing policy.

You must provide:

* original source
* original author when required
* original license
* attribution requirements

**Never copy an SVG from Google Images, Pinterest, an icon marketplace, or another repository without checking its license.**

When in doubt, ask before submitting.

---

# 🧪 Validate Your Contribution

Before opening a pull request, check:

* [ ] File names follow the naming convention
* [ ] SVG is valid
* [ ] SVG contains no embedded raster images
* [ ] SVG has the required `viewBox`
* [ ] Metadata is valid JSON
* [ ] Cultural information has been researched
* [ ] Source and licensing information are included
* [ ] No unrelated files were changed
* [ ] The contribution follows the asset guidelines

Automated checks may also run when you open your pull request.

---

# 💬 Commit Messages

Use a simple conventional format.

Examples:

```text
feat: add chenda asset
feat: add kathakali metadata
fix: correct nilavilakku metadata
docs: improve contribution guide
chore: optimize svg assets
```

Keep commits focused.

---

# 🔀 Opening a Pull Request

Push your branch:

```bash
git push origin feat/add-chenda
```

Then open a Pull Request against the main Mudra repository.

Describe:

1. What you changed
2. Why you changed it
3. Which issue it addresses
4. Any sources or references used

Example:

```text
## What changed

Added a Chenda SVG and metadata for Kerala's traditional
percussion instrument.

## Related issue

Closes #12

## Sources

- <reference>
- <reference>

## Checklist

- [x] Followed asset guidelines
- [x] Added metadata
- [x] Verified licensing
- [x] Checked cultural accuracy
```

---

# 🤝 Review Process

Every contribution is reviewed before being merged.

Reviewers may suggest changes to:

* SVG quality
* naming
* metadata
* cultural accuracy
* licensing
* accessibility
* consistency

Don't worry if your first PR receives requested changes.

**Requested changes are part of open-source development.**

Ask questions if you don't understand a review comment.

---

# 🌱 First PR? Don't Be Afraid.

Your first contribution doesn't need to be perfect.

You are here to learn.

A PR that gets changes requested is still a contribution.

A PR that teaches you something is still valuable.

And when your contribution gets merged:

**You're officially part of Mudra. 🎉**

---

# 🧑‍💻 Code of Conduct

By participating in Mudra, you agree to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

Be respectful.

Be constructive.

Be patient with beginners.

Remember that contributors come from different regions, backgrounds, cultures, and levels of experience.

---

# 📜 License

Unless otherwise specified, contributions to Mudra are released under the project's applicable license.

Individual assets may contain additional attribution or licensing requirements documented in their metadata.

Please read the repository's `LICENSE` file before contributing.

---

## ❤️ Thank You

Every contribution helps make Indian and regional culture easier to represent in software.

But more importantly:

**Every merged PR is someone's step into open source.**

Welcome to Mudra.
