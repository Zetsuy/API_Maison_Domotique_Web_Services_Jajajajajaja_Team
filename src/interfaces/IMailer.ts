export default interface IMailer {
    sendStatus: (mail : string, statut : string, message : string) => any,
}