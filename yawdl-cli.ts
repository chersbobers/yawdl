import { writeFileSync, existsSync, mkdirSync } from "fs";
import engineCode from "./yawdl-engine.js" with { type: "text" };

const bootloader = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Yawdl Project</title><style id="yawdl-init-style">body{background:#191724;color:#e0def4;font-family:monospace;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}.loading-text{animation:blink .8s infinite}@keyframes blink{50%{border-color:transparent}}</style></head><body><div id="loader" class="loading-text">LOADING...</div><script type="module">import "./yawdl-engine.js";async function init(){try{const e=await fetch("app.yawdl"),t=await e.text(),n=window.Yawdl.compile(t);document.head.insertAdjacentHTML("beforeend",n.head),document.head.insertAdjacentHTML("beforeend",\`<style>\${n.styles}</style>\`),document.getElementById("yawdl-init-style").remove(),document.body.style.display="block",document.body.style.height="auto",document.body.innerHTML=\`<div id="root">\${n.ui}</div>\`;const d=document.createElement("script");d.textContent=n.scripts,document.body.appendChild(d)}catch(e){document.body.innerHTML=\`<pre>System Error: \${e.message}</pre>\`}}${`init();`}</script></body></html>`;

const starterYawdl = `Paget { New Project }\n\nTT { Welcome to YAWDL }\n\nUI { <p>Start editing app.yawdl to see changes.</p> }\n\nStyle { body { font-family: sans-serif; text-align: center; } }`;

const targetDir = process.argv[2] || ".";
if (targetDir !== "." && !existsSync(targetDir)) mkdirSync(targetDir);

writeFileSync(`${targetDir}/index.html`, bootloader);
writeFileSync(`${targetDir}/yawdl-engine.js`, engineCode);
if (!existsSync(`${targetDir}/app.yawdl`)) {
    writeFileSync(`${targetDir}/app.yawdl`, starterYawdl);
}

console.log(`\project ready in ${targetDir}!`);
console.log(`run a local server and start coding.`);