import * as ohm from 'ohm-js';
import grammarSource from "./yawdl.ohm" with { type: "text" };

const yawdlGrammar = ohm.grammar(grammarSource);

(window as any).Yawdl = {
    compile: (sourceCode: string) => {
        const match = yawdlGrammar.match(sourceCode);
        if (match.failed()) return { ui: `<h1>Syntax Error</h1><pre>${match.message}</pre>`, styles: "", head: "", scripts: "" };

        let styles = "", scripts = "", ui = "", head = "";

        const semantics = yawdlGrammar.createSemantics().addOperation('process', {
            Program(blocks) { blocks.children.forEach(c => c.process()); },
            Block(e) { e.process(); },
            
            
            Paget(_t, _o, content, _c) { head += `<title>${content.sourceString}</title>\n`; },
            TT(_t, _o, content, _c) { ui = `<h1>${content.sourceString}</h1>\n` + ui; },
            Style(_t, _o, content, _c) { styles += content.sourceString + "\n"; },
            Script(_t, _o, content, _c) { scripts += content.sourceString + "\n"; },
            UI(_t, _o, content, _c) { ui += content.sourceString + "\n"; },
            
            Import(_kw, _p1, _q1, url, _q2, _p2) {
                head += `<link rel="stylesheet" href="${url.sourceString}">\n`;
            },

            Image(_kw, _p1, _q1, src, _q2, _comma1, _q3, alt, _q4, _comma2, w, _comma3, h, _p2) {
                ui += `<img src="${src.sourceString}" alt="${alt.sourceString}" width="${w.sourceString}" height="${h.sourceString}">\n`;
            },

            _iter(...children) { children.forEach(c => c.process()); }
        });

        semantics(match).process();
    
        return { ui, styles, head, scripts };
    }
};