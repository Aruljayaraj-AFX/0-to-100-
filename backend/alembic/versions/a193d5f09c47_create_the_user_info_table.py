"""create the user_info table

Revision ID: a193d5f09c47
Revises: 07ea5ae01350
Create Date: 2025-09-13 11:09:43.135113
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'a193d5f09c47'
down_revision: Union[str, Sequence[str], None] = '07ea5ae01350'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

# Define the PostgreSQL enum type
role_enum = postgresql.ENUM('ADMIN', 'USER', name='roleenum')


def upgrade() -> None:
    # Create enum type in DB first
    role_enum.create(op.get_bind(), checkfirst=True)

    # Alter column to use the enum type
    op.alter_column(
        'users_info', 'role',
        existing_type=sa.VARCHAR(length=50),
        type_=role_enum,
        existing_nullable=False,
        postgresql_using='role::roleenum'
    )


def downgrade() -> None:
    # Alter column back to VARCHAR
    op.alter_column(
        'users_info', 'role',
        existing_type=role_enum,
        type_=sa.VARCHAR(length=50),
        existing_nullable=False
    )

    # Drop the enum type from DB
    role_enum.drop(op.get_bind(), checkfirst=True)
