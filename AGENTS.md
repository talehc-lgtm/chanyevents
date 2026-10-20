# Project architecture rules

- Protect all administration operations with authenticated sessions and server-side `user_roles` checks; shared client-side access codes are only allowed for one-time first-admin provisioning.
- Route application edits, deletion, and bulk imports through the protected administration function so privileged writes are always checked server-side.
- Keep private casting data separate from public recruitment and legacy casting; the casting-workspace function validates event membership and user_roles on every action, and service-only tables prevent direct API bypass.
- Store casting calculation and validation rules in a shared pure module consumed by the private function and UI so scores and recommendations remain identical.