---
title: "ChatGPT im Handwerksbetrieb: Wie Schreiner, Sanitäre und Elektriker KI konkret nutzen"
description: "KI im Handwerk ist kein Zukunftsthema — es passiert jetzt. Offerten aus Kundenfotos, Voice-Agents am Telefon, automatische Disposition. Fünf erprobte Use Cases mit realistischen Zahlen aus Schweizer Betrieben."
pubDate: 2026-04-21
author: "Jannick Oberbeck"
tags:
  - Handwerk
  - Branchen-Fokus
  - ChatGPT
  - Automatisierung
readTime: "11 Minuten"
featured: false
---

Es gibt eine verbreitete Annahme, die lautet: KI sei etwas für Bürojobs, für Berater und Banken, und im Handwerk habe das keinen Platz, weil dort "echte Arbeit" passiere. Diese Annahme ist falsch — und die Betriebe, die sie zuerst überprüft haben, gewinnen jetzt Aufträge, die vorher an schnellere Mitbewerber gingen.

In diesem Artikel geht es nicht um ChatGPT-Spielereien, sondern um fünf konkrete Use Cases, die in Schweizer Handwerksbetrieben mit 8 bis 30 Mitarbeitenden heute produktiv laufen. Mit echten Metriken, realistischen Kosten und einer ehrlichen Einordnung, was funktioniert und was (noch) nicht.

## Warum Handwerk und KI besser zusammenpassen als erwartet

Handwerksbetriebe haben drei Eigenschaften, die sie für KI-Projekte besonders geeignet machen:

**Erstens: klare, repetitive Backoffice-Prozesse.** Offerten schreiben, Terminplanung, Materialbestellung, Kundenkommunikation — das sind Abläufe mit hohem Volumen und klaren Mustern. Genau dort ist KI stark.

**Zweitens: ein Chef, der alles macht.** In einem typischen Betrieb mit 12 Mitarbeitenden ist der Inhaber gleichzeitig Verkäufer, Kalkulierer, Disponent und Kundenberater. Die Abendarbeit am Küchentisch — Offerten schreiben, Mails beantworten, Termine planen — ist der Normalfall, nicht die Ausnahme. Jede eingesparte Stunde dort hat direkten Lebensqualitäts-Impact.

**Drittens: direkte Entscheidungswege.** Kein Komitee, kein Freigabeprozess, kein IT-Board. Wenn der Inhaber sagt "wir machen das", läuft es in der nächsten Woche. Das ist der grösste operative Vorteil gegenüber Grossunternehmen bei KI-Einführungen.

## Use Case 1: Offerten aus Kundenfotos und Kurztexten

### Das Problem

Der typische Ablauf: ein Kunde schickt per WhatsApp ein Foto seiner Küche und schreibt dazu "Ich hätte gerne neue Fronten und eine Arbeitsplatte, was würde das kosten?" Der Chef schaut sich das an — aber erst abends, nach der Baustelle, nach dem Abendessen, wenn die Kinder im Bett sind. Drei Tage später geht die Offerte raus. Der Kunde hat inzwischen bei zwei Mitbewerbern angefragt, einer hat innerhalb von 24 Stunden geantwortet. Der Auftrag ist weg.

### Die Lösung

Ein KI-Assistent, der auf dem gleichen WhatsApp-/E-Mail-Kanal wie bisher Kundenanfragen entgegennimmt, das Foto analysiert, den Freitext versteht und innerhalb von Minuten einen **Offert-Entwurf** erzeugt — mit Positionen, Richtpreisen (basierend auf historischen Daten und Lieferantenpreisen) und Lieferzeit-Schätzung. Der Chef öffnet die App auf dem Tablet, prüft den Entwurf, passt gegebenenfalls an und sendet. Statt 3 Tagen vergehen 3 Stunden.

### Die Zahlen

