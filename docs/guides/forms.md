## Forms: Inputs, Textareas, Checkboxes, Radios

### `InputField`

Renders a labeled text input bound to a field.

Props:

- `field`: string path to the field
- `label`: ReactNode
- `description`: ReactNode
- `defaultValue?`: string
- `isNonbearing?`: boolean
- `required?`: boolean – passed to the input element
- `inputProps?`: props for the underlying `Input`

Example:

```tsx
import { InputField } from '@buddy-is/admin/lib/form'

<InputField field="email" label="Email" required inputProps={{ type: 'email', placeholder: 'you@example.com' }} />
```

### `TextareaField`

Auto-resizing textarea bound to a field.

Key props: same as `InputField`, plus `inputProps` for `TextareaAutosize`.

```tsx
<TextareaField field="bio" label="Bio" inputProps={{ minRows: 3 }} />
```

### `CheckboxField`

Boolean checkbox with label.

```tsx
<CheckboxField field="isActive" label="Active" />
```

### `RadioEnumField`

Render radio options from a key→label map.

Props:

- `options`: Record<string, ReactNode>
- `orientation?`: 'horizontal' | 'vertical'

```tsx
<RadioEnumField field="sex" label="Sex" orientation="horizontal" options={{ male: 'Male', female: 'Female', other: 'Other' }} />
```

