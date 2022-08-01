# 仕様

## モデル
- users
  - id
  - email
  - name
  - role: admin, general
- tasks
  - id
  - user_id: users.user_id
  - title
  - status