import application from './express.app';

const PORT = process.env.PORT || 3000;

export default async function StartServer() {
    application.listen(PORT, () => {
        console.log(`Application running on port ${PORT}`);
    });
}


StartServer().then(() => {
    console.log('Server is up...');
});

process.on("uncaughtException", (err) => {
    console.log(err);
    process.exit(1);
})