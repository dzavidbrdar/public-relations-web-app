# Feature
Login radnika koji je zadužen za odgovaranje na pitanja
## Item
Korisnik treba biti u mogućnosti da se prijavi na svoj korisnički račun.
### Task
* Kreirati izgled login stranice
* Implementirati validaciju za polja forme
* Implementirati ispis poruke u slučaju nevalidnih podataka
* Implementirati slanje podataka sa forme na server
* Implementirati odlazak na sljedeću stranicu nakon uspješne prijave
* Uraditi push koda
* Napraviti pull request

## Item
Korisnik treba biti u mogućnosti da se odjavi sa svog korisničkog računa.
### Task
* Implementirati odjavu prijavljenog korisnika
* Implementirati vraćanje na početnu stranicu nakon odjavljivanja
* Uraditi push koda
* Napraviti pull request

# Feature
Prikaz informativnog materijala kupcima - promocije i akcije
## Item
Korisnik (potencijalna mušterija) treba biti u stanju vidjeti informacije o eventualnim promocijama ili akcijama na početnoj stranici kako bi mogao ostvariti određenu pogodnost prilikom kupovine.
### Task
* Implementirati dobavljanje podataka sa servera o proizvodima koji imaju određeni popust
* Odabrati podatke od interesa za dobavljene proizvode (procenat popusta, staru i novu cijenu)
* Prikazati navedene podatke u obliku image slider-a na vrhu početne stranice
* Omogućiti interakciju korisnika sa sliderom
* Uraditi push koda
* Napraviti pull request

# Feature
Pregled artikala koji su na raspolaganju sa cijenama (online katalog)
## Item
Korisnik (potencijalna mušterija) treba biti u stanju vidjeti pregled artikala na raspolaganju sa cijenama kako bi mogao odabrati željeni artikal prilikom kupovine.
### Task
* Implementirati dobavljanje podataka o svim proizvodima sa servera
* Prikazati dobavljene podatke za svaki proizvod (slika, naziv, cijena, eventualni popust i nova cijena)
* Poredati proizvode u obliku grid-a
* Uraditi push koda
* Napraviti pull request

# Feature
Mogućnost da korisnik postavlja pitanja
## Item
Korisnik (potencijalna mušterija) treba imati mogućnost da postavi pitanje, kako bi dobio dodatne informacije o onom što ga zanima, a što eventualno nema na stranici. Pritom mora unijeti i ime, prezime i e-mail kako bi se spriječila zloupotreba.
### Task
* Kreirati izgled forme za postavljanje pitanja
* Implementirati validaciju za polja forme
* Implementirati ispis poruke u slučaju nevalidnih podataka
* Implementirati slanje podataka sa forme na server
* Implementirati povratak na prethodnu stranicu nakon predaje forme(prilikom klika na dugme submit)
* Uraditi push koda
* Napraviti pull request

# Feature
Radnik odgovara na pitanja postavljena od strane klijenata
## Item
Radnik koji se prijavi na svoj korisnički račun treba imati mogućnost pregleda svih neodgovorenih pitanja koja postavljaju klijenti kako bi u svakom trenutku znao na koja pitanja treba da odgovori.
### Task
* Implementirati dobavljanje pitanja koja postavljaju klijenti sa servera
* Implementirati filtiranje dobavljenih pitanja tako da se odaberu samo neodgovorena pitanja
* Prikazati neodgovorena pitanja kroz tabelu
* Dodati button "Reply" na svako neodgovoreno pitanje
* Uraditi push koda
* Napraviti pull request
## Item
Radnik koji se prijavi na svoj korisnički račun treba da odgovara na neodgovorena pitanja koja su poslana od strane kupca i na taj način pospiješi komunikaciju s potencijanim kupcima.
### Task
* Omogućiti pokretanje forme reply na klik buttona reply određenog neodgovorenog pitanja
* Implementirati prikazivanje odgovora na pitanje 
* Uvesti restrikciju na prazan odgovor
* Slanje podataka na server/odgovori na potencijana pitanja
* Uraditi push koda
* Napraviti pull request

# Feature
Mogućnost ostavljanja komentara na proizvode
## Item
Korisnik mora biti u mogućnosti ostaviti komentar na dati artikal. Kako korisnik ne mora biti logovan, prije unošenja komentara nužno je ostaviti lične informacije (ime, prezime i e-mail), kako bi se izbjegli neugodni i neprimjereni komentari.
### Task
* Implementirati formu za dodavanje novog komentara
* Validirati formu za dodavanje novog komentara
* Napraviti prikaz svih komentara svih korisnika
* Napraviti prikaz komentara za tačno određeni (odabrani) artikal
* Uraditi push koda
* Napraviti pull request

