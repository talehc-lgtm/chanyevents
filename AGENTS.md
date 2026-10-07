# Project architecture rules

- Protect all administration operations with authenticated sessions and server-side `user_roles` checks; shared client-side access codes are only allowed for one-time first-admin provisioning.
- Route application edits, deletion, and bulk imports through the protected administration function so privileged writes are always checked server-side.