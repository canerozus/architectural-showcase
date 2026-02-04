from app.store import InMemoryStore

_store = InMemoryStore()

def get_store():
    return _store
