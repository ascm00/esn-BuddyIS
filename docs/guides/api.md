## Working with the API Schema

The API is defined using Contember schema-definition. Entities like `Person`, `Event`, and `EventRegistration` are exported from `api/model`.

### Running migrations

```bash
yarn contember:start-engine
yarn contember migrations:execute --yes
```

### Adding a field (example)

1. Edit the corresponding model under `api/model`.
2. Run `yarn contember migrations:execute --yes`.
3. Update admin UI to surface the field if needed.

