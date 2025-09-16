## Events and Registrations

This document outlines the event lifecycle, registration rules, role-based actions, and related pages.

### Key Pages

- `admin/app/pages/eventFeed.tsx`: Upcoming events listing with role-based creation button.
- `admin/app/pages/eventCreate.tsx`: Create new event; redirects to detail on persist.
- `admin/app/pages/eventEdit.tsx`: Edit existing event; persist via action.
- `admin/app/pages/eventDetail.tsx`: Event detail; registration CTA logic, admin actions, registered users and waiting list tables.
- `admin/app/pages/registrationDetail.tsx`: Registration detail with moderation actions.

### Event Detail: Registration Logic

The component `RegistrationNow` computes the current user's options based on:

- Time windows: `registrationStartDate` to `registrationEndDate`
- Capacity and waiting list: `registeredCount`, `capacity`, `waitingList`
- Paid vs free: `fee > 0`
- Audience flags: `isForCzechBuddies`, `isForESNmembers`, `isForInternationalStudents` compared with current roles
- User status: already accepted registration for this event, and payment status

Outcomes:

- If event already happened: show informational message.
- If user is already accepted:
  - If paid event and `payment = unpaid` and not on waiting list: show Payment button.
  - If on waiting list: show waiting list info.
  - Else: show already registered info.
- If not for this user's role: show not eligible message.
- If in registration window and capacity available:
  - Paid: link to `registrationPayCreate(id: $entity.id)`
  - Free: open `RegistrationCreateForm` modal.
- If capacity full but within waiting list: allow joining waiting list via `RegistrationCreateForm isOnWaitingList`.
- Otherwise: inform registration not open or full.

Data dependencies declared in `RegistrationNow` ensure required fields are loaded (dates, flags, counts, fee, registrations list with person info and payment fields).

### Admin Controls on Event Detail

- Roles allowed: `admin`, `esnMember`, `coordinator`, and the event `contactPerson` (with caveat).
- Actions:
  - Edit event (`eventEdit`) and view registration history (`registrationsLogs`).
  - Delete event via `DeleteEntityModalButton`.
  - Register user manually: `RegistrationAdminCreate` shows create modal; variant depends on fee and capacity/waiting list.

### Registered Users and Waiting List Tables

- Two `DataGrid`s scoped to accepted registrations for the event.
- Filters: query, person, allergies, dietary restrictions, age, payment status, manually registered by.
- Columns include links to `registrationDetail`, payment status tag, contact info, and timestamps.
- Waiting list grid includes an `AddToRegisteredUsersButton` to promote.

### Registration Detail Moderation

- `registrationDetail.tsx` shows a single registration with:
  - Personal info and contact
  - Waiting list flag, payment and Comgate payment ID
  - Author of manual registration and deletion metadata
- Edit and delete/unaccept actions for admins and contact persons; deletion implemented by setting `accepted = false` and linking `deletedByPerson` to current user.


