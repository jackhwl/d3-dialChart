"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wowify_1 = require("./wowify");
var chalk = require("chalk");
var interestingThings = ['The Sun', 'The Moon', 'The Stars'];
var result = wowify_1.default.apply(void 0, interestingThings);
console.log(chalk.bold.yellow(result.join('\n')));
