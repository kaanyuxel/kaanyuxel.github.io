---
layout: ders
title: "Kurulum: ROOT ve Geant4"
ders: Introduction
hafta: 1
ozet: Windows (WSL), macOS ve Linux üzerinde ROOT ve Geant4 kurulumu, adım adım.
---

Bu derste kullanacağımız iki yazılımı kuracağız:

- **ROOT** – CERN'in veri analizi ve grafik çizme çatısı
- **Geant4** – parçacıkların madde içindeki geçişini simüle eden araç takımı

Aşağıdaki kutularda kendi işletim sisteminizin sekmesini seçin. Seçiminiz sayfadaki bütün kutulara uygulanır. Komutları kod kutusunun sağ üstündeki **Kopyala** düğmesiyle kopyalayıp terminale yapıştırabilirsiniz.

<div class="note" markdown="1">
**Zaman ve disk:** ROOT ve Geant4'ü kaynak koddan derleyeceğiz. Her birinin derlenmesi bilgisayarınıza göre **30–90 dakika** sürebilir. İkisi birlikte yaklaşık **15 GB** boş alan ister. Kuruluma derse gelmeden önce başlayın ve derleme sırasında bilgisayarın uyku moduna geçmediğinden emin olun.
</div>

**Terminal nedir?** Bu derste bütün kurulumu **terminal** denen, komut yazdığımız bir pencereden yapacağız. Her komutu yazdıktan (veya yapıştırdıktan) sonra **Enter**'a basın ve komut bitene kadar bekleyin. Bitince satırın başında yeniden `$` (macOS'ta `%`) işareti görünür. Terminalin nasıl açılacağı aşağıda, **Hazırlık** bölümünde her işletim sistemi için ayrı ayrı anlatılıyor.

**Kurulum yeri:** İki programı da ev klasörünüzdeki `programFiles` klasörüne kuracağız. Bu klasörü Hazırlık bölümünde birlikte oluşturacağız. Kurulum bitince yapı şöyle olacak:

```text
~/programFiles/
├── root/
│   ├── root-6.36.00/     ROOT kaynak kodu
│   ├── build/            derleme klasörü
│   └── install/          kurulu ROOT
└── geant4/
    ├── geant4-v11.3.0/   Geant4 kaynak kodu
    ├── build/            derleme klasörü
    └── install/          kurulu Geant4
```

## 1. Hazırlık

<div class="os-tabs" markdown="1">
<div class="os-tab" data-os="windows" data-label="Windows (WSL)" markdown="1">

Windows'ta ROOT ve Geant4'ü **WSL** (Windows Subsystem for Linux) içinde, yani Windows'un içinde çalışan bir Ubuntu Linux'ta kuracağız.

Windows'ta iki farklı terminal kullanacağız: WSL'i kurmak için bir kez **PowerShell**, sonrasındaki her şey için **Ubuntu** terminali.

### PowerShell'i yönetici olarak açmak

1. Klavyede **Windows** tuşuna basın (veya ekranın sol altındaki Başlat düğmesine tıklayın).
2. `powershell` yazın.
3. Çıkan **Windows PowerShell** sonucuna **sağ tıklayıp** **Yönetici olarak çalıştır**'ı seçin.
4. "Bu uygulamanın cihazınızda değişiklik yapmasına izin veriyor musunuz?" sorusuna **Evet** deyin. Mavi (veya siyah) bir pencere açılır; bu PowerShell'dir.

**1.** Açılan PowerShell penceresine şunu yazın:

```powershell
wsl --install -d Ubuntu-24.04
```

**2.** Bilgisayarı yeniden başlatın. Açılışta Ubuntu penceresi gelecek ve sizden bir **kullanıcı adı** ve **şifre** isteyecek. Kullanıcı adında Türkçe karakter ve boşluk kullanmayın. Şifreyi yazarken ekranda hiçbir şey görünmez; bu normaldir.

**3.** WSL'in güncel olduğundan emin olun (grafik pencerelerin açılabilmesi için gerekli). PowerShell'i yukarıdaki gibi yeniden yönetici olarak açıp şunu yazın:

```powershell
wsl --update
```

### Ubuntu terminalini açmak

1. **Windows** tuşuna basın.
2. `ubuntu` yazın ve çıkan **Ubuntu 24.04** uygulamasına tıklayın.
3. Siyah bir pencere açılır ve satır başında `kullaniciadi@bilgisayar:~$` gibi bir yazı görünür. Bu Ubuntu terminalidir. **Bundan sonraki bütün komutları bu pencereye yazacaksınız.**

