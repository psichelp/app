#!/bin/bash

APP="PsicHelp"

 function acp {
    git add -A .
    git commit -m "$*"
    git push
}

ng build --prod --base-href /webapp/
rm -rf docs
mkdir -p docs/webapp
cp dist/PsicHelp/* docs/webapp -r
cd docs
php -S 0.0.0.0:8015

echo Teste primeiro localmente, funcionou? http://0.0.0.0:8015/webapp/
read answer
if [ "$answer" != "${answer#[SsYy]}" ] ;then
    echo OK, continuando
else
    echo Saindo!
    exit
fi

cd ..
acp Publicando o webApp no http://psichelp.github.io/app/webapp 
cd ../site

git checkout master
git pull origin master
rm -rf ios
rm -rf webapp

cp ../app/dist/PsicHelp webapp -r

acp Publicando o webApp no psichelp.com.br/webapp 

echo teste agora em psichelp.com.br/webapp funcionou?
read answer
if [ "$answer" != "${answer#[SsYy]}" ] ;then
    echo OK, Parabéns!
else
    echo Eita pau!!!!!!!!!!!!!!!!!!!
    exit
fi


