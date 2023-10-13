import unittest
from collections import namedtuple
from http import HTTPStatus

import jwt

from server.src.infrastructure.auth_middleware import token_required

Request = namedtuple("Request", ["headers"])


class TestTokenRequiredDecorator(unittest.TestCase):
    def setUp(self):
        self.secret_key = "supersecret"
        self.request = Request(headers={})
        self.get_user_by_id = lambda user_id: None

    def test_valid_token(self):
        payload = {
            "user_id": "1",
        }
        token = jwt.encode(payload, self.secret_key, algorithm="HS256")
        self.get_user_by_id = lambda user_id: {"user_id": user_id}
        self.request = Request({'Authorization': f'Bearer {token}'})

        @token_required(secret_key=self.secret_key, request=self.request, get_user_by_id=self.get_user_by_id)
        def dummy_function(current_user):
            return "Success"

        response = dummy_function()
        self.assertEqual(response, "Success")

    def test_missing_token(self):
        @token_required(secret_key=self.secret_key, request=self.request, get_user_by_id=self.get_user_by_id)
        def dummy_function(current_user):
            return "Success"

        response, status_code = dummy_function()
        self.assertEqual(status_code, HTTPStatus.UNAUTHORIZED)
        self.assertEqual(response["message"], "Authentication Token is missing!")

    def test_semantically_token_with_wrong_data(self):
        payload = {
            "user_id": "1",
        }
        token = jwt.encode(payload, self.secret_key, algorithm="HS256")
        self.request = Request({'Authorization': f'Bearer {token}'})

        @token_required(secret_key=self.secret_key, request=self.request, get_user_by_id=self.get_user_by_id)
        def dummy_function():
            return "Success"

        response, status_code = dummy_function()
        self.assertEqual(status_code, HTTPStatus.NOT_FOUND)
        self.assertEqual(response["message"], "Invalid Authentication token!")

    def test_generic_error(self):
        self.request = Request({'Authorization': 'Bearer invalid_token'})

        @token_required(secret_key=self.secret_key, request=self.request, get_user_by_id=self.get_user_by_id)
        def dummy_function():
            return "Success"

        response, status_code = dummy_function()
        self.assertEqual(status_code, HTTPStatus.INTERNAL_SERVER_ERROR)
        self.assertEqual(response["message"], "Something went wrong")


if __name__ == "__main__":
    unittest.main()
