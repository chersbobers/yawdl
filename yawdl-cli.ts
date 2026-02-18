import { writeFileSync, existsSync, mkdirSync } from "fs";
import engineCode from "./yawdl-engine.js" with { type: "text" };

const bootloader = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="/">
    <title>YAWDL</title>
    <style id="yawdl-init-style">
        body { background: #191724; color: #e0def4; font-family: monospace; padding: 20px; margin: 0; }
    </style>
</head>
<body>
    <div id="root">Loading...</div>

    <script type="module">
        import "./yawdl-engine.js";

        async function navigate(path) {
            try {
                let cleanPath = path.replace(/^\\//, "").replace(/\\.html$/, "");
                if (cleanPath === "" || cleanPath === "index") cleanPath = "app";
                
                const targetFile = cleanPath.endsWith('.yawdl') ? cleanPath : cleanPath + ".yawdl";
                
                const response = await fetch("/" + targetFile);
                if (!response.ok) throw new Error("File not found: " + targetFile);
                
                const code = await response.text();
                const result = window.Yawdl.compile(code);

                document.title = result.title || "YAWDL";
                document.getElementById('root').innerHTML = result.ui;
                
                document.querySelectorAll('.yawdl-dynamic').forEach(el => el.remove());

                if (result.styles) {
                    const styleEl = document.createElement("style");
                    styleEl.className = "yawdl-dynamic";
                    styleEl.textContent = result.styles;
                    document.head.appendChild(styleEl);
                }

                if (result.head) {
                    const tempHead = document.createElement('div');
                    tempHead.innerHTML = result.head;
                    Array.from(tempHead.childNodes).forEach(node => {
                        if (node.tagName === 'LINK') {
                            const link = document.createElement('link');
                            link.rel = 'stylesheet';
                            link.href = node.getAttribute('href');
                            link.className = 'yawdl-dynamic';
                            document.head.appendChild(link);
                        }
                    });
                }

                if (result.scripts) {
                    const scriptEl = document.createElement("script");
                    scriptEl.className = "yawdl-dynamic";
                    scriptEl.textContent = result.scripts;
                    document.body.appendChild(scriptEl);
                }

            } catch (err) {
                document.getElementById('root').innerHTML = \`
                    <div style='color:#eb6f92; padding: 20px;'>
                        <pre>Routing Error: \${err.message}</pre>
                        <a href="/" style="color:#f6c177">Return Home</a>
                    </div>\`;
            }
        }

        window.onclick = (e) => {
            const link = e.target.closest('a');
            if (link && link.href.startsWith(window.location.origin)) {
                if (link.href.match(/\\.(js|css|png|jpg|exe|zip)$/) || link.href.includes('#')) return;
                
                e.preventDefault();
                history.pushState(null, '', link.href);
                navigate(window.location.pathname);
            }
        };

        window.onpopstate = () => navigate(window.location.pathname);
        navigate(window.location.pathname);
    </script>
</body>
</html>`;

const targetDir = process.argv[2] || ".";
if (targetDir !== "." && !existsSync(targetDir)) mkdirSync(targetDir);

writeFileSync(`${targetDir}/index.html`, bootloader);
writeFileSync(`${targetDir}/yawdl-engine.js`, engineCode);

console.log("Done.");