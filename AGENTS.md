# Project architecture rules

- Protect all administration operations with authenticated sessions and server-side `user_roles` checks; shared client-side access codes are only allowed for one-time first-admin provisioning.
- Route application edits, deletion, and bulk imports through the protected administration function so privileged writes are always checked server-side.
- Keep private casting data separate from public recruitment and legacy casting; the casting-workspace function validates event membership and user_roles on every action, and service-only tables prevent direct API bypass.
- Store casting calculation and validation rules in a shared pure module consumed by the private function and UI so scores and recommendations remain identical.
- Render the French private casting workspace independently of the public layout; both /casting and /admin/casting share it so jury invitations and existing admin links reach the same protected experience.
- Reception can edit only event-linked person records; global administrators control cross-event reuse of shared persons to avoid leaking personal data across memberships.
- Import received applications through an admin-only transactional casting RPC with a unique event/source key; retain original recruitment records and resolve their attachments server-side so jury scoring remains independent of automatic recruitment scores.