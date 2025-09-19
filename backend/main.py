from fastapi import FastAPI
from routers.users import router
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware


app=FastAPI()

app.include_router(router,prefix="/0TO100/v1/users",tags=["users"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.add_middleware(
    SessionMiddleware,
    secret_key="your_super_secret_key_here"
)

if __name__=="__main__":
    uvicorn.run(app,host="127.0.0.1",port=8001)