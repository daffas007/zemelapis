// Inicializuojame žemėlapį
var map = L.map('map').setView([54.5260, 15.2551], 4);  // Europos centras

// Pridedame OpenStreetMap plyteles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// Sukuriame žymeklį su API gautais vaizdais ir įdomiais faktais
function createMarker(lat, lng, countryName, capital, population, area, flagUrl, coatOfArmsUrl, facts) {
    L.marker([lat, lng]).addTo(map)
        .bindPopup(`
            <h3>${countryName}</h3>
            <p><strong>Sostinė:</strong> ${capital}</p>
            <p><strong>Gyventojų skaičius:</strong> ${population}</p>
            <p><strong>Plotas:</strong> ${area} km²</p>
            <div style="display:flex;align-items:center;">
                <div style="background-image:url('${flagUrl}'); width:50px; height:30px; background-size:cover; margin-right:10px;"></div>
                <div style="background-image:url('${coatOfArmsUrl}'); width:50px; height:50px; background-size:cover;"></div>
            </div>
            <h4>Įdomūs faktai:</h4>
            <ul>
                ${facts.map(fact => `<li>${fact}</li>`).join('')}
            </ul>
        `);
}

// Gauname duomenis iš API
async function getCountryData(countryName, lat, lng, facts) {
    try {
        console.log("Fetching data for", countryName);  // Patikrinimo taškas
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const data = await response.json();
        const country = data[0];

        // Patikriname gautus duomenis
        console.log("Data fetched for", countryName, country);

        const flagUrl = country.flags.svg;
        const coatOfArmsUrl = country.coatOfArms.svg || flagUrl;  // Jei nėra herbo, naudoja vėliavą
        const capital = country.capital[0];
        const population = country.population;
        const area = country.area;

        createMarker(lat, lng, countryName, capital, population, area, flagUrl, coatOfArmsUrl, facts);
    } catch (error) {
        console.error("Error fetching country data for", countryName, error);
    }
}

// Pridėsime NATO šalis su įdomiais faktais
getCountryData('United States', 38.9072, -77.0369, [
    'JAV turi didžiausią karinį biudžetą pasaulyje.',
    'Pentagonas yra JAV Gynybos departamentas, esantis Vašingtone.',
    'JAV turi ilgiausią nacionalinį greitkelių tinklą pasaulyje.'
]);

getCountryData('Canada', 45.4215, -75.6972, [
    'Kanada yra antra pagal dydį šalis pasaulyje pagal plotą.',
    'Oro karinė bazė „CFB Borden“ yra viena seniausių Kanadoje.',
    'Kanada turi antrą ilgiausią pakrantę pasaulyje.'
]);

getCountryData('Turkey', 39.9334, 32.8597, [
    'Turkija yra svarbus NATO narys nuo 1952 metų.',
    'Ankara yra Turkijos sostinė ir antras pagal dydį miestas.',
    'Stambulas yra didžiausias Turkijos miestas, besitęsiantis tarp Europos ir Azijos.'
]);
































// Pridedame daugiau NATO šalių su įdomiais faktais

// Jungtinė Karalystė
getCountryData('United Kingdom', 51.5074, -0.1278, [
    'Jungtinė Karalystė (JK) buvo NATO steigėja 1949 metais.',
    'JK turi didžiausią karinį biudžetą Europoje.',
    'JK karinės pajėgos dalyvavo daugelyje NATO operacijų, įskaitant misijas Afganistane ir Irake.',
    'Karališkasis jūrų laivynas yra vienas iš didžiausių NATO jūrų pajėgų.'
]);


// Vokietija
getCountryData('Germany', 52.5200, 13.4050, [
    'Vokietija yra viena iš NATO steigėjų.',
    'Berlynas, Vokietijos sostinė, yra vienas iš Europos kultūros centrų.',
    'Vokietija garsėja savo technologijų pažanga ir pramonės inovacijomis.'
]);

// Prancūzija
getCountryData('France', 48.8566, 2.3522, [
    'Prancūzija yra viena didžiausių NATO šalių pagal kariuomenės dydį.',
    'Paryžius, Prancūzijos sostinė, garsėja savo kultūros ir meno istorija.',
    'Prancūzija taip pat yra vienintelė NATO valstybė su branduoliniu povandeniniu laivynu.'
]);

// Italija
getCountryData('Italy', 41.9028, 12.4964, [
    'Italija yra NATO narė nuo 1949 metų.',
    'Roma, Italijos sostinė, yra viena seniausių miestų pasaulyje.',
    'Italija garsėja savo turtinga karine istorija ir senovine architektūra.'
]);

