const core = require('@actions/core');
const github = require('@actions/github');

try {
    const refStringArray = github.context.ref.split('/');
    const tagName = refStringArray[refStringArray.length - 1];
    core.setOutput('isComponentsTag', /^components-v[0-999].[0-999].[0-999]$/.test(tagName).toString());
} catch (error) {
    core.setFailed(error.message);
}
