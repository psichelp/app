#!/bin/bash

export APP="PsicHelp"

function acp {
    git add -A .
    git commit -m "$*"
    git push
}


echo "Lembrou de parar a execução local (cordova run) e de atualizar a versão no config.xml?"
read answer
if [ "$answer" != "${answer#[SsYy]}" ] ;then
    echo OK, continuando
else
    echo Saindo!
    exit
fi

# emulator @`emulator -list-avds | tail` &
ng build --prod 

rm -rf cordova/www
mkdir -p cordova/www
cp dist/PsicHelp/* cordova/www -r
echo "Gerando versão de Release para $APP"
cd cordova
cordova build android --prod --release
# jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
# rm -f $APP.apk
# ~/Android/Sdk/build-tools/26.0.2/zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk $APP.apk

# echo "Apague a versão antiga e teste primeiro teste no seu celular e dê enter!"
# read answer
# adb install $APP.apk
# echo "Testou e funcinou?!"
# read answer 
# if [ "$answer" != "${answer#[SsYy]}" ] ;then
#     echo OK parabêns! Pronto para ir para a loja!
# else
#     echo Erro saindo!
#     exit
# fi

fastlane deploy --verbose