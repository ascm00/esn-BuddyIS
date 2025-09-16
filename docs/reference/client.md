## Client SDK Reference

### `queryBuilder: TypedContentQueryBuilder<ContemberClientSchema>`
- From: `client/src/index.ts`
- Use to build type-safe content queries.

Example:

```ts
import { queryBuilder } from '@buddy-is/client'

const people = await queryBuilder.content('Person', ({ select }) =>
  select({ id: true, fullName: true })
)
```

### Types

- `ContemberClientSchema`: Generated schema type
- `FragmentOf<EntityName, Data>`: Typed fragment alias
- `FragmentType<T>`: Extract fields from a fragment selection

```ts
import type { FragmentOf, FragmentType } from '@buddy-is/client'

type PersonFragment = FragmentOf<'Person', { id: true; fullName: true }>
type PersonData = FragmentType<PersonFragment>
```

### Rich Text Helpers

From `client/src/rich-text`:

- `renderLeafToHTML(leaf: Leaf): string`
- `renderElementToHTML(element: RichTextElement, renderLeaf: HTMLLeafRenderer): string`
- Type guards: `isElement`, `isLeaf`

