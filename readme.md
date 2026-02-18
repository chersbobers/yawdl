# YAWDL: Yet Another Web Development Language

YAWDL is a minimalist, file-based web development language. It uses a client-side engine to compile `.yawdl` files directly in the browser, allowing for static hosting on GitHub Pages, Vercel, or Netlify with no server-side requirements.

## Repository Structure

The following source files are necessary to maintain the project:

* **yawdl.ohm**: The formal grammar defining the language syntax.
* **engine.ts**: The TypeScript source for the browser-side compiler.
* **yawdl-cli.ts**: The source for the project initialization tool.
* **package.json**: Dependency manifest for the development environment.

---

## Setup and Installation

### Windows (Executable Method)

1. Download the latest `yawdl.exe`.
2. Move `yawdl.exe` into the folder where you want to start your project.
3. Run `.\yawdl.exe` in your terminal or double-click the file.
4. The tool will automatically generate `index.html`, `yawdl-engine.js`, and `app.yawdl`.

### Linux and macOS (Build from Source)

1. **Install Bun**: 
   `curl -fsSL https://bun.sh/install | bash`
2. **Clone the repository** and navigate into the directory.
3. **Install dependencies**: 
   `bun install`
4. **Build the engine**: 
   `bun build ./engine.ts --outfile=yawdl-engine.js --minify`
5. **Create the CLI**:
   * **Linux**: `bun build --compile --target=bun-linux-x64 ./yawdl-cli.ts --outfile yawdl`
   * **macOS**: `bun build --compile --target=bun-darwin-arm64 ./yawdl-cli.ts --outfile yawdl`
6. **Run the tool**: 
   `./yawdl`

---

## Development Workflow

Once the project is initialized, the workflow is designed to be simple:

1. Open `app.yawdl` in any text editor.
2. Write your code using the YAWDL syntax.
3. Open `index.html` in your browser.
4. Every time you save `app.yawdl` and refresh the browser, the engine compiles your changes instantly.

### Deployment

To publish your site, simply upload the following files to any static web host:

* `index.html`
* `yawdl-engine.js`
* `app.yawdl`

---