declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            DB_USERNAME: string;
            DB_NAME: string;
            DB_PASSWORD: string;
        }
    }
}

export {};
