const core = require('@actions/core');
const github = require('@actions/github');

try {
    const refStringArray = github.context.ref.split('/');
    core.info(`Ref String Array = ${refStringArray}`);
    const tagName = refStringArray[refStringArray.length - 1];
    core.info(`Tag name = ${tagName}`);
    core.info(`${/^components-v[0-999].[0-999].[0-999]$/.test(tagName)}`);
    core.setOutput('isComponentsTag', /^components-v[0-999].[0-999].[0-999]$/.test(tagName).toString());
} catch (error) {
    core.setFailed(error.message);
}
