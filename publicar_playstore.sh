#!/bin/bash

export APP="PsicHelp"

emulator @`emulator -list-avds | tail` &

echo "Lembrou de atualizar a version no config.xml?"
read answer
if [ "$answer" != "${answer#[SsYy]}" ] ;then
    echo OK, continuando
else
    echo Saindo!
    exit
fi

echo "Gerando versão de Release para $APP"
ionic cordova build android --prod --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
rm -f $APP.apk
~/Android/Sdk/build-tools/26.0.2/zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk $APP.apk

echo "Apague a versão antiga e teste primeiro teste no seu celular e dê enter!"
read answer
adb install $APP.apk
echo "Testou e funcinou?!"
read answer 
if [ "$answer" != "${answer#[SsYy]}" ] ;then
    echo OK parabêns! Pronto para ir para a loja!
else
    echo Erro saindo!
    exit
fi

