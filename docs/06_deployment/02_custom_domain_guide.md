# Register and Map a Custom Domain to GitHub Pages

This provider-neutral guide explains how to buy a domain and connect one or many GitHub Pages repositories to it. DNS control panels use different labels, but the record types and concepts are the same.

## 1. Choose a domain and registrar

1. Pick a short, memorable domain such as `example.com`.
2. Compare the initial price, renewal price, transfer policy, WHOIS privacy, DNS features, support, and account-security options—not only the first-year discount.
3. Register the domain in your own account with an email address you control.
4. Enable multi-factor authentication, registrar lock, renewal reminders, and preferably automatic renewal.
5. Keep billing and recovery details current. Save backup codes offline.

You can use the registrar's DNS service or point the domain's nameservers to a separate DNS provider. Do not change nameservers unless you intend to recreate every existing DNS record at the new provider.

## 2. Pick a URL design

GitHub Pages has two native site shapes:

- A user or organization site from a repository named `<owner>.github.io`, normally served at `https://<owner>.github.io/`.
- A project site from another repository, normally served at `https://<owner>.github.io/<repository>/`.

With custom domains, a clean pattern for several repositories is:

| Purpose | Public URL | Repository |
|---|---|---|
| Main site | `https://example.com` or `https://www.example.com` | `<owner>.github.io` or another selected Pages repository |
| Git course | `https://git.example.com` | `learn-git` |
| Portfolio | `https://portfolio.example.com` | `portfolio` |
| Product docs | `https://docs.example.com` | `product-docs` |

GitHub Pages does not natively map several project repositories to independent paths such as `example.com/repo-a` and `example.com/repo-b` under one custom domain. For one repository per website, use a subdomain per repository. A single umbrella site can instead link to each subdomain. A reverse proxy or another hosting layer is required for more advanced path-based routing.

## 3. Verify the domain with GitHub

Domain verification reduces the risk that another GitHub user can claim one of your subdomains.

1. In GitHub, open the personal account or organization settings that owns the repositories.
2. Open **Pages**, choose **Add a domain**, and enter the apex domain, for example `example.com`.
3. GitHub supplies a DNS `TXT` record with a unique name and value.
4. Add that exact `TXT` record at the DNS provider. Do not substitute your GitHub password, token, or repository secret.
5. Wait for DNS publication, then select **Verify** in GitHub.
6. Leave the verification `TXT` record in DNS after verification.

Verify the apex domain before attaching subdomains where possible; verification then protects its immediate subdomains as described by GitHub. Recheck GitHub's current verification instructions whenever ownership changes.

## 4. Map a subdomain to one repository

For `git.example.com`:

1. In the DNS control panel, add this record:

   | Type | Host/name | Target/value |
   |---|---|---|
   | `CNAME` | `git` | `<owner>.github.io` |

   Enter only the hostname as the target—no `https://`, slash, repository name, or path. Some providers require the trailing dot (`<owner>.github.io.`); most add it automatically.

