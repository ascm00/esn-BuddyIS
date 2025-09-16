## Buddy Pairing

Automated matching pairs local (Czech) students with international students for the current semester.

### Key Files

- Algorithm and helpers: `admin/pairing/buddyPairing.ts`
- Automatic pairing UI: `admin/app/pages/automaticPairing.tsx`
- Buddy pairs listing: `admin/app/pages/buddyPairs.tsx`
- Buddy pair detail and management: `admin/app/pages/buddyPairDetail.tsx`
- Manual creation: `admin/app/pages/buddyPairCreate.tsx`

### Algorithm Overview (Gale–Shapley, Czech-first)

`galeShapleyCzechFirst(czechStudents, internationalStudents)` implements a two-phase stable matching with modifications:

1) Build preference lists for both sides
   - For internationals: prefer Czech students matching study program, then gender preference
   - For Czechs: multiple criteria in order:
     - Study program compatibility
     - Czech's preferred sex
     - International's preferred buddy sex matching Czech's gender
     - Preferred country of university
     - Number of common languages

2) Phase 1: Ensure each Czech student gets at most one international student (proposers are Czechs), respecting `howManyBuddies` cap via assignment map.

3) Phase 2: Assign remaining internationals to Czechs who have remaining capacity according to international preferences.

Returns:

- `finalPairs`: Map of International -> Czech
- `unpairedCzechStudents`: list of Czechs without assignment

Important helpers:

- `getAssignedBuddiesCount`, `getMaxBuddiesCount` read capacity (`howManyBuddies`) and current assigned count (`howManyBuddiesAssigned.number`).
- `preparePreferencesForCzech` and `preparePreferencesForInternational` produce sorted preference arrays per student.

### Automatic Pairing UI Flow

On `automaticPairing.tsx` (admins only):

- Loads current semester, eligible `ApplicationCz` and `ApplicationFr` with necessary fields, and `BuddyPair` list to populate.
- Clicking “Start automatic pairing” runs `galeShapleyCzechFirst` and constructs `BuddyPair` entities:
  - Connects `czechStudent`, `internationalStudent`, and `semester`
  - Creates default `BuddyTask` items from `buddyPairTasks`
  - Updates `ApplicationFr.status` to `paired`
- Displays streaming-like log messages for transparency.
- After pairing ends, shows “Save buddy pairs” which persists all staged pairs (`PersistButton`) and redirects to `buddyPairs`.

### Managing Buddy Pairs

- `buddyPairs.tsx` shows a filterable grid with coordinator, study program, country, and 10-points flag. Supports manual creation.
- `buddyPairDetail.tsx` allows admins/coordinators to:
  - Unpair (deletes pair and sets international `applicationsFr.status` back to `toBePaired`)
  - Edit pair (coordinator etc.)
  - Toggle `tenPoints`, set `arrival`, view image
  - Track tasks (`done`, `confirmed`)
  - Add and view notes with authorship


