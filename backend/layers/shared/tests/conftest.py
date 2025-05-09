import os

import pytest


@pytest.fixture(autouse=True)
def setup_test_environment():
    """Set up environment variables for tests."""
    # Store original environment variables
    original_env = os.environ.copy()

    # Set test environment variables

    yield

    # Restore original environment variables
    os.environ.clear()
    os.environ.update(original_env)
