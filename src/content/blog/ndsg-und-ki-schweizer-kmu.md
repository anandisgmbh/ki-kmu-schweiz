---
title: "nDSG und KI: Was Schweizer KMU bei ChatGPT, Claude & Co. wirklich beachten müssen"
description: "Nur 23 % der kleinsten Schweizer Betriebe haben nDSG-konforme KI-Regeln. Dieser Leitfaden zeigt die vier Compliance-Stufen, vergleicht die Anbieter und gibt eine umsetzbare Checkliste."
pubDate: 2026-04-12
author: "Jannick Oberbeck"
tags:
  - nDSG
  - Datenschutz
  - Compliance
  - KMU
readTime: "11 Minuten"
featured: true
---

Im September 2023 ist das revidierte Schweizer Datenschutzgesetz (nDSG) in Kraft getreten. Etwa zur gleichen Zeit ist ChatGPT in den Schweizer KMU-Alltag eingezogen wie wenige Tech-Innovationen zuvor. Die Folge ist eine paradoxe Situation: Tausende KMU-Mitarbeitende nutzen heute KI-Tools, von denen niemand genau sagt, was mit den eingegebenen Daten passiert — und ihre Geschäftsführungen wissen es in den allermeisten Fällen auch nicht.

Die [AXA KMU Arbeitsmarktstudie 2025](https://www.axa.ch/de/ueber-axa/medien/medienmitteilungen/aktuelle-medienmitteilungen/2025/20251008-kmu-arbeitsmarktstudie-2025-ki.html) bringt die ernüchternde Zahl: **nur 23 % der Schweizer Kleinstbetriebe (5–9 Mitarbeitende) haben adäquate nDSG-Regelungen für den KI-Einsatz etabliert.** Bei mehr als drei Vierteln der kleinsten Betriebe werden also Tools wie ChatGPT, Claude oder Gemini ohne formellen Rahmen genutzt — häufig mit Mandantendaten, Kundenkorrespondenz und anderen Inhalten, die dem nDSG unterliegen.

Dieser Artikel zeigt Ihnen, was Sie als KMU-Chef konkret beachten müssen, welche Anbieter unter welchen Bedingungen rechtskonform sind, wie eine ordentliche Auftragsdatenverarbeitung aussieht und welche Schritte Sie heute ergreifen sollten. Ohne juristische Paranoia und ohne die Compliance-Angst, die Schweizer Unternehmen in den letzten Monaten von sinnvollen KI-Projekten abgehalten hat.

> **Wichtiger Hinweis.** Dieser Artikel ersetzt keine Rechtsberatung. Er liefert einen pragmatischen Rahmen für die häufigsten KMU-Szenarien. Bei sensiblen Branchen (Banken, Gesundheit, Anwaltsgeheimnis) lohnt sich die individuelle Abklärung mit einem spezialisierten Datenschutzberater.

## Was das nDSG für KI konkret bedeutet

Das revidierte Datenschutzgesetz ist kein KI-spezifisches Gesetz. Es ist ein allgemeines Datenschutzgesetz, das die Verarbeitung personenbezogener Daten regelt — unabhängig davon, ob diese Verarbeitung durch einen Menschen, eine Datenbank oder ein KI-Modell erfolgt. Die Kernprinzipien sind:

- **Zweckbindung.** Daten dürfen nur für den angegebenen Zweck verwendet werden. Wenn Sie Mandantendaten zur Rechnungsstellung erhalten haben, dürfen Sie sie nicht ohne Weiteres in ein Marketing-KI-Tool eingeben.
- **Verhältnismässigkeit.** Es dürfen nur so viele Daten verarbeitet werden, wie für den Zweck nötig sind. "Ich lade die ganze Mandantenakte hoch, weil mich der Kontext interessiert" ist kein verhältnismässiger Umgang.
- **Datensicherheit.** Personenbezogene Daten müssen durch angemessene technische und organisatorische Massnahmen vor unberechtigtem Zugriff geschützt sein.
- **Transparenz.** Betroffene müssen wissen, welche Daten wie verarbeitet werden. Das heisst konkret: Ihre Mandanten müssen in Ihrer Datenschutzerklärung erfahren können, dass Sie KI-Tools einsetzen.
- **Auftragsdatenverarbeitung.** Wenn ein Dritter (z. B. ein KI-Anbieter) Daten in Ihrem Auftrag verarbeitet, brauchen Sie einen schriftlichen Vertrag, der den Umgang klar regelt.

Auf die KI-Welt übertragen: sobald Sie ein Dokument mit dem Namen eines Mandanten in ChatGPT einfügen, verarbeiten Sie personenbezogene Daten. Unter dem nDSG brauchen Sie dafür eine rechtliche Grundlage, einen geregelten Rahmen und — wenn der Anbieter nicht in der Schweiz sitzt — einen Auftragsdatenverarbeitungsvertrag sowie eine Prüfung, ob der Drittstaat ein angemessenes Datenschutzniveau bietet.

## Das Problem mit den Standard-Versionen

Wenn Sie die kostenlose oder die Plus-Version von ChatGPT nutzen, gilt in der Regel:

- Daten werden in den USA verarbeitet.
- OpenAI darf die Eingaben standardmässig für das Modell-Training verwenden — es sei denn, Sie deaktivieren das explizit in den Einstellungen.
- Ein Schweizer oder EU-konformer Auftragsdatenverarbeitungsvertrag existiert nicht.
- Die US-Gerichtsbarkeit greift.

Für die meisten Schweizer KMU bedeutet das: **Kostenlos- und Plus-Versionen sind nicht nDSG-konform**, sobald personenbezogene Daten verarbeitet werden. Das gilt auch für die allermeisten Alltags-Use-Cases — Kundenkorrespondenz, Mandantenunterlagen, Personaldokumente, interne E-Mails mit Personenbezug.

Die saubere Alternative sind die **Business-Versionen** der grossen Anbieter. Bei ChatGPT heisst das "Team" oder "Enterprise". Bei Claude "Team" oder "Enterprise". Bei Google "Workspace mit Gemini". Dort gilt typischerweise:

- Daten werden nicht für Training verwendet.
- Ein Auftragsdatenverarbeitungsvertrag kann abgeschlossen werden.
- Sie können die Datenregion teilweise auf EU festlegen.
- Die Haftungsregeln sind deutlich klarer.

Aber: die Lizenzkosten beginnen bei USD 25 bis 60 pro Nutzer pro Monat, was für ein KMU mit 20 Mitarbeitenden schnell CHF 6'000 bis CHF 15'000 im Jahr bedeutet — und das deckt nur einen einzelnen Anbieter ab.

## Die vier Compliance-Stufen

Nicht jedes KMU braucht die gleiche Compliance-Tiefe. Ein pragmatischer Rahmen mit vier Stufen hilft bei der Orientierung.

### Stufe 1 — Öffentliche Daten ohne Personenbezug

**Beispiele:** Marketingtexte aus öffentlichen Quellen, allgemeine Recherche, Übersetzungen bereits veröffentlichter Inhalte.

**Erlaubt:** praktisch alle Modelle, auch kostenlose Versionen.

**ADV nötig:** Nein.

Dies ist das einzige Szenario, in dem Sie bedenkenlos die kostenlose ChatGPT-Version nutzen können. Achten Sie darauf, dass wirklich keine personenbezogenen Daten oder vertrauliche Geschäftsinformationen in die Prompts gelangen — auch nicht versehentlich.

### Stufe 2 — Interne Geschäftsdaten ohne Personenbezug

**Beispiele:** Interne Strategie-Notizen ohne Namensnennungen, Meeting-Protokolle mit anonymisierten Inhalten, E-Mail-Entwürfe an Generische Empfänger.

**Erlaubt:** Business-Versionen der grossen Anbieter (ChatGPT Team, Claude Team, Gemini Workspace).

**ADV nötig:** Ja, aber die Standardverträge der Anbieter reichen in der Regel.

### Stufe 3 — Personenbezogene Geschäftsdaten (Standard-KMU)

**Beispiele:** Mandantendaten, Kundenkorrespondenz, interne Personalunterlagen, Vertragsentwürfe mit Namen.

**Erlaubt:** Business- oder Enterprise-Versionen mit EU-Datenregion, AlpineAI, Azure Swiss Region.

**ADV nötig:** Ja, schriftlich geregelt, dokumentiert, mit technischen und organisatorischen Massnahmen.

Dies ist die Stufe, in der die meisten Schweizer KMU tatsächlich operieren. Hier ist die Sorgfaltspflicht am höchsten, weil die Menge an verarbeiteten Daten am grössten ist.

### Stufe 4 — Sensible Daten (Treuhand, Recht, Gesundheit)

**Beispiele:** Steuerunterlagen, Gesundheitsdaten, Mandatsgeheimnisse, Berufsgeheimnisse, Daten mit besonderer Schutzbedürftigkeit gemäss nDSG.

**Erlaubt:** Swiss-hosted Anbieter (AlpineAI, Swisscom Cloud), vollständige On-Prem-Lösungen mit Open-Source-Modellen wie Mistral oder Llama.

**ADV nötig:** Ja, plus branchenspezifische Compliance-Massnahmen. Im Treuhand- und Anwaltsbereich gelten zusätzlich das Berufsgeheimnis und besondere Aufbewahrungspflichten.

In dieser Stufe sind die US-Cloud-Anbieter aus unserer Sicht nicht mehr empfehlbar. Die rechtlichen Risiken sind zu hoch, und die Alternativen sind mittlerweile praxistauglich.

## Die Anbieter im Überblick

Hier ein pragmatischer Vergleich der wichtigsten Anbieter aus nDSG-Sicht:

| Anbieter | Hauptsitz | ADV verfügbar | CH-/EU-Region | Empfohlen für |
|---|---|---|---|---|
| **ChatGPT (OpenAI)** | USA | Ja (Team / Enterprise) | EU-Region verfügbar | Stufe 2 mit Business-Plan |
| **Claude (Anthropic)** | USA | Ja (Team / Enterprise) | Teilweise EU | Stufe 2 mit Business-Plan |
| **Gemini (Google)** | USA | Ja (Workspace) | EU-Region verfügbar | Stufe 2 mit Workspace |
| **Mistral** | Frankreich (EU) | Ja | EU-Region | Stufe 2–3 |
| **AlpineAI** | Schweiz | Ja | Schweiz | Stufe 3–4 |
| **Llama (Meta, Open Source)** | USA | Selbst betrieben | On-Prem | Stufe 3–4 |

Wichtig zu verstehen: die Tabelle ist eine Momentaufnahme. Die Anbieter ändern ihre Business-Angebote und Regionen regelmässig. Vor dem produktiven Einsatz sollten Sie immer die aktuell geltenden Vertragsbedingungen prüfen — oder prüfen lassen.

## AlpineAI — die Schweizer Alternative

AlpineAI hat sich 2024 und 2025 als der relevanteste Schweizer KI-Anbieter etabliert. Die Kernargumente:

- **Hosting vollständig in der Schweiz**, mit allen rechtlichen Konsequenzen (keine US-Gerichtsbarkeit, kein Cloud Act).
- **nDSG-konforme Infrastruktur** mit dokumentierten technischen und organisatorischen Massnahmen.
- **FINMA-taugliche Setups** für Finanzdienstleister, was die regulatorische Abnahme erleichtert.
- **Zugang zu aktuellen KI-Modellen** ohne Datenexport in Drittländer.

Für Schweizer Treuhänder, Anwälte, Gesundheitsdienstleister und alle anderen Branchen mit strengen Compliance-Anforderungen ist AlpineAI heute die einfachste rechtskonforme Option. Die Modellqualität liegt auf dem Niveau der grossen US-Anbieter, und die Datensouveränität ist eine Stufe höher. Wichtig zu wissen: AlpineAI ersetzt nicht Ihr eigenes Datenschutzkonzept. Sie brauchen trotzdem eine Datenschutzerklärung, eine Auftragsdatenverarbeitungsvereinbarung und klare interne Richtlinien. Aber die rechtliche Grundlage steht auf deutlich solideren Füssen als bei US-Cloud-Anbietern.

## On-Prem als Ultima Ratio

Für Branchen mit den höchsten Compliance-Anforderungen (Spitäler, Banken, Bundesstellen) gibt es die Option, Open-Source-Modelle wie Llama 3, Mistral oder DeepSeek komplett auf eigener Infrastruktur zu betreiben. Die Daten verlassen das Gebäude nicht — nicht ins Internet, nicht in die Cloud, nirgendwohin.

Die Qualität hängt stark vom gewählten Modell und der Hardware ab. Die Open-Source-Modelle sind noch nicht auf dem Niveau von Claude Opus oder GPT-5 bei komplexen Reasoning-Aufgaben. Aber für viele konkrete Anwendungsfälle — Dokumentenverarbeitung, Klassifikation, strukturierte Extraktion, Zusammenfassungen — sind sie absolut ausreichend.

Die Investment-Kosten: CHF 10'000 bis CHF 30'000 für einen Server mit passender GPU, plus einmalig Setup-Kosten. Danach sind die laufenden Kosten minimal — keine API-Gebühren, keine Token-Kosten, keine Lizenzgebühren. Für kleinere KMU oft nicht wirtschaftlich. Für grössere oder besonders compliance-kritische Betriebe eine sehr solide Option.

## Die Auftragsdatenverarbeitung (ADV) richtig machen

Ein Auftragsdatenverarbeitungsvertrag ist im Grundsatz ein schriftlicher Vertrag zwischen Ihnen und dem KI-Anbieter, der regelt:

1. Welche Daten werden verarbeitet
2. Zu welchem Zweck
3. Wie lange werden sie gespeichert
4. Welche technischen und organisatorischen Sicherheitsmassnahmen existieren
5. Was passiert bei einem Datenschutzvorfall (Meldepflichten, Benachrichtigungen)
6. Wie können betroffene Personen ihre Rechte durchsetzen (Auskunft, Berichtigung, Löschung)
7. Welche Unter-Auftragsverarbeiter eingeschaltet werden dürfen

Die gute Nachricht: die grossen Anbieter haben Standard-ADV-Dokumente, die Sie nicht individuell aushandeln müssen. Bei OpenAI, Anthropic, Google Cloud, Microsoft Azure und AWS gibt es Business-Level-ADV, die Sie online abschliessen können. Bei AlpineAI läuft das über den direkten Kundenkontakt.

Die weniger gute Nachricht: Sie müssen verstehen, was in diesen Verträgen steht. Nicht jeder Standardvertrag regelt Ihre Situation angemessen. Besonders kritisch zu prüfen sind:

- **Die Datenregion.** USA? EU? Schweiz? Hier liegen oft versteckte Fallstricke.
- **Die Training-Verwendung.** Werden Ihre Daten für Modell-Training genutzt? Bei Standardverträgen typischerweise nicht, bei kostenlosen Plänen oft schon.
- **Die Löschfristen.** Wie lange bleiben Ihre Daten nach der Verarbeitung gespeichert? 30 Tage? 90 Tage? Unbegrenzt?
- **Die Unter-Auftragsverarbeiter.** Der Hauptanbieter darf in der Regel Teile der Verarbeitung an Dritte weitergeben. Welche sind das? Sitzen die wiederum in Drittländern?

Praktische Empfehlung: wenn Sie selbst nicht juristisch trittsicher sind, lassen Sie die Auftragsdatenverarbeitung von einem spezialisierten Datenschutzberater prüfen. Die Investition von CHF 500 bis CHF 1'500 einmalig ist im Verhältnis zum potenziellen Schaden einer nicht-konformen Verarbeitung trivial.

## Die konkrete Checkliste für Ihren Betrieb

Was Sie heute umsetzen können, in sechs Schritten:

1. **Bestandsaufnahme.** Welche KI-Tools werden in Ihrem Betrieb bereits genutzt — auch inoffiziell? Fragen Sie direkt bei den Mitarbeitenden nach, ohne Sanktionen zu drohen. Ehrliche Antworten bekommen Sie nur bei ehrlicher Nachfrage.
2. **Klassifikation.** Welche Arten von Daten landen heute in welchen Tools? Öffentlich? Geschäftsintern? Personenbezogen? Sensibel?
3. **Vertragsprüfung.** Haben Sie für die aktuell genutzten Tools eine gültige ADV? Falls nein: Pause-Taste drücken und regeln, bevor die Nutzung weitergeht.
4. **Interne Richtlinie.** Gibt es eine klare schriftliche Regel dazu, welche Daten in welches Tool eingegeben werden dürfen? Ein einseitiges Dokument reicht für den Anfang.
5. **Schulung.** Wissen Ihre Mitarbeitenden, welche Daten heikel sind und warum? Eine 30-minütige Schulung pro Quartal reicht.
6. **Dokumentation.** Sind die obigen Punkte schriftlich festgehalten? Im Fall einer Anfrage der Datenschutzaufsicht (EDÖB) ist die fehlende Dokumentation oft der Hauptkritikpunkt.

## Was wir konkret machen

Bei KI-KMU-Schweiz begleiten wir KMU beim nDSG-konformen Aufbau ihrer KI-Strategie. Das umfasst:

- **Compliance-Prüfung zum Einstieg** — was wird heute genutzt, was ist kritisch, welche Sofortmassnahmen sind nötig?
- **Anbieter-Empfehlung** nach Use-Case-Profil und Schutzbedarf der Daten
- **ADV-Prüfung** bestehender Verträge mit den grossen Anbietern
- **Dokumentation** der technischen und organisatorischen Massnahmen für die interne Ablage
- **Schulung** der Mitarbeitenden in einem pragmatischen, nicht-abschreckenden Format

Für sensible Branchen setzen wir standardmässig auf AlpineAI oder On-Prem-Lösungen mit Open-Source-Modellen. Für Standard-KMU mit nicht hochsensiblen Daten arbeiten wir mit den Business-Versionen der grossen Anbieter, sauber dokumentiert und mit klaren internen Regeln.

**Wichtig:** wir ersetzen keine Rechtsberatung. Bei heiklen Fragen arbeiten wir mit spezialisierten Datenschutz-Anwälten zusammen. Die Trennung zwischen technischer Umsetzung und rechtlicher Bewertung ist uns wichtig — jedes Projekt läuft sauberer, wenn die Rollen klar sind.

## Der nächste Schritt

Wenn Sie heute nicht sicher sind, welche KI-Tools in Ihrem Betrieb genutzt werden, was in den Prompts landet und welche ADV Sie eigentlich abgeschlossen haben — dann ist genau das ein guter Zeitpunkt für ein Erstgespräch. Dreissig Minuten, konkret, kostenlos. Wir schauen gemeinsam, wo Sie stehen und was die drei wichtigsten Sofortmassnahmen sind.

[Erstgespräch zur Compliance-Prüfung vereinbaren →](/#kontakt)

---

*Weiterführend: Der [ehrliche KMU-Leitfaden zum KI-Einstieg](/blog/ki-im-schweizer-kmu-2026-leitfaden) gibt den breiteren Überblick; der [Modell-Vergleich zwischen Claude, ChatGPT, Gemini, Mistral und AlpineAI](/blog/ki-modelle-vergleich-schweizer-kmu) ergänzt die technische Auswahl.*

*[→ KI-Beratung für Schweizer KMU — zurück zur Startseite](/)
