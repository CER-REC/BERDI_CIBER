La version française suit.

# [BERDI](https://apps2.cer-rec.gc.ca/berdi/)

## About

BERDI was created to make data collected by the Canada Energy Regulator accessible to the public.
Since 1965, the Canada Energy Regulator has collected thousands of documents from over 700 hearings.
Among these documents are Environmental and Socio-Economic Assessments, or ESAs, where a large amount of data has been captured about public safety, species at risk, and environmental protection (such as water, soils and plants) to name a few.

While this data is publicly available from our website, it is not easy to access and is difficult to navigate.
Led by the Government of Canada’s Directive on [Open Government](https://open.canada.ca/en/about-open-government), we want to understand how best to mine, organize, and present regulatory data to the people we serve.
BERDI – a data bank for Biophysical, (Socio)Economic, and Regional Data and Information – is our first step towards meeting that goal.

This work is ongoing and we are just getting started.
BERDI currently includes tables, figures and alignment sheets chosen from major pipeline projects and their originally submitted ESAs, since 2003.
We will continue to experiment with ways to improve, structure, and explore regulatory data, using new datasets. 

## Installing and Running

Quick Start
-----------

1. Make a copy of `.env.example` in root called `.env`
2. Set the URL for `MIDDLEWARE_PROXY_ADDRESS` to a server with the GraphQL API
3. Install NPM dependencies `npm install`
4. Run storybook `npm run storybook`
5. Run preview `npm run verifyLazyLoad`

Commands
--------

- Linting: `npm run lint`
- Testing (all): `npm run test`
- Testing (target): `npm run test -- [PATH_TO_FILES]`
- Coverage Report: `npm run test:showcoverage`


# [CIBER](https://apps2.cer-rec.gc.ca/ciber/)

## Le Projet

L’outil CIBER a été créé pour permettre au public d’accéder aux données recueillies par la Régie de l’énergie du Canada.
Depuis 1965, la Régie de l’énergie du Canada a recueilli des milliers de documents en lien avec plus de 700 audiences.
Ces documents comprennent notamment les évaluations environnementales et socioéconomiques, ou EES, qui renferment un grand nombre de données sur, par exemple, la sécurité du public, les espèces en péril et la protection de l’environnement (eaux, sols, plantes).

Bien que le public ait accès à ces données par l’intermédiaire de notre site Web, celui-ci n’est pas des plus convivial et l’accès aux données est ardu.
Pour donner suite à la directive fédérale sur [le gouvernement ouvert](https://ouvert.canada.ca/fr/apropos-gouvernement-ouvert), la Régie souhaite déterminer la meilleure manière d’extraire, d’organiser et de présenter au public les données liées à la réglementation. CIBER – une banque de données et d’informations biophysiques, socioéconomiques et régionales – est le premier pas vers la réalisation de cet objectif.

Ce projet continuera d’évoluer au fil du temps.
CIBER compte actuellement des tableaux, des illustrations ainsi que des cartes-tracés extraits d’évaluations environnementales et socioéconomiques initialement déposées en lien avec de grands projets pipeliniers depuis 2003.
La Régie continuera d’expérimenter des moyens d’améliorer, de structurer et d’explorer les données liées à la réglementation à l’aide de nouveaux ensembles.
