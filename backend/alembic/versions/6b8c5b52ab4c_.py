"""empty message

Revision ID: 6b8c5b52ab4c
Revises: 1c1941191513
Create Date: 2025-09-14 19:31:26.978066

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6b8c5b52ab4c'
down_revision: Union[str, Sequence[str], None] = '1c1941191513'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
