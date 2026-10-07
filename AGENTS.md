# Project architecture rules

- Protect all administration operations with authenticated sessions and server-side `user_roles` checks; shared client-side access codes are only allowed for one-time first-admin provisioning.