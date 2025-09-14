from fastapi import FastAPI
from routers.users import router
import uvicorn


app=FastAPI()

app.include_router(router,prefix="/0TO100/v1/users",tags=["users"])

if __name__=="__main__":
    uvicorn.run(app,host="127.0.0.1",port=8001)