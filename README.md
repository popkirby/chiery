Chiery
==========

[![npm version](https://badge.fury.io/js/chiery.svg)](https://badge.fury.io/js/chiery)

:four_leaf_clover: Manage dotfiles like collecting clovers.

### Installation

```sh
npm install -g chiery
```

### Usage

```sh
chiery init                          # initialize chiery
chiery install popkirby-dotfiles/vim # install clovers from github
```

### Commands

#### chiery init [username/repo] [-f]

Create `$HOME/.chiery/` and initialize as git repository.

When `username/repo is passed`, chiery will pull it to `$HOME/.chiery` from github.

This will fail when `$HOME/.chiery` exists. Use `-f` to overwrite.

#### chiery install [username/repo]

Pull `username/repo` under `$HOME/.chiery/clovers` and execute install script.

When `username/repo` is ommited, chiery will install clovers with informations in `$HOME/.chiery/clover-lists`.

#### chiery update [clover-name]

Update installed / specified clover.

#### chiery list

Output the list of installed clovers.

#### chiery get <clover-name>

Output the path of the specified clover.

### License

MIT
