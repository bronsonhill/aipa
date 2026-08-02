# aipa
A collaborative agent-based wiki for learning AI Planning for Autonomy.


## Project structure
### The wiki
See the wiki [here](https://bronsonhill.github.io/aipa/). The wiki is based on Andrej Karpathy's idea of an agentic wiki, built with [Quartz](https://quartz.jzhao.xyz/) and published to GitHub Pages. Alternatively, simply clone the repo and open the `content/` folder in your markdown editor of choice (ie. Obsidian or Visual Studio Code) for consumption and/or contribution — Quartz reads a plain Obsidian-style vault, including `[[wikilinks]]`.

```
wiki/
    index.md
    sources/
        index.md
    entities/
        index.md
    concepts/
        index.md
    materials/
        index.md
```

As course learning resources are copyright material, none are stored in the repo. All such sources are indexed as a link to the resource on Canvas (or wherever the course hosts them).

To preview locally: `npm i && npx quartz build --serve`.

## Contributing
This repo is designed to be a resource which students of AI Planning for Autonomy can use to study, and contribute to. It's built in public, in the same style as the [cmas](https://github.com/bronsonhill/cmas) wiki.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add sources, concept/entity pages, and study material — including the AI-agent skills, distributed as the [wiki-skills](https://github.com/bronsonhill/wiki-skills) plugin, that automate most of the ingest work. Lightweight formatting/workflow rules live in [RULES.md](RULES.md).
