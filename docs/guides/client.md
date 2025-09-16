## Client SDK Usage

### Querying content

```ts
import { queryBuilder } from '@buddy-is/client'

const registrations = await queryBuilder.content('EventRegistration', ({ select, where }) =>
  select({
    id: true,
    person: { fullName: true, email: true },
    event: { name: true, start: true },
    status: true,
  }).where(where.compare('status', 'in', ['approved', 'pending']))
)
```

### Fragments

```ts
import type { FragmentOf, FragmentType } from '@buddy-is/client'

type PersonFrag = FragmentOf<'Person', { id: true; fullName: true }>

declare const personSelection: PersonFrag
type PersonData = FragmentType<typeof personSelection>
```

