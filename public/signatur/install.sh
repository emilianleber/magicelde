#!/bin/bash
# Setzt die MagicEL-Signatur in die zuletzt angelegte Apple-Mail-Signatur ein.
# Aufruf: curl -fsSL https://www.magicel.de/signatur/install.sh | bash -s magic-dinner   (oder: anfragen)
V="${1:-magic-dinner}"
if pgrep -xq Mail; then echo "Bitte zuerst Mail mit Cmd+Q beenden und dann nochmal starten."; exit 1; fi
F=$(ls -t ~/Library/Mobile\ Documents/com~apple~mail/Data/V*/MailData/Signatures/*.mailsignature ~/Library/Mail/V*/MailData/Signatures/*.mailsignature 2>/dev/null | head -1)
if [ -z "$F" ]; then echo "Keine Signaturdatei gefunden. Hat das Terminal 'Festplattenvollzugriff'? (Systemeinstellungen > Datenschutz & Sicherheit)"; exit 1; fi
BODY=$(curl -fsSL "https://www.magicel.de/signatur/signatur-$V.html") || { echo "Download fehlgeschlagen"; exit 1; }
chflags nouchg "$F"
HEAD=$(awk 'BEGIN{h=1} h&&/^\r?$/{exit} {print}' "$F")
printf '%s\n\n%s\n' "$HEAD" "$BODY" > "$F"
chflags uchg "$F"
echo "Fertig: $F"
echo "Jetzt Mail starten und eine neue E-Mail mit der Signatur testen."
