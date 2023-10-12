import unittest
from collections import namedtuple

from server.src.infrastructure.auth_middleware import token_required

Request = namedtuple("Request", ["headers"])


class TestTokenRequiredDecorator(unittest.TestCase):

    def setUp(self):
        self.secret_key = "supersecret"
        self.request = Request(headers={})
        self.get_user_by_id = ()

    def test_missing_token(self):
        @token_required(secret_key=self.secret_key, request=self.request, get_user_by_id=self.get_user_by_id)
        def dummy_function(current_user):
            return "Success"

        response, status_code = dummy_function()
        self.assertEqual(status_code, 401)
        self.assertEqual(response["message"], "Authentication Token is missing!")

    def test_invalid_token(self):
        self.request = Request({'Authorization': 'Bearer invalid_token'})

        @token_required(secret_key=self.secret_key, request=self.request, get_user_by_id=self.get_user_by_id)
        def dummy_function():
            return "Success"

        response, status_code = dummy_function()
        self.assertEqual(status_code, 500)
        self.assertEqual(response["message"], "Something went wrong")


if __name__ == "__main__":
    unittest.main()
