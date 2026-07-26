# Visit PNG

Visit PNG is a mobile-first travel app for discovering places, saving favourites, planning trips, managing membership benefits, making practice bookings, and sharing reviews.

The app now runs entirely on the Visit PNG server. Visitors create an account with their name, email address, and password. Account sessions and all app records are stored in one local database file.

## Run locally

1. Install Node.js 22.13 or newer.
2. Copy `.env.example` to `.env` if you want to change the database location.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Check before release

Run:

```sh
npm test
```

## Run on a Hostinger VPS

The simplest option is Docker:

```sh
git clone https://github.com/LawrenceMukombo/visitpng.git
cd visitpng
docker compose up -d --build
```

The app listens on port 3000. Point the website address in Hostinger to port 3000 and enable HTTPS. The database is kept in the `visitpng-data` volume, so it remains available when the app is updated.

Without Docker, install Node.js 22.13 or newer, then run:

```sh
npm install
npm run build
DATABASE_PATH=/var/lib/visitpng/visitpng.db npm start
```

Keep `/var/lib/visitpng` in your server backups. Use a service manager so the app starts again after a server restart.

## Data

Catalogue records are added from the database when it is first used. They are clearly marked as sample records for testing. App pages do not keep their own hidden lists of places.
