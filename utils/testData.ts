function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable ${name}. Copy .env.example to .env and fill it in.`);
    }
    return value;
}

export const validUser = {
    email: requireEnv('EVENTHUB_EMAIL'),
    password: requireEnv('EVENTHUB_PASSWORD'),
};

export function uniqueEmail(): string {
    return `test.${Date.now()}.${Math.floor(Math.random() * 1000)}@example.com`;
}
