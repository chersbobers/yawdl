import { build } from "bun";

console.log("🛠️ Building YAWDL...");

await build({
  entrypoints: ["./yawdl-cli.ts"], 
  outdir: "./dist",
  target: "node", 
  minify: true,
});


const proc = Bun.spawn(["bun", "build", "./yawdl-cli.ts", "--compile", "--outfile", "yawdl"]);
await proc.exited;

console.log("✅ Rebuild complete. Run './yawdl' to regenerate your site.");