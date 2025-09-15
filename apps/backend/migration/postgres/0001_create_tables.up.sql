CREATE TABLE IF NOT EXISTS users(
  user_id BIGSERIAL PRIMARY KEY,
  encrypted_email BYTEA  NOT NULL,
	email_nonce BYTEA NOT NULL,
	encrypted_email_hash TEXT UNIQUE NOT NULL,
  name_encrypted BYTEA,
	name_nonce BYTEA,
  creation_time BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS users_email_index ON users(encrypted_email_hash);

CREATE TABLE IF NOT EXISTS key_attributes (
	user_id BIGINT PRIMARY KEY,
	kek_salt BYTEA NOT NULL,

	master_key_encrypted BYTEA NOT NULL,
	master_key_nonce BYTEA NOT NULL,

	master_key_encrypted_with_recovery_key BYTEA NOT NULL,
	master_key_encrypted_with_recovery_key_nonce BYTEA NOT NULL,

	recovery_key_encrypted_with_master_key BYTEA NOT NULL,
	recovery_key_nonce BYTEA NOT NULL,

	public_key BYTEA NOT NULL,

	encrypted_secret_key BYTEA NOT NULL,
	secret_key_nonce BYTEA NOT NULL,

	memory_limit BIGINT DEFAULT 67108864,
	operations_limit INTEGER DEFAULT 2,
	CONSTRAINT fk_key_attributes_user_id 
		FOREIGN KEY(user_id) 
			REFERENCES users(user_id)
			ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tokens (
	user_id BIGINT NOT NULL,
	token TEXT UNIQUE NOT NULL,
	ip TEXT NOT NULL,
	agent TEXT,
	creation_time BIGINT NOT NULL,
	expiration_time BIGINT NOT NULL,
	CONSTRAINT fk_tokens_user_id 
		FOREIGN KEY(user_id) 
			REFERENCES users(user_id)
			ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS tokens_user_id_index ON tokens (user_id);