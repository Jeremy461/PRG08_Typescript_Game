Link naar pull request:
https://github.com/0909758/PRG08_Bobs_Nightmare/pull/2

Link naar issue:
https://github.com/0909758/PRG08_Bobs_Nightmare/issues/4

Link naar online versie:
https://jeremy461.github.io/PRG08_Typescript_Game/

Eisen:

Klassendiagram:
(UML-PRG08.png?raw=true "UML")

Singleton:
De singleton is toegepast in de main.ts. Deze Game class heeft een "private static instance Game" die opgevraagd/aangemaakt wordt door middel van de getInstance() method. Hierdoor kan ik vanuit andere classes de juiste instantie van de Game opvragen om methods/properties aan te spreken.

Polymorfisme:
Polymorfisme wordt onder andere gebruikt door middel van de GameObject class. In deze class wordt een HTMLElement, x, y, width en height gezet. Door andere objecten (catapult, powerups, character) te laten overerven van GameObject kan ik snel en zonder veel herhaling al de bovengenoemde waardes zetten. Ook gebruik ik polymorfisme in de Game class, deze class maakt namelijk background + character aan, vervolgens maakt de background de Ground + Catapult aan.

Strategy:
Het strategy pattern heb ik gebruikt door middel van CharacterStates. Het karakter kan verschillende behaviours hebben, namelijk Stationary, Flying en ChopperState. Stationary wordt gebruikt wanneer het spel start en het karakter nog niet vliegt en wanneer het karakter de grond heeft geraakt en dus verloren heeft. Flying wordt gebruikt tijdens het vliegen/springen en ChopperState wordt gebruikt wanneer het karakter een helikopter powerup heeft gepakt. Al deze states hebben een eigen move functie en zorgen er dus voor dat het karakter ander gedrag vertoond wanneer deze states aangepast worden.

Observer:
Het Observer pattern wilde ik gebruiken op de "super" powerup. Wanneer deze powerup (subject) gepakt wordt, worden alle andere powerups (observers) 2x zo groot zodat deze makkelijker te pakken zijn. Door de spawn snelheid van de powerups is er helaas maar 1 powerup in het spel nadat je een super-powerup pakt. Deze ene powerup wordt wel groter zoals de bedoeling was maar het idee van de observer-pattern (1 op veel relatie) is hierdoor niet volledig tot zijn recht gekomen.