// Ispanija
getCountryData('Spain', 40.4168, -3.7038, [
    'Ispanija įstojo į NATO 1982 metais.',
    'Madridas, Ispanijos sostinė, yra vienas iš didžiausių Europos miestų.',
    'Ispanija yra antra pagal plotą NATO narė Europoje.'
]);

// Lenkija
getCountryData('Poland', 52.2297, 21.0122, [
    'Lenkija yra strategiškai svarbi NATO narys dėl savo vietos Rytų Europoje.',
    'Varšuva, Lenkijos sostinė, yra istorinės reikšmės centras, atstatytas po Antrojo pasaulinio karo.',
    'Lenkija turi stiprias kariuomenės pajėgas ir glaudžiai bendradarbiauja su NATO.'
]);

// Pridėsime naujų NATO šalių su žymekliais
getCountryData('Norway', 59.9139, 10.7522, [
    'Norvegija yra NATO narė nuo 1949 metų ir gynybiškai svarbi Šiaurės Atlanto regionui.',
    'Oslas, Norvegijos sostinė, garsėja savo vėsiu klimatu ir šiuolaikiniais pastatais.',
    'Norvegija yra viena turtingiausių pasaulio šalių pagal BVP vienam gyventojui.'
]);

getCountryData('Greece', 37.9838, 23.7275, [
    'Graikija įstojo į NATO 1952 metais kartu su Turkija.',
    'Atėnai, Graikijos sostinė, laikomi demokratijos gimtine.',
    'Graikija turi didelį strateginį vaidmenį Viduržemio jūroje.'
]);
// Luxembourg
getCountryData('Luxembourg', 49.8153, 6.1296, [
    'Liuksemburgas yra viena iš NATO steigėjų.',
    'Sostinė Liuksemburgas yra vienas svarbiausių finansų centrų Europoje.',
    'Šalis garsėja stipriu bankų sektoriumi ir tarptautiniu mokesčių centru.'
]);

getCountryData('Luxembourg', 49.8153, 6.1296, [
    'Liuksemburgas yra viena iš NATO steigėjų.',
    'Sostinė Liuksemburgas yra vienas svarbiausių finansų centrų Europoje.',
    'Šalis garsėja stipriu bankų sektoriumi ir tarptautiniu mokesčių centru.'
]);


getCountryData('Turkey', 39.9334, 32.8597, [
    'Turkija yra svarbus NATO narys nuo 1952 metų.',
    'Ankara yra Turkijos sostinė ir antras pagal dydį miestas.',
    'Stambulas yra didžiausias Turkijos miestas, besitęsiantis tarp Europos ir Azijos.'
]);

getCountryData('Canada', 45.4215, -75.6972, [
    'Kanada yra viena iš NATO įkūrėjų ir turi stiprias kariuomenės pajėgas.',
    'Oro karinė bazė „CFB Borden“ yra viena seniausių Kanadoje.',
    'Kanada turi ilgiausią nepanaudotą pasienio ruožą su JAV pasaulyje.'
]);

// Zarasai su bendrais faktais
L.marker([55.7328, 26.2528]).addTo(map)
    .bindPopup(`
        <h3>Zarasai</h3>
        <p><strong>Įdomūs faktai apie Zarasus:</strong></p>
        <ul>
            <li>Zarasai yra vienas iš seniausių Lietuvos miestų, minimas jau XIV amžiuje.</li>
            <li>Miestas garsėja Zarasų ežeru, vienu didžiausių Lietuvoje.</li>
            <li>Zarasai yra žinomi kaip poilsio ir festivalių centras, įskaitant "Galapagai" muzikos festivalį.</li>
        </ul>
    `);

// Arturo namų adresas su tiksliomis koordinatėmis
L.marker([55.734268, 26.241573]).addTo(map)
    .bindPopup(`
        <h3>Arturo Namai</h3>
        <p><strong>Adresas:</strong> Dariaus ir Girėno g. 50, LT-32107, Zarasai</p>
        <p><strong>Arturas yra Baltic Institute of Technology studentas.</strong></p>
    `);








// Kai visi žymekliai bus pridėti, galime matyti, kaip pritaikyti žemėlapį pagal visus žymeklius
function fitMapToBounds() {
    if (map) {
        map.fitBounds(map.getBounds());
    }
}

// Po 2000 ms pritaikome žemėlapio ribas, kad būtų matomi visi žymekliai
setTimeout(fitMapToBounds, 2000);






















// Pridedame dar NATO šalis su žymekliais ir įdomiais faktais

