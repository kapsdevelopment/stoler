#!/bin/zsh
cd -- "${0:A:h}"
if ! command -v node >/dev/null 2>&1; then
  print "Node.js mangler i Terminal-miljøet. Start fra Codex med: npm start"
  read "?Trykk Enter for å lukke."
  exit 1
fi
print "Åpne http://127.0.0.1:4177 i nettleseren."
print "Stopp prototypen med Ctrl+C."
exec node server.mjs
