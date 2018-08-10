---
title: Dzień 1 - Robimy bloga na VuePressie - cz. 1
category: 100 Days Of Code
date: 2018-08-08
description: VuePress + trochę JavaScriptu i mamy platformę do prowadzenia bloga.
---

# VuePress jako platforma blogowa? Czemu nie.

## Czym jest VuePress?

[VuePress](https://vuepress.vuejs.org) składa się z dwóch części: minimalistycznego, statycznego generatora stron z obsługiwanym przez Vue systemem motywów (ang. "themes") oraz domyślnego motywu zoptymalizowanego na potrzeby pisania dokumentacji technicznej. Został stworzony z myślą o wsparciu potrzeb dokumentacyjnych projektów wokół ekosystemu Vue. Zgodnie z tymi założeniami brakuje mu jednak funkcjonalności potrzebnych przy prowadzeniu bloga.

Każda strona generowana przez VuePress ma swój własny, prerendowany statyczny HTML, który zapewnia doskonałą wydajność ładowania i jest przyjazny dla SEO. Po wczytaniu strony, Vue przejmuje statyczną zawartość i zamienia ją w Single-Page Application (SPA). Dodatkowe strony są pobierane na żądanie w miarę poruszania się po stronie.

Tworzenie treści dokumentów realizowane jest poprzez język znaczników MARKDOWN wraz z zaimplementowanym blokiem matadanych [YAML Front Matter](https://jekyllrb.com/docs/frontmatter/). Plik .md jest kompilowany w HTML z użyciem [markdown-it](https://github.com/markdown-it/markdown-it), a następnie przetwarzany jako szablon komponentu Vue. Pozwala to na bezpośrednie użycie Vue wewnątrz plików .md i dzięki temu możemy osadzać dynamiczną zawartość. Właśnie te cechy VuePress'a wykorzystam do dostosowania go pod potrzeby stworzenia platformy blogowej, którą każdy będzie mógł uruchomić w kilka minut i umieścić na hostingu.

## Instalacja

Proces instalacji VuePress-a jest bardzo prosty. Potrzebujemy Node.js oraz menedżera pakietów Yarn (rekomendowany) lub npm. W pierwszej kolejności musimy sprawdzić jaką mamy zainstalowaną wersję Node.js (wersja >= 8.0).

Sprawdzić wersję możemy przy użyciu komendy terminalowej:

```bash
node -v
```

Jeśli nasza wersja nie spełnia wymogów lub jeśli nie mamy zainstalowanych Node.js i Yarn to robimy to oczywiście.

Jeśli mamy już Node.js i Yarn w odpowiedniej wersji to możemy utworzyć katalog naszego projektu `/akcelio/` i wejść do tego katalogu:

```bash
mkdir akcelio && cd $_
```

Poprzez Yarn instalujemy VuePress'a jako zależność lokalna

```bash
yarn add -D vuepress
```

Tworzymy katalog `/docs/` wewnątrz katalogu projektu. To tam będziemy mieli wszystkie pliki naszego bloga oraz pliki konfiguracyjne. Taki sposób umieszczenia pozwala nam dodać VuePressa do istniejącego już projektu.

```bash
mkdir docs
```

W katalogu `/docs/` tworzymy podkatalog `/.vuepress/` i umieszczamy w nim plik `config.js`. Plik ten jest podstawowym plikiem konfigurującym VuePressa pod nasze potrzeby.

## Stworzenie kategorii wpisów w bocznym menu z użyciem YAML Front Matter

Routing poszczególnych stron w VuePressie realizowany jest poprzez katalogi i pliki. W katalogu głównym `/docs/` musi się znaleźć plik `README.md` oraz w każdym z tworzonych podkatalogów również musi być plik `REDAME.md`. Jeśli chcemy przykładowo umieścić w menu link do strony Blog, wystarczy w katalogu `docs` utworzyć podkatalog `/blog/` i umieścić w nim plik README.md będący jakby stroną główną dla tego katalogu. W nim będziemy umieszczać później poszczególne wpisy blogowe w osobnych plikach .md. W taki właśnie sposób ja utworzyłem swoją strukturę projektu. Żeby routing mógł poprawnie zadziałać musimy w pliku konfiguracyjnym `config.js` dokonać następujących wpisów:

```js
module.exports = {
  title: "Akcel.io", // Tutaj wpisujemy tytuł naszej strony (SEO)
  description: "MEVN (MongoDB, Express.js, Vue.js, Node.js)", // Tutaj podajemy opis (SEO)
  ga: "", // Tutaj możemy podać nasz kod śledzący Google ANalytics
  themeConfig: {
    nav: [{ text: "Blog", link: "/blog/" }] // Tak tworzymy nawigację w menu głównym
  }
};
```

:::tip Założenia
Założenie jakie przyjąłem dla tego projektu jest takie, że każdy nasz wpis blogowy będzie w sekcji Front Matter pliku .md oprócz **tytułu** zawierał również **kategorię** wpisu. Chcę stworzyć menu boczne dla strony **_Blog_** w którym nasze posty będą pojawiać się pod odpowiednimi kategoriami w sposób automatyczny. W ten sposób nie będziemy musieli ręcznie tworzyć podkatalogów kategorii w katalogu `/blog/` i wrzucać do nich naszch plików .md. Możemy wszystkie posty wrzucać do katalogu `/blog/` a JavaScript przypisze je w menu bocznym do odpowiednich kategorii za nas.
:::

### Metadane YAML Front Matter w poszczególnych postach z których tworzone będą kategorie i tytuły postów w menu bocznym

Żeby mechanizm tworzenia menu bocznego z kategoriami mógł zadziałać, każdy wpis blogowy musi zawierać na samej górze pliku .md sekcję matadanych Front Matter, gdzie podamy co najmniej tytuł posta oraz kategorię do której należy. Taki blok matadanych może zawierać jeszcze inne parametry, które silnik VuePressa potrafi rozpoznać i wykorzystać renederując plik HTML. Sekcja metadanych rozpoczyna się i kończy `---`. Poniżej możemy już pisać naszą treść korzystając z języka znaczników MARKDOWN.

```
---
title: Przykładowy tytuł
category: Przykładowa kategoria
---
```

Skoro mamy już nasze pliki .md uzupełnione odpowiednimi danymi `title` i `category` możemy zabrać się za napisanie stosownego skrytpu w JavaScripcie, który umieścimy w naszym pliku `config.js`.

### Skrypt w pliku config.js tworzący menu boczne z kategoriami wpisów

Do napisania skryptu będziemy potrzebować zainstalować jako zależności lokalne dwa dodatkowe pakiety: **glob** oraz **front-matter**. Po ich zainstalowaniu powinny one znaleźć się jako wpisy w pliku `package.json` w katalogu głównym projektu, w moim przypadku to katalog `/akcelio/`.

Otwieramy zatem nasz plik `config.js` i wklejamy poniższy kod na samej górze pliku przed wcześniej napisanym przez nas poleceniem `module.exports`, które również modyfikujemy dodając w niej boczne menu, które będzie korzystać z naszego skryptu. Kompletny plik `config.js` powinien wyglądać tak:

```js
const { join, basename } = require("path");
const glob = require("glob");
const { readFileSync } = require("fs");
const fm = require("front-matter");

const generateSideBar = directory => {
  const structure = {};
  const directoryPath = join(__dirname, "..", directory);
  glob
    .sync("**/*.md", {
      cwd: directoryPath,
      ignore: "README.md",
      absolute: true
    })
    .map(filename => {
      const frontmatter = fm(readFileSync(filename, "utf8")).attributes;
      const rel = join(directory, basename(filename));
      const [title, category] = Object.values(frontmatter);
      return [rel, title, category];
    })
    .forEach(([rel, title, category]) => {
      structure[category] = {
        ...structure[category],
        [title]: rel
      };
    });
  const categories = Object.keys(structure).sort();
  const sidebar = [
    ...categories.map(cat => {
      const names = Object.values(structure[cat]).sort();
      return {
        title: cat,
        collapsable: false,
        children: Array.from(names)
      };
    })
  ];
  return sidebar;
};

module.exports = {
  title: "Akcel.io",
  description: "MEVN (MongoDB, Express.js, Vue.js, Node.js)",
  ga: "",
  themeConfig: {
    nav: [{ text: "Blog", link: "/blog/" }],
    sidebar: {
      "/blog/": ["", ...generateSideBar("/blog")]
    },
    sidebarDepth: 0
  }
};
```

Zapisujemy nasz plik `config.js` i możemy się cieszyć z automatycznie tworzonego menu bocznego na podstawie kategorii posta umieszczonej w sekcji Front Matter poszczególnych plików .md

### Uruchomienie serwera deweloperskiego (hot reload)

Teraz gdy już mamy stworzoną strukturę naszego bloga, napisany skrypt konfiguracyjny, stworzone menu boczne z kategoriami to powinniśmy zobaczyć efekt naszej pracy. Potrzebujemy do tego serwera deweloperskiego, który dostarcza na VuePress. Co ciekawę mamy od razu zapewniony tzw. hot reload, czyli po dokonaniu zmian w kodzie i zapisaniu naszego pliku serwer automatycznie renderuje na nowo treść strony dzięki czemu widzimy efekty zmian bez konieczności przeładowywania strony w przeglądarce. Uruchamiamy zatem Terminal i wpisujemy:

```bash
vuepress dev docs
```

Po chwili otrzymujemy komunikat tego rodzaju:
`> VuePress dev server listening at http://localhost:8080/`

Uruchamiamy przeglądarkę wpisując wyżej podany adres localhost i numer portu. Jak zobaczycie mamy już możliwość kliknięcia i otworzenia z menu bocznego poszczególne posty przyporządkowane do kategorii. Jeśli zaś wejdziemy poprzez menu główne na stronę **_Blog_** otworzy nam się pusta strona pliku `README.md`, który umieściliśmy w katalogu `/blog/`. Chciałbym żeby na tej stronie pojawiała się w formie grida z kafelek lista wszystkich postów uporządkowana wg daty (na górze najświeższe). Kafelka będzie zawierać tytuł posta, kategorię, datę oraz krótkie streszczenie. Korzystać będę z komponentu Vue, który wcześniej utworzę i następnie umieszczę w pliku `/blog/README.md`.
Tym zajmę się w kolejnym dniu.
