
$ErrorActionPreference = "Stop"

# 1. Define locations
$binDir = "$HOME\.yawdl"
$exePath = "$binDir\yawdl.exe"
$repoUrl = "https://github.com/chersbobers/yawdl/releases/latest/download/yawdl.exe"

Write-Host "--- YAWDL Installer ---" -ForegroundColor Cyan

if (!(Test-Path $binDir)) {
    Write-Host "Creating directory $binDir"
    New-Item -ItemType Directory -Path $binDir | Out-Null
}

Write-Host "Downloading latest yawdl.exe..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $repoUrl -OutFile $exePath -Headers @{"Cache-Control"="no-cache"}
} catch {
    Write-Host "Error: Could not download yawdl.exe. Make sure the GitHub Release exists!" -ForegroundColor Red
    exit
}

Write-Host "Updating PATH..." -ForegroundColor Yellow
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($currentPath -notlike "*$binDir*") {
    $newPath = "$currentPath;$binDir"
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    $env:Path += ";$binDir"
    Write-Host "Added $binDir to your PATH." -ForegroundColor Green
} else {
    Write-Host "PATH already configured." -ForegroundColor Gray
}

Write-Host "`n✅ Success! YAWDL is now installed." -ForegroundColor Green
Write-Host "Close and reopen your terminal, then type: yawdl init" -ForegroundColor Cyan