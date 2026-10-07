# CI/CD Automation & Vercel Deployment Guide

This project includes fully automated **Continuous Integration (CI)** and **Continuous Deployment (CD)** pipelines powered by **GitHub Actions** and **Vercel**.

---

## 🚀 How the Pipeline Works

1. **Pull Requests (`PR`)**:
   - Triggers automated CI: verifies dependencies (`npm ci`), runs TypeScript checks (`npm run typecheck`), and tests Next.js build (`npm run build`).
   - Automatically generates an isolated **Vercel Preview URL** and posts it directly as a comment on the PR.

2. **Push to `main` (Production)**:
   - Runs full validation pipeline.
   - Deploys instantly to **Vercel Production** (`--prod`).

---

## 🛠️ Setup Instructions (One-time)

### 1. Initialize Git & Push to GitHub (if not already done)

In your terminal:
```bash
git init
git add .
git commit -m "feat: complete portfolio with automated CI/CD"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

---

### 2. Configure Vercel Secrets in GitHub

To allow GitHub Actions to deploy to your Vercel account:

1. **Get your Vercel Token**:
   - Go to [Vercel Account Tokens](https://vercel.com/account/tokens).
   - Click **Create Token**, name it (e.g. `github-actions-portfolio`), and copy the token.

2. **Get your Project & Org IDs**:
   - Link the project locally once:
     ```bash
     npx vercel link
     ```
   - This creates a `.vercel/project.json` file containing:
     - `orgId` (matches `VERCEL_ORG_ID`)
     - `projectId` (matches `VERCEL_PROJECT_ID`)

3. **Add Secrets to GitHub**:
   - In your GitHub repository, navigate to **Settings** → **Secrets and variables** → **Actions**.
   - Click **New repository secret** and add the following 3 secrets:
     - `VERCEL_TOKEN`: Your Vercel API token from Step 1
     - `VERCEL_ORG_ID`: The `orgId` from `.vercel/project.json`
     - `VERCEL_PROJECT_ID`: The `projectId` from `.vercel/project.json`

---

## 📁 Workflow Files Created

- [`.github/workflows/ci.yml`](file:///c:/abhisek/portfolio/p/.github/workflows/ci.yml): Validates lint, TypeScript typing, and Next.js builds on every push/PR with Next.js caching.
- [`.github/workflows/deploy-vercel.yml`](file:///c:/abhisek/portfolio/p/.github/workflows/deploy-vercel.yml): Handles automated preview deployments for PRs and production deployments for `main`.
