export const development = {
    client: "pg",
    connection: {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "postgres",
        database: "mydb"
    },
    migrations: {
        directory: "./migrations"
    }
};