# Mudra Asset Guidelines

> Standards for creating, documenting, and contributing cultural assets to Mudra.

Mudra is an open-source collection of Indian and regional cultural assets created by the community.

Our goal is not to create the largest possible collection.

Our goal is to create a collection that is:

* culturally respectful
* technically consistent
* useful to developers
* properly documented
* legally reusable
* welcoming to contributors

---

## 1. What Is a Mudra Asset?

A Mudra asset is a visual representation of an identifiable cultural subject.

Examples include:

* traditional instruments
* foods
* clothing
* festivals
* performing arts
* architecture
* crafts
* cultural objects
* patterns
* transportation
* regional symbols
* traditions

Good examples:

```text
chenda
kathakali
pookalam
nilavilakku
kerala-sadhya
kasavu-saree
```

Avoid vague concepts such as:

```text
indian-culture
traditional-thing
indian-symbol
festival-icon
```

Whenever possible, represent a specific subject.

---

# 2. Directory Structure

Assets follow this hierarchy:

```text
country/
└── region/
    └── category/
        └── asset/
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

The country and region structure allows Mudra to expand beyond Kerala without changing the repository architecture.

---

# 3. Region Names

Use lowercase kebab-case.

Examples:

```text
kerala
tamil-nadu
karnataka
maharashtra
west-bengal
rajasthan
punjab
assam
```

For subjects representing India broadly:

```text
india/
```

If a cultural subject belongs to multiple regions, document that in metadata rather than arbitrarily assigning a single region.

---

# 4. Categories

Use an existing category whenever possible.

Current categories:

```text
architecture
art
clothing
craft
festival
food
instrument
music
object
pattern
performing-art
symbol
tradition
transport
```

If an asset does not fit an existing category, discuss the new category before creating it.

---

# 5. SVG Requirements

Mudra's primary assets are SVG files.

Every SVG must:

* be valid SVG
* contain a `viewBox`
* be self-contained
* render without external resources
* contain vector artwork
* be reasonably optimized
* remain recognizable at small sizes

The default Mudra icon canvas is:

```text
24 × 24
```

Use:

```xml
viewBox="0 0 24 24"
```

unless the asset requires a different canvas and maintainers approve it.

---

# 6. SVG Restrictions

Do not submit SVGs containing:

* embedded PNG/JPEG/WebP images
* external image URLs
* external fonts
* JavaScript
* iframes
* tracking code
* external stylesheets
* unnecessary editor metadata
* executable content

Avoid unnecessary complexity.

The final SVG should contain only what is required to render the asset.

---

# 7. Visual Quality

Mudra should develop a recognizable visual language.

Aim for:

* clear silhouettes
* balanced proportions
* good visual weight
* recognizable cultural characteristics
* minimal unnecessary detail
* clean paths
* consistent geometry

However:

**Cultural accuracy is more important than forcing every subject into an identical visual style.**

A complex cultural object may require more detail than a simple icon.

---

# 8. Cultural Accuracy

Research every cultural asset before submitting it.

Ask:

1. What exactly is this?
2. Where does it originate?
3. How is it traditionally represented?
4. Are there regional variations?
5. Are there important visual characteristics?
6. Is the commonly available information actually accurate?

Do not rely exclusively on AI-generated information.

Prefer references from:

* museums
* universities
* government institutions
* cultural organizations
* academic publications
* official organizations
* reputable educational resources

If you are uncertain, ask the community or maintainers rather than guessing.

---

# 9. Sacred and Religious Subjects

Mudra may contain religious and sacred cultural subjects.

Represent them respectfully.

Do not intentionally:

* distort sacred symbols
* mock religious practices
* create offensive representations
* add unrelated elements that change their meaning
* present disputed historical claims as established facts

When an asset requires additional cultural review, maintainers may request further references or community input.

---

# 10. AI-Assisted Creation

AI-assisted artwork is allowed.

AI is a creation tool, not a cultural authority.

If you use AI:

1. Research the subject independently.
2. Review the generated artwork.
3. Correct cultural inaccuracies.
4. Remove visual artifacts.
5. Clean and optimize the SVG.
6. Verify licensing.
7. Add accurate metadata.
8. Take responsibility for the final contribution.

Do not submit raw AI output without review.

A contributor is responsible for the final asset regardless of which tools were used to create it.

---

# 11. File Naming

Use lowercase kebab-case.

Good:

```text
chenda.svg
nilavilakku.svg
kerala-sadhya.svg
kasavu-saree.svg
```

Bad:

```text
Chenda.svg
chenda-final.svg
Chenda_Final_Final.svg
icon1.svg
new.svg
my-svg.svg
```

---

# 12. Asset Metadata

Every asset must contain:

```text
metadata.json
```

Example:

```text
chenda/
├── chenda.svg
└── metadata.json
```

Metadata must validate against:

```text
docs/schemas/metadata.schema.json
```

At minimum, metadata describes:

* name
* slug
* region
* category
* description
* tags
* creator
* source
* license

---

# 13. Local Names

When relevant, include verified local-language names.

Example:

```json
"localNames": {
  "ml": "ചെണ്ട"
}
```

Do not invent translations.

If you are unsure about a spelling or translation, ask someone who knows the language or provide a reliable reference.

---

# 14. Sources

Cultural references should be traceable.

Example:

```json
"sources": [
  {
    "title": "Example Cultural Institution",
    "url": "https://example.org/reference"
  }
]
```

Do not submit fabricated URLs or references.

---

# 15. Licensing

Original Mudra assets are intended to use:

**CC BY 4.0**

unless otherwise specified.

See:

```text
docs/ASSET_LICENSE.md
```

For third-party or adapted artwork, the contributor must provide:

* original source
* original creator where applicable
* original license
* adaptation information where applicable

Do not submit artwork copied from:

* commercial icon libraries
* Pinterest
* Google Images
* stock websites
* copyrighted websites
* other repositories with incompatible licenses

unless you have verified the applicable rights.

---

# 16. Asset Checklist

Before opening a pull request:

### Cultural

* [ ] Subject is correctly identified
* [ ] Regional information is accurate
* [ ] Cultural characteristics were researched
* [ ] References are provided where appropriate
* [ ] Representation is respectful

### SVG

* [ ] Valid SVG
* [ ] Correct viewBox
* [ ] No embedded raster images
* [ ] No external resources
* [ ] No scripts
* [ ] Clean paths
* [ ] Reasonably optimized

### Metadata

* [ ] `metadata.json` exists
* [ ] Metadata validates against the schema
* [ ] Name is correct
* [ ] Slug is correct
* [ ] Region is correct
* [ ] Category is correct
* [ ] Description is useful
* [ ] Tags are relevant
* [ ] Creator is identified
* [ ] License is identified
* [ ] Source information is provided

### Legal

* [ ] I have the right to contribute this artwork
* [ ] Third-party sources have been checked
* [ ] Attribution requirements are documented

---

# 17. Review

Every contribution may be reviewed for:

* cultural accuracy
* visual quality
* SVG quality
* metadata
* licensing
* naming
* consistency

Maintainers may request changes.

A requested change is part of the contribution process.

**Review is collaboration, not rejection.**

---

# 18. The Mudra Standard

Before merging an asset, we should be able to answer:

> **What is it?**

> **Where does it come from?**

> **Is the representation respectful?**

> **Who created this artwork?**

> **Where was the information verified?**

> **Can developers legally reuse it?**

If we can answer those questions, the asset belongs in Mudra.