# Feature
Prikaz lokacija poslovnica
## Item
Korisnik mora biti u mogućnosti da pregleda sve poslovnice, kako bi mogao odabrati željenu prilikom komentarisanja iste.
### Task
* Kreirati izgled prikaza svih poslovnica
* Implementirati dobavljanje svih lokacija i njihovih propratnih podataka sa servera
* Poredati poslovnice u obliku grid-a
* Prikazati broj aktivnih poslovnica 
* Dodati dugme "Rate"
* Uraditi push koda
* Napraviti pull request

# Feature
Brisanje neprimjerenih komentara
## Item
Korisnik (zaposlenik) mora biti u mogućnosti da izbriše neke od komentara u slučaju da su oni neprimjereni ili čak uvredljivog karaktera.
### Task
* Kreirati izgled prikaza komentara
* Implementirati dobavljanje svih komentara sa servera i njihovo sortiranje
* Poredati komentare u obliku liste
* Omogućiti brisanje komentara putem dugmeta "Delete"
* Uraditi push koda
* Napraviti pull request

# Feature
Mogućnost ostavljanja recenzije na željenu poslovnicu
## Item
Klijent mora biti u mogućnosti da ostavi recenziju, odnosno kritički osvrt na željenu poslovnicu.
### Task
* Implementirati izgled forme za ostavljanje recenzije
* Implementirati validaciju za polja forme
* Implementirati ispis poruke u slučaju nevalidnih podataka
* Implementirati slanje podataka sa forme na server
* Uraditi push koda
* Napraviti pull request
## Item
Klijent mora biti u mogućnosti da ocijeni željenu poslovnicu.
### Task
* Implementirati mogućnost ocjenljivanja željene poslovnice
* Uraditi push koda
* Napraviti pull request

# Feature
Mogucnost da klijent vidi odgovorena pitanja
## Item
Korisnik (potencijalna mušterija) mora biti u mogućnosti vidjeti odgovore na sva dosad odgovorena pitanja, kako bi bio bolje informisan o stanju stvari.
### Task
* Implementirati dobavljanje pitanja koja postavljaju klijenti sa servera
* Implementirati filtiranje dobavljenih pitanja tako da se odaberu samo odgovorena pitanja
* Prikazati odgovorena pitanja
* Uraditi push koda
* Napraviti pull request

# Feature
Mogućnost da klijent vidi ocjenu poslovnice.
## Item
Korisniku treba na vidljivom mjestu biti prikazana prosječna ocjena poslovnice.
### Task
* Implementirati dobavljanje svih ocjena poslovnica sa servera
* Kreirati izgled ocjene kod svake poslovnice
* Računanje prosječne ocjene za svaku poslovnicu i učitavanje istih dinamički(po učitavanju lokacija)
* Uraditi push koda
* Napraviti pull request

# Feature
Filtriranje poslovnica po lokaciji
## Item
Korisnik treba da ima mogućnost filtriranja poslovnica kada u search box-u unese lokaciju poslovnice po gradu (ukoliko su poslovnice rasprostranjene van jednog grada) ili po adresama. Također, za tako pronađenu poslovnicu moraju stajati obavezne propratne kontakt informacije.
### Task
* Kreirati izgled search bara u prikazu poslovnica
* Filtrirati postojeće poslovnice na osnovu unosa u search baru nakon klika na dugme "Search"
* Omogućiti prikaz filtriranih poslovnica sa njihovim popratnim informacijama
* Uraditi push koda
* Napraviti pull request

# Feature
Pregled recenzija
## Item
Klijent treba imati mogućnost pregleda svih recenzija koje se odnose na poslovnicu koja klijenta zanima. Tako klijent može vidjeti mišljenja i iskustva drugih klijenata što mu može pomoći pri donošenju odluka.
### Task
* Kreirati izgled prozora za prikazivanje recenzija
* Implementirati dobavljenje svih recenzija sa servera
* Implementirati filtriranje recenzija prema id-u poslovnice na koju se odnose
* Implementirati prikazivanje recenzija pomoću komentara
* Uraditi push koda
* Napraviti pull request

# Feature
Lajk na recenziju
## Item
Prilikom pregleda recenzije (reviewa) na određenu poslovnicu, korisniku treba omogućiti ostavljanje ‘’slažem se’’ reakcije na isti.
### Task
* Dodati prikaz broja lajkova recenzije
* Kreirati dugme za lajk
* Prilikom klika na dugme uraditi PUT request za azuriranje broja lajkova za datu recenziju
* Uraditi push koda
* Napraviti pull request
