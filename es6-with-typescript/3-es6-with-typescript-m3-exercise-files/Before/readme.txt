
***

In this beginning example, run the following commands (using the appropriate slash for your platform):

npm install
node server.js

***




This project assumes that you have Node.js installed.  Download the latest version appropriate for your platform from https://nodejs.org/ .

This code sample uses the following libraries from npm: chalk, hapi, jquery, requirejs, and systemjs.  Each of these items are already registered in the package.json file, so to install them, run this:

npm install

If they were not already set up, the latest versions of these libraries could be installed by running these commands in the root of the project:

npm install chalk
npm install hapi
npm install jquery
npm install requirejs
npm install systemjs

Downloading definition files:

Get TSD from npm.

npm install -g tsd

Then run the following commands to set up the TypeScript definitions (these have already been run in this project).  Note that tsd will always get the *latest* version of the definitions, so it has the assumption it will also be run with the latest version of any given library.

tsd init
tsd query chalk --action install --save
tsd query hapi --action install --save
tsd query require --action install --save
tsd query jquery --action install --save
tsd query systemjs --action install --save

For more information on TSD, check out http://definitelytyped.org/tsd/

To run the web server, run this command:

node server.js

Note that if you get an error, you may need to compile server.ts while the tsconfig.json file is set to either "commonjs" or "umd" module emit mode (Node.js doesn't understand SystemJS or AMD modules natively).