// Belgija
getCountryData('Belgium', 50.8503, 4.3517, [
    'Belgija yra Europos Sąjungos ir NATO būstinės vieta.',
    'Briuselis yra tiek Belgijos, tiek ES sostinė.',
    'Belgijoje gaminama daugiau nei 1000 skirtingų alaus rūšių.'
]);

// Nyderlandai
getCountryData('Netherlands', 52.3676, 4.9041, [
    'Nyderlandai yra žinomi dėl savo dviračių kultūros ir tulpių laukų.',
    'Amsterdamas, sostinė, garsėja savo kanalais ir turtinga istorija.',
    'Nyderlandai yra NATO narys nuo 1949 metų.'
]);

// Portugalija
getCountryData('Portugal', 38.7223, -9.1393, [
    'Portugalija įstojo į NATO 1949 metais kaip vienas iš steigėjų.',
    'Lisabona, sostinė, yra vienas iš seniausių miestų pasaulyje.',
    'Portugalija turi vieną didžiausių karo laivynų Europoje.'
]);

// Danija
getCountryData('Denmark', 55.6761, 12.5683, [
    'Danija yra NATO narė nuo pat aljanso įkūrimo 1949 metais.',
    'Kopenhaga, sostinė, garsėja savo istorine architektūra.',
    'Danija yra žinoma dėl savo stiprių gynybos pajėgų, įskaitant modernią laivyną.'
]);

// Islandija
getCountryData('Iceland', 64.1466, -21.9426, [
    'Islandija yra mažiausia NATO narė be nuolatinių gynybos pajėgų.',
    'Reikjavikas, sostinė, yra vienintelis miestas, turintis NATO susitarimus dėl oro gynybos.',
    'Islandija yra strategiškai svarbi Šiaurės Atlanto gynybai.'
]);

// Norvegija (jau buvo pridėta, bet galime atnaujinti duomenis)
getCountryData('Norway', 59.9139, 10.7522, [
    'Norvegija turi stiprias karines pajėgas, ypač oro ir jūrų laivyną.',
    'Oslas, sostinė, yra didžiausias miestas Norvegijoje.',
    'Norvegija yra turtinga energetinių išteklių, ypač naftos ir dujų.'
]);

// Čekija
getCountryData('Czech Republic', 50.0755, 14.4378, [
    'Čekija įstojo į NATO 1999 metais.',
    'Praha, sostinė, yra vienas gražiausių miestų Europoje.',
    'Čekija yra žinoma dėl savo karinių inovacijų ir stiprių gynybos pajėgų.'
]);

// Vengrija
getCountryData('Hungary', 47.4979, 19.0402, [
    'Vengrija yra NATO narė nuo 1999 metų.',
    'Budapeštas, sostinė, yra vienas iš didžiausių Rytų Europos miestų.',
    'Vengrija yra žinoma dėl savo stiprių karinių tradicijų ir gynybos inovacijų.'
]);

// Slovakija
getCountryData('Slovakia', 48.1486, 17.1077, [
    'Slovakija įstojo į NATO 2004 metais.',
    'Bratislava, Slovakijos sostinė, yra strategiškai svarbi NATO narė Vidurio Europoje.',
    'Slovakija turi modernią karinę infrastruktūrą, glaudžiai bendradarbiauja su NATO.'
]);

// Slovėnija
getCountryData('Slovenia', 46.0569, 14.5058, [
    'Slovėnija įstojo į NATO 2004 metais.',
    'Liubliana, sostinė, yra svarbus politinis ir kultūrinis centras.',
    'Slovėnija garsėja savo kalnų kraštovaizdžiu ir kariniais daliniais, specializuotais kalnų operacijoms.'
]);

// Bulgarija
getCountryData('Bulgaria', 42.6977, 23.3219, [
    'Bulgarija įstojo į NATO 2004 metais.',
    'Sofija, sostinė, yra viena iš seniausių Europos miestų.',
    'Bulgarija yra strategiškai svarbi dėl savo vietos Juodosios jūros regione.'
]);

// Rumunija
getCountryData('Romania', 44.4268, 26.1025, [
    'Rumunija įstojo į NATO 2004 metais.',
    'Bukareštas, Rumunijos sostinė, yra istorinės reikšmės centras.',
    'Rumunija turi stiprius oro ir jūrų pajėgumus.'
]);

// Po 2000 ms pritaikome žemėlapio ribas, kad būtų matomi visi žymekliai
setTimeout(fitMapToBounds, 2000);













// Pridedame daugiau NATO šalių su įdomiais faktais

