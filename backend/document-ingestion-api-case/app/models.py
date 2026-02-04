from pydantic import BaseModel
from typing import Literal, Any
from datetime import datetime

DocumentStatus = Literal["pending", "processing", "completed", "failed"]

SourceType = Literal["pdf", "html", "text"]

class DocumentCreateRequest(BaseModel):
    source_type: SourceType
    content: str

Result = dict[str, Any]

class DocumentResponse(BaseModel):
    id: str
    status: DocumentStatus
    created_at: datetime
    error: str | None = None
    result: Result | None = None

class DocumentStatusResponse(BaseModel):
    id: str
    status: DocumentStatus
    