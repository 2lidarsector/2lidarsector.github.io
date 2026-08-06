@echo off
title ArcadeX
cd /d "%~dp0"
echo Starting ArcadeX at http://localhost:8080 ...
start "" http://localhost:8080
node src/server.js
pause
