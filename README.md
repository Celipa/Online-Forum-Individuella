Jag har skapat ett Online-Forum med Typescript NextJs

För att köra programmet
öppna terminal från src mappen
kör
npm i

sedan kör
npm run dev


### Funktionalitet

1. ✅ Lista alla trådar. (lista/kort spelar ingen roll) Visa namn och vad för sorts tråd det är ta inspiration ovan
2. ✅ Visa tråd i detalj
3. ✅ Skapa en tråd
4. ✅ Skapa en kommentar på en spesifik tråd
5. ✅ Spara trådar och kommentarer i LocalStorage eller annan databas
6. ✅ Kunna registrera sig och logga in
7. ✅ Kunna låsa en tråd
8. ✅ Endast inloggade användare ska kunna integrera med trådar och kommentarer
9. ✅ Kommentarer på QNA trådar ska kunna markeras som svar     

### VG Funktionalitet

För att uppnå VG så måste minst **två** av nedan krav uppfyllas

1. **Implementation av rättigheter:**
    1. ✅ Användare kan endast editera sina egna trådar
    2. ✅ Användare kan vara moderatorer i vilket fall dem ska kunna hantera all data 
     **(för att testa, gå in i localStorage och ändra User{..., isModerator:false} till true)**
    3. ✅Kommentarer på QNA trådar ska kunna markeras som svar endast av skaparen
        
2. **Utökade kommentarer:**
    1. ✅ Kommentarer kan skapas på andra kommentarer
    2. ✅ Kommentarer får inte innehålla opassande språk (valfritt vad som ses som opassande) och ska gömmas eller visas upp i censurerat läge om de innehåller det.
