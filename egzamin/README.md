# Baza pytan do egzaminu z Logiki i Teorii Mnogosci

Podglad bazy jest publicznie dostepny (na ten moment\*) i znajduje sie pod adresem: [litm.vercel.app](https://litm.vercel.app/)

\* - nalezaloby hostowac pliki z folderu [assets](./assets/) w chmurze; moznaby uzyc do tego CI/CD z Cloudinary (jesli mozliwe); na ten moment, aby strona uzyskala dostep do plikow, repozytorium **musi** pozostac publiczne

## Informacje

## Podglad rekordow

### Zdalnie

Najnowszy build statycznego htmla z danymi z pliku [baza-pytan.json](./baza-pytan.json) znajduje sie pod adresem [litm.vercel.app](https://litm.vercel.app/)

### Lokalnie

1. Instalujemy srodowisko [Node](https://nodejs.org/en/download/)
2. Z poziomu folderu "egzamin" uruchamiamy w terminalu:
   ```
   $ npm install
   $ npm run build
   ```
3. Wygenerowana strona znajduje sie pod sciezka [public/index.html](./public/index.html)
4. Nalezy otworzyc plik index.html w przegladarce

Plik [index.html](./index.html) umozliwia podglad rekordow z bazy w pliku [baza-pytan.json](./baza-pytan.json) (Na ten moment, to bardzo prosta aplikacja oferujaca najbardziej podstawowe funkcje)

## Wstepne zasady kontrybuowania:

### 1. Modyfikowanie pytan

Baza rekordow pytan znajduje sie w pliku [baza-pytan.json](./baza-pytan.json). Pliki graficzne znajduja sie w folderze [assets](./assets).

**Uwaga** Pole **searchable** obiektu pytania powinno byc latwe i intuicyjne w wyszukaniu, aby to zapewnic nalezy:

1. Nie przepisywac formul matematycznych z zadan
2. Nie zastepowac formul matematycznych wielokropkiem
3. Pomijac wszystko co pisane jest latexem
4. Nie zamieszczac znakow interpunkcyjnych w srodku zdan (Znak interpunkcyjny moze znalezc sie na koncu calej tresci zadania; np.: '?')

Mozna natomiast:

1. Stosowac wielkie litery
2. Stosowac polskie znaki
3. Zamieszczac slowa kluczowe na koncu calej tresci

### 2. Dodawanie nowych pytan

Kazde nowe pytanie powinno zostac dodane uzywajac skryptu [gen.py](./gen.py)

`$ python gen.py`

Skrypt na samym koncu pliku [baza-pytan.json](./baza-pytan.json) utworzy nowy rekord, ktory nalezy uzupelnic. Skrypt wygeneruje nazwe dla obrazka, ktora nalezy zastosowac do screenshota wykonanego zadania, a ten umiescic w folderze [assets](./assets)
