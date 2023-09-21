import hashlib
import secrets
from dataclasses import dataclass
from datetime import datetime
from typing import Any


@dataclass
class TravelAgent:
    name: str
    email: str
    password_hash: str
    phone_number: str
    company: str
    date_of_birth: datetime
    date_joined: datetime

    def set_password(self, password: str):
        salt = secrets.token_hex(16)

        password_salt_combo = password + salt
        hashed_password = hashlib.sha256(password_salt_combo.encode()).hexdigest()

        self.password_hash = f"{salt}:{hashed_password}"

    def check_password(self, password: str):
        stored_salt, stored_hashed_password = self.password_hash.split(":")

        input_password_salt_combo = password + stored_salt
        input_hashed_password = hashlib.sha256(input_password_salt_combo.encode()).hexdigest()

        if input_hashed_password != stored_hashed_password:
            raise ValueError("Incorrect password")

    def __post_init__(self):
        for field_name, field_value in self.__dict__.items():
            _validate_not_empty(field_value, field_name)


def _validate_not_empty(value: Any, field_name: str) -> Any:
    if value is None or (isinstance(value, (str, list, tuple, dict)) and not value):
        raise ValueError(f"'{field_name}' cannot be empty or None.")

    return value
