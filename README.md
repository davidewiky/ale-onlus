# Il Sogno di Ale

Sito web dell'associazione **Il Sogno di Ale**, onlus che raccoglie fondi per la ricerca sul
**sarcoma di Ewing** e sostiene le famiglie dei piccoli pazienti.

## Stack tecnico

- **Next.js 16** (App Router, React Server Components, Server Actions) + TypeScript
- **Tailwind CSS 4** per lo styling
- **PostgreSQL** come database, con **Prisma ORM** (schema in `prisma/schema.prisma`)
- **Auth.js (NextAuth v5)** con provider Credentials (email + password) per l'autenticazione,
  sessioni JWT e ruoli `USER` / `ADMIN`
- Middleware (`src/middleware.ts`) per proteggere le rotte `/eventi/*` (richiede login) e
  `/admin/*` (richiede ruolo `ADMIN`)

## Struttura del progetto

```
prisma/
  schema.prisma       # modelli User, Event, Registration
  seed.ts             # dati di esempio (admin, utente demo, eventi mock)
src/
  auth.ts             # configurazione Auth.js
  middleware.ts        # protezione rotte
  lib/                 # prisma client, hashing password, guard, formattazione date
  components/          # Navbar, Footer, card eventi, ecc.
  app/
    page.tsx            # landing page
    la-malattia/         # sezione informativa sul sarcoma di Ewing
    il-nostro-impatto/   # traguardi raggiunti dalla fondazione
    eventi/              # lista + dettaglio eventi (richiede login), iscrizione via Server Action
    login/, registrati/  # autenticazione
    dona/                # pagina donazioni (info bonifico / 5x1000)
    admin/                # pannello admin: dashboard, gestione eventi/iscrizioni/utenti
    api/auth/             # route handler NextAuth + registrazione utente
```

## Setup locale

### 1. Prerequisiti

- Node.js 20+
- Docker (per avviare Postgres in locale) oppure un'istanza Postgres già disponibile

### 2. Installazione dipendenze

```bash
npm install
```

### 3. Variabili d'ambiente

Copia `.env.example` in `.env` e valorizza le variabili:

```bash
cp .env.example .env
```

- `DATABASE_URL`: connection string Postgres
- `AUTH_SECRET`: genera un valore casuale con `npx auth secret` oppure `openssl rand -base64 32`
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME`: credenziali dell'utente admin
  creato dallo script di seed

### 4. Database Postgres (Docker)

Per lo sviluppo locale con `npm run dev` avvia solo Postgres:

```bash
docker compose up -d db
```

### 5. Migrazioni e seed

```bash
npm run prisma:migrate   # crea le tabelle
npm run db:seed          # crea utente admin, utente demo e alcuni eventi di esempio
```

Al termine del seed vengono stampate a console le credenziali di test:

- **Admin**: `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (default: `admin@ilsognodiale.it` /
  `ChangeMe123!`)
- **Utente demo**: `utente.demo@ilsognodiale.it` / `Demo1234!`

### 6. Avvio in sviluppo

```bash
npm run dev
```

L'app sarà disponibile su [http://localhost:3000](http://localhost:3000).

## Avvio completo in Docker (test)

Per provare l'app come stack unico (Next.js + Postgres, con migrazioni e seed all'avvio):

```bash
docker compose up --build
```

L'app sarà disponibile su [http://localhost:3000](http://localhost:3000). La porta `3000` deve essere libera (ferma `npm run dev` se è già in esecuzione).

All'avvio del container `app` vengono applicate le migrazioni Prisma e viene eseguito il seed. Le credenziali di test sono le stesse dello sviluppo locale.

Per spegnere lo stack:

```bash
docker compose down
```

## Script disponibili

| Comando                  | Descrizione                                   |
| ------------------------- | ---------------------------------------------- |
| `npm run dev`              | Avvia il server di sviluppo                    |
| `npm run build`            | Build di produzione                            |
| `npm run start`            | Avvia la build di produzione                   |
| `npm run lint`             | Esegue ESLint                                  |
| `npm run prisma:migrate`   | Applica le migrazioni in sviluppo              |
| `npm run prisma:deploy`    | Applica le migrazioni in produzione            |
| `npm run prisma:studio`    | Apre Prisma Studio per ispezionare il database |
| `npm run db:seed`          | Popola il database con dati di esempio         |

## Note su contenuti e mock

- Le immagini di copertina di eventi, hero e gallery sono attualmente **placeholder** generati
  da [Picsum Photos](https://picsum.photos), da sostituire con le foto ufficiali della
  fondazione.
- Il riquadro "video" nella landing page e nella sezione storia è un **componente segnaposto**
  (`VideoPlaceholder`): quando saranno disponibili i video ufficiali basterà sostituirlo con un
  tag `<video>` o un embed (es. YouTube/Vimeo).
- I contenuti su malattia e traguardi della fondazione sono testi editoriali di esempio, da
  rivedere con i contenuti reali dell'associazione.

## Autenticazione

L'accesso avviene tramite **email e password** (provider Credentials di Auth.js), con hashing
delle password via `bcryptjs`. Non sono al momento configurati provider OAuth di terze parti
(Google, Facebook, ecc.): l'architettura di Auth.js li supporta nativamente, quindi possono
essere aggiunti in `src/auth.ts` in un secondo momento senza modifiche strutturali.

### Registrazione con Google (opzionale)

Oltre a email e password, gli utenti possono registrarsi e accedere con il proprio account Google.
Il pulsante compare in `/login` e `/registrati` solo se sono impostate `AUTH_GOOGLE_ID` e
`AUTH_GOOGLE_SECRET`.

1. Su [Google Cloud Console](https://console.cloud.google.com/apis/credentials) crea un
   "ID client OAuth" di tipo *Applicazione web*.
2. Tra gli *URI di reindirizzamento autorizzati* aggiungi `<AUTH_URL>/api/auth/callback/google`
   (in locale: `http://localhost:3000/api/auth/callback/google`).
3. Copia ID e segreto client in `.env` come `AUTH_GOOGLE_ID` e `AUTH_GOOGLE_SECRET`.

Al primo accesso con Google viene creato automaticamente un utente `USER` (senza password locale).
Se esiste già un account con la stessa email registrato con password, l'accesso con Google viene
rifiutato e l'utente è invitato ad accedere con la password: l'email non è verificata alla
registrazione classica, quindi il collegamento automatico permetterebbe di "occupare" in anticipo
l'account di qualcun altro.

- Utenti autenticati (ruolo `USER`): possono accedere alla sezione `/eventi` e iscriversi/
  disiscriversi dagli eventi.
- Utenti con ruolo `ADMIN`: accedono anche al pannello `/admin` per gestire eventi, vedere le
  iscrizioni e promuovere/retrocedere altri utenti.

## Deploy

L'app è pensata per essere eseguita su qualsiasi hosting compatibile con Next.js (Vercel,
Docker, Node server). Prima del deploy:

1. Configura `DATABASE_URL` verso l'istanza Postgres di produzione
2. Configura `AUTH_SECRET` e `AUTH_URL` (dominio pubblico) come variabili d'ambiente
3. Esegui `npm run prisma:deploy` per applicare le migrazioni
4. Esegui `npm run build && npm run start` (o il comando equivalente della piattaforma scelta)
