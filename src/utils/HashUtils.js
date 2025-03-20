import crypto from 'crypto';

function generateHash(value) {
    return crypto.createHash('sha1').update(value).digest('hex');
}

export { generateHash };
