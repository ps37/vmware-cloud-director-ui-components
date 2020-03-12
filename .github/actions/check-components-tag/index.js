const core = require('@actions/core');
const github = require('@actions/github');

const tagName = github.context.ref;
core.setOutput('isComponentsTag', /^components-v[0-999].[0-999].[0-999]$/.test(tagName).toString());
