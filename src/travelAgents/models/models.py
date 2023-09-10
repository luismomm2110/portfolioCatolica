import hashlib
import secrets
from dataclasses import dataclass
from datetime import datetime


@dataclass
class TravelAgent:
    user_id: int
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

    def check_password(self, password: str) -> bool:
        stored_salt, stored_hashed_password = self.password_hash.split(":")

        input_password_salt_combo = password + stored_salt
        input_hashed_password = hashlib.sha256(input_password_salt_combo.encode()).hexdigest()

        return input_hashed_password == stored_hashed_password
