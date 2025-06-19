:: Run docker before start

@echo off
start powershell -NoExit -Command "docker compose -f compose.prod.yaml up -d"
