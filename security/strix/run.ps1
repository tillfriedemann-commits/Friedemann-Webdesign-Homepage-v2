param(
    [Parameter(Mandatory = $true)]
    [ValidateRange(0.1, 10000)]
    [double]$MaxBudgetUsd
)

$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '../..')).Path
$instructionFile = Join-Path $PSScriptRoot 'instructions.md'
$strixCommand = Get-Command strix -ErrorAction SilentlyContinue
if (-not $strixCommand) {
    $strixInstalledPath = Join-Path ([Environment]::GetFolderPath('UserProfile')) '.strix/bin/strix.exe'
    if (Test-Path -LiteralPath $strixInstalledPath) {
        $strixExecutable = $strixInstalledPath
    } else {
        throw 'Strix ist nicht installiert. Installation: https://docs.strix.ai/quickstart'
    }
} else {
    $strixExecutable = $strixCommand.Source
}

$dockerCommand = Get-Command docker -ErrorAction SilentlyContinue
if (-not $dockerCommand) {
    $dockerInstalledPath = Join-Path $env:ProgramFiles 'Docker/Docker/resources/bin/docker.exe'
    if (-not (Test-Path -LiteralPath $dockerInstalledPath)) {
        $dockerInstalledPath = Join-Path $env:LOCALAPPDATA 'Programs/DockerDesktop/resources/bin/docker.exe'
    }
    if (Test-Path -LiteralPath $dockerInstalledPath) {
        $dockerExecutable = $dockerInstalledPath
        $env:PATH = (Split-Path -Parent $dockerInstalledPath) + [IO.Path]::PathSeparator + $env:PATH
    } else {
        throw 'Docker fehlt. Docker Desktop installieren und den Linux-Container-Modus starten.'
    }
} else {
    $dockerExecutable = $dockerCommand.Source
}

$dockerOs = & $dockerExecutable info --format '{{.OSType}}'
if ($LASTEXITCODE -ne 0) { throw 'Docker ist nicht erreichbar. Docker Desktop starten.' }
if ($dockerOs -ne 'linux') { throw 'Strix benötigt Linux-Container. Docker Desktop auf Linux-Container umstellen.' }

# Strix mounts local targets writable. Scan a source snapshot rather than the working checkout.
$snapshotRoot = Join-Path ([IO.Path]::GetTempPath()) ('friedemann-strix-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $snapshotRoot | Out-Null
$sourceItems = @(
    'src', 'public', 'package.json', 'package-lock.json', 'next.config.mjs',
    'postcss.config.mjs', 'tsconfig.json', 'next-env.d.ts'
)
foreach ($sourceItem in $sourceItems) {
    $sourcePath = Join-Path $projectRoot $sourceItem
    if (Test-Path -LiteralPath $sourcePath) {
        Copy-Item -LiteralPath $sourcePath -Destination $snapshotRoot -Recurse
    }
}

$deploymentWorkflow = Join-Path $projectRoot '.github/workflows/deploy.yml'
if (Test-Path -LiteralPath $deploymentWorkflow) {
    $workflowDirectory = Join-Path $snapshotRoot '.github/workflows'
    New-Item -ItemType Directory -Path $workflowDirectory -Force | Out-Null
    Copy-Item -LiteralPath $deploymentWorkflow -Destination $workflowDirectory
}

# The allowlist intentionally excludes .env files, .git, node_modules, .next and build output.
$reportDirectory = Join-Path $PSScriptRoot 'reports'
New-Item -ItemType Directory -Path $reportDirectory -Force | Out-Null
Write-Host "Scan-Snapshot: $snapshotRoot"
Write-Host "Berichte unter: $reportDirectory/strix_runs"
$scanExitCode = 1
Push-Location $reportDirectory
try {
    & $strixExecutable --non-interactive --target $snapshotRoot --scope-mode full --scan-mode standard --instruction-file $instructionFile --max-budget $MaxBudgetUsd
    $scanExitCode = $LASTEXITCODE
} finally {
    Pop-Location
}
Write-Host "Strix-Exitcode: $scanExitCode. Bei Budgetstopp auch den Berichtstatus prüfen."
exit $scanExitCode
