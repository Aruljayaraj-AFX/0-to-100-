"""empty message

Revision ID: 1c1941191513
Revises: 0ae36ab51d72
Create Date: 2025-09-14 19:16:19.756677

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1c1941191513'
down_revision: Union[str, Sequence[str], None] = '0ae36ab51d72'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
