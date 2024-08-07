# Online Shop API

- Filebasierte SQLite Datenbank
- Node.JS Backend

## Installation

1. Module installieren:
   ```
   npm install
   ```
2. Den Server eingeben:
   ```
   cd server
   ```
3. Den Server starten:
   ```
   node app.js
   ```
4. Den Frontend starten:
   ```
   unten rechts befindet sich Go Live button. Auf den Button drücken. Wenn es nicht Sonst beim Extensions den GO Live herunterladen
   ```
![alt text](image.png)

Die API wird dann unter [http://localhost:3000/](http://localhost:3000/) verfügbar sein und die Swagger-Dokumentation wird unter [http://localhost:3000/api-docs](http://localhost:3000/api-docs) zugänglich sein.

## Authentifizierung und Rollen

Diese API verwendet JSON Web Tokens (JWT) zur Authentifizierung und Autorisierung. Es gibt zwei Rollen: `admin` und `user`.

### Standard-Admin-Benutzer

Beim Starten des Servers wird ein Standard-Admin-Benutzer erstellt:

- **Benutzername:** `admin`
- **Passwort:** `admin`

### Endpunkte

#### Registrierung

- **URL:** `/register`
- **Methode:** `POST`
- **Beschreibung:** Registriert einen neuen Benutzer mit der Standardrolle `user`.
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string",
    "role": "string"  // optional, default is "user"
  }
  ```
- **Erfolgsantwort:** `201 Created`
- **Fehlerantwort:** `500 Internal Server Error`

#### Anmeldung

- **URL:** `/login`
- **Methode:** `POST`
- **Beschreibung:** Meldet einen Benutzer an und gibt einen JWT zurück.
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Erfolgsantwort:** `200 OK` mit Token
- **Fehlerantwort:** `401 Unauthorized`, `500 Internal Server Error`

#### Passwort zurücksetzen

- **URL:** `/reset-password`
- **Methode:** `POST`
- **Beschreibung:** Setzt das Passwort eines Benutzers zurück. Nur authentifizierte Benutzer können diese Aktion ausführen.
- **Header:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "username": "string",
    "newPassword": "string"
  }
  ```
- **Erfolgsantwort:** `200 OK`
- **Fehlerantwort:** `500 Internal Server Error`

### Zugriff auf Kategorien und Produkte

#### Kategorien

- **GET /categories**: Zugriff offen
- **POST /categories**: Nur `admin`
- **GET /categories/:id**: Zugriff offen
- **PUT /categories/:id**: Nur `admin`
- **DELETE /categories/:id**: Nur `admin`

#### Produkte

- **GET /products**: Zugriff offen
- **POST /products**: Nur `admin`
- **GET /products/:id**: Zugriff offen
- **PUT /products/:id**: Nur `admin`
- **DELETE /products/:id**: Nur `admin`

## Beispielanfragen

### Registrierung

```bash
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{
  "username": "user1",
  "password": "password123"
}'
```

### Anmeldung

```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{
  "username": "admin",
  "password": "admin"
}'
```

### Passwort zurücksetzen

```bash
curl -X POST http://localhost:3000/reset-password -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{
  "username": "user1",
  "newPassword": "newpassword123"
}'
```
