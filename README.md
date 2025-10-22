# To-Do Agent Demo (CLI)

## Overview

A small implementation of a TodoAgent with Tools.

This project is designed to run alongside a separate To-Do web app. As you first interact with the To-Dos on the web
app, then interact with the TodoAgent, you'll start to feel the similarities, differences, advantages, and disadvantages
of each interface.

Why a To-Do app? It's a common "hello world" for CRUD apps, so seemed like a good introduction to AI Agents and Tools.

## Features

- Zero dependencies other than the Anthropic SDK (and node types)
- Fully-functional agent loop in <100 lines of code.
- TodoAgent with tools implemented in <150 lines of code.
- Capable of all CRUD interactions exposed by the To-Do web app

## Inspiration

Inspired by [Thorsten Ball](https://thorstenball.com/)'s blog post for [Amp](https://ampcode.com/), titled
"[How to Build an Agent](https://ampcode.com/how-to-build-an-agent)". Largely adapted from Go to Typescript and modified
to target a Todo-App.

# Quickstart

- Set up the separate web app somewhere else (for example, /tmp)

  ```bash
  git clone https://github.com/chee86j/nextjstodo.git /tmp/nextjstodo
  # Verified working as of commit: 5afda28
  cd /tmp/nextjstodo
  # follow that project's README to get set up
  ```

- Finish setting up this project

  ```bash
  echo 'ANTHROPIC_API_KEY="sk_ant..."' > .env
  pnpm install
  pnpm dev
  ```

# Screenshots

Working chat interactions

<img src="./screenshots/example.jpg">

Reflected in the app (note the date shows a Thursday due to UTC interactions I didn't want to iron out.)

<img src="./screenshots/ui.jpg">

# Troubleshooting

- I'm getting this error `TypeError: fetch failed`, what's wrong?
  - Make sure you are running the Next.js repo mentioned [in the quickstart](#quickstart)

# Final Note

All code was written by hand with no "Agent" or "Tab" completions enabled, to get the full effect described by Thorsten
in [his article](https://ampcode.com/how-to-build-an-agent):

> I urge you to follow along. No, really. You might think you can just read this and that you don’t have to type out the
> code, but it’s less than 400 lines of code. I need you to feel how little code it is and I want you to see this with
> your own eyes in your own terminal in your own folders.
