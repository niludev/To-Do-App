# To-Do App

Ein einfaches, aber leistungsfähiges To-Do-App-Projekt, das mit Flask (Backend) und React (Frontend) entwickelt wurde. Die App ermöglicht es Benutzern, sich zu registrieren, anzumelden und ihre Aufgaben zu verwalten. Die Benutzeroberfläche ist modern gestaltet und reaktionsfähig dank Tailwind CSS.

## Inhaltsverzeichnis

- [Features](#features)
- [Technologien](#technologien)
- [Installation](#installation)
  - [Backend Installation](#backend-installation)
  - [Frontend Installation](#frontend-installation)
- [API-Dokumentation](#api-dokumentation)
- [Projektstruktur](#projektstruktur)
- [Screenshots](#screenshots)
- [Mitwirken](#mitwirken)
- [Lizenz](#lizenz)

## Features

- Benutzerregistrierung und -anmeldung
- JWT-basierte Authentifizierung
- CRUD-Funktionalität für To-Dos (Erstellen, Lesen, Aktualisieren, Löschen)
- Modales Bestätigungsfenster beim Löschen von To-Dos
- Reaktionsfähiges Design mit Tailwind CSS

## Technologien

### Backend

- **Flask:** Ein leichtes Webframework für Python.
- **SQLAlchemy:** Ein ORM für die Interaktion mit Datenbanken.
- **Flask-JWT-Extended:** Eine Erweiterung für die JWT-basierte Authentifizierung.
- **SQLite:** Eine in Python integrierte, leichtgewichtige Datenbank.

### Frontend

- **React:** Eine JavaScript-Bibliothek für den Aufbau von Benutzeroberflächen.
- **Tailwind CSS:** Ein Utility-First CSS-Framework für ein schnelles Design von benutzerdefinierten UIs.

## Installation

### Backend Installation

1. **Repository klonen:**
   Klonen Sie das Repository auf Ihr lokales System:
   ```bash
   git clone <repository_url>
   cd <repository_directory>/backend

2. **Virtuelle Umgebung erstellen und aktivieren:**
   Erstellen Sie eine virtuelle Python-Umgebung und aktivieren Sie diese:
   ```bash
   python3 -m venv venv
   source venv/bin/activate

3. **Abhängigkeiten installieren:**
   Installieren Sie die benötigten Python-Pakete:
   ```bash
   pip install -r requirements.txt

4. **Datenbankmigrationen durchführen:**
   Initialisieren Sie die Datenbank und führen Sie Migrationen durch:
   ```bash
   flask db init
   flask db migrate
   flask db upgrade

5. **Backend starten:**
   Starten Sie den Flask-Server:
   ```bash
   python app.py



### Frontend Installation

1. **In das Frontend-Verzeichnis wechseln:**
   Navigieren Sie zum Frontend-Verzeichnis:
   ```bash
   cd ../frontend

2. **Abhängigkeiten installieren:**
   Installieren Sie die benötigten Node.js-Pakete:
   ```bash
   npm install

3. **Frontend starten:**
   Starten Sie den React-Entwicklungsserver:
   ```bash
   npm start

  Die Anwendung läuft dann standardmäßig unter http://localhost:3000.


## API-Dokumentation

### Benutzerregistrierung

* **URL:** `/register`
* **Methode:** `POST`
* **Eingaben:** `username`, `password`, `email`
* **Ausgabe:** Erfolgs- oder Fehlermeldung

### Benutzeranmeldung

* **URL:** `/login`
* **Methode:** `POST`
* **Eingaben:** `username`, `password`
* **Ausgabe:** `access_token` bei Erfolg

### Aufgaben abrufen

* **URL:** `/todos`
* **Methode:** `GET`
* **Authentifizierung:** JWT (mit `@jwt_required`)
* **Ausgabe:** Eine Liste der Aufgaben des Benutzers

### Neue Aufgabe erstellen

* **URL:** `/todos`
* **Methode:** `POST`
* **Authentifizierung:** JWT (mit `@jwt_required`)
* **Eingaben:** `title`, `description`
* **Ausgabe:** Die erstellte Aufgabe

### Aufgabe aktualisieren

* **URL:** `/todos/<int:todo_id>`
* **Methode:** `PUT`
* **Authentifizierung:** JWT (mit `@jwt_required`)
* **Eingaben:** `title`, `description`, `done`
* **Ausgabe:** Die aktualisierte Aufgabe

### Aufgabe löschen

* **URL:** `/todos/<int:todo_id>`
* **Methode:** `DELETE`
* **Authentifizierung:** JWT (mit `@jwt_required`)
* **Ausgabe:** Erfolgs- oder Fehlermeldung


## Projektstruktur

```plaintext
todo-app-project/
│
├── backend/
│   ├── app.py               # Hauptdatei für das Backend
│   ├── config.py            # Konfigurationsdatei für Flask
│   ├── models.py            # Datenbankmodelle für User und Tasks
│   ├── routes.py            # Definition der API-Endpunkte
│   └── migrations/          # Migrationsordner für die Datenbank
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js        # Login-Komponente
│   │   │   ├── Register.js     # Registrierungs-Komponente
│   │   │   ├── TodosPage.js    # To-Do-Seite
│   │   │   └── Modal.js        # Modalkomponente zur Bestätigung
│   │   ├── App.js             # Hauptkomponente
│   │   └── index.js           # Einstiegspunkt für React
│   ├── public/                # Statische Dateien
│   ├── package.json           # Node.js-Abhängigkeiten
│   └── tailwind.config.js     # Tailwind CSS Konfigurationsdatei
│
└── README.md                  # Diese Dokumentation



## Mitwirken

Beiträge zu diesem Projekt sind willkommen! Wenn Sie eine größere Änderung vorschlagen möchten, öffnen Sie bitte zuerst ein Issue, um die Richtung zu besprechen.

1. **Forken Sie das Repository**
2. **Erstellen Sie einen neuen Branch** (`git checkout -b feature/AmazingFeature`)
3. **Committen Sie Ihre Änderungen** (`git commit -m 'Add some AmazingFeature'`)
4. **Pushen Sie den Branch** (`git push origin feature/AmazingFeature`)
5. **Öffnen Sie eine Pull-Request**
