# Operations and Maintenance

## Routine maintenance

- Review Git, GitHub, VS Code, OS, and Pages UI-sensitive lessons on a recorded schedule.
- Run automated validation on every pull request and main update.
- Review dependency and workflow security alerts before merging updates.
- Test key learner flows manually after navigation, content schema, or styling changes.
- Keep screenshots/illustrations versioned, accessible, licensed, and free of personal data.

## Release process

1. Confirm all required checks and manual gates.
2. Merge through review and verify the Pages deployment.
3. Create an annotated semantic-version tag for the verified commit.
4. Publish release notes covering learner-visible changes and known limitations.
5. Monitor the live site and issue tracker.

## Incidents

For an exposed secret, revoke or rotate it first, then remove current content and follow approved history-cleanup guidance. For a broken deployment, preserve logs, identify the exact commit, and use a reviewed revert or correction. For a domain incident, retain registrar access, verify DNS/account changes, and restore the last known safe records.
