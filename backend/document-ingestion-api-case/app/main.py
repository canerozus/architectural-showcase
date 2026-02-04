from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from app.models import DocumentCreateRequest, DocumentResponse, DocumentStatusResponse
from app.service import ingest_document
from app.deps import get_store
from app.store import DocumentNotFound, InMemoryStore

app = FastAPI()

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.exception_handler(DocumentNotFound)
async def document_not_found_exception_handler(request, exc):
    return JSONResponse(status_code=404, content={"detail": str(exc)})

@app.post("/documents", response_model=DocumentResponse)
async def create_document(
    request: DocumentCreateRequest,
    store: InMemoryStore = Depends(get_store),
):
    created = ingest_document(store, request.source_type, request.content)
    return created

@app.get("/documents/{id}", response_model=DocumentResponse)
async def get_document(id: str, store: InMemoryStore = Depends(get_store)):
    doc = store.get(id)
    return doc

@app.get("/documents/{id}/status", response_model=DocumentStatusResponse)
async def get_document_status(id: str, store: InMemoryStore = Depends(get_store)):
    doc = store.get(id)
    return {"id": id, "status": doc["status"]}
