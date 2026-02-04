from uuid import uuid4

class DocumentNotFound(Exception):
    pass

class InMemoryStore:
    def __init__(self):
        self._docs: dict[str, dict] = {}

    def create(self, doc: dict) -> dict:
        doc["id"] = str(uuid4())
        self._docs[doc["id"]] = doc
        return doc

    def get(self, doc_id: str) -> dict:
        if doc_id not in self._docs:
            raise DocumentNotFound(f"Document {doc_id} not found")
        return self._docs[doc_id]

    def update(self, doc_id: str, updates: dict) -> dict:
        if doc_id not in self._docs:
            raise DocumentNotFound(f"Document {doc_id} not found")
        self._docs[doc_id].update(updates)
        return self._docs[doc_id]