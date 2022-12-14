# Git

## Branches

We follow the Git Flow branching model
([1](https://nvie.com/posts/a-successful-git-branching-model/), [2](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow))
with a slight variation to release branches. Since the project is developed
almost entirely without any public releases, using a short sprint and update
cycle, we have not found a need to do a release branch. Instead, we cut releases
directly from development, and fix any bugs in that release in the next minor
release from development. All other Git Flow processes can be followed as normal.

### Branch Naming Guidelines
* Lowercase
* Dashes in place of space
* Brief description of branch (preferably 5 words or less)

```
feature/example-branch-name
bugfix/storybook-info-scrolls-unexpectedly
```

## Commit Messages

Commit messages serve multiple purposes, but providing a good summary of changes
to other developers should be our highest priority. Some other uses are:

* Providing more context on the reason for the change and the implementation
* Automatic change-log generation
* Tracking backwards-incompatible changes
* Skipping CI/CD processes for specific changes

We have chosen to follow [Conventional Commits](https://www.conventionalcommits.org/)
as a specification for our commit messages, and it allows us to collect any
relevant information in an easy-to-read format for both humans and machines.

```
feat(Component): Adds feature to Component

This adds the component to the interface, and implements this feature.

Issues Affected: 1234
```

```
docs(Standards/Git): Adds Conventional Commits as a commit standard

Commitizen has been installed and provides `git cz` alias for guided commit messages

Issues Affected: 1114
```

[Commitizen](https://commitizen.github.io/cz-cli/) has been installed and will
provide a guided commit message workflow when running `npm run cz`. This can be
aliased to `git cz` by running `npm install -g commitizen`. This will simplify
the process of writing a good commit message, but the message may still be written
manually.

## Pull Requests

Reviews should be done on the code, the Storybook for both components and views, and the full visualization.
Please test any interactions and accessibility that have changed or regularly results in bugs.
