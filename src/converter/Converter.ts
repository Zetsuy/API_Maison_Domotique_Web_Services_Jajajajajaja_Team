export function convert(rawValue: number | boolean, type: String) {

    if (typeof rawValue == "number") {

        var rangeT = [-20, 55];
        var rangeBar = [950, 1150];
        var resultat;

        switch(type) {
            case 'TEMPERATURE':
                var T = (rawValue / 1023) * (rangeT[1] - rangeT[0]) + (rangeT[0]); //calcul temperature
                resultat = (Math.round(T*100)/100).toString() + "°C";
                break;
            case 'HUMIDITY':
                var Hum = (rawValue / 1023) * 100;
                resultat = (Math.round(Hum*100)/100).toString() + "%HR"; //calcul
                break;
            case 'BARO':
                var Baro = (rawValue / 1023) * (rangeBar[1] - rangeBar[0]) + (rangeBar[0]); //calcul 
                resultat = (Math.round(Baro*100)/100).toString() + "hPA";
                break;
            case 'PROXIMITY':
                if (rawValue == 0) {
                    resultat = "Inactif";
                }
    
                else if (rawValue == 1) {
                    resultat = "Actif"
                }
                break;
            default:
                console.log(`Erreur`);

        }

        return resultat;

    }
    return;
}