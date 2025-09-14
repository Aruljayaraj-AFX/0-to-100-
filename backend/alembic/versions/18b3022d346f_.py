"""empty message

Revision ID: 18b3022d346f
Revises: 37e36e689f61
Create Date: 2025-09-14 19:37:27.712824

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '18b3022d346f'
down_revision: Union[str, Sequence[str], None] = '37e36e689f61'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
