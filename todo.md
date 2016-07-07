TODO
====

nodelist (version MFC) est une encapsulation de [nodelist](https://github.com/eorroe/NodeList.js) dans un module node.
Pour l'instant il est utilisable seul (faire le test) et via le node module MFC domify.

**On veillera à l'utiliser autant que possible pour l'améliorer et le compléter.
Si on atteint un niveau de maturité suffisant on pourra en faire un module MFC.**


**@see** [Sitepoint Nodelist Tuto](https://www.sitepoint.com/dom-manipulation-with-nodelist-js/)

[nodelist](https://github.com/tmpvar/jsdom) est une librairie **minimaliste** pour manipuler le dom 
As of 201607, je n'ai pas trouvé de librairie jquery like minimaliste qui soit orientée functionnal programming 
Une telle librairie pourrait :
  - être inclue dans le module mfc 'commmon' pour une utilisation dans les projets node (scrapper, traitements de fichiers HTML)
  - être inclue dans la console chrome dev-tools via un snippet pour une utilisation en debug session dans le browser


[jsdom](https://github.com/tmpvar/jsdom) est une implementation quasie exhaustive du DOM en js sur node.
contrairemnt à d'autres librairies orientées scrapping, jsdom émule l'environment browser avec pour objectif de pouvoir executer du code browser sur le serveur de manière transparente.

[TODO]
 - pomper le code jquery pour utiliser le même design pattern de module (en particulier pour pouvoir customiser la variable representant nodelist ($|$$ ou autre)
 - vérifier qu'il fonctionne bien avec jquery
 - l'inclure en tant que snippet dans chrome devtools pour une utilisation via la console.
 - refactorer en 'functionnal programming friendly' (via lodash/fp)
    + par exemple inclure (cf demo-nodelist-jsdom)
    ```js
    const nodes = __.curry( (selector,root) => $$(selector,root) ) 
    const text = __.prop('textContent')
    const sequence = __.flow 
    ```
  - intégrer améliorations proposées dans les commentaires du tuto SitePoint
  - comprendre pourquoi tout s'est mis à marcher tout d'un coup quand j'ai ajouté l'argument 'root' dans la signature de la fonction encapsulant le module (avant j'avais l'erreur 'window'
    variable not defined)






