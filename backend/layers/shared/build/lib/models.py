"""
Models for all records in the DynamoDB table.
"""
import dataclasses
from datetime import datetime
from enum import Enum
from typing import Any, Literal, Union


class RecordType(str, Enum):
    """Enum for record types in the DynamoDB table."""

    INTERVIEW = "INTERVIEW"


@dataclasses.dataclass(kw_only=True)
class BaseRecord:
    """Base model for all DynamoDB records."""

    partition_key: str
    sort_key: str

    def __post_init__(self) -> None:
        """Post-initialization hook to set updated_at."""
        self.updated_at = int(datetime.now().timestamp() * 1000)

    def to_dynamodb_item(self) -> dict[str, Any]:
        """Convert the model to a DynamoDB item."""
        result = {}
        for field in dataclasses.fields(self):
            value = getattr(self, field.name)
            if value is not None:
                result[field.name] = value
        return result

    @classmethod
    def from_dynamodb_item(cls, item: dict[str, Any]) -> "BaseRecord":
        """Create a model instance from a DynamoDB item."""
        # Filter out any keys that aren't in the dataclass fields
        field_names = {f.name for f in dataclasses.fields(cls)}
        filtered_item = {k: v for k, v in item.items() if k in field_names}
        return cls(**filtered_item)


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

    def __post_init__(self) -> None:
        """Post-initialization hook to set partition_key if not provided."""
        super().__post_init__()

        # Set partition_key if not provided
        if not getattr(self, "partition_key", None):
            # prefix partition key with user identifier
            self.partition_key = f"USER#{self.user_id}#INTERVIEW#{self.interview_id}"

        # Set sort_key if not provided
        if not getattr(self, "sort_key", None):
            # Use "0" as a default sort key for user records
            self.sort_key = str(self.updated_at)


# Type alias for all possible record types
TuCoachAiRecord = Union[InterviewRecord,]
