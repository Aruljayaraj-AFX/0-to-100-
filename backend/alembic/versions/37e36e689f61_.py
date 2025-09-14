"""empty message

Revision ID: 37e36e689f61
Revises: ad0cefeaf40d
Create Date: 2025-09-14 19:37:10.601195

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '37e36e689f61'
down_revision: Union[str, Sequence[str], None] = 'ad0cefeaf40d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
