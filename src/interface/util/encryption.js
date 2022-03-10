const crypto = require('crypto');

const IV_LENGTH = 16;

class Encrypt {
  constructor({ config }) {
    this.config = config;
  }

  async encrypt(plainText) {
    const iv = crypto.randomBytes(IV_LENGTH);

    const key =
      process.env.ENCRYPTION_KEY || this.config.get('app.encryptionKey');

    const cipher = crypto.createCipheriv('AES-256-GCM', Buffer.from(key), iv);

    const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);

    const authTag = cipher.getAuthTag().toString('hex');

    return `${iv.toString('hex')}_${encrypted.toString('hex')}_${authTag}`;
  }

  async decrypt(cipherText) {
    const textParts = cipherText.split('_');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const key =
      process.env.ENCRYPTION_KEY || this.config.get('app.encryptionKey');

    const encryptedText = Buffer.from(textParts.shift(), 'hex');
    const authTag = Buffer.from(textParts.shift(), 'hex');

    const decipher = crypto.createDecipheriv(
      'AES-256-GCM',
      Buffer.from(key),
      iv
    );
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);
    return decrypted.toString();
  }
}

module.exports = Encrypt;
