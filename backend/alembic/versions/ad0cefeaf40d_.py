"""empty message

Revision ID: ad0cefeaf40d
Revises: 6b8c5b52ab4c
Create Date: 2025-09-14 19:32:58.001809

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ad0cefeaf40d'
down_revision: Union[str, Sequence[str], None] = '6b8c5b52ab4c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
