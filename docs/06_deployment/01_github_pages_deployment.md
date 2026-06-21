# GitHub Pages Deployment

## Intended pipeline

```text
Pull request → validation check → reviewed merge to main
→ Pages workflow → artifact → production environment → public verification
```

The workflow under `.github/workflows/` will use least-privilege Pages permissions, upload only required static files, and deploy from the protected default branch.

## Repository configuration

1. Push the repository to GitHub.
2. Open repository Settings, then Pages.
3. Select GitHub Actions as the source when using the included workflow.
4. Run the workflow and inspect every failed step before retrying.
5. Open the deployment URL and verify navigation, assets, console, keyboard behavior, and the deployed commit.

## Project-site paths

The normal URL is `https://<user>.github.io/<repository>/`. Application links and assets therefore use relative paths. Exact filename letter case must match the repository.

## Release and rollback

Tag only a verified deployment. If production is faulty, revert the bad commit through a reviewed pull request or redeploy a known approved commit according to repository policy; do not rewrite shared main history.
