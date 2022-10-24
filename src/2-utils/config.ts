const isProd = process.env.NODE_ENV ==="production"
console.log(isProd)
class Config {
    public port =process.env.PORT ||3007;
    public mysqlHost = isProd? process.env.DATABASE_HOST: "localhost";
    public mysqlUser =isProd? process.env.DATABASE_USER: "root";
    public mysqlPassword =isProd ? process.env.DATABASE_PASSWORD: "";
    public mysqlDatabase = isProd? process.env.DATABASE_NAME: "vacationideas"; 
    public mysqlPort = isProd? +process.env.DATABASE_PORT:0
}

const config = new Config();

export default config;
