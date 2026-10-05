# Strix-Test vorbereiten

Status am 5. Oktober 2026: Der Strix-Quellcodescan mit GPT-6 Luna über das ChatGPT-Abo wurde regulär abgeschlossen. Keine verifizierten Sicherheitslücken gemeldet; PHP-Laufzeit, Hosting und die vollständige Bewertung der Abhängigkeitsadvisories bleiben offen. Details stehen in `assessment.md`.

Offizielle Dokumentation:

- https://docs.strix.ai/quickstart
- https://docs.strix.ai/usage/cli
- https://docs.strix.ai/advanced/configuration

## Voraussetzungen

1. Docker Desktop mit laufender Linux-Container-Engine.
2. Strix gemäß der offiziellen Anleitung. Unter Windows unterstützt der curl-Installer Git Bash.
3. Ein konfigurierter Modellzugang. API-Schlüssel lokal einrichten, nicht im Chat oder Repository speichern. Alternativ unterstützt Strix eine eigene ChatGPT-Anmeldung; hierfür `strix auth login chatgpt` verwenden und das gewünschte unterstützte Modell konfigurieren.
4. Ein bewusst gewähltes Budget für API-Aufrufe. Der Strix-Budgetwert ist eine Schätzung und kann durch bereits laufende Anfragen überschritten werden.

## Ausführung

In PowerShell im Projektordner, nach der Einrichtung:

```powershell
# Für den hier verwendeten Abo-Zugang:
$env:STRIX_LLM = 'chatgpt/gpt-6-luna'

# Beispiel mit selbst festgelegtem Budgetlimit in USD:
./security/strix/run.ps1 -MaxBudgetUsd 5
```

Bei der Abo-Route zeigt Strix keine API-Kosten an; der Budgetwert begrenzt daher nicht zuverlässig die Abo-Nutzung. Der Scan verbraucht das normale Abo-Kontingent.

Das Skript kopiert nur Quellcode und notwendige Projektdateien in einen temporären Snapshot. Der Original-Checkout wird nicht als schreibbares Strix-Ziel eingebunden. Reports landen unter `security/strix/reports/strix_runs/`.

`instructions.md` definiert Prüfbereiche und begrenzt dynamische Tests auf lokale Sandbox-Dienste. Die produktive Website, Sanity und tatsächlicher E-Mail-Versand sind nicht Teil dieses Scans.

Strix benötigt eine funktionierende Engine und einen authentifizierten Modellzugang, bevor ein aussagekräftiges Testergebnis entstehen kann. Exitcode 0 allein ist kein Beleg für einen vollständigen Scan: auch den Abschlussstatus und mögliche Budgetstopps im Bericht prüfen.
