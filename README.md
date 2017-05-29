Play the game:

https://jeremy461.github.io/PRG08_Typescript_Game/

Eisen:

Interface

De interface is toegepast, zie characterStates.ts, crashed.ts, flying.ts, stationary.ts
//De interface pas je inderdaad toe, elke state implement de characterStates

Static utility method

Zie utils.ts
//Wat er staat is goed, niks op aan te merken

Singleton

Zie main.ts
//Heb je ook goed gedaan en ook handig gebruik van gemaakt door gameover vanuit een andere class aan te roepen

Strategy

Zie characterStates.ts, crashed.ts, flying.ts, stationary.ts
//Doe je opzich goed, maar zoals het nu is kun je de stationary class net zo goed weglaten, want hier komt de character nooit in terecht
//Daarnaast gebruik je in iedere state character, dus heb ik die aan characterstate toegevoegd

Encapsulation

In veel classes zijn private/public variabelen of methods
//Niks op toe te voegen, veel is al private

Composition

De Game maakt background + character aan, background maakt ground + catapult aan.
//Doe je ook netjes en op een logische manier

Inheritance

Inheritance is toegepast door middel van het gameObject. Verschillende classes zoals Catapult, Character en Ground zijn GameObjects
//Werkt ook allemaal

//Er ontbreekt nog een UML van je hele project, ondanks dit is je project wel goed gestructureerd tot nu toe.
//Als je deze wel had, zorg dan dat die de volgende keer in het projectmapje er bij zit
//Daarnaast nog een tip: gebruik comments! Je houdt je code al heel overzichtelijk, maar dit maakt het voor anderen nog beter leesbaar.
//Ook voor jezelf handig als je project misschien nog wat ingewikkelder wordt

//Ookal ontbreekt de ULM, ziet het er voor de rest allemaal prima uit dus een dikke voldoende!
