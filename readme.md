# YAWDL: Yet Another Web Development Language

YAWDL is a super small and simple language for making websites. It has a client-side engine that turns .yawdl files into a real website right in your browser.
## Setup and Installation

### Windows (the easy way)
   Download yawdl.exe.
   Put yawdl.exe in the folder where you want your project to be..

### Linux and macOS (from source)
   Install Bun: curl -fsSL https://bun.sh/install | bash
   Clone the repo and go into that folder.
   Build the engine: bun build ./engine.ts --outfile=yawdl-engine.js
   Linux: bun build --compile --target=bun-linux-x64 ./yawdl-cli.ts --outfile yawdl
   macOS: bun build --compile --target=bun-darwin-arm64 ./yawdl-cli.ts --outfile yawdl
