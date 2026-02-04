import asyncio
from datetime import datetime
from app.store import InMemoryStore


async def process_document(store: InMemoryStore, doc_id: str):
    """Background task to process a document."""
    try:
        # Mark as processing
        store.update(doc_id, {"status": "processing"})
        
        # Simulate processing time
        await asyncio.sleep(0.3)
        
        # Get the document to process
        doc = store.get(doc_id)
        content = doc["content"]
        
        # Fake processing: split content into chunks
        chunk_size = 200
        chunks = [content[i:i+chunk_size] for i in range(0, len(content), chunk_size)]
        
        # Update with result
        store.update(doc_id, {
            "status": "completed",
            "result": {"chunks": chunks, "char_count": len(content)}
        })
    except Exception as e:
        # Mark as failed with error
        store.update(doc_id, {"status": "failed", "error": str(e)})

def ingest_document(store: InMemoryStore, source_type: str, content: str) -> dict:
    """Ingest a new document."""
    doc = {
        "source_type": source_type,
        "content": content,
        "status": "pending",
        "created_at": datetime.utcnow(),
        "error": None,
        "result": None
    }
    
    created = store.create(doc)
    
    # Start background processing
    asyncio.create_task(process_document(store, created["id"]))
    
    return created