# LoTUS-BF — improved homework version

Changes from provided project:
1. Fixed responsive layout: NIfTI viewer no longer clips outside the browser width.
2. Added clickable Boolean/MNI example queries in Query Builder.
3. Fixed database URL configuration: `DB_URL` / `DATABASE_URL` must be provided as an environment variable.
4. Adapted `/terms` to the `ns.annotations_terms` sparse table created in the previous Neurosynth homework (instead of optional `ns.annotations_json`).
5. Serve the React production build and Flask API from a **single Render Web Service**.

## Local development (two terminals)

Terminal A:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export DB_URL='YOUR_EXTERNAL_DATABASE_URL' # never commit actual credentials
flask --app app run --port 5000
```

Terminal B:
```bash
npm ci
npm run dev
```

Visit `http://localhost:3000/lotus-bf/`. Vite proxies `/terms` and `/query` to the *local* Flask service; do not use the instructor's remote backend.

## Render deployment (recommended, single Docker web service)

1. Upload the project to **a new GitHub repository** (do not replace your working `ns-nano` repository). Do not upload `node_modules` or secrets.
2. Render **New > Web Service > GitHub repository**; select **Docker** as the runtime, **Free** plan, and a region matching your existing PostgreSQL database. The repository includes a multistage `Dockerfile` that builds the frontend and starts Flask.
3. Under **Environment** set **`DB_URL`** to the **Internal Database URL** copied from your existing Render PostgreSQL instance. Do not put credentials in source control.
4. Deploy and verify the website URL `https://<service>.onrender.com/lotus-bf/` and API endpoints `https://<service>.onrender.com/terms`, `/query/memory/studies`, `/query/memory/nii`.

Optional native build (if Docker is unavailable): set Render runtime Python, build command `bash build.sh`, and start command `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --timeout 120`. This requires Node.js to be available in the build environment.

### Why the supplied version showed HTTP 500

The original Flask app used a hardcoded placeholder DB URL, and `/terms` referenced the optional table `ns.annotations_json`. The previous homework's `create_db.py` creates `ns.annotations_terms` by default; `annotations_json` is optional. Both issues were corrected here.

## Homework submission
Submit the deployed URL and this whole project as ZIP **excluding** `node_modules`, `dist`, `.venv`, `.env` and secrets. Both frontend and backend source code are included.

## Scope
The app uses the existing `ns.metadata`, `ns.coordinates`, and `ns.annotations_terms` tables from the prior Neurosynth assignment. It does not need to create or repopulate the database. The existing code uses PostgreSQL FTS for article matches and 6 mm MNI coordinate proximity for location searches; these semantics are intentionally retained.
