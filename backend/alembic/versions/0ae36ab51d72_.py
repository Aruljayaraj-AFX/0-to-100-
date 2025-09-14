"""empty message

Revision ID: 0ae36ab51d72
Revises: e6d3fa910a3b
Create Date: 2025-09-14 18:38:48.969769

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0ae36ab51d72'
down_revision: Union[str, Sequence[str], None] = 'e6d3fa910a3b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
