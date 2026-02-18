
$ProgressPreference = 'SilentlyContinue'

$binDir = "$HOME\.yawdl"
$exePath = "$binDir\yawdl.exe"
$repoUrl = "https://github.com/chersbobers/yawdl/releases/latest/download/yawdl.exe"

#
if (!(Test-Path $binDir)) { New-Item -ItemType Directory -Path $binDir -Force | Out-Null }

Write-Host "--- YAWDL Installer ---" -ForegroundColor Cyan


Write-Host "Downloading 100MB... (This will be quick now)" -ForegroundColor Yellow
$client = New-Object System.Net.WebClient
try {
    $client.DownloadFile($repoUrl, $exePath)
} catch {
    Write-Host "Download failed. Check the GitHub link." -ForegroundColor Red
    exit
}

# 4. PATH Injection
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($currentPath -notlike "*$binDir*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$binDir", "User")
}

Write-Host "✅ Done! Close and restart your terminal." -ForegroundColor Green