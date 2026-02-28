# Frontend
npm install
npm run dev
#  Backend (Windows)
cd backend/iit_bombay_ai
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
