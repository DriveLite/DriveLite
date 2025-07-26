# DriveLite - Open source google drive alternative

DriveLite is a fast, minimalist and privacy-focused file storage app.
Self-host it or use our free cloud instance with encryption, sharing and sync.

## Features

- End-to-end AES256 encryption
- Folder structure , previews & drag-drop uuploads
- Upload & download files at blazing speed
- File sharing with expiration and permissions
- Works with any S3-copatible backend (MinIO, Wasabi, etc.)
- One-command self-hosting with Docker
- Option zero-trust mode (client-side encryption)

## Tach Stack

- **Frontend**: Next.js + TailwindCSS + TypeScript
- **Backend**: Go (Chi router) + PostgreSQL
- **Storage**: MinIO (or any S3-compatible service)

## Self-Host in 1 Minute

```bash
git clone https://github.com/Moukhtar-youssef/DriveLite.git
cd DriveLite
cp .env.example .env
docker-compose up --build -d
```

then visit http://localhost:3000 and create an account

## Contributing

- Star the repo
- Open issues and pull requests

## License

MIT - free for personal and commercial use
