module.exports = {
    name: "err",
    execute(err) {
        console.log(`An error occured with this database connection: \n${err}`);
    }
}