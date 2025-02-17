from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def root():
  return {'habit_id' : 2}
