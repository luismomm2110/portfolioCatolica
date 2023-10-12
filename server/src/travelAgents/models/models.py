import hashlib
import secrets
from dataclasses import dataclass
from datetime import datetime
from typing import Any


@dataclass
class TravelAgent:
    _id: str
    name: str
    email: str
    password: str
    phone_number: str
    date_joined: datetime

    def check_password(self, password: str):
        stored_salt, stored_hashed_password = self.password.split(":")

        input_password_salt_combo = password + stored_salt
        input_hashed_password = hashlib.sha256(input_password_salt_combo.encode()).hexdigest()

        if input_hashed_password != stored_hashed_password:
            raise ValueError("Incorrect password")

        return True

    def __post_init__(self):
        for field_name, field_value in self.__dict__.items():
            _validate_not_empty(field_value, field_name)
            if field_name == "_id":
                self._id = str(field_value)


def _validate_not_empty(value: Any, field_name: str) -> Any:
    if value is None or (isinstance(value, (str, list, tuple, dict)) and not value):
        raise ValueError(f"'{field_name}' cannot be empty or None.")

    return value
def set_password(password: str):
    salt = secrets.token_hex(16)

    password_salt_combo = password + salt
    hashed_password = hashlib.sha256(password_salt_combo.encode()).hexdigest()

    return f"{salt}:{hashed_password}"
