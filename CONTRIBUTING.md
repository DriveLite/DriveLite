# 🤝 Contributing to DriveLite

First off, thank you for considering contributing to **DriveLite** – your support helps make this open-source Google Drive alternative better for everyone!

This project is built with **Golang**, **Next.js**, and **MinIO/S3**, focused on privacy-first file storage and modern user experience.

---

## 🧭 Quick Navigation

- [Code of Conduct](#-code-of-conduct)
- [How to Contribute](#-how-to-contribute)
- [Setup Guide](#-local-development)
- [Branching & PR](#-branching-guidelines)
- [Commit Style](#-commit-convention)
- [Reporting Issues](#-bug-reports--feature-requests)
- [Community](#-community--discussions)

---

## 📜 Code of Conduct

Please review our [Code of Conduct](./CODE_OF_CONDUCT.md). We expect all contributors to foster a respectful and inclusive environment.

---

## 🛠 How to Contribute

You can contribute by:

- 🐛 Reporting bugs
- ✨ Suggesting new features
- 🧪 Writing tests
- 🎨 Improving the UI/UX
- 📚 Updating documentation
- 🌍 Translating the interface

---

## 💻 Local Development

```bash
# Backend (Go)
cd backend
go run ./cmd/api

# Frontend (Next.js)
cd frontend
npm install
npm run dev
```

> Requirements: Go 1.22+, Node.js 18+

---

## 🌿 Branching Guidelines

- `main` → production-ready
- `dev` → staging/development
- Feature branches: `feature/your-feature`
- Bugfix branches: `fix/bug-description`

---

## ✍️ Commit Convention (Conventional Commits)

Please use [Conventional Commits](https://www.conventionalcommits.org):

```
feat: add drag-and-drop uploads
fix: handle token rotation bug
docs: update README for Docker
```

It helps with automation, changelogs, and semantic versioning.

---

## 🐞 Bug Reports & Feature Requests

Before opening a new issue, check existing ones.

### If reporting a bug:

- Describe expected vs actual behavior
- Include environment info (OS, browser, backend version)
- Steps to reproduce
- Logs or screenshots (if possible)

### If suggesting a feature:

- Describe what the feature does
- Explain why it's needed or useful
- List alternatives considered (if any)

---

## 🧑‍💻 Code Style

- Go: Run `go fmt ./...` and `golangci-lint`
- TypeScript/JS: Run `eslint .` and `prettier --check .`

---

## 🧪 Tests

- Backend: `go test ./...`
- Frontend: `npm run test`

> If your PR includes logic changes, add or update tests.

---

## 💬 Community & Discussions

- Open a [GitHub Discussion](https://github.com/YOUR_ORG/YOUR_REPO/discussions)
- Join our Discord (Coming Soon)
- Tag maintainers in issues respectfully if needed

---

## 🙌 Thank You

Every PR, issue, and comment matters — thank you for helping DriveLite grow.

_– The DriveLite Maintainers_
