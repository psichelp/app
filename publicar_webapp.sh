#!/bin/bash

APP="PsicHelp"

 function acp {
    git add -A .
    git commit -m "$*"
    git push
}

ng build --prod --verbose
rm -rf docs
mkdir -p docs
cp dist/PsicHelp/* docs -r
cd docs
google-chrome http://0.0.0.0:8015
php -S 0.0.0.0:8015
echo Teste primeiro localmente, funcionou? http://0.0.0.0:8015/
read answer
if [ "$answer" != "${answer#[SsYy]}" ] ;then
    echo OK, continuando
else
    echo Saindo!
    exit
fi


cd ../../site
git checkout master
git pull origin master
rm -rf ios
rm -rf webapp
cp ../app/dist/PsicHelp webapp -r

acp Publicando o webApp no psichelp.com.br/webapp 

cd ../app
rm -rf docs
git pull
acp Versionando o código publicado 

echo teste agora em https://github.com/psichelp/app funcionou?
read answer
if [ "$answer" != "${answer#[SsYy]}" ] ;then
    echo OK, Parabéns!
else
    echo Eita pau!!!
    exit
fi

