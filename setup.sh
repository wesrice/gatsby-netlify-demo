#!/usr/bin/env bash
set -e

if [ ! -f "$HOME/.volta/bin/volta" ];
then
  curl https://get.volta.sh | bash
fi

$HOME/.volta/bin/volta install node@10
$HOME/.volta/bin/volta pin node@10

$HOME/.volta/bin/volta install yarn
$HOME/.volta/bin/volta pin yarn

$HOME/.volta/bin/yarn cms:install
$HOME/.volta/bin/yarn infrastructure:install
