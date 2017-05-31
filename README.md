# myobrecruitnode

To run the app,
npm run watch

Note: if you’re on Windows, the clean task needs to use different path separators…

change
"clean": "rm -rf static/css && mkdir -p static/css",
to
"clean": "rm -rf static\\css && mkdir -p static\\css",

in package.json

—————

npm run build-css – this uses the Stylus CLI to compile the index.styl stylesheet to css, and place it in the static/css directory

npm run watch-css – this is exactly the same as the previous command, except that it will continue running until manually stopped, compiling the stylesheet any time the source files are change. This task essentially supersedes the stylus middleware I mentioned earlier.

npm run clean – this removes any built files (currently only css, but it might later include browserify-ed JS) and creates any required directories.

npm run build – this does everything required for the server to run correctly, which is just to run the clean and build-css commands

npm run watch – this is the command that is most useful in development. It will watch the entire project for changes and recompile assets or restart the server accordingly.

npm run start – this simply starts the server and does no watching at all.