// Lietuva
getCountryData('Lithuania', 54.6872, 25.2797, [
    'Lietuva įstojo į NATO 2004 metais.',
    'Vilnius, sostinė, yra vienas iš seniausių miestų Rytų Europoje.',
    'Lietuva turi strateginę reikšmę dėl savo geografinės padėties Baltijos regione.'
]);

// Latvija
getCountryData('Latvia', 56.9496, 24.1052, [
    'Latvija įstojo į NATO 2004 metais.',
    'Ryga, Latvijos sostinė, yra svarbus Baltijos jūros prekybos centras.',
    'Latvija glaudžiai bendradarbiauja su NATO dėl regioninės saugumo politikos.'
]);

// Estija
getCountryData('Estonia', 59.4370, 24.7536, [
    'Estija įstojo į NATO 2004 metais.',
    'Talinas, sostinė, yra gerai išsaugotas viduramžių miestas.',
    'Estija yra lyderė skaitmeninio saugumo ir kibernetinio saugumo srityje NATO.'
]);

// Albanija
getCountryData('Albania', 41.3275, 19.8189, [
    'Albanija įstojo į NATO 2009 metais.',
    'Tirana, sostinė, yra sparčiai besivystantis miestas.',
    'Albanija yra strategiškai svarbi dėl savo vietos Adrijos jūros regione.'
]);

// Kroatija
getCountryData('Croatia', 45.8150, 15.9819, [
    'Kroatija įstojo į NATO 2009 metais.',
    'Zagrebas, Kroatijos sostinė, yra svarbus Vidurio Europos kultūros centras.',
    'Kroatija garsėja savo turtinga istorija ir strategine padėtimi Balkanų regione.'
]);

// Juodkalnija
getCountryData('Montenegro', 42.4304, 19.2594, [
    'Juodkalnija įstojo į NATO 2017 metais.',
    'Podgorica, sostinė, yra sparčiai besivystantis miestas.',
    'Juodkalnija yra strategiškai svarbi dėl savo ilgos pakrantės Adrijos jūroje.'
]);

// Šiaurės Makedonija
getCountryData('North Macedonia', 41.9981, 21.4254, [
    'Šiaurės Makedonija įstojo į NATO 2020 metais.',
    'Skopjė, sostinė, yra vienas seniausių miestų Balkanuose.',
    'Šiaurės Makedonija prisideda prie regioninio saugumo ir stabilumo per NATO.'
]);

// Islandija (ji jau buvo pridėta, bet galime patikrinti jos duomenis)
getCountryData('Iceland', 64.1466, -21.9426, [
    'Islandija yra mažiausia NATO narė, neturinti nuolatinių ginkluotųjų pajėgų.',
    'Reikjavikas, Islandijos sostinė, yra vienas iš svarbiausių Šiaurės Atlanto regiono miestų.',
    'Islandija yra strategiškai svarbi NATO dėl savo vietos Šiaurės Atlante.'
]);

// Norvegija (ji jau buvo pridėta, bet galime dar kartą patikrinti jos duomenis)
getCountryData('Norway', 59.9139, 10.7522, [
    'Norvegija yra NATO narė nuo 1949 metų.',
    'Oslas, Norvegijos sostinė, yra vienas svarbiausių Skandinavijos miestų.',
    'Norvegija turi stiprią gynybos sistemą ir glaudžiai bendradarbiauja su NATO dėl regioninio saugumo.'
]);

// Švedija (nauja NATO narė 2023 metais)
getCountryData('Sweden', 59.3293, 18.0686, [
    'Švedija tapo NATO nare 2023 metais.',
    'Stokholmas, Švedijos sostinė, yra didžiausias Skandinavijos miestas.',
    'Švedija garsėja savo inovatyviais kariniais sprendimais ir stipriu gynybos sektoriu.'
]);

// Suomija (nauja NATO narė 2023 metais)
getCountryData('Finland', 60.1695, 24.9354, [
    'Suomija tapo NATO nare 2023 metais.',
    'Helsinkis, Suomijos sostinė, yra vienas iš svarbiausių Baltijos jūros miestų.',
    'Suomija turi stiprias karines pajėgas ir yra strategiškai svarbi Baltijos regionui.'
]);

// Pritaikome žemėlapio ribas visoms NATO šalims
function fitMapToBounds() {
    if (map) {
        map.fitBounds(map.getBounds());
    }
}

// Užtikriname, kad žemėlapio ribos bus pritaikytos visiems žymekliams po 2000 ms
setTimeout(fitMapToBounds, 2000);





