const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('child_process').exec;

try {
    const filesInCommitCmd = `git diff-tree --no-commit-id --name-only -r ${github.context.sha}`;
    exec(filesInCommitCmd, (err, stdout, stderr) => {
        if (err != null) {
            throw Error(err);
        }
        if (typeof stderr == 'string') {
            throw Error(stderr);
        }
        core.setOutput('isComponentsPackageChanged', stdout);
    });
} catch (error) {
    core.setFailed(error.message);
}
