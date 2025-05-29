"""
Models for all records in the DynamoDB table.
"""

import dataclasses
from dataclasses import field
from datetime import datetime
from enum import Enum
from typing import Any, Literal, Union


class RecordType(str, Enum):
    """Enum for record types in the DynamoDB table."""

    INTERVIEW = "INTERVIEW"
    CHAT_HISTORY = "CHAT_HISTORY"


@dataclasses.dataclass(kw_only=True)
class BaseRecord:
    """Base model for all DynamoDB records."""

    def to_dynamodb_item(self) -> dict[str, Any]:
        """Convert the model to a DynamoDB item."""
        result = {}
        for f in dataclasses.fields(self):
            value = getattr(self, f.name)
            if value is not None:
                result[f.name] = value
        return result

    @classmethod
    def from_dynamodb_item(cls, item: dict[str, Any]) -> "TuCoachAiRecord":
        """Create a model instance from a DynamoDB item."""
        # Filter out any keys that aren't in the dataclass fields
        field_names = {f.name for f in dataclasses.fields(cls)}
        filtered_item = {k: v for k, v in item.items() if k in field_names}
        return cls(**filtered_item)  # type: ignore


@dataclasses.dataclass(kw_only=True)
class InterviewRecord(BaseRecord):
    """Model for interview records in DynamoDB."""

    user_id: str
    interview_id: str
    role: Literal["backend", "frontend", "devops"]
    seniority: Literal["junior", "senior", "techlead", "architect"]
    created_at: int = dataclasses.field(default_factory=lambda: int(datetime.now().timestamp() * 1000))
    updated_at: int = dataclasses.field(default_factory=lambda: int(datetime.now().timestamp() * 1000))
    record_type: RecordType = dataclasses.field(default=RecordType.INTERVIEW)
    partition_key: str = field(init=False)
    sort_key: str = field(init=False)

    def __init__(self, **kwargs: dict[str, Any]):
        super().__init__()
        for k, v in kwargs.items():
            setattr(self, k, v)

        # Set created_at if not provided.
        if not getattr(self, "created_at", None):
            self.created_at = int(datetime.now().timestamp() * 1000)

        # Set updated_at if not provided
        if not getattr(self, "updated_at", None):
            self.updated_at = int(datetime.now().timestamp() * 1000)

        # Set partition_key if not provided
        if not getattr(self, "partition_key", None):
            # prefix partition key with user identifier
            self.partition_key = f"USER#{self.user_id}#INTERVIEW#{self.interview_id}"

        # Set sort_key if not provided
        if not getattr(self, "sort_key", None):
            self.sort_key = str(self.updated_at)


@dataclasses.dataclass(kw_only=True)
class ChatHistoryRecord(BaseRecord):
    """Model for chat history records in DynamoDB."""

    interview_id: str
    timestamp: int = dataclasses.field(default_factory=lambda: int(datetime.now().timestamp() * 1000))
    pydantic_ai_history: str
    record_type: RecordType = dataclasses.field(default=RecordType.CHAT_HISTORY)
    partition_key: str = field(init=False)
    sort_key: str = field(init=False)

    def __init__(self, **kwargs: dict[str, Any]):
        super().__init__()
        for k, v in kwargs.items():
            setattr(self, k, v)

        # Set timestamp if not provided
        if not getattr(self, "timestamp", None):
            self.timestamp = int(datetime.now().timestamp() * 1000)

        # Set partition_key if not provided
        if not getattr(self, "partition_key", None):
            self.partition_key = f"CHAT_HISTORY#{self.interview_id}"

        # Set sort_key if not provided
        if not getattr(self, "sort_key", None):
            self.sort_key = f"TIMESTAMP#{self.timestamp}"


# Type alias for all possible record types
TuCoachAiRecord = Union[InterviewRecord, ChatHistoryRecord,]