Aus einem unserer [Anker-Projekte](/#stories) — eine Schreinerei mit 14 Mitarbeitenden in der Zentralschweiz:

- **Offert-Durchlaufzeit**: 5 Tage → 1 Tag
- **Auftragsquote**: +28 %
- **Abend-/Wochenendarbeit des Inhabers**: −10 Stunden pro Woche
- **Umsetzungsdauer**: 5 Wochen

Die +28 % Auftragsquote ist der wichtigste Wert. Der Schreiner hat nicht plötzlich bessere Arbeit gemacht — er hat einfach **schneller geantwortet**, und der Kunde wollte nicht weiter warten.

### Technische Umsetzung

Das System nutzt Claude Sonnet für die Bild- und Textanalyse, greift auf eine historische Preisdatenbank des Betriebs zu und generiert den Offert-Entwurf als strukturiertes PDF. Die Integration mit WhatsApp Business läuft über eine Webhook-Anbindung. Für nDSG-sensible Fälle ist AlpineAI als Schweizer Alternative einsetzbar — [mehr zur Modellwahl](/blog/ki-modelle-vergleich-schweizer-kmu/).

## Use Case 2: KI-Telefonagent für Disposition und Notfälle

### Das Problem

In einem Sanitär- oder Heizungsbetrieb klingelt das Telefon den ganzen Tag. Die Hälfte der Anrufe sind Terminanfragen ("Können Sie nächste Woche kommen?"), die andere Hälfte sind Notfälle ("Wasserrohrbruch im Keller, jetzt sofort!"). Die Disponentin telefoniert ganztags, plant um, koordiniert Pikett — und ist trotzdem nie fertig. Ausserhalb der Bürozeiten sind Kunden auf dem Anrufbeantworter, und dringende Fälle gehen verloren.

### Die Lösung

Ein [Voice-Agent](/blog/ki-agenten-schweizer-kmu-2026/) nimmt Anrufe entgegen, unterscheidet per Sprachanalyse zwischen Notfall und Standard-Termin, priorisiert nach Dringlichkeit und löst die passende Aktion aus: bei Notfällen geht sofort eine SMS an den Pikett-Techniker und eine Bestätigung an den Kunden. Bei Standard-Terminen wird ein Slot im Kalender vorgeschlagen und bestätigt. Der Agent spricht Schweizerdeutsch (oder Hochdeutsch, je nach Einstellung), ist 24 Stunden erreichbar und dokumentiert jeden Anruf.

### Die Zahlen

Aus einem unserer [Anker-Projekte](/#stories) — ein Haustechnik-Betrieb im Aargau mit 22 Mitarbeitenden:

- **70 %** der Anrufe vollautomatisch abgewickelt
- **Disponenten-Zeit**: −50 %
- **24/7 Erreichbarkeit** ohne Zusatzpersonal
- **Umsetzungsdauer**: 8 Wochen

### Was dabei wichtig ist

Die Sprachqualität der Voice-AI hat sich 2025/2026 dramatisch verbessert — GPT-4o Realtime und vergleichbare Modelle können heute natürlich klingende Gespräche führen mit minimaler Latenz. Trotzdem: der Agent sollte am Anfang des Gesprächs **transparent machen**, dass er ein KI-Assistent ist ("Guten Tag, Sie sprechen mit dem automatischen Assistenten von [Firmenname]. Wie kann ich Ihnen helfen?"). Das ist nicht nur ethisch richtig, sondern erhöht laut unserer Erfahrung auch die Akzeptanz beim Anrufer.

## Use Case 3: Automatische Materialbestellung nach Projektphase

### Das Problem

In Elektro- und Sanitär-Betrieben folgen Materialbestellungen einem Muster: je nach Projektphase (Rohbau, Ausbau, Fertigstellung) werden bestimmte Materialien in vorhersagbaren Mengen bestellt. Trotzdem sitzt der Projektleiter jeden Freitag eine Stunde da und stellt manuell die Bestellliste zusammen — obwohl 80 % der Positionen aus den letzten 50 Projekten ableitbar wären.

### Die Lösung

Ein Workflow-Agent, der auf Basis des Projektplans und der Baufortschritts-Meldungen automatisch Materialbedarfs-Listen generiert, mit den aktuellen Lieferantenpreisen abgleicht und dem Projektleiter zur Freigabe vorlegt. Der Projektleiter prüft und bestätigt — die Bestellung geht dann automatisch an den Lieferanten.

### Was der Agent NICHT macht

Er bestellt nicht autonom. Der Mensch gibt frei. Das ist wichtig, weil Materialpreise schwanken, Lieferengpässe auftreten und Projektänderungen passieren, die nur der Projektleiter kennt. Der Agent nimmt die Routine-Arbeit ab, die Entscheidung bleibt beim Menschen.

### Realistische Erwartung

Zeitersparnis pro Woche: 3–5 Stunden für den Projektleiter. Zusätzlich: weniger Fehlbestellungen und bessere Preise durch systematischen Lieferantenvergleich. Amortisation des Projekts typischerweise nach 4–6 Monaten.

## Use Case 4: Marketing-Content aus dem Betriebsalltag

### Das Problem

Handwerksbetriebe haben fantastisches visuelles Material — fertige Projekte, Vorher-Nachher-Bilder, Werkstatt-Impressionen — aber weder die Zeit noch die Lust, daraus Social-Media-Posts, Google-Business-Einträge oder Website-Updates zu machen. Das Marketing verkümmert, die Online-Sichtbarkeit sinkt, und die Neukunden kommen nur noch über Mund-zu-Mund.

### Die Lösung

Ein KI-System, das aus hochgeladenen Fotos und einer kurzen Voice-Notiz des Inhabers ("Das ist die neue Küche bei Familie Müller in Winterthur, Eiche natur, haben wir in drei Wochen gemacht") automatisch Social-Media-Posts, Google-Business-Updates und Website-Texte generiert. Der Inhaber gibt frei und die Inhalte werden veröffentlicht.

### Realistische Erwartung

Aus einem ähnlichen Projekt mit einer Gastro-Gruppe: Marketing-Zeit von 15 Stunden auf 3 Stunden pro Woche, Reservationen über Social Media +40 %, +2'100 Follower in 4 Monaten. Im Handwerkskontext sind die Zahlen für Follower kleiner (lokaler Markt), aber die Sichtbarkeit auf Google Maps und in der lokalen Suche steigt deutlich — und das ist für Handwerker der relevantere Kanal.

## Use Case 5: Intelligente Kundenkommunikation und Nachfassgespräche

### Das Problem

Viele Handwerksbetriebe verschicken Offerten und fassen dann nie systematisch nach. Der Chef hat keine Zeit, die Disponentin auch nicht, und so bleibt die Hälfte der Offerten "in der Schwebe" — weder angenommen noch abgelehnt. Die Auftragsquote leidet.

### Die Lösung

Ein automatisiertes Nachfass-System: 5 Tage nach Offertversand geht eine freundliche, personalisierte Mail an den Kunden ("Guten Tag Frau Meier, haben Sie unsere Offerte für die Badsanierung erhalten? Haben Sie Rückfragen?"). Wenn keine Antwort kommt, folgt nach 10 Tagen eine zweite Nachfrage. Bei positiver Antwort wird automatisch ein Termin zur Auftragsbestätigung vorgeschlagen.

### Was der Agent hier leistet

Er formuliert die Nachfass-Mails nicht generisch, sondern bezieht sich auf die spezifische Offerte — Projekttitel, Adresse, Hauptpositionen, offene Fragen. Das ergibt sich aus der Verknüpfung mit dem Offert-System. Der Ton ist freundlich, nicht pushy, nicht Spam-artig. Der Chef kann Templates vorher absegnen und jede Mail vor dem Versand prüfen (oder automatisch senden lassen, je nach Komfort-Level).

### Realistische Erwartung

Betriebe, die systematisches Nachfassen einführen, berichten von **15–30 % höherer Auftragsquote** auf bestehende Offerten. Der Grund ist meist nicht Preisdruck, sondern schlicht: der Kunde hatte die Offerte vergessen, brauchte einen Anstoss, oder hatte eine kleine Rückfrage, die ihn vom Zusagen abgehalten hat.

## Was nicht funktioniert (die ehrliche Seite)

Nicht jeder KI-Einsatz im Handwerk ergibt Sinn. Hier die typischen Enttäuschungen:

**"KI soll den Lehrling ersetzen."** Nein. KI ersetzt repetitive Büroarbeit. Auf der Baustelle, am Werkstück, in der Installation bleibt der Mensch unersetzlich. Die Betriebe, die mit KI erfolgreich sind, setzen ihre Leute nicht ab, sondern schaffen Kapazität für mehr Aufträge oder weniger Überstunden.

**"Wir installieren ChatGPT und dann läuft's."** ChatGPT-Plus allein ist kein produktives Werkzeug für einen Handwerksbetrieb. Es fehlen die Anbindung an bestehende Systeme (Offertprogramm, Kalender, Materialwirtschaft), das Wissen über Ihre spezifischen Preise und Prozesse, und der Datenschutzrahmen für Kundendaten. Ein Werkzeug wie ChatGPT ist ein Baustein, aber kein fertiges System.

**"Alles auf einmal automatisieren."** Fünf Use Cases gleichzeitig zu starten ist der sicherste Weg, keinen davon vernünftig hinzubekommen. Starten Sie mit einem — typischerweise der Offertenerstellung, weil dort der ROI am schnellsten sichtbar ist.

**"Der Azubi soll das einrichten."** KI-Systeme, die mit Kundendaten arbeiten, brauchen einen ordentlichen Rahmen — [nDSG-Compliance](/blog/ndsg-und-ki-schweizer-kmu/), Auftragsdatenverarbeitung, klare interne Regeln. Das ist Chefsache, nicht Lehrlings-Aufgabe.

## Die Kosten — realistisch für einen 12-Personen-Betrieb

| Phase | Kosten | Zeitrahmen |
|---|---|---|
| Potenzial-Check (welcher Use Case zuerst?) | CHF 2'500 | ~2 Wochen |
| Erster Pilot (z.B. Offertenerstellung) | CHF 12'000–20'000 | 4–6 Wochen |
| Laufende API-Kosten | CHF 50–200 / Monat | laufend |
| Optional: monatliche Partnerschaft | ab CHF 2'500 / Monat | nach Bedarf |

Die ROI-Rechnung: wenn die Offertenerstellung dem Chef 10 Stunden pro Woche spart und die Auftragsquote um 20 % steigt, ist der Pilot in 3–4 Monaten amortisiert. Bei einem durchschnittlichen Auftragswert von CHF 8'000 und einer Steigerung von 2 Aufträgen pro Monat sind das CHF 16'000 Zusatzumsatz — pro Monat.

## Der Datenschutz im Handwerk

Im Vergleich zu Treuhand oder Recht sind die Datenschutz-Anforderungen im Handwerk weniger strikt, aber trotzdem relevant. Kundenadressen, Fotos von Privatwohnungen, E-Mail-Korrespondenz — alles personenbezogene Daten unter dem nDSG.

Für die meisten Handwerksbetriebe reicht **Compliance-Stufe 2 oder 3** (Business-Versionen der grossen Anbieter mit ADV). On-Prem oder AlpineAI sind nur nötig, wenn Sie mit besonders sensiblen Daten arbeiten — was im Standardhandwerk selten der Fall ist.

Praktische Empfehlung: **Claude Team oder ChatGPT Team** als Basis, kombiniert mit einem sauberen Auftragsdatenverarbeitungsvertrag und einer internen Richtlinie ("diese Daten dürfen in das Tool, diese nicht"). Mehr Details im [nDSG-Compliance-Artikel](/blog/ndsg-und-ki-schweizer-kmu/).

## Der nächste Schritt für Ihren Betrieb

Die beste Frage, die Sie sich als Handwerks-Inhaber stellen können, ist diese: *"Welche Aufgabe mache ich jede Woche, die nichts mit dem eigentlichen Handwerk zu tun hat, und die mich am meisten nervt?"*

Die Antwort auf diese Frage ist Ihr erster KI-Use-Case. Wenn Sie einen externen Blick darauf wollen — ein Erstgespräch ist kostenlos, dauert 30 Minuten und klärt, ob und wo KI in Ihrem Betrieb Sinn ergibt. Ohne Verkaufsgespräch, ohne Verpflichtung.

[Erstgespräch vereinbaren →](/#kontakt)

---

*Weiterführend: Der [KMU-Leitfaden für den KI-Einstieg](/blog/ki-im-schweizer-kmu-2026-leitfaden/) gibt den strategischen Rahmen, die [nDSG-Compliance-Fibel](/blog/ndsg-und-ki-schweizer-kmu/) die datenschutzrechtlichen Grundlagen, der [Modell-Vergleich](/blog/ki-modelle-vergleich-schweizer-kmu/) die Tool-Auswahl und der [Innosuisse-Artikel](/blog/innosuisse-ki-foerderung-schweizer-kmu/) die Förderoptionen.*

*[→ KI-Beratung für Schweizer KMU — zurück zur Startseite](/)*
