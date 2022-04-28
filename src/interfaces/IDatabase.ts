export default interface IDatabase {
    //tablename doit correspondre à un objet ?
    //utilisation de Promise ?
    get: (tableName : string, id : string) => any,
    getall: (tableName : string) => any,
    post: (tableName : string, data : any) => any,
    update: (tableName : string, id : string, data : any) => boolean,
    delete: (tableName : string, id : string) => boolean
}