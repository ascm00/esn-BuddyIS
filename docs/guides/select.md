## Select Components

### `SelectField`

Single-value relation picker.

Props include `field`, `label`, `description`, `options`, `queryField`, `placeholder`, `createNewForm`, `initialSorting`.

```tsx
<SelectField
  field="person.gender"
  label="Gender"
  options={{ entity: 'Gender' }}
  queryField={['name']}
  placeholder="Pick gender"
/>
```

### `MultiSelectField`

Many-value relation picker.

```tsx
<MultiSelectField
  field="person.hobbies"
  label="Hobbies"
  options={{ entity: 'Hobby' }}
  queryField={[{ field: 'name', mode: 'contains' }]}
>
  {({ name }) => name}
</MultiSelectField>
```

### `SortableMultiSelectField`

Like `MultiSelectField` plus drag-and-drop ordering.

```tsx
<SortableMultiSelectField
  field="person.hobbies"
  label="Hobbies (ordered)"
  options={{ entity: 'Hobby' }}
  sortableBy="order"
/>
```

### `SelectEnumField`

Select a string enum value via popover list.

```tsx
<SelectEnumField
  field="registration.status"
  label="Status"
  options={{ pending: 'Pending', approved: 'Approved', rejected: 'Rejected' }}
  placeholder="Choose..."
/>
```

