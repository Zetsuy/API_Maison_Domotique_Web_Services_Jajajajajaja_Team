export interface IMailer {
     sendStatus: (mail : string, statut : string, message : string) => any
}
