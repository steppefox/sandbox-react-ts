const {
    FuseBox,
    CSSPlugin,
    ImageBase64Plugin,
    WebIndexPlugin
} = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: "src",
    target: 'browser@es6',
    output: "dist/$name.js",
    useTypescriptCompiler: true,
    log: true,
    debug: true,
    plugins: [
        CSSPlugin(),
        ImageBase64Plugin({
            useDefault: true
        }),
        WebIndexPlugin({
            template: "src/index.html",
            title: "React + Reflux example",
            path: './'
        })
    ]
});

fuse.dev({
    port: 4445
});

fuse.bundle("app")
    .instructions(" > index.tsx")
    .hmr()
    .watch();

fuse.run();
