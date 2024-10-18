# RiddleGuessr

## Beskrivning

**RiddleGuessr** är ett spel som utmanar användare med gåtor, tankeknep och logiska problem. Användare får poäng för korrekta svar, och en sammanfattning av deras prestationer ges efter varje runda.

## Installation

### Steg 1: Klona repository

```shell
git clone https://github.com/JohanTran02/riddleGuessr
cd riddleGuessr
```

### Steg 2: Installera nödvändiga paket

#### Backend

```shell
cd backend
npm i
```

#### Frontend

```shell
cd frontend
npm i
```

### Steg 3: Lägg till .env-fil

Skapa en ny fil med namnet `.env` i rooten av backend-mappen och lägg till följande rad:

```shell
OPENAI_API_KEY = "sk-..."
```

## Användning

### Steg 1: Starta backend-servern

Öppna en terminal och kör följande kommando:

```shell
npm run server
```

### Steg 2: Starta frontend-sidan

Öppna en ny terminal och kör följande kommando:

```shell
npm run dev
```

### Steg 3: Öppna webbläsaren

Öppna en webbläsare och gå till `http://localhost:3000`

### Steg 4: Använd tjänsten

Användaren kan sedan börja gissa på gåtor och lösa problem med hjälp av tjänsten genom att skriva i textrutan och trycka på "Enter".

### Steg 5: Se sammanfattning

När användaren har gissat alla rätt, använt alla chanser eller klickat på `Give up` kommer en ruta att visas med en sammanfattning av deras poäng och resonemang för varje gåta.
