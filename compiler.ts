import * as ohm from 'ohm-js';

const grammarSource = await Bun.file("yawdl.ohm").text();
const yawdlGrammar = ohm.grammar(grammarSource);

async function runCompiler(sourceFile: string) {
    const sourceCode = await Bun.file(sourceFile).text();
    const match = yawdlGrammar.match(sourceCode);

    if (match.failed()) {
        console.error(match.message);
        return;
    }

    let styles = "", scripts = "", ui = "", head = "";

    const semantics = yawdlGrammar.createSemantics().addOperation('process', {
        Program(blocks) { blocks.children.forEach(c => c.process()); },
        Block(e) { e.process(); },
        Style(_t, _o, content, _c) { styles += content.sourceString + "\n"; },
        Script(_t, _o, content, _c) { scripts += content.sourceString + "\n"; },
        UI(_t, _o, content, _c) { ui += content.sourceString + "\n"; },
        TT(_t, _o, content, _c) { ui = `<h1>${content.sourceString}</h1>\n` + ui; },
        Paget(_t, _o, content, _c) { head += `<title>${content.sourceString}</title>\n`; },
        Import(_kw, _p1, _q1, url, _q2, _p2) {
            head += `<link rel="stylesheet" href="${url.sourceString}">\n`;
        },

        Image(_kw, _p1, _q1, src, _q2, _comma1, _q3, alt, _q4, _comma2, w, _comma3, h, _p2) {
            ui += `<img src="${src.sourceString}" alt="${alt.sourceString}" width="${w.sourceString}" height="${h.sourceString}">\n`;
        },
        _iter(...children) { children.forEach(c => c.process()); }
    });

    semantics(match).process();
    
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    ${head}
    <style>${styles}</style>
</head>
<body>
    <div id="root">${ui}</div>
    <script>${scripts}</script>
</body>
</html>`;

    await Bun.write("index.html", html);
    console.log("🚀 Done.");
}

runCompiler(process.argv[2] || "app.yawdl");