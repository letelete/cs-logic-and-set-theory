# Baza pytan do egzaminu z Logiki i Teorii Mnogosci

## Informacje

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
