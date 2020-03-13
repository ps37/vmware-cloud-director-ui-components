const core = require('@actions/core');
const github = require('@actions/github');

const tagName = github.context.ref;
core.info(`Tag name = ${tagName}`);
core.info(`${/^components-v[0-999].[0-999].[0-999]$/.test(tagName)}`);
core.setOutput('isComponentsTag', /^components-v[0-999].[0-999].[0-999]$/.test(tagName).toString());