<div class="note" markdown="1">
**Yapıştırma:** Ubuntu terminalinde yapıştırmak için **sağ tıklayın** veya **Ctrl + Shift + V**'ye basın. Tek başına Ctrl + V çalışmayabilir.
</div>

**4.** Sistemi güncelleyip temel araçları kurun. `sudo` komutu sizden şifre ister; Ubuntu kurulurken belirlediğiniz şifreyi yazıp Enter'a basın:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential cmake git wget x11-apps
```

**5.** Grafik pencerelerin çalıştığını test edin; ekranda bir çift göz açılmalı (kapatmak için pencereyi kapatın):

```bash
xeyes
```

### programFiles klasörünü oluşturmak

**6.** Programları kuracağımız klasörü oluşturup içine girin:

```bash
mkdir -p ~/programFiles
cd ~/programFiles
pwd
```

- `~` sizin **ev klasörünüz** demektir (Ubuntu'da `/home/kullaniciadi`).
- `mkdir -p` klasörü oluşturur; klasör zaten varsa hata vermez.
- `cd` klasörün içine girer, `pwd` şu an hangi klasörde olduğunuzu yazar. Ekranda `/home/kullaniciadi/programFiles` görmelisiniz.

Klasörü Windows Dosya Gezgini'nde açmak için (sonundaki noktayı unutmayın):

```bash
explorer.exe .
```

<div class="note" markdown="1">
**İpucu:** Dosyalarınızı Linux tarafındaki ev klasörünüzde (`~`) tutun, `/mnt/c/...` altında çalışmayın; derleme orada çok yavaşlar. Linux dosyalarınızı Windows Dosya Gezgini'nde sol taraftaki **Linux** girdisinden de görebilirsiniz.
</div>

</div>
<div class="os-tab" data-os="macos" data-label="macOS" markdown="1">

### Terminali açmak

1. Klavyede **Command (⌘) + Boşluk** tuşlarına birlikte basın; ekranın ortasında **Spotlight** arama kutusu açılır.
2. `terminal` yazıp **Enter**'a basın.
3. Bir pencere açılır ve satır başında `kullaniciadi@MacBook ~ %` gibi bir yazı görünür (aşağıda bash'e geçince bu `$` ile bitecek). Bu terminaldir. **Bundan sonraki bütün komutları bu pencereye yazacaksınız.**

Terminal'e Finder'dan da ulaşabilirsiniz: **Uygulamalar → İzlenceler → Terminal**. Sık kullanacağınız için Dock'taki simgesine sağ tıklayıp **Seçenekler → Dock'ta Tut** diyebilirsiniz. Yapıştırmak için **Command (⌘) + V** kullanın.

### Kabuğu zsh'den bash'e çevirmek

macOS terminalde varsayılan olarak **zsh** kabuğunu kullanır. Derste herkesin aynı komutları kullanabilmesi için Linux ve Windows'taki gibi **bash** kabuğuna geçeceğiz.

**1.** Varsayılan kabuğu bash yapın. Sizden Mac'inizin giriş şifresini ister (yazarken ekranda görünmez):

```bash
chsh -s /bin/bash
```

**2.** macOS'ta bash, terminal açılırken `~/.bash_profile` dosyasını okur. Bu dosyanın `~/.bashrc` dosyasını da okumasını sağlayın ve macOS'un "zsh'e geçin" uyarısını kapatın:

```bash
echo '[ -f ~/.bashrc ] && source ~/.bashrc' >> ~/.bash_profile
echo 'export BASH_SILENCE_DEPRECATION_WARNING=1' >> ~/.bash_profile
touch ~/.bashrc
```

**3.** Terminali tamamen kapatın (**Command (⌘) + Q**) ve yeniden açın. Artık satır başında `MacBook:~ kullaniciadi$` gibi `$` ile biten bir yazı görmelisiniz. Kontrol edin; ekranda `/bin/bash` yazmalı:

```bash
echo $SHELL
```

### Geliştirici araçları ve Homebrew

**4.** Apple'ın geliştirici araçlarını (derleyici vb.) kurun. Açılan pencerede **Yükle**'ye tıklayın ve bitmesini bekleyin:

```bash
xcode-select --install
```

**5.** Paket yöneticisi **Homebrew**'u kurun. Güncel kurulum komutunu [brew.sh](https://brew.sh) sayfasından kopyalayın. Sizden şifre isterse Mac'inizin giriş şifresini yazın. Kurulum bitince `brew` komutunun bash'te de çalışması için şunu çalıştırın:

```bash
if [ -x /opt/homebrew/bin/brew ]; then echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.bash_profile; fi
source ~/.bash_profile
```

**6.** Kurulumu kontrol edin ve temel araçları kurun:

```bash
brew --version
brew install cmake wget
```

### programFiles klasörünü oluşturmak

**7.** Programları kuracağımız klasörü oluşturup içine girin:

```bash
mkdir -p ~/programFiles
cd ~/programFiles
pwd
```

- `~` sizin **ev klasörünüz** demektir (macOS'ta `/Users/kullaniciadi`).
- `mkdir -p` klasörü oluşturur; klasör zaten varsa hata vermez.
- `cd` klasörün içine girer, `pwd` şu an hangi klasörde olduğunuzu yazar. Ekranda `/Users/kullaniciadi/programFiles` görmelisiniz.

Klasörü Finder'da açmak için (sonundaki noktayı unutmayın):

```bash
open .
```

</div>
<div class="os-tab" data-os="linux" data-label="Linux (Ubuntu)" markdown="1">

Komutlar Ubuntu/Debian içindir.

### Terminali açmak

- En kısa yol: klavyede **Ctrl + Alt + T** tuşlarına birlikte basın.
- Veya ekranın sol altındaki **Uygulamaları Göster** düğmesine (ya da **Super/Windows** tuşuna) basın, `terminal` yazıp **Terminal** uygulamasını açın.

Satır başında `kullaniciadi@bilgisayar:~$` gibi bir yazı görünen pencere terminaldir. **Bundan sonraki bütün komutları bu pencereye yazacaksınız.** Terminalde yapıştırmak için **Ctrl + Shift + V** (veya sağ tık → Yapıştır) kullanın.

**1.** Sistemi güncelleyip temel araçları kurun. `sudo` komutu sizden bilgisayarınızın şifresini ister (yazarken ekranda görünmez):

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential cmake git wget
```