2. In the target repository, open **Settings → Pages**.
3. Select the publishing source (a branch/folder or GitHub Actions, according to the repository's deployment design).
4. Under **Custom domain**, enter `git.example.com` and save.
5. GitHub normally creates or updates a `CNAME` file in a branch-based publishing source. If Actions builds the site, ensure the deployed artifact preserves the custom-domain configuration.
6. Wait until GitHub reports the DNS check as successful, then enable **Enforce HTTPS** when the option becomes available.

Repeat this process with a unique subdomain and a unique repository, for example `portfolio.example.com` and `docs.example.com`. Do not point a subdomain CNAME at `<owner>.github.io/<repository>`; DNS cannot contain URL paths.

## 5. Map the apex domain

For `example.com`, use the current GitHub Pages IP addresses from GitHub's official documentation. At the time of configuration—not from an old tutorial—create the recommended apex records:

- `A` records for GitHub Pages' published IPv4 addresses.
- Optionally, the published `AAAA` records for IPv6.

The host/name is usually `@`, blank, or the domain itself, depending on the DNS provider. Do not guess IP addresses; copy the current values from GitHub's **Managing a custom domain for your GitHub Pages site** documentation.

Then open the repository's **Settings → Pages**, set the custom domain to `example.com`, wait for the DNS check, and enable HTTPS.

Some providers support `ALIAS`, `ANAME`, or CNAME flattening at the apex. Those are provider-specific conveniences. GitHub's documented `A`/`AAAA` records are the most portable approach.

## 6. Configure `www`

Add:

| Type | Host/name | Target/value |
|---|---|---|
| `CNAME` | `www` | `<owner>.github.io` |

Set either `example.com` or `www.example.com` as the repository's custom domain. GitHub can redirect between the apex and `www` when both DNS configurations are valid. Keep only one canonical URL in site navigation, metadata, and search-engine configuration.

## 7. DNS timing and verification

DNS changes can appear within minutes but may take up to 24–48 hours because of provider publication and cached TTL values. Avoid repeatedly deleting and recreating correct records during propagation.

Check the public result from more than one network or resolver:

```bash
dig example.com A
dig example.com AAAA
dig git.example.com CNAME
dig _github-pages-challenge-OWNER.example.com TXT
```

On Windows:

```powershell
Resolve-DnsName example.com -Type A
Resolve-DnsName git.example.com -Type CNAME
Resolve-DnsName _github-pages-challenge-OWNER.example.com -Type TXT
```

Also confirm that:

- GitHub Pages shows **DNS check successful**.
- The expected repository is served at the custom URL.
- HTTP redirects to HTTPS after **Enforce HTTPS** is enabled.
- The browser certificate covers the exact hostname.
- Internal links and assets work at the production URL.

## 8. HTTPS

GitHub Pages provisions a TLS certificate after valid DNS records and a saved custom domain are detected. Certificate issuance can take time after DNS succeeds. Enable **Enforce HTTPS** once GitHub makes it available.

Do not upload private certificate keys to a repository. GitHub manages the Pages certificate. If a DNS provider offers an HTTP proxy, CDN proxy, or custom certificate mode, initially set the DNS record to DNS-only while GitHub validates and issues its certificate. Enable a proxy later only if the provider's configuration is explicitly compatible with GitHub Pages.

## 9. Troubleshooting

### DNS check fails

- Remove conflicting records for the same host. A `CNAME` cannot coexist with other record types at that exact hostname.
- Confirm the subdomain points to `<owner>.github.io`, not a repository URL.
- Confirm apex records use GitHub's current official IP addresses.
- Check for accidental spaces, quotes, `https://`, or a trailing path.
- Verify that the authoritative nameservers are the ones whose DNS zone you edited.
- Wait for the record's TTL and DNS propagation.

### Wrong repository or 404 appears

- Confirm the custom domain is saved in the intended repository's Pages settings.
- Ensure the `CNAME` file contains exactly one hostname and survives the deployment build.
- Confirm Pages deployment completed successfully.
- Check the site's base URL and asset paths, especially when changing from `/<repository>/` to `/` on a custom subdomain.
- Make sure no other repository claims the same custom domain.

### HTTPS is unavailable or the certificate is wrong

- Resolve DNS conflicts and wait for certificate issuance.
- Temporarily disable DNS/CDN proxying.
- Confirm both apex and `www` records are valid if relying on redirect behavior.
- Remove restrictive `CAA` records only after reviewing why they exist; preferably add the certificate authority authorization required by GitHub's current documentation.
- If the domain was recently moved between repositories, allow time for the old association and certificate to clear.

### Changes work on one device only

- Query an external resolver to distinguish public DNS from local cache.
- Flush the local DNS cache or test through another network.
- Check that an old hosts-file entry, VPN, or enterprise DNS policy is not overriding public DNS.

## 10. Security checklist

- Verify the custom domain in the owning GitHub account or organization and retain its `TXT` record.
- Avoid wildcard DNS records such as `*.example.com` unless there is a specific, secured need; dangling subdomains can enable takeover attempts.
- Remove DNS records before deleting or transferring the GitHub repository they target, and remove the custom domain from Pages during decommissioning.
- Require multi-factor authentication for the registrar, DNS provider, and GitHub organization.
- Use least-privilege organization roles and protect the Pages deployment environment and default branch.
- Pin third-party GitHub Actions to trusted commit SHAs and grant workflows the minimum `GITHUB_TOKEN` permissions.
- Enable HTTPS and never publish secrets, registrar credentials, API keys, or private keys.
- Keep domain renewal enabled and monitor expiration, DNS changes, Pages deployment failures, and certificate errors.
- Review DNS records periodically and delete abandoned aliases.

## 11. Recommended rollout order

1. Register and secure the domain.
2. Decide the canonical apex/`www` URL and the per-repository subdomain plan.
3. Verify the apex domain in GitHub using the supplied `TXT` record.
4. Configure and test one low-risk repository subdomain.
5. Configure the main apex and `www` site.
6. Wait for DNS checks and certificates, then enforce HTTPS.
7. Add the remaining repository subdomains in parallel.
8. Update repository READMEs and the umbrella navigation site with the new URLs.
9. Monitor deployments, renewals, DNS, and certificates.

## Official references

- [GitHub Docs: About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [GitHub Docs: Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Docs: Verifying your custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [GitHub Docs: Securing your GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [GitHub Docs: Troubleshooting custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)
