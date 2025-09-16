## API Schema Reference

The API schema is defined via Contember model files under `api/model` and assembled in `api/index.ts`.

### Schema Entry

```1:8:/workspace/api/index.ts
import { createSchema, settingsPresets } from '@contember/schema-definition'
import * as model from './model'

export default createSchema(model, schema => ({
	...schema,
	settings: settingsPresets['v1.3'],
}))
```

### Models

Key exported models from `api/model/index.ts` include entities like `Person`, `Event`, `EventRegistration`, `ApplicationCz`, `ApplicationFr`, `BuddyPair`, `Note`, and more.

See the source files under `api/model/` for field-level definitions and ACL.