**2.** Ubuntu sürümünüzü kontrol edin (bu rehber Ubuntu 22.04 ve 24.04 için hazırlandı):

```bash
lsb_release -a
```

### programFiles klasörünü oluşturmak

**3.** Programları kuracağımız klasörü oluşturup içine girin:

```bash
mkdir -p ~/programFiles
cd ~/programFiles
pwd
```

- `~` sizin **ev klasörünüz** demektir (Ubuntu'da `/home/kullaniciadi`).
- `mkdir -p` klasörü oluşturur; klasör zaten varsa hata vermez.
- `cd` klasörün içine girer, `pwd` şu an hangi klasörde olduğunuzu yazar. Ekranda `/home/kullaniciadi/programFiles` görmelisiniz.

Klasörü dosya yöneticisinde açmak için (sonundaki noktayı unutmayın):

```bash
xdg-open .
```

</div>
</div>

## 2. ROOT kurulumu

ROOT'u kaynak koddan derleyeceğiz (Geant4'te de aynı yolu izleyeceğiz). Aşağıdaki `ROOTV` değişkeni kurulacak sürümü belirler; [root.cern/install/all_releases](https://root.cern/install/all_releases/) sayfasından en güncel sürümü kontrol edip gerekirse değiştirin (ör. `6.36.00`).

<div class="note" markdown="1">
**Önemli:** 2. ve 3. adımları **aynı terminal penceresinde** yapın. Pencereyi kapatırsanız `ROOTV` değişkeni silinir; devam etmeden önce `ROOTV=6.36.00` satırını tekrar yazın.
</div>

<div class="os-tabs" markdown="1">
<div class="os-tab" data-os="windows" data-label="Windows (WSL)" markdown="1">

Aşağıdaki komutların hepsi **Ubuntu penceresinde** çalıştırılır.

**1. Gerekli paketler.** ROOT'u derlemek için derleyici ve CMake, grafik (X11, OpenGL) kütüphaneleri, matematik ve sıkıştırma kütüphaneleri ve Python gerekir:

```bash
sudo apt update
sudo apt install -y build-essential cmake git wget binutils dpkg-dev \
  g++ gcc gfortran libssl-dev libx11-dev libxext-dev libxft-dev libxpm-dev \
  libtbb-dev libgif-dev libjpeg-dev libpng-dev libfreetype6-dev \
  libglu1-mesa-dev libglew-dev libftgl-dev libfftw3-dev libgsl-dev \
  libxml2-dev liblzma-dev liblz4-dev libzstd-dev libxxhash-dev \
  python3 python3-dev python3-pip python3-numpy
```

**2. Kaynak kodu indirin:**

```bash
ROOTV=6.36.00
mkdir -p ~/programFiles/root && cd ~/programFiles/root
wget https://root.cern/download/root_v$ROOTV.source.tar.gz
tar -xzf root_v$ROOTV.source.tar.gz
rm root_v$ROOTV.source.tar.gz
```

**3. Yapılandırın ve derleyin.** Bu adım bilgisayarınıza göre 30–90 dakika sürebilir:

```bash
mkdir -p ~/programFiles/root/build && cd ~/programFiles/root/build
cmake -DCMAKE_INSTALL_PREFIX=$HOME/programFiles/root/install \
      ../root-$ROOTV
make -j$(nproc)
make install
```

**4.** ROOT'u her terminal açılışında otomatik yüklemek için:

```bash
echo 'source ~/programFiles/root/install/bin/thisroot.sh' >> ~/.bashrc
source ~/.bashrc
```

<div class="note" markdown="1">
**Derleme yarıda kesilirse** (genelde bellek yetmediği için): `make -j2` ile daha az çekirdek kullanarak tekrar deneyin.
</div>

</div>
<div class="os-tab" data-os="macos" data-label="macOS" markdown="1">

ROOT'u kaynak koddan kendimiz derleyeceğiz. Homebrew'u yalnızca yardımcı kütüphaneleri kurmak için kullanıyoruz; ROOT'un kendisi Homebrew ile kurulmuyor.

**1. Gerekli paketler.** Derleyici için Apple'ın geliştirici araçları (Hazırlık adımında kurduğunuz Xcode Command Line Tools) gerekir. Kurulu olduğunu kontrol edin; bir klasör yolu yazmalı:

```bash
xcode-select -p
```

CMake, Python ve matematik kütüphaneleri:

```bash
brew update
brew install cmake wget python numpy gsl fftw
```

**2. Kaynak kodu indirin:**

```bash
ROOTV=6.36.00
mkdir -p ~/programFiles/root && cd ~/programFiles/root
curl -LO https://root.cern/download/root_v$ROOTV.source.tar.gz
tar -xzf root_v$ROOTV.source.tar.gz
rm root_v$ROOTV.source.tar.gz
```

**3. Yapılandırın ve derleyin.** Bu adım bilgisayarınıza göre 30–90 dakika sürebilir:

```bash
mkdir -p ~/programFiles/root/build && cd ~/programFiles/root/build
cmake -DCMAKE_INSTALL_PREFIX=$HOME/programFiles/root/install \
      ../root-$ROOTV
make -j$(sysctl -n hw.ncpu)
make install
```

**4.** ROOT'u her terminal açılışında otomatik yüklemek için:

```bash
echo 'source ~/programFiles/root/install/bin/thisroot.sh' >> ~/.bashrc
source ~/.bashrc
```

</div>
<div class="os-tab" data-os="linux" data-label="Linux (Ubuntu)" markdown="1">

**1. Gerekli paketler.** ROOT'u derlemek için derleyici ve CMake, grafik (X11, OpenGL) kütüphaneleri, matematik ve sıkıştırma kütüphaneleri ve Python gerekir:

```bash
sudo apt update
sudo apt install -y build-essential cmake git wget binutils dpkg-dev \
  g++ gcc gfortran libssl-dev libx11-dev libxext-dev libxft-dev libxpm-dev \
  libtbb-dev libgif-dev libjpeg-dev libpng-dev libfreetype6-dev \
  libglu1-mesa-dev libglew-dev libftgl-dev libfftw3-dev libgsl-dev \
  libxml2-dev liblzma-dev liblz4-dev libzstd-dev libxxhash-dev \
  python3 python3-dev python3-pip python3-numpy
```

**2. Kaynak kodu indirin:**

```bash
ROOTV=6.36.00
mkdir -p ~/programFiles/root && cd ~/programFiles/root
wget https://root.cern/download/root_v$ROOTV.source.tar.gz
tar -xzf root_v$ROOTV.source.tar.gz
rm root_v$ROOTV.source.tar.gz
```

**3. Yapılandırın ve derleyin.** Bu adım bilgisayarınıza göre 30–90 dakika sürebilir:

```bash
mkdir -p ~/programFiles/root/build && cd ~/programFiles/root/build
cmake -DCMAKE_INSTALL_PREFIX=$HOME/programFiles/root/install \
      ../root-$ROOTV
make -j$(nproc)
make install
```

**4.** ROOT'u her terminal açılışında otomatik yüklemek için:

```bash
echo 'source ~/programFiles/root/install/bin/thisroot.sh' >> ~/.bashrc
source ~/.bashrc
```

<div class="note" markdown="1">
**Derleme yarıda kesilirse** (genelde bellek yetmediği için): `make -j2` ile daha az çekirdek kullanarak tekrar deneyin.
</div>

</div>
</div>

### ROOT'u test edin

```bash
root -l
```

ROOT istemcisi açılınca şunları sırayla yazın. Bir grafik penceresi açılmalı:

```cpp
TF1 f("f", "sin(x)/x", -10, 10);
f.Draw();
```

Çıkmak için `.q` yazın.

## 3. Geant4 kurulumu

Geant4'ü kaynak koddan derleyeceğiz. Aşağıdaki `G4V` değişkeni kurulacak sürümü belirler; [geant4.web.cern.ch](https://geant4.web.cern.ch/download/) sayfasından en güncel sürümü kontrol edip gerekirse değiştirin.

<div class="note" markdown="1">
**Önemli:** 2. ve 3. adımları **aynı terminal penceresinde** yapın. Pencereyi kapatırsanız `G4V` değişkeni silinir; devam etmeden önce `G4V=11.3.0` satırını tekrar yazın.
</div>

<div class="os-tabs" markdown="1">
<div class="os-tab" data-os="windows" data-label="Windows (WSL)" markdown="1">

Aşağıdaki komutların hepsi **Ubuntu penceresinde** çalıştırılır.

**1. Gerekli paketler.** Derleyici ve CMake, XML okuma (Expat, Xerces-C), grafik arayüz için Qt ve OpenGL:

```bash
sudo apt update
sudo apt install -y build-essential cmake git wget \
  libexpat1-dev libxerces-c-dev zlib1g-dev \
  qtbase5-dev libqt5opengl5-dev \
  libx11-dev libxmu-dev libxi-dev \
  libgl1-mesa-dev libglu1-mesa-dev
```

**2.** Kaynak kodu indirin:

```bash
G4V=11.3.0
mkdir -p ~/programFiles/geant4 && cd ~/programFiles/geant4
wget https://gitlab.cern.ch/geant4/geant4/-/archive/v$G4V/geant4-v$G4V.tar.gz
tar -xzf geant4-v$G4V.tar.gz
```

**3.** Yapılandırın ve derleyin. `GEANT4_INSTALL_DATA=ON` fizik veri dosyalarını (~2 GB) otomatik indirir:

```bash
mkdir -p ~/programFiles/geant4/build && cd ~/programFiles/geant4/build
cmake -DCMAKE_INSTALL_PREFIX=$HOME/programFiles/geant4/install \
      -DGEANT4_INSTALL_DATA=ON \
      -DGEANT4_USE_QT=ON \
      -DGEANT4_USE_OPENGL_X11=ON \
      -DGEANT4_USE_GDML=ON \
      ../geant4-v$G4V
make -j$(nproc)
make install
```

**4.** Geant4'ü her terminal açılışında otomatik yükleyin:

```bash
echo 'source ~/programFiles/geant4/install/bin/geant4.sh' >> ~/.bashrc
source ~/.bashrc
```

<div class="note" markdown="1">
**Derleme yarıda kesilirse** (genelde bellek yetmediği için): `make -j2` ile daha az çekirdek kullanarak tekrar deneyin.
</div>

</div>
<div class="os-tab" data-os="macos" data-label="macOS" markdown="1">

Geant4'ü kaynak koddan kendimiz derleyeceğiz. Homebrew'u yalnızca yardımcı kütüphaneleri kurmak için kullanıyoruz; Geant4'ün kendisi Homebrew ile kurulmuyor.

**1. Gerekli paketler.** CMake, XML okuma (Expat, Xerces-C) ve grafik arayüz için Qt:

```bash
brew update
brew install cmake wget qt xerces-c expat
```

**2.** Kaynak kodu indirin:

```bash
G4V=11.3.0
mkdir -p ~/programFiles/geant4 && cd ~/programFiles/geant4
curl -LO https://gitlab.cern.ch/geant4/geant4/-/archive/v$G4V/geant4-v$G4V.tar.gz
tar -xzf geant4-v$G4V.tar.gz
```

**3.** Yapılandırın ve derleyin. `GEANT4_INSTALL_DATA=ON` fizik veri dosyalarını (~2 GB) otomatik indirir:

```bash
mkdir -p ~/programFiles/geant4/build && cd ~/programFiles/geant4/build
cmake -DCMAKE_INSTALL_PREFIX=$HOME/programFiles/geant4/install \
      -DCMAKE_PREFIX_PATH=$(brew --prefix qt) \
      -DGEANT4_INSTALL_DATA=ON \
      -DGEANT4_USE_QT=ON \
      -DGEANT4_USE_QT_QT6=ON \
      -DGEANT4_USE_GDML=ON \
      ../geant4-v$G4V
make -j$(sysctl -n hw.ncpu)
make install
```

**4.** Geant4'ü her terminal açılışında otomatik yükleyin:

```bash
echo 'source ~/programFiles/geant4/install/bin/geant4.sh' >> ~/.bashrc
source ~/.bashrc
```

</div>
<div class="os-tab" data-os="linux" data-label="Linux (Ubuntu)" markdown="1">

**1. Gerekli paketler.** Derleyici ve CMake, XML okuma (Expat, Xerces-C), grafik arayüz için Qt ve OpenGL:

```bash
sudo apt update
sudo apt install -y build-essential cmake git wget \
  libexpat1-dev libxerces-c-dev zlib1g-dev \
  qtbase5-dev libqt5opengl5-dev \
  libx11-dev libxmu-dev libxi-dev \
  libgl1-mesa-dev libglu1-mesa-dev
```

**2.** Kaynak kodu indirin:

```bash
G4V=11.3.0
mkdir -p ~/programFiles/geant4 && cd ~/programFiles/geant4
wget https://gitlab.cern.ch/geant4/geant4/-/archive/v$G4V/geant4-v$G4V.tar.gz
tar -xzf geant4-v$G4V.tar.gz
```

**3.** Yapılandırın ve derleyin. `GEANT4_INSTALL_DATA=ON` fizik veri dosyalarını (~2 GB) otomatik indirir:

```bash
mkdir -p ~/programFiles/geant4/build && cd ~/programFiles/geant4/build
cmake -DCMAKE_INSTALL_PREFIX=$HOME/programFiles/geant4/install \
      -DGEANT4_INSTALL_DATA=ON \
      -DGEANT4_USE_QT=ON \
      -DGEANT4_USE_OPENGL_X11=ON \
      -DGEANT4_USE_GDML=ON \
      ../geant4-v$G4V
make -j$(nproc)
make install
```

**4.** Geant4'ü her terminal açılışında otomatik yükleyin:

```bash
echo 'source ~/programFiles/geant4/install/bin/geant4.sh' >> ~/.bashrc
source ~/.bashrc
```

<div class="note" markdown="1">
**Derleme yarıda kesilirse** (genelde bellek yetmediği için): `make -j2` ile daha az çekirdek kullanarak tekrar deneyin.
</div>

</div>
</div>

### Geant4'ü test edin

Geant4 ile gelen **B1** örneğini derleyip çalıştırın (bütün sistemlerde aynı):

```bash
G4V=11.3.0
cp -r ~/programFiles/geant4/geant4-v$G4V/examples/basic/B1 ~/B1
mkdir -p ~/B1/build && cd ~/B1/build
cmake ..
make
./exampleB1
```

Bir pencere açılıp dedektör geometrisi görünmeli. Pencerenin altındaki komut satırına `/run/beamOn 10` yazın; parçacık izleri çizilecek.

## Sorun giderme

| Sorun | Çözüm |
|---|---|
| `root: command not found` / `geant4.sh` bulunamadı | Terminali kapatıp açın veya `source ~/.bashrc` çalıştırın. macOS'ta `echo $SHELL` komutunun `/bin/bash` yazdığını kontrol edin. |
| WSL'de grafik penceresi açılmıyor | PowerShell'de `wsl --update`, ardından `wsl --shutdown` çalıştırıp Ubuntu'yu yeniden açın. |
| WSL'de Geant4 penceresi siyah/boş | Ubuntu'da `export LIBGL_ALWAYS_SOFTWARE=1` yazıp örneği tekrar çalıştırın. |
| `cmake` Qt'yi bulamıyor | Qt paketlerinin kurulu olduğunu kontrol edin; macOS'ta `-DCMAKE_PREFIX_PATH=$(brew --prefix qt)` satırını unutmayın. |
| Derleme sırasında `Killed` hatası | Bellek yetmiyor; `make -j2` ile tekrar deneyin. |

Takıldığınız bir yer olursa hata mesajının tamamını kopyalayıp bana e-posta ile gönderin.
